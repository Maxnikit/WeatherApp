// components/SearchBar.tsx
import React, { useState } from "react";
import { TextInput, Button, Group } from "@mantine/core";
import { getWeatherByCityName } from "../services/weatherService";
import { WeatherData } from "../types/weather.types";
import WeatherStore from "../stores/WeatherStore";

type SearchBarProps = {
  setWeatherData: (weather: WeatherData) => void;
  setWeatherError: (error: any) => void;
};

const SearchBar = () => {
  const { addWeatherData } = WeatherStore;
  const [cityName, setCityName] = useState("");

  const handleSearch = async () => {
    try {
      const weather = await getWeatherByCityName(cityName);
      addWeatherData(weather);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Group>
      <TextInput
        placeholder="Enter city name"
        value={cityName}
        onChange={(event) => setCityName(event.currentTarget.value)}
      />
      <Button onClick={handleSearch}>Get weather</Button>
    </Group>
  );
};

export default SearchBar;
