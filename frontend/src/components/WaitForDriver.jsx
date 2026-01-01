import React from 'react'
import car from '../assets/car.png'

const WaitForDriver = (props) => {
  return (
    <div className="relative px-4 py-6 bg-white rounded-t-3xl">

      {/* Arriving & OTP Section with Boxes */}
      <div className="flex items-center justify-between mb-4">
        {/* Arriving Box */}
        <div className="bg-gray-50 border border-gray-100 px-4 py-2 rounded-xl">
          <h1 className="text-2xl font-black text-gray-900 leading-none">4 min</h1>
          <p className="text-emerald-600 font-semibold text-xs tracking-tight">Arriving soon</p>
        </div>
        
        {/* OTP Box */}
        <div className="bg-gray-50 border border-gray-100 px-4 py-2 rounded-xl text-center">
           <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">OTP</p>
           <p className="text-2xl font-mono font-black text-gray-900 leading-none">4412</p>
        </div>
      </div>

      {/* Driver & Vehicle Summary */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-4">
          {/* Driver Photo */}
          <div className="relative">
            <img 
              className="h-16 w-16 rounded-full object-cover border-2 border-emerald-500 p-0.5" 
              src="https://plus.unsplash.com/premium_photo-1689539137236-b68e436248de?q=80&w=150&h=150&auto=format&fit=crop" 
              alt="Driver" 
            />
            <span className="absolute bottom-0 right-0 bg-emerald-500 text-white text-[10px] px-1.5 rounded-full border-2 border-white">
              4.8 ★
            </span>
          </div>
          <div>
            <h2 className="text-xl font-bold text-gray-800">Sarthak Sharma</h2>
            <p className="text-sm font-semibold text-gray-500 tracking-wide uppercase">White Suzuki Swift</p>
            <p className="text-xs text-gray-400">RJ-14-CP-1234</p>
          </div>
        </div>
        
        {/* Car Image (Compact) */}
        <img className="h-14 object-contain" src={car} alt="car" />
      </div>

      <div className="h-px bg-gray-100 mb-6" />

      {/* Ride Details Card */}
      <div className="space-y-5">
        
        {/* Pickup */}
        <div className="flex items-start gap-4">
          <div className="flex flex-col items-center mt-1">
            <i className="ri-record-circle-line text-blue-600"></i>
            <div className="w-0.5 h-10 bg-gray-100 my-1"></div>
          </div>
          <div className="flex-1">
            <h3 className="text-sm font-semibold text-gray-400 uppercase tracking-tight">Pickup</h3>
            <p className="text-md font-medium leading-snug">245/11-A, Vasundhara Colony, MUJ</p>
          </div>
        </div>

        {/* Drop */}
        <div className="flex items-start gap-4">
          <i className="ri-map-pin-2-fill text-emerald-600 mt-1"></i>
          <div className="flex-1">
            <h3 className="text-sm font-semibold text-gray-400 uppercase tracking-tight">Drop-off</h3>
            <p className="text-md font-medium leading-snug">242/13-B, Mahesh Nagar, Jaipur</p>
          </div>
        </div>

        {/* Payment */}
        <div className="flex items-center justify-between bg-gray-50 p-4 rounded-2xl">
          <div className="flex items-center gap-3">
            <i className="text-2xl ri-money-rupee-circle-fill text-emerald-600"></i>
            <div>
              <p className="text-lg font-bold">₹215.60</p>
              <p className="text-xs text-gray-500">Payment</p>
            </div>
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex gap-3 mt-6">
        <button className="flex-1 bg-gray-100 text-gray-800 py-3 rounded-xl font-bold flex items-center justify-center gap-2 active:scale-95 transition-all">
          <i className="ri-chat-3-line"></i> Message
        </button>
        <button className="flex-1 bg-black text-white py-3 rounded-xl font-bold flex items-center justify-center gap-2 active:scale-95 transition-all">
          <i className="ri-phone-fill"></i> Call Driver
        </button>
      </div>
    </div>
  )
}

export default WaitForDriver