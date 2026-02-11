import React from 'react'
import 'remixicon/fonts/remixicon.css'

const RidePopUp = (props,onAccept,onIgnore,rideRequest) => {
  // Sample data - replace with actual props
  const user = rideRequest?.user || {
    name: 'Rajesh Kumar',
    rating: 4.7,
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=150&h=150&auto=format&fit=crop'
  }
  
  const pickup = rideRequest?.pickup || {
    address: 'Vasundhara Colony, MUJ',
    fullAddress: '245/11-A, Vasundhara Colony, Manipal University Jaipur'
  }
  
  const destination = rideRequest?.destination || {
    address: 'Mahesh Nagar, Jaipur',
    fullAddress: '242/13-B, Mahesh Nagar, Jaipur, Rajasthan'
  }
  
  const fare = rideRequest?.fare || 215.60
  const distance = rideRequest?.distance || '4.2 km'
  const duration = rideRequest?.duration || '12 min'

  return (
    <div className=" ">
      {/* Pull Bar */}
      <div onClick={() => props.setRidePopUpPanal(false)} className="w-12 h-1 bg-zinc-200 rounded-full mx-auto mt-1 mb-5"></div>

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
              New ride request
            </p>
          </div>
          <div className="text-right">
            <div className="bg-zinc-100 rounded-xl px-3 py-2">
              <p className="text-xs text-zinc-500 uppercase mb-0.5">Fare</p>
              <p className="text-xl font-bold text-zinc-900">₹{fare}</p>
            </div>
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
                Destination
              </p>
              <p className="text-sm font-semibold text-zinc-900">
                {destination.address}
              </p>
              <p className="text-xs text-zinc-500 mt-0.5">
                {destination.fullAddress}
              </p>
            </div>
          </div>

          {/* Distance & Duration */}
          <div className="flex items-center gap-4 pt-4 mt-4 border-t border-zinc-200">
            <div className="flex items-center gap-2">
              <i className="ri-road-map-line text-zinc-400 text-lg"></i>
              <span className="text-base text-zinc-900 font-semibold">{distance}</span>
            </div>
            <div className="flex items-center gap-2">
              <i className="ri-time-line text-zinc-400 text-lg"></i>
              <span className="text-base text-zinc-900 font-semibold">{duration}</span>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-3">
          <button
            onClick={()=>
                props.setRidePopUpPanal(false)
            }
            className="flex-1 bg-zinc-100 text-zinc-700 py-4 rounded-2xl font-semibold text-sm shadow-sm active:scale-[0.97] transition hover:bg-zinc-200"
          >
            Ignore
          </button>
          <button
            onClick={()=>props.setConfirmRidePopUpPanal(true)}
            className="flex-1 bg-black text-white py-4 rounded-2xl font-semibold text-sm shadow-lg active:scale-[0.97] transition hover:bg-zinc-800"
          >
            Accept
          </button>
        </div>
      </div>
    </div>
  )
}

export default RidePopUp
