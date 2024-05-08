import React, { useState, useEffect } from "react";
import { observer } from "mobx-react-lite";
import useUserLocation from "../hooks/useUserLocation";
import CityCard from "../components/CityCard";
import {
  getWeatherByCoordinates,
  getForecastByCityName,
} from "../services/weatherService";
import { WeatherData } from "../types/weather.types";
import WeatherStore from "../stores/WeatherStore";

const WeatherDashboard = observer(() => {
  const { location: userLocation, error: locationError } = useUserLocation();
  const [userCityWeather, setUserCityWeather] = useState<WeatherData | null>(
    null
  );

  // Fetch user's current location weather on mount
  useEffect(() => {
    if (userLocation) {
      getWeatherByCoordinates(userLocation.lat, userLocation.lon)
        .then(setUserCityWeather)
        .catch((error) =>
          console.error("Error getting user city weather:", error)
        );
    }
  }, [userLocation]);
  //   WeatherStore.addWeatherData(userCityWeather);
  // Render the dashboard with a card for the user's location and other added cities
  console.log(getForecastByCityName("Minsk"));
  return (
    <div className="weather-dashboard">
      {locationError && <p>Error getting location: {locationError}</p>}
      {userCityWeather && <CityCard data={userCityWeather} />}

      {WeatherStore.weatherList.map(
        (weatherData: WeatherData, index: number) => (
          <CityCard key={index} data={weatherData} />
        )
      )}
    </div>
  );
});

export default WeatherDashboard;
