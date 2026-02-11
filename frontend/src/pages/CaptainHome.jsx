import React, { useState, useContext, useRef } from 'react'
import { Link } from 'react-router-dom'
import 'remixicon/fonts/remixicon.css'
import logo from '../assets/logo.png'
import CaptainDetails from '../components/CaptainDetails'
import WaitForDriver from '../components/WaitForDriver'
import RidePopUp from '../components/RidePopUp'
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import ConfirmRidePopUp from '../components/ConfirmRidePopUp'
 
const CaptainHome = () => {
 
  const RidePopUpPanalRef = useRef(null)
  const ConfirmRidePopUpPanalRef = useRef(null)
  const [RidePopUpPanal, setRidePopUpPanal] = useState(false)
  const [ConfirmRidePopUpPanal, setConfirmRidePopUpPanal] = useState(false)

  useGSAP(() => {
    if (RidePopUpPanal) {
      gsap.to(RidePopUpPanalRef.current,{
             transform:'translateY(0%)',
             duration:0.5,
             ease:"power2.out"
     })
    }else{
      gsap.to(RidePopUpPanalRef.current,{
             transform:'translateY(100%)',
             duration:0.5,
             ease:"power2.out"
     })
    }
}, [RidePopUpPanal]);
  useGSAP(() => {
    if (ConfirmRidePopUpPanal) {
      gsap.to(ConfirmRidePopUpPanalRef.current,{
             transform:'translateY(0%)',
             duration:0.5,
             ease:"power2.out"
     })
    }else{
      gsap.to(ConfirmRidePopUpPanalRef.current,{
             transform:'translateY(100%)',
             duration:0.5,
             ease:"power2.out"
     })
    }
}, [ConfirmRidePopUpPanal]);

  return (
    <div className="h-screen bg-zinc-50 overflow-hidden relative">
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
        <div className="absolute bottom-0 left-0 right-0 bg-white rounded-t-[32px] shadow-[0_-4px_20px_rgba(0,0,0,0.1)]">
          <CaptainDetails />
        </div>
        <div ref={RidePopUpPanalRef} className='fixed pt-5 w-full z-10 bottom-0 translate-y-full rounded-t-[32px] bg-white px-3 py-6'>
          <RidePopUp setRidePopUpPanal={setRidePopUpPanal} setConfirmRidePopUpPanal={setConfirmRidePopUpPanal}/>
        </div>
        <div ref={ConfirmRidePopUpPanalRef} className='fixed pt-5 w-full z-10 bottom-0 translate-y-full rounded-t-[32px] bg-white px-3 py-6'>
          <ConfirmRidePopUp setRidePopUpPanal={setRidePopUpPanal} setConfirmRidePopUpPanal={setConfirmRidePopUpPanal} />
        </div>
      </div>
    </div> 
  )
}

export default CaptainHome
