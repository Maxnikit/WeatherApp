import React, { useEffect } from "react";
import { observer } from "mobx-react-lite";
import useUserLocation from "../hooks/useUserLocation";
import CityCard from "../components/CityCard";
import { getWeatherByCoordinates } from "../services/weatherService";
import { WeatherData } from "../types/weather.types";
import WeatherStore from "../stores/WeatherStore";
import { Group } from "@mantine/core";

import weatherStore from "../stores/WeatherStore";
import { useQuery } from "@tanstack/react-query";
import { notifications } from "@mantine/notifications";
import { IconCheck, IconX } from "@tabler/icons-react";

const WeatherDashboard = observer(() => {
  const { location: userLocation } = useUserLocation();

  const { data, error, isLoading } = useQuery({
    queryKey: ["userLocation"],
    queryFn: userLocation
      ? () => getWeatherByCoordinates(userLocation.lat, userLocation.lon)
      : undefined,
    // enabled: !!userLocation,
    // staleTime: Infinity,
    refetchOnWindowFocus: false,
  });
  useEffect(() => {
    if (isLoading) {
      notifications.show({
        title: "Loading...",
        message: "Trying to get weather data for your location",
        id: "loading",
        autoClose: false,
        loading: true,
      });
    }

    if (error) {
      notifications.hide("loading");
      notifications.show({
        title: "Could not get your location",
        message: "You can try using VPN",
        id: "error",
        color: "red",
        icon: <IconX />,
      });
    }

    if (data) {
      notifications.hide("loading");
      notifications.show({
        title: "Success",
        message: "Weather data retrieved successfully",
        id: "success",
        color: "green",
        icon: <IconCheck />,
      });
    }
  }, [data, error, isLoading]);

  React.useEffect(() => {
    if (data) {
      WeatherStore.addWeatherData(data);
    }
  }, [data]);

  React.useEffect(() => {
    const interval = setInterval(() => {
      weatherStore.updateTimeGlobally();
    }, 1000); // Update every minute

    return () => {
      clearInterval(interval); // Clear interval on unmount
    };
  }, []);
  console.log(userLocation);

  return (
    <>
      {/* {error && (
        <Error
          title="Could not get your location"
          message="You can try using VPN"
        />
      )} */}
      <div className="weather-dashboard">
        <Group justify="center" w={"100%"} p={10}>
          {WeatherStore.weatherList.map(
            (weatherData: WeatherData, index: number) => (
              <CityCard key={index} data={weatherData} />
            )
          )}
        </Group>
      </div>
    </>
  );
});

export default WeatherDashboard;
