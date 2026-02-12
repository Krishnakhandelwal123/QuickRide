import React from 'react'

const LocationPanal = (props) => {

    const locations = (props.suggestions && props.suggestions.length > 0)
        ? props.suggestions
        : ['24b, vasundhara colony manipal university jaipur',
            '45c, green park new delhi',
            '12a, MG road bangalore',
            '78d, marine drive mumbai'];

    return (
        <div className="px-2 mt-10">
            <div className="max-h-[60vh] overflow-auto">
                {
                    locations.map((loc, index) => {
                        // normalize item shape: backend returns objects with `description`
                        const description = typeof loc === 'string' ? loc : loc.description || loc;
                        return (
                            <div
                                onClick={() => {
                                    // notify parent which suggestion was picked
                                    if (props.onSelect) props.onSelect(description);
                                    // keep the panel open so user can pick other suggestions or confirm
                                    // do not call props.setPanal(false) here
                                }}
                                key={index}
                                className='flex border p-3 rounded-xl border-gray-200 hover:border-gray-400 hover:bg-gray-50 items-center justify-start my-2 gap-4 cursor-pointer transition-colors'
                            >
                                <div className='bg-[#f3f4f6] h-10 w-10 flex items-center justify-center rounded-full text-gray-700'><i className="ri-map-pin-line text-lg"></i></div>
                                <div className='font-medium text-sm text-gray-800 truncate'>
                                    {description}
                                </div>
                            </div>
                        )
                    })
                }
            </div>
        </div>
    )
}

export default LocationPanal
