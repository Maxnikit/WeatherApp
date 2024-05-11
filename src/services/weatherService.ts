// services/weatherService.ts
import axios from "axios";
import { WeatherData } from "../types/weather.types";

const API_KEY = process.env.REACT_APP_WEATHER_API_KEY;

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

    // Get forecast
    const forecast = await getForecastByCityName(response.data.name);

    // removing unnecessary data from the response
    const filteredData = {
      coords: {
        lon: response.data.coord.lon,
        lat: response.data.coord.lat,
      },
      temperature: {
        actual: response.data.main.temp,
        feels_like: response.data.main.feels_like,
      },
      humidity: response.data.main.humidity,
      pressure: response.data.main.pressure,
      wind: response.data.wind.speed,
      weather: response.data.weather[0],
      cityName: response.data.name,

      countryName: forecast.city.country,
      forecastList: forecast.list,
    };

    console.log(filteredData);
    return filteredData;
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
    // Get forecast
    const forecast = await getForecastByCityName(response.data.name);

    // removing unnecessary data from the response
    const filteredData = {
      coords: {
        lon: response.data.coord.lon,
        lat: response.data.coord.lat,
      },
      temperature: {
        actual: response.data.main.temp,
        feels_like: response.data.main.feels_like,
      },
      humidity: response.data.main.humidity,
      pressure: response.data.main.pressure,
      wind: response.data.wind.speed,
      weather: response.data.weather[0],
      cityName: response.data.name,

      countryName: forecast.city.country,
      forecastList: forecast.list,
    };

    console.log(filteredData);
    return filteredData;
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
