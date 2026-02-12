import React, { useEffect, useState } from 'react'
import axios from 'axios'

const VehiclePanal = (props) => {
  const [fares, setFares] = useState({
    car: '₹---',
    auto: '₹---',
    moto: '₹---'
  })
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (props.pickup && props.destination) {
      fetchFares()
    }
  }, [props.pickup, props.destination])

  const fetchFares = async () => {
    setLoading(true)
    try {
      const res = await axios.get('http://localhost:4000/rides/get-fare', {
        params: {
          pickup: props.pickup,
          destination: props.destination
        },
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        },
        withCredentials: true
      })
      // res.data has { auto, car, moto } with prices
      const fareData = res.data
      setFares({
        car: `₹${fareData.car}`,
        auto: `₹${fareData.auto}`,
        moto: `₹${fareData.moto}`
      })
    } catch (error) {
      console.error('fare error', error)
      setFares({
        car: '₹---',
        auto: '₹---',
        moto: '₹---'
      })
    } finally {
      setLoading(false)
    }
  }

  return (
    <div>
      <h5 onClick={()=>{ 
          props.setVehiclePanalOpen(false);
        }} className='p-1 text-center w-[93%] absolute top-0 '>
          <i className="text-3xl text-gray-500 ri-arrow-down-wide-fill"></i></h5>
        <h3 className='text-2xl font-semibold mb-5'>Select a Vehicle</h3>
        <div onClick={() =>{ props.setSelectedVehicle(0);
          props.setConfirmRidePanal(true)}} className={`flex border-2 active:border-black mb-2 rounded-2xl w-full p-3 items-center justify-between ${props.selectedVehicle === 0 ? 'border-black' : 'border-gray-200'}`}>
          <img className='h-12' src="https://www.pngplay.com/wp-content/uploads/8/Uber-PNG-Photos.png" alt="" />
          <div className=' w-[1/2] mr-10'>
            <h4 className='font-medium text-sm'>QuickGo <span><i className="ri-user-fill">4</i></span></h4>
            <h5 className='font-medium text-sm'>2 mins away</h5>
            <p className='font-normal text-xs text-gray-600'>Affordable, compact rides</p>
          </div>
          <h2 className='text-xl font-semibold'>{fares.car}</h2>
        </div>
        <div onClick={() =>{ props.setSelectedVehicle(1);
          props.setConfirmRidePanal(true)}} className={`flex border-2 active:border-black mb-2 rounded-2xl w-full p-3 items-center justify-between ${props.selectedVehicle === 1 ? 'border-black' : 'border-gray-200'}`}>
          <img className='h-12' src="https://cn-geo1.uber.com/image-proc/crop/resizecrop/udam/format=auto/width=552/height=368/srcb64=aHR0cHM6Ly90Yi1zdGF0aWMudWJlci5jb20vcHJvZC91ZGFtLWFzc2V0cy8xZGRiOGM1Ni0wMjA0LTRjZTQtODFjZS01NmExMWEwN2ZlOTgucG5n" alt="" />
          <div className=' w-[1/2] mr-4'>
            <h4 className='font-medium text-sm'>Auto <span><i className="ri-user-fill">3</i></span></h4>
            <h5 className='font-medium text-sm'>3 mins away</h5>
            <p className='font-normal text-xs text-gray-600'>Affordable, compact rides</p>
          </div>
          <h2 className='text-xl font-semibold'>{fares.auto}</h2>
        </div>
        <div onClick={() =>{ props.setSelectedVehicle(2);
          props.setConfirmRidePanal(true)}} className={`flex border-2 active:border-black mb-2 rounded-2xl w-full p-3 items-center justify-between ${props.selectedVehicle === 2 ? 'border-black' : 'border-gray-200'}`}>
          <img className='h-12' src="https://cn-geo1.uber.com/image-proc/crop/resizecrop/udam/format=auto/width=552/height=368/srcb64=aHR0cHM6Ly90Yi1zdGF0aWMudWJlci5jb20vcHJvZC91ZGFtLWFzc2V0cy8yYzdmYTE5NC1jOTU0LTQ5YjItOWM2ZC1hM2I4NjAxMzcwZjUucG5n" alt="" />
          <div className=' w-[1/2] mr-8'>
            <h4 className='font-medium text-sm'>Bike <span><i className="ri-user-fill">2</i></span></h4>
            <h5 className='font-medium text-sm'>1 mins away</h5>
            <p className='font-normal text-xs text-gray-600'>Affordable, compact rides</p>
          </div>
          <h2 className='text-xl font-semibold'>{fares.moto}</h2>
        </div>
    </div>
  )
}

export default VehiclePanal
