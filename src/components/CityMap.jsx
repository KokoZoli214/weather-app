import React, { useEffect } from "react";
import "../services/weatherServices";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";

// Külön komponens a térkép újrapozicionálására
const RecenterMap = ({ lat, lon }) => {
  const map = useMap();

  useEffect(() => {
    map.setView([lat, lon], map.getZoom());
  }, [lat, lon, map]);

  return null;
};

const CityMap = ({ weather }) => {
  if (!weather || !weather.coord) return <div>Loading map...</div>;

  const { lat, lon } = weather.coord;

  return (
    <div className="flex justify-center w-1/2 h-1/4 bg-blue-400 opacity-75 hidden sm:flex">
      <div className="w-2/3 rounded-2xl">
        <MapContainer
          center={[lat, lon]}
          zoom={10}
          style={{ height: "100%", width: "90%", borderRadius: "1rem" }}
          scrollWheelZoom={false}
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          <Marker position={[lat, lon]}>
            <Popup>
              {weather.name} <br /> {Math.round(weather.main.temp)}°C
            </Popup>
          </Marker>
          <RecenterMap lat={lat} lon={lon} />
        </MapContainer>
      </div>
    </div>
  );
};

export default CityMap;