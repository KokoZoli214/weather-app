import React, { useEffect, useState } from "react";

const API_KEY = "3c29eed88a7c65b2e5bd3bf2c7b91aef";

const WeatherForecast = ({ query }) => {
  const [forecast, setForecast] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  if (!query || !query.q) {
    return <p>Nincs kiválasztott város.</p>;
  }

  useEffect(() => {
    const fetchForecast = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await fetch(
          `https://api.openweathermap.org/data/2.5/forecast?q=${query.q}&appid=${API_KEY}&units=metric&cnt=40`
        );

        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();

        // Csoportosítás napok szerint
        const grouped = {};
        data.list.forEach((item) => {
          const date = item.dt_txt.split(" ")[0];
          if (!grouped[date]) grouped[date] = [];
          grouped[date].push(item);
        });

        const dailyForecast = Object.entries(grouped).slice(0, 6).map(([date, items]) => {
          const maxTempItem = items.reduce((maxItem, current) =>
            current.main.temp_max > maxItem.main.temp_max ? current : maxItem
          );

          // Leggyakoribb időjárási állapot (a pontos ikon miatt)
          const iconFrequency = {};
          items.forEach((i) => {
            const icon = i.weather[0].icon;
            iconFrequency[icon] = (iconFrequency[icon] || 0) + 1;
          });
          const mostFrequentIcon = Object.entries(iconFrequency).sort((a, b) => b[1] - a[1])[0][0];

          return {
            date,
            temp_max: Math.round(maxTempItem.main.temp_max),
            description: maxTempItem.weather[0].description,
            icon: mostFrequentIcon,
          };
        });

        setForecast(dailyForecast);
      } catch (err) {
        console.error("API error:", err);
        setError("Hiba az adatok lekérésekor.");
      } finally {
        setLoading(false);
      }
    };

    fetchForecast();
  }, [query]);

  if (error) return <p>{error}</p>;

  return (
    <div className="flex flex-col h-full sm:h-50 w-full sm:w-1/2 bg-blue-400 rounded-b-2xl opacity-75">
      <div className="flex items-center justify-center mt-6">
        <p className="font-medium sm:text-2xl lg:text-3xl uppercase">
          6 days forecast
        </p>
      </div>

      <hr className="my-1 mb-4 lg:mb-4 mx-6" />

      <div className="flex flex-wrap sm:flex-nowrap items-center justify-evenly mb-3">
        {forecast.map((day, index) => (
          <li
            key={index}
            className="w-1/3 sm:w-auto mb-0 flex flex-col items-center justify-between list-none"
          >
            <div className="flex flex-col items-center text-center">
              <p className="font-medium text-xs sm:text-xs lg:text-sm">
                {new Date(day.date).toLocaleDateString("en-EN", {
                  weekday: "long",
                  month: "long",
                  day: "numeric",
                })}
              </p>
              <p className="text-xs lg:text-sm capitalize">{day.description}</p>
            </div>
            <div className="text-center">
              <img
                src={`https://openweathermap.org/img/wn/${day.icon}@2x.png`}
                alt="weather icon"
                className="w-8 h-8 sm:w-10 sm:h-10 lg:w-12 lg:h-12 inline-block"
              />
              <p className="sm:text-xs lg:text-lg">{day.temp_max}°C</p>
            </div>
          </li>
        ))}
      </div>
    </div>
  );
};

export default WeatherForecast;