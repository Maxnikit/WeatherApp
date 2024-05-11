// components/SearchBar.tsx
import React, { useState } from "react";
import { TextInput, Button, Group, Center } from "@mantine/core";
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

  const handleSearch = async (event: any) => {
    event.preventDefault();
    try {
      const weather = await getWeatherByCityName(cityName);
      addWeatherData(weather);
      setCityName("");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Center mb={40} mt={50}>
      <form onSubmit={handleSearch}>
        <Group>
          <TextInput
            placeholder="Enter city name"
            value={cityName}
            onChange={(event) => setCityName(event.currentTarget.value)}
          />
          <Button type="submit">Get weather</Button>
        </Group>
      </form>
    </Center>
  );
};

export default SearchBar;
