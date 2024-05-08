// components/CityCard.tsx
import React from "react";
import { WeatherData } from "../types/weather.types";
import { Card, Group, Stack, Text, Title } from "@mantine/core";
import { Chart } from "./Chart";

interface CityCardProps {
  data: WeatherData;
}

const CityCard: React.FC<CityCardProps> = ({ data }) => {
  const { name, main, weather } = data;
  return (
    <Card shadow="sm" padding="lg" radius="md" withBorder w={400}>
      <Group justify="space-between" align="start">
        <Stack>
          <Title order={3}>{name}</Title>
          <Text>Fri, 19 February, 10:17</Text>
        </Stack>
        <Text>{weather[0].main}</Text>
      </Group>
      {/* TODO: GRAPH */}
      <Chart />
      <Group justify="space-between">
        <Stack>
          <Text>{main.temp} K</Text>
          <Text>{main.feels_like} K</Text>
        </Stack>
        <Stack>
          <Text>Wind: {data.wind.speed} m/s</Text>
          <Text>Humidity: {main.humidity}%</Text>
          <Text>Pressure: {main.pressure} hPa</Text>
        </Stack>
      </Group>
      {/* Convert to °C if necessary */}
    </Card>
  );
};

export default CityCard;
