import React, { useEffect, useState } from 'react';
import TopButtons from './components/TopButtons';
import Inputs from './components/Inputs';
import TimeAndLocation from './components/TimeAndLocation';
import TempAndDetails from './components/TempAndDetails';
import CityMap from './components/CityMap';
import 'leaflet/dist/leaflet.css';
import { getFormattedWeatherData, getUserLocationWeather } from './services/weatherServices';
import WeatherForecast from './components/WeatherForecast';

const App = () => {
  const [weather, setWeather] = useState(null);
  const [query, setQuery] = useState(null); // start null

  // Fetch initial weather based on user location
  useEffect(() => {
    const fetchInitialWeather = async () => {
      try {
        const data = await getUserLocationWeather();
        setWeather(data);
        setQuery({ q: data.name }); // set query to the detected city
      } catch (err) {
        console.error("Error fetching user location weather:", err);
      }
    };

    fetchInitialWeather();
  }, []);

  // Fetch weather when query changes (via search or top buttons)
  useEffect(() => {
    if (!query || !query.q) return;

    const fetchWeather = async () => {
      try {
        const data = await getFormattedWeatherData(query);
        setWeather(data);
      } catch (err) {
        console.error("Error fetching weather for query:", err);
      }
    };

    fetchWeather();
  }, [query]);

  if (!weather) return (
    <div 
      className="app-container w-screen h-[100dvh] flex flex-col justify-center items-center bg-[url('/img/weather1.jpg')] bg-cover bg-center text-amber-50"
    >
      Loading weather...
    </div>
  );

  return (
    <div className="app-container w-screen h-[100dvh] flex flex-col justify-center items-center bg-[url('/img/weather1.jpg')] bg-cover bg-center text-amber-50">
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
