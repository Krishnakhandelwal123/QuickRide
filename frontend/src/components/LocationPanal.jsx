import React from 'react'

const LocationPanal = (props) => {

// sample data for location panel
const locations = ['24b, vasundhara colony manipal university jaipur',
                   '45c, green park new delhi',
                   '12a, MG road bangalore',
                   '78d, marine drive mumbai']; 

    return (
        <div>
            {
                locations.map((location, index) => (
                    <div onClick={()=>{
                        props.setVehiclePanal(true);
                        props.setPanal(false);
                    }} key={index} className='flex border-2 p-3 rounded-xl border-gray-300 active:border-black items-center justify-start my-2 gap-4'>
                        <h2 className='bg-[#eee] h-10 w-13 flex items-center justify-center rounded-full'><i className="ri-map-pin-line text-xl"></i></h2>
                        <h4 className='font-medium'>
                            {location}
                        </h4>
                    </div>
                ))
            }
           
        </div>
    ) 
}

export default LocationPanal
