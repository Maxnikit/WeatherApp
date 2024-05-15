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
import {
  convertToCelsius,
  convertToFahrenheit,
  formatDateTime,
  formatTemp,
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
      w={380}
      bg={alpha("#4578FC", 0.1)}
    >
      <CloseButton
        pos="absolute"
        top="0px"
        right="0px"
        size={"sm"}
        variant="transparent"
        onClick={handleClose}
      />

      <Group justify="space-between">
        <Title order={4} flex={1} fw={500}>
          {cityName}, {countryName}
        </Title>
        <Group>
          <img src={iconURL} width={40} alt="current weather icon" />
          <Text c={"gray.5"} pr={10}>
            {weather.main}
          </Text>
        </Group>
      </Group>
      <Title order={4} fw={300}>
        {formattedDate}
      </Title>
      <WeatherChart forecastList={forecastList} tempType={tempType} />

      <Group justify="space-between" align="end">
        <Stack gap={0}>
          {tempType === "C" ? (
            <>
              <Group gap={2} align="start">
                <Text fz="tempValue">
                  {formatTemp(convertToCelsius(temperature.actual))}
                </Text>
                <Text
                  fz="tempUnit"
                  flex={1}
                  style={{ cursor: "pointer" }}
                  onClick={() => setTempType("F")}
                >
                  °C |{" "}
                  <Text fz="tempUnit" component="span" c={"dimmed"}>
                    °F
                  </Text>
                </Text>
              </Group>
              <Text size="md" c={"gray.5"}>
                Feels like:{" "}
                <Text component="span" fw={600}>
                  {formatTemp(convertToCelsius(temperature.feels_like))} °C
                </Text>
              </Text>
            </>
          ) : (
            <>
              <Group gap={2} align="start">
                <Text size="tempValue">
                  {formatTemp(convertToFahrenheit(temperature.actual))}
                </Text>
                <Text
                  fz="tempUnit"
                  flex={1}
                  style={{ cursor: "pointer" }}
                  onClick={() => setTempType("C")}
                >
                  <Text fz="tempUnit" component="span" c={"dimmed"}>
                    °C{" "}
                  </Text>
                  | °F
                </Text>
              </Group>
              <Text size="md" c={"gray.5"}>
                Feels like:{" "}
                <Text component="span" fw={600}>
                  {formatTemp(convertToFahrenheit(temperature.feels_like))} °F
                </Text>
              </Text>
            </>
          )}
        </Stack>

        <Stack align="end" gap={5}>
          <Text>
            Wind:{" "}
            <Text component="span" c={"blue"} fw={600}>
              {wind.toFixed(1)} m/s
            </Text>
          </Text>
          <Text>
            Humidity:{" "}
            <Text component="span" c={"blue"} fw={600}>
              {humidity}%
            </Text>
          </Text>
          <Text>
            Pressure:{" "}
            <Text component="span" c={"blue"} fw={600}>
              {pressure}Pa
            </Text>
          </Text>
        </Stack>
      </Group>
    </Card>
  );
};

export default CityCard;
