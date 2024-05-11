// components/SearchBar.tsx
import React, { useState } from "react";
import {
  TextInput,
  Button,
  Group,
  Center,
  Autocomplete,
  ComboboxItem,
  OptionsFilter,
} from "@mantine/core";
import { getWeatherByCityName } from "../services/weatherService";
import { WeatherData } from "../types/weather.types";
import WeatherStore from "../stores/WeatherStore";
// import cities from "cities.json";
// import Autocomplete from "react-google-autocomplete";
// import { usePlacesWidget } from "react-google-autocomplete";

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
          <Autocomplete
            placeholder="Enter city name"
            value={cityName}
            onChange={setCityName}
            // data={cityArrayWithoutDuplicates.map((city: any) => city.name)}

            limit={3}
          />
          <Button type="submit">Get weather</Button>
        </Group>
      </form>
    </Center>
  );
};

export default SearchBar;
