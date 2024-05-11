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
import cities from "cities.json";

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
  const citiesArray: { name: string }[] = cities;

  const removeDuplicates = (arr: { name: string }[]) => {
    const uniqueNames = {};
    const uniqueArray = [];

    for (const obj of arr) {
      const { name } = obj;
      if (!uniqueNames[name]) {
        uniqueNames[name] = true;
        uniqueArray.push(obj);
      }
    }

    return uniqueArray;
  };
  const cityArrayWithoutDuplicates = removeDuplicates(citiesArray);
  return (
    <Center mb={40} mt={50}>
      <form onSubmit={handleSearch}>
        <Group>
          <Autocomplete
            placeholder="Enter city name"
            value={cityName}
            onChange={setCityName}
            data={cityArrayWithoutDuplicates.map((city) => city.name)}
            // filter={optionsFilter}
            limit={3}
          />
          <Button type="submit">Get weather</Button>
        </Group>
      </form>
    </Center>
  );
};

export default SearchBar;
