// components/SearchBar.tsx
import React, { useState } from "react";
import { Button, Autocomplete, Flex } from "@mantine/core";
import { useDebouncedValue, useDisclosure } from "@mantine/hooks";
import { getWeatherByCityName } from "../services/weatherService";

import WeatherStore from "../stores/WeatherStore";
import usePlaces from "../hooks/usePlaces";

const SearchBar = () => {
  const { addWeatherData } = WeatherStore;
  const [searchTerm, setCityName] = useState("Sevastopol");
  const [loading, handlers] = useDisclosure();
  const [debounced] = useDebouncedValue(searchTerm, 400);
  // const { locations } = usePlaces(debounced);

  const handleSearch = async (event: any) => {
    console.log(loading);
    event.preventDefault();
    console.log(loading);
    handlers.open();
    console.log(loading);
    try {
      const weather = await getWeatherByCityName(searchTerm);
      addWeatherData(weather);
      setCityName("");
    } catch (error) {
      console.log(error);
    }
    handlers.close();
    console.log(loading);
  };

  // const places =
  //   !!locations && locations.length > 0
  //     ? locations
  //     : [
  //         "New York, NY",
  //         "Los Angeles, CA",
  //         "Chicago, IL",
  //         "Houston, TX",
  //         "Phoenix, AZ",
  //         "Philadelphia, PA",
  //         "San Antonio, TX",
  //         "San Diego, CA",
  //         "Dallas, TX",
  //         "San Jose, CA",
  //       ];
  return (
    <form onSubmit={handleSearch}>
      {/* <Center mb={40} mt={50}> */}
      <Flex
        direction={{ base: "column", sm: "row" }}
        gap={{ base: "sm", sm: "lg" }}
        justify={{ sm: "center" }}
        mx="auto"
        mb={40}
        mt={50}
      >
        <Autocomplete
          aria-label="Enter city name"
          placeholder="Enter city name"
          value={searchTerm}
          onChange={setCityName}
          limit={5}
          data={["Sevastopol", "New York, NY", "Los Angeles, CA", "Moscow"]}
          // data={places}
        />
        <Button type="submit" loading={loading}>
          Add
        </Button>
        <Button onClick={WeatherStore.consoleLogWeatherList}>
          Console log
        </Button>
        <Button onClick={WeatherStore.clearWeatherList}>Clear list</Button>
      </Flex>
      {/* </Center> */}
    </form>
  );
};

export default SearchBar;
