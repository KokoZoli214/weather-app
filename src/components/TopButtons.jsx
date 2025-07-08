import React from 'react'
    
const TopButtons = ({setQuery}) => {

    const handleCityClick = ({ name }) => {
        setQuery({ q: name });
      }; 

    const cities = [
        {
            id: 1,
            name: 'Berlin'
        },
        {
            id: 2,
            name: 'Milano'
        },
        {
            id: 3,
            name: 'Madrid'
        },
        {
            id: 4,
            name: 'Tokyo'
        },
        {
            id: 5,
            name: 'New York'
        },
    ]
  return (
    <div className='bg-blue-400 w-full sm:w-3/4 md:w-5/6 lg:w-1/2 pt-6 lg:pt-4 lg:text-2xl md:text-2xl sm:text-xs flex justify-evenly gap-2 rounded-t-2xl opacity-75'>
        {
            cities.map(city => (
                <button 
                key={city.id}
                className='transition-transform duration-200 transform hover:scale-110 cursor-pointer'
                onClick={() => handleCityClick(city)}
                >
                {city.name}
                </button>
                ))
        }
    </div>
  )
}

export default TopButtons