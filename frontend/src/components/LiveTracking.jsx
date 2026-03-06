import React, { useContext, useEffect, useMemo, useState } from 'react'
import { LoadScript, GoogleMap, Marker } from '@react-google-maps/api'
import { SocketContext } from '../context/SocketContext'

const containerStyle = {
  width: '100%',
  height: '100%',
}

const DEFAULT_CENTER = { lat: 26.9124, lng: 75.7873 } // Jaipur as a neutral default

const LiveTracking = ({ ride }) => {
  const { socket } = useContext(SocketContext)
  const [captainPosition, setCaptainPosition] = useState(null)

  const center = useMemo(() => {
    if (captainPosition) return captainPosition
    return DEFAULT_CENTER
  }, [captainPosition])

  useEffect(() => {
    if (!socket) return

    const handleLocation = (payload) => {
      if (ride?._id && payload?.rideId && String(payload.rideId) !== String(ride._id)) {
        return
      }
      const { location } = payload || {}
      if (!location?.lat || !location?.lng) return
      setCaptainPosition({ lat: location.lat, lng: location.lng })
    }

    socket.on('captain-location-update', handleLocation)

    return () => {
      socket.off('captain-location-update', handleLocation)
    }
  }, [socket, ride?._id])

  const apiKey = import.meta.env.VITE_GOOGLE_MAPS_API_KEY

  if (!apiKey) {
    return (
      <div className="w-full h-full bg-zinc-200 flex items-center justify-center text-xs text-zinc-600">
        Google Maps API key is missing.
      </div>
    )
  }

  return (
    <LoadScript googleMapsApiKey={apiKey}>
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={center}
        zoom={captainPosition ? 15 : 13}
        options={{
          disableDefaultUI: true,
          zoomControl: true,
        }}
      >
        {captainPosition && (
          <Marker
            position={captainPosition}
          />
        )}
      </GoogleMap>
    </LoadScript>
  )
}

export default LiveTracking
