// components/SearchBar.tsx
import React, { useState } from "react";
import { Button, Autocomplete, Flex } from "@mantine/core";
import { getWeatherByCityName } from "../services/weatherService";

import WeatherStore from "../stores/WeatherStore";

const SearchBar = () => {
  const { addWeatherData } = WeatherStore;
  const [cityName, setCityName] = useState("");
  // const { locations } = usePlaces(debounced);

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
          aria-label="Enter the name of your location"
          placeholder="Enter city name"
          value={cityName}
          onChange={setCityName}
          limit={5}

          // w={{ base: 300, sm: 400 }}
        />
        <Button type="submit">Get weather</Button>
      </Flex>
      {/* </Center> */}
    </form>
  );
};

export default SearchBar;
