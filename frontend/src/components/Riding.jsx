import React from 'react'
import car from '../assets/car.png'
import { Link } from 'react-router-dom'

const Riding = () => {
    return (
        <div className="h-screen bg-zinc-50 overflow-hidden">

            {/* Map Section */}
            <div className="h-[55%] w-full relative">
                <img
                    className="h-full w-full object-cover grayscale-[15%]"
                    src="https://storage.googleapis.com/support-forums-api/attachment/thread-146048858-12639125651610213305.PNG"
                    alt="map"
                />

                {/* Back Button */}
                <Link to="/home" className="absolute top-6 left-6 h-11 w-11 bg-white rounded-xl flex items-center justify-center shadow-md">
                    <i className="ri-arrow-left-line text-zinc-900 text-lg"></i>
                </Link>
            </div>

            {/* Bottom Sheet */}
            <div className="h-[45%] bg-white px-6 pt-5 pb-6 flex flex-col justify-between shadow-[0_-12px_30px_rgba(0,0,0,0.08)] rounded-t-[40px] relative -mt-10">

                {/* Pull bar */}
                <div className="w-10 h-1 bg-zinc-200 rounded-full mx-auto mb-3" />

                {/* Driver Section */}
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                        <div className="relative">
                            <img
                                className="h-16 w-16 rounded-2xl object-cover"
                                src="https://plus.unsplash.com/premium_photo-1689539137236-b68e436248de?q=80&w=150&h=150&auto=format&fit=crop"
                                alt="driver"
                            />
                            <div className="absolute -bottom-1 -right-1 bg-black text-white text-[11px] px-2 py-0.5 rounded-md font-semibold">
                                4.8 ★
                            </div>
                        </div>
                        <div>
                            <h2 className="text-lg font-semibold text-zinc-900">
                                Sarthak Sharma
                            </h2>
                            <p className="text-xs text-zinc-500 mt-0.5">
                                RJ 14 CP 1234
                            </p>
                        </div>
                    </div>

                    <div className="text-right">
                        <img
                            className="h-10 object-contain"
                            src={car}
                            alt="car"
                        />
                        <p className="text-[11px] text-zinc-400 mt-1">
                            Swift Premium
                        </p>
                    </div>
                </div>

                
                {/* Locations */}
                <div className="flex flex-col gap-4 py-4 border-y border-zinc-100">

                    {/* Pickup */}
                    <div className="flex items-start gap-3">
                        <i className="ri-map-pin-line text-lg text-zinc-400 mt-0.5"></i>
                        <div className="flex-1">
                            <p className="text-[11px] font-medium text-zinc-400 uppercase mb-1">
                                Pickup
                            </p>
                            <p className="text-sm font-medium text-zinc-700">
                                Vasundhara Colony, MUJ
                            </p>
                        </div>
                    </div>

                    {/* Destination */}
                    <div className="flex items-start gap-3">
                        <i className="ri-map-pin-2-fill text-lg text-zinc-700 mt-0.5"></i>
                        <div className="flex-1">
                            <p className="text-[11px] font-medium text-zinc-400 uppercase mb-1">
                                Destination
                            </p>
                            <p className="text-sm font-semibold text-zinc-900">
                                Mahesh Nagar, Jaipur
                            </p>
                        </div>
                    </div>

                </div>


                {/* Fare + CTA */}
                <div className="flex items-center gap-4 pt-3">
                    <div>
                        <p className="text-xs text-zinc-400 uppercase mb-1">
                            Fare
                        </p>
                        <p className="text-2xl font-semibold text-zinc-900">
                            ₹215.60
                        </p>
                    </div>

                    <button className="flex-1 bg-black text-white py-4 rounded-2xl font-semibold text-sm shadow-md active:scale-[0.97] transition">
                        Complete Payment
                    </button>
                </div>

            </div>
        </div>
    )
}

export default Riding
