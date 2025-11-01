const API_KEY = "3c29eed88a7c65b2e5bd3bf2c7b91aef";
const BASE_URL = "https://api.openweathermap.org/data/2.5/weather";

// Alap paraméteres lekérés (pl. q: "London")
export const getFormattedWeatherData = async (searchParams) => {
  const url = new URL(BASE_URL);
  url.search = new URLSearchParams({
    ...searchParams,
    units: "metric",
    appid: API_KEY
  });

  const response = await fetch(url);
  if (!response.ok) throw new Error("API fetch error");

  return await response.json();
};

// Budapest fallback adatok
export const getBudapestWeatherData = async () => {
  const url = new URL(BASE_URL);
  url.search = new URLSearchParams({
    q: "Budapest",
    units: "metric",
    appid: API_KEY
  });

  const response = await fetch(url);
  if (!response.ok) throw new Error("API fetch error");

  return await response.json();
};

// Városnév alapján
const getWeatherData = async (city) => {
  const response = await fetch(
    `${BASE_URL}?q=${city}&appid=${API_KEY}&units=metric`
  );
  if (!response.ok) throw new Error("Weather fetch failed");

  return await response.json();
};

// Felhasználó helyzete → időjárás
export const getUserLocationWeather = () => {
  return new Promise((resolve, reject) => {
    if (!navigator.geolocation) {
      reject("A böngésző nem támogatja a geolokációt");
      return;
    }

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        try {
          const { latitude, longitude } = position.coords;

          const url = new URL(BASE_URL);
          url.search = new URLSearchParams({
            lat: latitude,
            lon: longitude,
            units: "metric",
            appid: API_KEY
          });

          const res = await fetch(url);
          if (!res.ok) throw new Error("API hiba");

          const data = await res.json();
          resolve(data);
        } catch (err) {
          console.warn("Hiba a geolokációs adatoknál:", err);
          const fallback = await getBudapestWeatherData();
          resolve(fallback);
        }
      },
      async () => {
        console.warn("Felhasználó megtagadta a helyhozzáférést → Budapest fallback");
        const fallback = await getBudapestWeatherData();
        resolve(fallback);
      }
    );
  });
};

export default getWeatherData;
