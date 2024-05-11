// components/CityCard.tsx
import React from "react";
import { WeatherData } from "../types/weather.types";
import {
  Card,
  CardSection,
  CloseButton,
  Group,
  Stack,
  Text,
  Title,
} from "@mantine/core";
import WeatherChart from "./WeatherChart";
import { convertToCelsius, convertToFahrenheit } from "../utilities/utilities";
import { alpha } from "@mantine/core";

import WeatherStore from "../stores/WeatherStore";

interface CityCardProps {
  data: WeatherData;
}

const CityCard: React.FC<CityCardProps> = ({ data }) => {
  const [tempType, setTempType] = React.useState<"C" | "F">("C");
  const {
    cityName,
    countryName,
    pressure,
    humidity,
    temperature,
    wind,
    weather,
    forecastList,
  } = data;

  const handleClose = () => {
    WeatherStore.removeWeatherData(cityName);
  };
  return (
    <Card
      shadow="md"
      padding="lg"
      radius="md"
      withBorder
      w={350}
      bg={alpha("#4578FC", 0.1)}
    >
      <CardSection>
        <Group justify="end">
          <CloseButton variant="transparent" onClick={handleClose} />
        </Group>
      </CardSection>

      <Group justify="space-between" align="start">
        <Stack>
          <Title order={5}>
            {cityName}, {countryName}
          </Title>
          <Text>Fri, 19 February, 10:17</Text>
        </Stack>
        <Text>{weather.main}</Text>
      </Group>
      {/* TODO: add a library for charting in react and use it here to show temp by day */}
      <WeatherChart forecastList={forecastList} tempType={tempType} />
      <Group justify="space-between">
        <Stack>
          {tempType === "C" ? (
            <>
              <Group justify="end" gap={2} align="start">
                <Text size="xl">{convertToCelsius(temperature.actual)}</Text>
                <Text
                  flex={1}
                  style={{ cursor: "pointer" }}
                  onClick={() => setTempType("F")}
                >
                  °C |{" "}
                  <Text component="span" c={"dimmed"}>
                    °F
                  </Text>
                </Text>
              </Group>
              <Text size="xs" c={"dimmed"}>
                Feels like: {convertToCelsius(temperature.feels_like)}°C
              </Text>
            </>
          ) : (
            <>
              <Group justify="end" gap={2} align="start">
                <Text size="xl">{convertToFahrenheit(temperature.actual)}</Text>
                <Text
                  flex={1}
                  style={{ cursor: "pointer" }}
                  onClick={() => setTempType("C")}
                >
                  <Text component="span" c={"dimmed"}>
                    °C{" "}
                  </Text>
                  | °F
                </Text>
              </Group>
              <Text size="xs" c={"dimmed"}>
                Feels like: {convertToFahrenheit(temperature.feels_like)}°F
              </Text>
            </>
          )}
        </Stack>
        <Stack>
          <Text>Wind: {wind} m/s</Text>
          <Text>Humidity: {humidity}%</Text>
          <Text>Pressure: {pressure} hPa</Text>
        </Stack>
      </Group>
      {/* Convert to °C if necessary */}
    </Card>
  );
};

export default CityCard;
