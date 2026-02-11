import React from 'react'
import car from '../assets/car.png'

const ConfirmRide = (props) => {
  return (
    <div className="relative px-3 pt-6">
 
      {/* Centered Close Button (moved up) */}
      <div
        onClick={() => props.setConfirmRidePanal(false)}
        className="absolute -top-3 left-1/2 -translate-x-1/2"
      >
        <i className="text-3xl text-gray-400 ri-arrow-down-wide-fill"></i>
      </div>


      <h3 className="text-2xl text-center font-semibold mb-2">
        Confirm Ride
      </h3>

      <div className="flex flex-col items-center gap-3">

        {/* Vehicle Image */}
        <img className="h-20 object-contain" src={car} alt="car" />

        {/* Smaller Panel, Bigger Text */}
        <div className="w-full bg-white rounded-xl px-4 py-3 space-y-3 shadow-sm">

          {/* Pickup */}
          <div className="flex items-start gap-3">
            <i className="text-xl ri-map-pin-line mt-0.5 text-gray-600"></i>
            <div>
              <h3 className="text-lg font-medium">245/11-A</h3>
              <p className="text-sm text-gray-600 leading-tight">
                Vasundhara Colony, Manipal University Jaipur
              </p>
            </div>
          </div>

          <div className="h-px bg-gray-200" />

          {/* Drop */}
          <div className="flex items-start gap-3">
            <i className="text-xl ri-map-pin-2-fill mt-0.5 text-gray-600"></i>
            <div>
              <h3 className="text-lg font-medium">242/13-B</h3>
              <p className="text-sm text-gray-600 leading-tight">
                Mahesh Nagar, Jaipur Rajasthan
              </p>
            </div>
          </div>

          {/* Separator */}
          <div className="border-t border-dashed border-gray-300" />

          {/* Payment */}
          <div className="flex items-center gap-3 pt-1">
            <i className="text-xl ri-money-rupee-circle-fill text-emerald-600"></i>
            <div>
              <h3 className="text-lg font-semibold">₹ 215.6</h3>
              <p className="text-sm text-gray-600">Cash</p>
            </div>
          </div>

        </div>

        {/* Confirm Button */}
        <button onClick={()=>{ props.setLookingForDriverPanal(true); props.setConfirmRidePanal(false)}} className="w-full bg-black text-white text-lg font-medium py-2.5 rounded-xl mt-1 active:scale-[0.97] transition">
          Confirm Ride
        </button>

      </div>
    </div>
  )
}

export default ConfirmRide
