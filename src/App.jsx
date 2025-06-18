import React, { useEffect, useState } from 'react';
import TopButtons from './components/TopButtons';
import Inputs from './components/Inputs';
import TimeAndLocation from './components/TimeAndLocation';
import TempAndDetails from './components/TempAndDetails';
import CityMap from './components/CityMap';
import 'leaflet/dist/leaflet.css';
import { getFormattedWeatherData  } from './services/weatherServices';
import WeatherForecast from './components/WeatherForecast';

const App = () => {
  const [weather, setWeather] = useState(null);
  const [query, setQuery] = useState({ q: 'Budapest' });

  useEffect(() => {
    const fetchWeather = async () => {
      const data = await getFormattedWeatherData(query);
      setWeather(data);
    };

    fetchWeather();
  }, [query]);

  if (!weather) return <p>Betöltés...</p>;

  return (
    <div className="app-container w-screen h-screen flex flex-col justify-center items-center bg-[url('/img/weather1.jpg')] bg-cover bg-center text-amber-50" >
      <TopButtons setQuery={setQuery}/>
      <Inputs setQuery={setQuery} /> 
      <TimeAndLocation weather={weather} />
      <CityMap weather={weather} />
      <TempAndDetails weather={weather} />
      <WeatherForecast query={query}/>
    </div>
  );
};

export default App;
