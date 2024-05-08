// services/weatherService.ts
import axios from "axios";
import { WeatherData } from "../types/weather.types";

const API_KEY = "YOUR_API";

export const getWeatherByCoordinates = async (
  lat: number,
  lon: number
): Promise<WeatherData> => {
  try {
    const response = await axios.get(
      `https://api.openweathermap.org/data/2.5/weather`,
      {
        params: {
          lat,
          lon,
          appid: API_KEY,
        },
      }
    );

    return response.data;
  } catch (error) {
    console.error("Error fetching weather data:", error);
    throw error;
  }
};

export const getWeatherByCityName = async (
  cityName: string
): Promise<WeatherData> => {
  try {
    const response = await axios.get(
      `https://api.openweathermap.org/data/2.5/weather`,
      {
        params: {
          q: cityName,
          appid: API_KEY,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching weather data by city name:", error);
    throw error;
  }
};

export const getForecastByCityName = async (cityName: string) => {
  try {
    const response = await axios.get(
      `https://api.openweathermap.org/data/2.5/forecast`,
      {
        params: {
          q: cityName,
          appid: API_KEY,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching weather data by city name:", error);
    throw error;
  }
};
