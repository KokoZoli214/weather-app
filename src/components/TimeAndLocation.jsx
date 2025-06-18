import React, {useState, useEffect} from 'react';

const TimeAndLocation = ({weather}) => {
  const [currentTime, setCurrentTime] = useState(null);

  useEffect(() => {
    if (!weather) return;

    // Frissíti az időt másodpercenként
    const interval = setInterval(() => {
      // Az OpenWeather timezone értéke eltérés másodpercekben UTC-től
      const utcTimestamp = Math.floor(Date.now() / 1000); // mostani UNIX idő másodpercben UTC-ben
      const localTimestamp = utcTimestamp + weather.timezone; // helyi idő UNIX timestamp másodpercben
      
      setCurrentTime(new Date(localTimestamp * 1000));
    }, 1000);

    // az idő kezdeti beállítása is
    const utcTimestamp = Math.floor(Date.now() / 1000);
    const localTimestamp = utcTimestamp + weather.timezone;
    setCurrentTime(new Date(localTimestamp * 1000));

    return () => clearInterval(interval); // tisztítás komponens unmountkor
  }, [weather]);

  if (!weather || !currentTime) return null;

  const { name, sys } = weather;

  const formattedTime = currentTime.toLocaleString('hu-HU', {
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    timeZone: 'UTC',
  });
  
  return (
    <div className='flex flex-col items-center w-full'>
        <div className='flex flex-col justify-center items-center bg-blue-400 w-full lg:w-1/2 h-28 text-2xl gap-2 opacity-75 pt-12 lg:pt-0'>
            <p className='text-xl lg:text-2xl tracking-wider' style={{fontFamily: 'monospace'}}> {formattedTime} </p>
            <p className='text-2xl'> {name}, {sys?.country} </p>
        </div>
    </div>
  )
}

export default TimeAndLocation