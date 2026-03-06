import React, { useContext, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { SocketContext } from '../context/SocketContext'
import { CaptainDataContext } from '../context/CaptainContext'

const FinishRide = (props) => {
  const ride = props?.ride
  const rideUser = ride?.user
  const userName = rideUser
    ? `${rideUser.fullname?.firstname || ''} ${rideUser.fullname?.lastname || ''}`.trim() ||
      rideUser.email ||
      'Rider'
    : 'Rider'

  const fare = ride?.fare != null ? `₹${ride.fare}` : '₹---'
  const durationMin =
    typeof ride?.duration === 'number' ? `${Math.max(1, Math.round(ride.duration / 60))} min` : '—'
  const distanceKm =
    typeof ride?.distance === 'number' ? `${(ride.distance / 1000).toFixed(1)} km` : '—'
  const pickup = ride?.pickup || 'Pickup'
  const destination = ride?.destination || 'Destination'

  const { socket } = useContext(SocketContext)
  const { captain } = useContext(CaptainDataContext)
  const navigate = useNavigate()
  const [isFinishing, setIsFinishing] = useState(false)
  const [error, setError] = useState('')

  const handleFinish = () => {
    if (!socket?.connected) {
      setError('Not connected. Please try again.')
      return
    }
    if (!ride?._id || !captain?._id) {
      setError('Ride not available. Please try again.')
      return
    }

    setIsFinishing(true)
    setError('')

    socket.emit(
      'finish-ride',
      { rideId: ride._id, captainId: captain._id },
      (res) => {
        if (!res?.ok) {
          setIsFinishing(false)
          setError(res?.message || 'Failed to finish ride.')
          return
        }

        try {
          sessionStorage.removeItem('active_ride_captain')
          sessionStorage.removeItem('active_ride_user')
        } catch { /* ignore */ }

        setIsFinishing(false)
        navigate('/captain-home')
      }
    )
  }

  return (
    <div className="relative px-6  bg-white rounded-t-[40px]">

      {/* Pull Handle */}
      <div className="w-12 h-1.5 mb-5 bg-zinc-200 rounded-full mx-auto " />

      <h3 className="text-2xl font-black text-zinc-900 mb-4 tracking-tight">
        Finish this Ride
      </h3>

      {/* Rider Summary Card */}
      <div className="flex items-center justify-between p-4 border border-zinc-200 rounded-3xl mb-8 bg-zinc-50">
        <div className="flex items-center gap-4">
          <img
            className="h-14 w-14 rounded-2xl object-cover shadow-sm"
            src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=150&h=150&auto=format&fit=crop"
            alt="rider"
          />
          <div>
            <h2 className="text-lg font-bold text-zinc-900">
              {userName}
            </h2>
            <p className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest">
              Verified Rider
            </p>
          </div>
        </div>
        <div className="text-right">
          <p className="text-lg font-black text-zinc-900 leading-none">
            {fare}
          </p>
          <p className="text-[10px] font-bold text-zinc-500 uppercase mt-1">
            Final Fare
          </p>
        </div>
      </div>

      {/* Trip Stats */}
      <div className="grid grid-cols-3 gap-4 mb-10 px-1">
        <div className="text-center border-r border-zinc-100">
          <i className="ri-map-pin-time-line text-xl text-zinc-400"></i>
          <p className="text-[10px] font-bold text-zinc-400 uppercase mt-1">
            Time
          </p>
          <p className="text-sm font-black text-zinc-900">
            {durationMin}
          </p>
        </div>
        <div className="text-center border-r border-zinc-100">
          <i className="ri-route-line text-xl text-zinc-400"></i>
          <p className="text-[10px] font-bold text-zinc-400 uppercase mt-1">
            Distance
          </p>
          <p className="text-sm font-black text-zinc-900">
            {distanceKm}
          </p>
        </div>
        <div className="text-center">
          <i className="ri-wallet-3-line text-xl text-zinc-400"></i>
          <p className="text-[10px] font-bold text-zinc-400 uppercase mt-1">
            Method
          </p>
          <p className="text-sm font-black text-zinc-900">
            Cash
          </p>
        </div>
      </div>

      {/* Journey Detail */}
      <div className="space-y-6 mb-10 px-1">
        <div className="flex items-start gap-4">
          <i className="ri-record-circle-fill text-zinc-500 mt-1"></i>
          <div>
            <p className="text-[10px] font-black text-zinc-300 uppercase tracking-widest">
              Pickup
            </p>
            <p className="text-sm font-medium text-zinc-600">
              {pickup}
            </p>
          </div>
        </div>
        <div className="flex items-start gap-4">
          <i className="ri-map-pin-2-fill text-zinc-900 mt-1"></i>
          <div>
            <p className="text-[10px] font-black text-zinc-300 uppercase tracking-widest">
              Dropped At
            </p>
            <p className="text-sm font-semibold text-zinc-900">
              {destination}
            </p>
          </div>
        </div>
      </div>

      {/* Action Section */}
      <div className="">
        <p className="text-xs text-center text-zinc-400 mb-6 font-medium">
          Click finish only after collecting the cash from the rider.
        </p>

        {error && (
          <p className="text-xs text-center text-red-600 mb-3 font-semibold">
            {error}
          </p>
        )}

        <button
          type="button"
          disabled={isFinishing}
          onClick={handleFinish}
          className={`w-full py-5 rounded-[22px] font-black text-sm uppercase tracking-[0.2em] shadow-xl active:scale-95 transition-all flex items-center justify-center ${
            isFinishing
              ? 'bg-zinc-300 text-zinc-600 cursor-not-allowed'
              : 'bg-black text-white'
          }`}
        >
          {isFinishing ? 'Finishing...' : 'Finish Ride'}
        </button>
      </div>

    </div>
  )
}

export default FinishRide
