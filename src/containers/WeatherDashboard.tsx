import React, { useEffect } from "react";
import { observer } from "mobx-react-lite";
import useUserLocation from "../hooks/useUserLocation";
import CityCard from "../components/CityCard";
import { getWeatherByCoordinates } from "../services/weatherService";
import { WeatherData } from "../types/weather.types";
import WeatherStore from "../stores/WeatherStore";
import { Group } from "@mantine/core";
import Error from "../components/Error";

const WeatherDashboard = observer(() => {
  const { location: userLocation, error: locationError } = useUserLocation();
  const { addWeatherData } = WeatherStore;

  // Fetch user's current location weather on mount
  useEffect(() => {
    const fetchUserLocationWeather = async () => {
      if (userLocation) {
        try {
          const weather = await getWeatherByCoordinates(
            userLocation.lat,
            userLocation.lon
          );
          addWeatherData(weather);
        } catch (error) {
          console.log(error);
        }
      }
    };

    fetchUserLocationWeather();
  }, [userLocation, addWeatherData]);

  return (
    <div className="weather-dashboard">
      {/* TODO: make a better way to display error message */}
      {locationError && (
        <p>WORK IN PROGRESS. Error getting location: {locationError}</p>
      )}
      <Error />
      <Group justify="center" w={"100%"} p={10}>
        {/* {userCityWeather && <CityCard data={userCityWeather} />} */}

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
