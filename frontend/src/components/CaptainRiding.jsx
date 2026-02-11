import React, { useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import logo from '../assets/logo.png'
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import FinishRide from './FinishRide';

const CaptainRiding = () => {
   const FinishRidePanalRef = useRef(null)
   const [FinishRidePanal, setFinishRidePanal] = useState(false)
 useGSAP(() => {
    if (FinishRidePanal) {
      gsap.to(FinishRidePanalRef.current,{
             transform:'translateY(0%)',
             duration:0.5,
             ease:"power2.out"
     })
    }else{
      gsap.to(FinishRidePanalRef.current,{
             transform:'translateY(100%)',
             duration:0.5,
             ease:"power2.out"
     })
    }
}, [FinishRidePanal]);
  return (
    <div className="h-screen ">
      {/* Full Screen Map */}
      <div className="h-full w-full relative">
        <img
          className="h-[70%] w-full object-cover"
          src="https://miro.medium.com/v2/resize:fit:1400/0*gwMx05pqII5hbfmX.gif"
          alt="map"
        />

        {/* Logo */}

        {/* Top Bar - Menu and Logout */}
        <div className="absolute top-0 left-0 right-0 mt-3 flex items-center justify-between px-4 pt-2 pb-4">
          {/* Menu Button */}
          <div><img className="w-32 rounded-2xl left-5 top-2 absolute z-10" src={logo} alt="QuickRide Logo" /></div>
          {/* Logout Button */}
          <Link
            to="/captain/logout"
            className="h-12 w-12 bg-white rounded-full flex items-center justify-center shadow-lg hover:bg-zinc-50 transition-colors"
          >
            <i className="ri-logout-box-line text-xl text-zinc-900 transform scale-x-[-1]"></i>
          </Link>
        </div>

        {/* Bottom Section - Status Toggle and Info */}
        {/* Bottom Section - Ride Status */}
        <div className="h-[30%] bg-white rounded-t-3xl px-6 py-5 shadow-[0_-12px_30px_rgba(0,0,0,0.15)] flex flex-col justify-between">

          {/* Pull Bar */}
          <div onClick={()=>{
            setFinishRidePanal(true)
          }} className="w-12 h-1 bg-zinc-300 rounded-full mx-auto" />

          {/* Distance Info */}
          <div className="flex items-center justify-between mt-1">
            <div>
              <p className="text-xs text-zinc-500 uppercase tracking-wide">
                Distance to Drop
              </p>
              <h3 className="text-2xl font-semibold text-zinc-900">
                4 km
              </h3>
            </div>

            <div className="text-right">
              <p className="text-xs text-zinc-500 uppercase tracking-wide">
                ETA
              </p>
              <h3 className="text-2xl font-semibold text-zinc-900">
                8 min
              </h3>
            </div>
          </div>

          {/* Complete Ride Button */}
          <button onClick={()=>{
            setFinishRidePanal(true)
          }} className="w-full bg-black text-white py-4 rounded-2xl font-semibold text-base active:scale-[0.97] transition">
            Complete Ride
          </button>

        </div>

      </div>
      <div ref={FinishRidePanalRef} className='fixed  w-full z-10 bottom-0 translate-y-full rounded-t-[32px] bg-white px-3 py-6'>
          <FinishRide />
        </div>
    </div>
  )
}

export default CaptainRiding
