import React, { useContext } from 'react'
import { CaptainDataContext } from '../context/CaptainContext'
import car from '../assets/car.png'

const CaptainDetails = () => {
    const { captain } = useContext(CaptainDataContext)
  
    // Fallback data if captain context is not available
    const driverName = captain 
      ? `${captain.fullname?.firstname || ''} ${captain.fullname?.lastname || ''}`.trim()
      : 'Sarthak Sharma'
    const vehiclePlate = captain?.vehicle?.plate || 'RJ 14 CP 1234'
    const vehicleType = captain?.vehicle?.vehicleType
    const vehicleColor = captain?.vehicle?.color || 'White' 
    const vehicleCapacity = captain?.vehicle?.capacity || 4
    const driverRating = 4.8
    return (
        <div>
            {/* Pull Bar */}
            <div className="w-12 h-1 bg-zinc-200 rounded-full mx-auto mt-3 mb-4"></div>

            {/* Driver & Vehicle Info Section */}
            <div className="px-6 mb-4">
                <div className="bg-gradient-to-r from-zinc-50 to-zinc-100 rounded-2xl p-4">
                    <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center gap-3">
                            <div className="relative">
                                <img
                                    className="h-12 w-12 rounded-xl object-cover"
                                    src="https://plus.unsplash.com/premium_photo-1689539137236-b68e436248de?q=80&w=150&h=150&auto=format&fit=crop"
                                    alt="driver"
                                />
                                <div className="absolute -bottom-0.5 -right-0.5 h-3 w-3 bg-blue-500 rounded-full border-2 border-white"></div>
                            </div>
                            <div>
                                <h3 className="text-lg font-semibold text-zinc-900">
                                    {driverName}
                                </h3>
                                <div className="flex items-center gap-1 mt-0.5">
                                    <i className="ri-star-fill text-yellow-500 text-xs"></i>
                                    <span className="text-xs text-zinc-600 font-medium">{driverRating}</span>
                                    <span className="text-xs text-zinc-400">• {vehiclePlate}</span>
                                </div>
                            </div>
                        </div>
                        <div className="text-right">
                            <img
                                className="h-18 w-18 object-contain"
                                src={car}
                                alt="vehicle"
                            />
                            <p className="text-[10px] text-zinc-500 mt-1 capitalize">
                                {vehicleType}
                            </p>
                        </div>
                    </div>

                    {/* Vehicle Details */}
                    <div className="flex items-center gap-4 pt-3 border-t border-zinc-200">
                        <div className="flex items-center gap-2">
                            <i className="ri-palette-line text-zinc-400 text-sm"></i>
                            <span className="text-xs text-zinc-600">{vehicleColor}</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <i className="ri-group-line text-zinc-400 text-sm"></i>
                            <span className="text-xs text-zinc-600">{vehicleCapacity} Seats</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <i className="ri-car-line text-zinc-400 text-sm"></i>
                            <span className="text-xs text-zinc-600 capitalize">{vehicleType}</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Earnings/Stats Card */}
            <div className="px-2 pb-4">
                <div className="bg-zinc-50 rounded-2xl p-4">
                    <div className="grid grid-cols-3 gap-4">
                        <div className="text-center">
                            <p className="text-xs text-zinc-500 uppercase mb-1">Total Earnings</p>
                            <p className="text-2xl font-bold text-zinc-900">₹1,245</p>
                        </div>
                        <div className="text-center">
                            <p className="text-xs text-zinc-500 uppercase mb-1">Total Trips</p>
                            <p className="text-2xl font-bold text-zinc-900">12</p>
                        </div>
                        <div className="text-center">
                            <p className="text-xs text-zinc-500 uppercase mb-1">Hours Online</p>
                            <p className="text-2xl font-bold text-zinc-900">10</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Bottom Safe Area */}
            <div className="h-4"></div>
        </div>
    )
}

export default CaptainDetails
