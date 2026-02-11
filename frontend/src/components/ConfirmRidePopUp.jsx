import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import 'remixicon/fonts/remixicon.css'

const ConfirmRidePopUp = ({ rideData, setConfirmRidePopUpPanal, onCancel, onNavigate }) => {
  const [otp, setOtp] = useState('')

  // Sample data - replace with actual props
  const user = rideData?.user || {
    name: 'Rajesh Kumar',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=150&h=150&auto=format&fit=crop',
    phone: '+91 98765 43210'
  }

  const pickup = rideData?.pickup || {
    address: 'Vasundhara Colony, MUJ',
    fullAddress: '245/11-A, Vasundhara Colony, Manipal University Jaipur'
  }

  const destination = rideData?.destination || {
    address: 'Mahesh Nagar, Jaipur',
    fullAddress: '242/13-B, Mahesh Nagar, Jaipur, Rajasthan'
  }

  const fare = rideData?.fare || 215.60
  const distance = rideData?.distance || '4.2 km'
  const duration = rideData?.duration || '12 min'

  const submitHandler = (e) => {
    e.preventDefault()
    console.log("OTP Submitted:", otp)
  }

  return (
    <div className='pt-3'>
      <div className="px-5 pb-6">
        {/* User Info Section */}
        <div className="flex items-center gap-4 mb-5">
          <div className="relative">
            <img
              className="h-16 w-16 rounded-2xl object-cover"
              src={user.image}
              alt={user.name}
            />
          </div>
          <div className="flex-1">
            <h3 className="text-lg font-semibold text-zinc-900">
              {user.name}
            </h3>
            <p className="text-sm text-zinc-500 mt-0.5">
              Ride confirmed
            </p>
          </div>
          <div className="text-right">
            <div className="bg-zinc-100 rounded-xl px-3 py-2">
              <p className="text-xs text-zinc-500 uppercase mb-0.5">Fare</p>
              <p className="text-xl font-bold text-zinc-900">₹{fare}</p>
            </div>
          </div>
        </div>

        {/* Distance */}
        <div className="bg-blue-50 rounded-xl px-4 py-3 mb-5">
          <div className="flex items-center justify-center gap-3">
            <i className="ri-road-map-line text-blue-600 text-lg"></i>
            <span className="text-base text-blue-900 font-semibold">{distance}</span>
            <span className="text-blue-400">•</span>
            <i className="ri-time-line text-blue-600 text-lg"></i>
            <span className="text-base text-blue-900 font-semibold">{duration}</span>
          </div>
        </div>

        {/* Locations Section */}
        <div className="bg-zinc-50 rounded-2xl p-4 mb-5">
          {/* Pickup */}
          <div className="flex items-start gap-3 mb-4">
            <div className="mt-0.5">
              <div className="h-3 w-3 rounded-full bg-blue-500 border-2 border-white shadow-sm"></div>
              <div className="h-8 w-0.5 bg-zinc-300 mx-auto mt-1"></div>
            </div>
            <div className="flex-1">
              <p className="text-[11px] font-medium text-zinc-400 uppercase mb-1">
                Pickup
              </p>
              <p className="text-sm font-semibold text-zinc-900">
                {pickup.address}
              </p>
              <p className="text-xs text-zinc-500 mt-0.5">
                {pickup.fullAddress}
              </p>
            </div>
          </div>

          {/* Destination */}
          <div className="flex items-start gap-3">
            <div className="mt-0.5">
              <i className="ri-map-pin-2-fill text-xl text-zinc-700"></i>
            </div>
            <div className="flex-1">
              <p className="text-[11px] font-medium text-zinc-400 uppercase mb-1">
                Drop
              </p>
              <p className="text-sm font-semibold text-zinc-900">
                {destination.address}
              </p>
              <p className="text-xs text-zinc-500 mt-0.5">
                {destination.fullAddress}
              </p>
            </div>
          </div> 
        </div>

        {/* OTP Input Form */}
        <form onSubmit={(e) => submitHandler(e)}>
          <input
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
            type="text"
            placeholder="Enter OTP"
            className="bg-zinc-100 px-6 py-4 text-lg font-mono rounded-2xl w-full mb-5 focus:outline-none focus:ring-2 focus:ring-zinc-300"
          />

          {/* Action Buttons */}
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={onCancel || (() => { setConfirmRidePopUpPanal(false) })}
              className="flex-1 bg-zinc-200 text-zinc-700 py-4 rounded-2xl font-semibold text-sm active:scale-[0.97] transition hover:bg-zinc-300"
            >
              Cancel
            </button>
            <Link
              to="/captain-riding"
              className="flex-1 bg-black text-white py-4 rounded-2xl font-semibold text-sm active:scale-[0.97] transition hover:bg-zinc-800 text-center"
            >
              Go to PickUp
            </Link>
          </div>
        </form>
      </div>
    </div>
  )
}

export default ConfirmRidePopUp