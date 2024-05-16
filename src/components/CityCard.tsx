// components/CityCard.tsx
import React from "react";
import { WeatherData } from "../types/weather.types";
import { Card, CloseButton, Group, Stack, Text, Title } from "@mantine/core";
import WeatherChart from "./WeatherChart";
import {
  convertToCelsius,
  convertToFahrenheit,
  formatTemp,
} from "../utilities/utilities";
import { alpha } from "@mantine/core";
import WeatherStore from "../stores/WeatherStore";
import { observer } from "mobx-react-lite";

interface CityCardProps {
  data: WeatherData;
}

const CityCard: React.FC<CityCardProps> = observer(({ data }) => {
  const {
    cityName,
    countryName,
    pressure,
    humidity,
    temperature,
    wind,
    weather,
    forecastList,

    id,
  } = data;

  const currentTempType = WeatherStore.getTempType(id);
  const handleClose = () => {
    WeatherStore.removeWeatherData(id);
  };

  const iconURL = "http://openweathermap.org/img/w/" + weather.icon + ".png";

  interface ThemeColor {
    bg: string;
    chart: string;
    secondaryValues: string;
  }

  const blueThemeColor: ThemeColor = {
    bg: alpha("var(--mantine-color-blue-5)", 0.1),
    chart: "indigo.7",
    secondaryValues: "blue.4",
  };

  const orangeThemeColor: ThemeColor = {
    bg: alpha("var(--mantine-color-orange-5)", 0.1),
    chart: "orange.7",
    secondaryValues: "orange.4",
  };

  const themeColor: ThemeColor =
    convertToCelsius(temperature.actual) > 0
      ? orangeThemeColor
      : blueThemeColor;

  return (
    <Card
      shadow="md"
      padding="md"
      radius="md"
      withBorder
      w={380}
      bg={themeColor.bg}
    >
      <CloseButton
        aria-label="Delete card"
        pos="absolute"
        top="0px"
        right="0px"
        c={"gray.5"}
        size={"sm"}
        variant="transparent"
        onClick={handleClose}
      />

      <Group gap={0}>
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
        {WeatherStore.getFormattedDate(id)}
      </Title>
      <WeatherChart
        forecastList={forecastList}
        tempType={currentTempType}
        color={themeColor.chart}
      />

      <Group justify="space-between" align="end">
        <Stack gap={0}>
          {currentTempType === "C" ? (
            <>
              <Group gap={2} align="start">
                <Text fz="tempValue">
                  {formatTemp(convertToCelsius(temperature.actual))}
                </Text>
                <Text
                  fz="tempUnit"
                  flex={1}
                  style={{ cursor: "pointer" }}
                  onClick={() =>
                    WeatherStore.updateWeatherDataTempType(id, "F")
                  }
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
                  onClick={() =>
                    WeatherStore.updateWeatherDataTempType(id, "C")
                  }
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
            <Text component="span" c={themeColor.secondaryValues} fw={600}>
              {wind.toFixed(1)} m/s
            </Text>
          </Text>
          <Text>
            Humidity:{" "}
            <Text component="span" c={themeColor.secondaryValues} fw={600}>
              {humidity}%
            </Text>
          </Text>
          <Text>
            Pressure:{" "}
            <Text component="span" c={themeColor.secondaryValues} fw={600}>
              {pressure}Pa
            </Text>
          </Text>
        </Stack>
      </Group>
    </Card>
  );
});

export default CityCard;
