// components/CityCard.tsx
import React, { useEffect } from "react";
import { WeatherData } from "../types/weather.types";
import {
  Card,
  CardSection,
  CloseButton,
  Group,
  Stack,
  Text,
  Title,
  Image,
} from "@mantine/core";
import WeatherChart from "./WeatherChart";
import {
  convertToCelsius,
  convertToFahrenheit,
  formatDateTime,
} from "../utilities/utilities";
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
    timezone,
  } = data;

  const handleClose = () => {
    WeatherStore.removeWeatherData(cityName);
  };

  const iconURL = "http://openweathermap.org/img/w/" + weather.icon + ".png";

  const [formattedDate, setFormattedDate] = React.useState<string | null>(null);

  // TODO sync refresh for every cards at once
  React.useEffect(() => {
    setFormattedDate(formatDateTime(timezone));
    const interval = setInterval(() => {
      setFormattedDate(formatDateTime(timezone));
    }, 60000); // Run every minute (60000 milliseconds)

    return () => {
      clearInterval(interval); // Cleanup interval on component unmount
    };
  }, [timezone]); // Run the effect only when timezone changes
  return (
    <Card
      shadow="md"
      padding="md"
      radius="md"
      withBorder
      w={350}
      bg={alpha("#4578FC", 0.1)}
    >
      <CardSection>
        <Group justify="end">
          <CloseButton
            size={"sm"}
            variant="transparent"
            onClick={handleClose}
          />
        </Group>
      </CardSection>

      <Group justify="space-between" align="start">
        <Stack>
          <Title order={5}>
            {cityName}, {countryName}
          </Title>
          <Text size="lg">{formattedDate}</Text>
        </Stack>
        <img src={iconURL} alt="current weather icon" />
        <Text c={"dimmed"}>{weather.main}</Text>
      </Group>
      {/* TODO: add a library for charting in react and use it here to show temp by day */}
      <WeatherChart forecastList={forecastList} tempType={tempType} />
      <Group justify="space-between">
        <Stack>
          {tempType === "C" ? (
            <>
              <Group justify="end" gap={2} align="start">
                <Text fz="xxxl">{convertToCelsius(temperature.actual)}</Text>
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
                <Text size="xxxl">
                  {convertToFahrenheit(temperature.actual)}
                </Text>
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
