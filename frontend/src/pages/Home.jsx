import React, { useRef, useState } from 'react'
import axios from 'axios'
import logo from '../assets/logo.png'; // Import the logo
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import 'remixicon/fonts/remixicon.css'
import LocationPanal from '../components/LocationPanal';
import VehiclePanal from '../components/VehiclePanal';
import ConfirmRide from '../components/ConfirmRide';
import LookingForDriver from '../components/LookingForDriver';
import WaitForDriver from '../components/WaitForDriver';

const Home = () => {
  const [pickup, setPickup] = useState('')
  const [destination, setDestination] = useState('')
  const [panalOpen, setPanalOpen] = useState(false)
  const [activeField, setActiveField] = useState(null) // 'pickup' | 'destination'
  const [suggestions, setSuggestions] = useState([])
  const [selectedVehicle, setSelectedVehicle] = useState(null)
  const panelRef = useRef(null)
  const vehiclePanalRef = useRef(null)
  const ConfirmRidePanalRef = useRef(null)
  const LookingForDriverPanalRef = useRef(null)
  const WaitForDriverPanalRef = useRef(null)
  const [vehiclePanalOpen, setVehiclePanalOpen] = useState(false)
  const [ConfirmRidePanal, setConfirmRidePanal] = useState(false)
  const [LookingForDriverPanal, setLookingForDriverPanal] = useState(false)
  const [WaitForDriverPanal, setWaitForDriverPanal] = useState(false)
  
  const submitHandler = (e) => {
    e.preventDefault();
  }

  const debounceRef = useRef(null)

  const fetchSuggestions = async (input) => {
    if (!input || input.length < 3) {
      setSuggestions([])
      return
    }
    try {
      const res = await axios.get('http://localhost:4000/maps/get-suggestions', {
        params: { input },
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        },
          withCredentials: true
      })
      setSuggestions(res.data || [])
    } catch (error) {
      console.error('suggestions error', error)
      setSuggestions([])
    }
  }

  useGSAP(() => {
    if (panalOpen) {
      gsap.to(panelRef.current, {
        height: "70%",
        duration: 0.5,
        ease: "power2.out",
        padding: 24
      });

      gsap.to(".icon", {
        opacity: 1,
        duration: 0.3,
        pointerEvents: "auto",
        onStart: () => {
          document.querySelector(".icon").classList.remove("hidden");
        }
      });

    } else {
      gsap.to(panelRef.current, {
        height: "0%",
        duration: 0.5,
        ease: "power2.in",
        padding: 0

      });

      gsap.to(".icon", {
        opacity: 0,
        duration: 0.3,
        pointerEvents: "none",
        onComplete: () => {
          document.querySelector(".icon").classList.add("hidden");
        }
      });
    }
  }, [panalOpen]);

  useGSAP(() => {
    if (vehiclePanalOpen) {
      gsap.to(vehiclePanalRef.current, {
        transform: 'translateY(0%)',
        duration: 0.5,
        ease: "power2.out"
      })
    } else {
      gsap.to(vehiclePanalRef.current, {
        transform: 'translateY(100%)',
        duration: 0.5,
        ease: "power2.out"
      })
    }
  }, [vehiclePanalOpen]);
  useGSAP(() => {
    if (ConfirmRidePanal) {
      gsap.to(ConfirmRidePanalRef.current, {
        transform: 'translateY(0%)',
        duration: 0.5,
        ease: "power2.out"
      })
    } else {
      gsap.to(ConfirmRidePanalRef.current, {
        transform: 'translateY(100%)',
        duration: 0.5,
        ease: "power2.out"
      })
    }
  }, [ConfirmRidePanal]);
  useGSAP(() => {
    if (LookingForDriverPanal) {
      gsap.to(LookingForDriverPanalRef.current, {
        transform: 'translateY(0%)',
        duration: 0.5,
        ease: "power2.out"
      })
    } else {
      gsap.to(LookingForDriverPanalRef.current, {
        transform: 'translateY(100%)',
        duration: 0.5,
        ease: "power2.out"
      })
    }
  }, [LookingForDriverPanal]);
  useGSAP(() => {
    if (WaitForDriverPanal) {
      gsap.to(WaitForDriverPanalRef.current, {
        transform: 'translateY(0%)',
        duration: 0.5,
        ease: "power2.out"
      })
    } else {
      gsap.to(WaitForDriverPanalRef.current, {
        transform: 'translateY(100%)',
        duration: 0.5,
        ease: "power2.out"
      })
    }
  }, [WaitForDriverPanal]);

  return (
    <div className='h-screen relative overflow-hidden'>
      <img className='w-32 rounded-2xl left-5 top-5 absolute' src={logo} alt="QuickRide Logo" />
      <div className='h-screen w-screen'>
        <img className='h-full w-full object-cover' src="https://storage.googleapis.com/support-forums-api/attachment/thread-146048858-12639125651610213305.PNG" alt="" />
      </div>
      <div className=' flex flex-col justify-end h-screen absolute top-0  w-full '>

        <div className='h-[30%] p-5 bg-white relative'>
          <div className='flex items-center gap-2'>
            <h5
              className="icon opacity-0 hidden cursor-pointer text-xl"
              onClick={() => setPanalOpen(false)}
            >
              <i className="ri-arrow-down-s-line"></i>
            </h5>
            <h4 className='text-2xl font-semibold'>Find a Trip</h4></div>
          <form onSubmit={(e) => {
            submitHandler(e);
          }} action="">
            <div className="line absolute h-16 w-1 top-[46%] left-10 bg-gray-700 rounded-full"></div>
            <input
              onClick={() => {
                setPanalOpen(true)
                setActiveField('pickup')
              }}
              value={pickup}
              onChange={(e) => {
                setPickup(e.target.value)
                // debounce suggestions
                clearTimeout(debounceRef.current)
                debounceRef.current = setTimeout(() => fetchSuggestions(e.target.value), 350)
              }
              }
              className='bg-[#eee] px-12 py-2 placeholder:text-gray-500 text-lg rounded-lg w-full mt-5' type="text" placeholder='Add a Pick-up Location' />
            <input
              onClick={() => {
                setPanalOpen(true)
                setActiveField('destination')
              }}
              value={destination}
              onChange={(e) => {
                setDestination(e.target.value)
                clearTimeout(debounceRef.current)
                debounceRef.current = setTimeout(() => fetchSuggestions(e.target.value), 350)
              }
              }
              className='bg-[#eee] placeholder:text-gray-500 px-12 w-full py-2 mt-3 text-lg rounded-lg' type="text" placeholder='Enter your Destination' />
            <div className='mt-7'>
              <button
                type="button"
                disabled={!pickup || !destination}
                onClick={() => {
                  if (pickup && destination) {
                    setVehiclePanalOpen(true)
                    setPanalOpen(false) 
                  }
                }}
                className={`w-full py-3 rounded-lg text-lg ${pickup && destination ? 'bg-black text-white' : 'bg-gray-300 text-gray-600 cursor-not-allowed'}`}
              >
                Choose Vehicle
              </button>
            </div>
          </form>
        </div>
        <div ref={panelRef} className=' bg-white h-0'>
          <LocationPanal
            setPanal={setPanalOpen}
            setVehiclePanal={setVehiclePanalOpen}
            suggestions={suggestions}
            onSelect={(value) => {
              if (activeField === 'pickup') setPickup(value)
              else if (activeField === 'destination') setDestination(value)
              setSuggestions([])
            }}
          />
        </div>
      </div>
      <div ref={vehiclePanalRef} className='fixed pt-12 w-full z-10 bottom-0 translate-y-full bg-white px-3 py-10'>
        <VehiclePanal setConfirmRidePanal={setConfirmRidePanal} setVehiclePanalOpen={setVehiclePanalOpen} selectedVehicle={selectedVehicle} setSelectedVehicle={setSelectedVehicle} pickup={pickup} destination={destination} />
      </div>
      <div ref={ConfirmRidePanalRef} className='fixed pt-7 w-full z-10 bottom-0 translate-y-full bg-white px-3 py-6'>
        <ConfirmRide setConfirmRidePanal={setConfirmRidePanal} setLookingForDriverPanal={setLookingForDriverPanal} />
      </div>
      <div ref={LookingForDriverPanalRef} className='fixed pt-7 w-full z-10 bottom-0 translate-y-full bg-white px-3 py-6'>
        <LookingForDriver setLookingForDriverPanal={setLookingForDriverPanal} />
      </div>
      <div ref={WaitForDriverPanalRef} className='fixed pt-7 w-full z-10 bottom-0 translate-y-full bg-white px-3 py-6'>
        <WaitForDriver WaitForDriverPanal={WaitForDriverPanal} />
      </div>
    </div>
  )
}

export default Home
