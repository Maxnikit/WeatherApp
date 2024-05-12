// components/SearchBar.tsx
import React, { useState } from "react";
import { Button, Group, Center, Autocomplete } from "@mantine/core";
import { getWeatherByCityName } from "../services/weatherService";

import WeatherStore from "../stores/WeatherStore";

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
    <form onSubmit={handleSearch}>
      <Center mb={40} mt={50}>
        <Group>
          <Autocomplete
            placeholder="Enter city name"
            value={cityName}
            onChange={setCityName}
          />
          <Button type="submit">Get weather</Button>
        </Group>
      </Center>
    </form>
  );
};

export default SearchBar;
