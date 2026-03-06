import React, { useContext, useEffect, useMemo, useState } from 'react'
import { LoadScript, GoogleMap, Marker } from '@react-google-maps/api'
import { SocketContext } from '../context/SocketContext'

const containerStyle = {
  width: '100%',
  height: '100%',
}

const DEFAULT_CENTER = { lat: 26.9124, lng: 75.7873 }

/**
 * Shows a Google Map with the user's live location (from browser geolocation).
 * Optional: pass `ride` to also show the captain's live position from socket.
 */
const UserLiveMap = ({ ride, className = '' }) => {
  const { socket } = useContext(SocketContext)
  const [userPosition, setUserPosition] = useState(null)
  const [captainPosition, setCaptainPosition] = useState(null)
  const [geoError, setGeoError] = useState(null)

  // User's live location via geolocation
  useEffect(() => {
    if (!navigator.geolocation) {
      setGeoError('Location not supported')
      return
    }

    const onSuccess = (position) => {
      const { latitude, longitude } = position.coords
      setUserPosition({ lat: latitude, lng: longitude })
      setGeoError(null)
    }

    const onError = (err) => {
      setGeoError(err.message || 'Location unavailable')
    }

    const watchId = navigator.geolocation.watchPosition(onSuccess, onError, {
      enableHighAccuracy: true,
      maximumAge: 10000,
      timeout: 5000,
    })

    return () => navigator.geolocation.clearWatch(watchId)
  }, [])

  // Captain position from socket when ride is active
  useEffect(() => {
    if (!socket || !ride?._id) return

    const handleLocation = (payload) => {
      if (payload?.rideId && String(payload.rideId) !== String(ride._id)) return
      const { location } = payload || {}
      if (!location?.lat || !location?.lng) return
      setCaptainPosition({ lat: location.lat, lng: location.lng })
    }

    socket.on('captain-location-update', handleLocation)
    return () => socket.off('captain-location-update', handleLocation)
  }, [socket, ride?._id])

  const center = useMemo(() => {
    if (userPosition) return userPosition
    if (captainPosition) return captainPosition
    return DEFAULT_CENTER
  }, [userPosition, captainPosition])

  const apiKey = import.meta.env.VITE_GOOGLE_MAPS_API_KEY

  if (!apiKey) {
    return (
      <div className={`w-full h-full bg-zinc-200 flex items-center justify-center text-xs text-zinc-600 ${className}`}>
        Google Maps API key is missing.
      </div>
    )
  }

  return (
    <div className={`w-full h-full relative ${className}`}>
      <LoadScript googleMapsApiKey={apiKey}>
        <GoogleMap
          mapContainerStyle={containerStyle}
          center={center}
          zoom={userPosition || captainPosition ? 15 : 13}
          options={{
            disableDefaultUI: true,
            zoomControl: true,
          }}
        >
          {userPosition && <Marker position={userPosition} />}
          {captainPosition && <Marker position={captainPosition} />}
        </GoogleMap>
      </LoadScript>
      {geoError && (
        <div className="absolute bottom-2 left-2 right-2 bg-amber-100 text-amber-800 text-xs py-2 px-3 rounded-lg text-center z-10">
          {geoError}. Enable location for live map.
        </div>
      )}
    </div>
  )
}

export default UserLiveMap
