import React from 'react'

const VEHICLE_IMAGES = {
  car: 'https://www.pngplay.com/wp-content/uploads/8/Uber-PNG-Photos.png',
  auto: 'https://cn-geo1.uber.com/image-proc/crop/resizecrop/udam/format=auto/width=552/height=368/srcb64=aHR0cHM6Ly90Yi1zdGF0aWMudWJlci5jb20vcHJvZC91ZGFtLWFzc2V0cy8xZGRiOGM1Ni0wMjA0LTRjZTQtODFjZS01NmExMWEwN2ZlOTgucG5n',
  moto: 'https://cn-geo1.uber.com/image-proc/crop/resizecrop/udam/format=auto/width=552/height=368/srcb64=aHR0cHM6Ly90Yi1zdGF0aWMudWJlci5jb20vcHJvZC91ZGFtLWFzc2V0cy8yYzdmYTE5NC1jOTU0LTQ5YjItOWM2ZC1hM2I4NjAxMzcwZjUucG5n',
}

const VEHICLE_LABELS = {
  car: 'QuickGo',
  auto: 'Auto',
  moto: 'Bike',
}

const ConfirmRide = (props) => {
  const { pickup, destination, vehicleType, fare, createRide, setConfirmRidePanal, setLookingForDriverPanal } = props
  const vehicleImage = vehicleType ? VEHICLE_IMAGES[vehicleType] : VEHICLE_IMAGES.car
  const vehicleLabel = vehicleType ? VEHICLE_LABELS[vehicleType] : 'Vehicle'

  const handleConfirm = () => {
    if (vehicleType) createRide(vehicleType)
    setLookingForDriverPanal(true)
    setConfirmRidePanal(false)
  }

  return (
    <div className="relative px-3 pt-6">

      <div
        onClick={() => setConfirmRidePanal(false)}
        className="absolute -top-3 left-1/2 -translate-x-1/2"
      >
        <i className="text-3xl text-gray-400 ri-arrow-down-wide-fill"></i>
      </div>

      <h3 className="text-2xl text-center font-semibold mb-2">
        Confirm Ride
      </h3>

      <div className="flex flex-col items-center gap-3">

        {/* Vehicle Image - changes by selected vehicle */}
        <div className="flex flex-col items-center gap-1">
          <img className="h-20 object-contain" src={vehicleImage} alt={vehicleLabel} />
          {vehicleType && (
            <span className="text-sm font-medium text-gray-600">{vehicleLabel}</span>
          )}
        </div>

        <div className="w-full bg-white rounded-xl px-4 py-3 space-y-3 shadow-sm">

          {/* Pickup - real data */}
          <div className="flex items-start gap-3">
            <i className="text-xl ri-map-pin-line mt-0.5 text-gray-600"></i>
            <div className="min-w-0 flex-1">
              <p className="text-sm font-medium text-gray-900 truncate" title={pickup}>
                {pickup || 'Pickup location'}
              </p>
              <p className="text-xs text-gray-500">Pickup</p>
            </div>
          </div>

          <div className="h-px bg-gray-200" />

          {/* Drop - real data */}
          <div className="flex items-start gap-3">
            <i className="text-xl ri-map-pin-2-fill mt-0.5 text-gray-600"></i>
            <div className="min-w-0 flex-1">
              <p className="text-sm font-medium text-gray-900 truncate" title={destination}>
                {destination || 'Destination'}
              </p>
              <p className="text-xs text-gray-500">Drop</p>
            </div>
          </div>

          <div className="border-t border-dashed border-gray-300" />

          {/* Fare - real data */}
          <div className="flex items-center gap-3 pt-1">
            <i className="text-xl ri-money-rupee-circle-fill text-emerald-600"></i>
            <div>
              <h3 className="text-lg font-semibold">{fare || '₹---'}</h3>
              <p className="text-sm text-gray-600">Cash</p>
            </div>
          </div>
        </div>
        <button
          onClick={handleConfirm}
          className="w-full bg-black text-white text-lg font-medium py-2.5 rounded-xl mt-1 active:scale-[0.97] transition"
        >
          Confirm Ride
        </button>

      </div>
    </div>
  )
}

export default ConfirmRide
