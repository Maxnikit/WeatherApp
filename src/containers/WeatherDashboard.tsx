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
import { SimpleGrid, Group } from "@mantine/core";

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
  return (
    <div className="weather-dashboard">
      {locationError && <p>Error getting location: {locationError}</p>}
      <Group justify="center" w={"100%"} p={10}>
        {userCityWeather && <CityCard data={userCityWeather} />}

        {WeatherStore.weatherList.map(
          (weatherData: WeatherData, index: number) => (
            <CityCard key={index} data={weatherData} />
          )
        )}
      </Group>
    </div>
  );
});

export default WeatherDashboard;
