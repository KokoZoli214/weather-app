const API_KEY = "3c29eed88a7c65b2e5bd3bf2c7b91aef";
const BASE_URL = 'https://api.openweathermap.org/data/2.5/weather';
// const FORECAST_URL = 'api.openweathermap.org/data/2.5/forecast?lat={lat}&lon={lon}&appid={3c29eed88a7c65b2e5bd3bf2c7b91aef}'
// https://api.openweathermap.org/data/3.0/onecall?lat={lat}&lon={lon}&exclude={part}&appid={API key} 
export const getFormattedWeatherData = async (searchParams) => {
  const url = new URL("https://api.openweathermap.org/data/2.5/weather");
  url.search = new URLSearchParams({ ...searchParams, units: "metric", appid: API_KEY});

  const response = await fetch(url);
  const data = await response.json();
  return data;
};



export const getBudapestWeatherData = async () => {
  const url = new URL("https://api.openweathermap.org/data/2.5/weather");
  url.search = new URLSearchParams({
    q: "Budapest",
    units: "metric",
    appid: API_KEY,
  });

  const response = await fetch(url);
  if (!response.ok) {
    throw new Error('Hiba az API lekérés során');
  }
  const data = await response.json();
  return data;
};

const getWeatherData = async (city) => {
  const response = await fetch(`${BASE_URL}?q=${city}&appid=${API_KEY}&units=metric`);
  if (!response.ok) {
    throw new Error('Weather fetch failed');
  }
  const data = await response.json();
  return data;
};

export default getWeatherData;

// const BASE_ONECALL_URL = "https://api.openweathermap.org/data/2.5/onecall";
// const BASE_CURRENT_URL = "https://api.openweathermap.org/data/2.5/weather";

// export const getForecastData = async () => {
//   const lat = 47.4979; // Budapest
//   const lon = 19.0402;

//   const url = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&units=metric&appid=${API_KEY}`;
//   const response = await fetch(url);

//   if (!response.ok) {
//     throw new Error("Nem sikerült betölteni az előrejelzést");
//   }

//   const data = await response.json();
//   return data;
// };