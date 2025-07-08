import { FaThermometerEmpty } from "react-icons/fa";
import { WiHumidity } from "react-icons/wi";
import { FiWind } from "react-icons/fi";
import { GiSunrise, GiSunset } from "react-icons/gi";
import { MdKeyboardArrowUp, MdKeyboardArrowDown } from "react-icons/md";

const TempAndDetails = ({ weather }) => {
  if (!weather) return null;

  const verticalDetails = [
    {
      id: 1,
      Icon: FaThermometerEmpty,
      title: "Real Feel",
      value: `${Math.round(weather.main.feels_like)}°`,
    },
    {
      id: 2,
      Icon: WiHumidity,
      title: "Humidity",
      value: `${weather.main.humidity}%`,
    },
    {
      id: 3,
      Icon: FiWind,
      title: "Wind",
      value: `${Math.round(weather.wind.speed)} km/h`,
    },
  ];

  const horisontalDetails = [
    {
      id: 1,
      Icon: GiSunrise,
      title: "Sunrise",
      value: new Date(
        (weather.sys.sunrise + weather.timezone) * 1000
      ).toLocaleTimeString("hu-HU", {
        hour: "2-digit",
        minute: "2-digit",
        timeZone: "UTC",
      }),
    },
    {
      id: 2,
      Icon: GiSunset,
      title: "Sunset",
      value: new Date(
        (weather.sys.sunset + weather.timezone) * 1000
      ).toLocaleTimeString("hu-HU", {
        hour: "2-digit",
        minute: "2-digit",
        timeZone: "UTC",
      }),
    },
    {
      id: 3,
      Icon: MdKeyboardArrowUp,
      title: "High",
      value: `${Math.round(weather.main.temp_max)}°C`,
    },
    {
      id: 4,
      Icon: MdKeyboardArrowDown,
      title: "Low",
      value: `${Math.round(weather.main.temp_min)}°C`,
    },
  ];

  return (
    <div className="flex flex-col w-full h-50 md:w-5/6 lg:w-1/2 bg-blue-400 opacity-75">
        {/* Celsius és farenhein váltása */}

      {/* <div className='flex flex-row w-full items-center justify-end pr-5 mb-2'>
        <button className='text-2xl font-medium transition ease-out hover:scale-125 cursor-pointer'>
          °C
        </button>
        <p className='text-2xl font-medium mx-1'>|</p>
        <button className='text-2xl font-medium transition ease-out hover:scale-125 cursor-pointer'>
          °F
        </button>
      </div>  */}

      <div className="flex flex-row items-center justify-evenly sm:py-0 lg:py-3 mt-7">
        <img
          className="w-15 lg:w-20"
          src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
          alt="weather icon"
        />

        <div className="flex items-center justify-center py-6 sm:text-xs md:text-2xl lg:text-3xl">
          <p>{weather.weather[0].main}</p>
        </div>

        <p className="sm:text-2xl md:text-3xl lg:text-4xl">
          {Math.round(weather.main.temp)}°C
        </p>

        <div className="flex flex-col sm:space-y-1 lg:space-y-3 items-start">
          {verticalDetails.map(({ id, Icon, title, value }) => (
            <div
              key={id}
              className="flex font-light text-sm items-center justify-center"
            >
              <Icon size={18} className="mr-1" />
              {`${title}: `}
              <span className="sm:font-light lg:font-medium ml-1">{value}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="flex flex-row items-center justify-center sm:space-x-2 lg:space-x-10 text-sm md:text-lg py-3 pt-5 lg:pt-0">
        {horisontalDetails.map(({ id, Icon, title, value }) => (
          <div key={id} className="flex flex-row items-end lg:items-center">
            <Icon className="w-6 h-6 sm:w-10 sm:h-10 lg:w-10 lg:h-10" />
            <p className="font-light ml-1">
              {`${title}: `}
              <span className="font-medium ml-1">{value}</span>
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TempAndDetails;