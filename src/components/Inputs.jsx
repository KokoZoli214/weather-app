import { useState } from "react";
import { BiSearch, BiCurrentLocation } from "react-icons/bi";

const Inputs = ({ setQuery, error }) => {
  const [city, setCity] = useState("");

  const checkCityExists = async (city) => {
    if (!city.trim()) return false; // ha üres a városnév, kilép

    try {
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=3c29eed88a7c65b2e5bd3bf2c7b91aef`
      );

      if (response.ok) {
        // Város megtalálva, nincs hiba
        return true;
      } else {
        // Város nem található
        alert("A város nem található!");
        setCity("");
        return false;
      }
    } catch (error) {
      alert("Hiba történt a kapcsolat során!");
      return false;
    }
  };

  const handleSearchClick = async () => {
    const cityTrimmed = city.trim();
    if (cityTrimmed === "") return;

    const cityExists = await checkCityExists(cityTrimmed);
    if (cityExists) {
      setQuery({ q: cityTrimmed });
      setCity("");
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleSearchClick();
      setCity("");
    }
  };

  const handleBudapestClick = () => {
    setQuery({ q: "Budapest" });
    setCity("");
  };

  return (
    <div className="flex flex-col justify-center items-center w-full sm:w-3/4 md:w-5/6 lg:w-1/2 lg:h-25 bg-blue-400 opacity-75 pt-6 lg:pt-0">
      <div className="flex flex-row justify-center items-center gap-3">
        <input
          type="text"
          placeholder="searching a city..."
          className="bg-white text-gray-500 sm:text-xs md:text-2xl lg:text-xl font-light rounded-2xl p-2 w-full shadow-xl capitalize focus:outline-none placeholder:lowercase"
          onChange={(e) => setCity(e.target.value)}
          value={city}
          onKeyDown={handleKeyDown}
        />

        <BiSearch
          className="cursor-pointer transition ease-out hover:scale-125 w-6 h-6 sm:w-8 sm:h-8 lg:w-10 lg:h-10"
          onClick={handleSearchClick}
        />
        <BiCurrentLocation
          className="cursor-pointer transition ease-out hover:scale-125 w-6 h-6 sm:w-8 sm:h-8 lg:w-10 lg:h-10"
          onClick={handleBudapestClick}
        />
      </div>

      {error && (
        <div className="text-red-600 text-sm mt-2 bg-white rounded px-2 py-1 shadow">
          {error}
        </div>
      )}
    </div>
  );
};

export default Inputs;