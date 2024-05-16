import axios from "axios";
import { WeatherData } from "../types/weather.types";

const API_KEY = process.env.REACT_APP_WEATHER_API_KEY;

export async function getWeatherByCoordinates(lat: number, lon: number) {
  if (!API_KEY) throw new Error("No API key provided");
  if (!lat || !lon) throw new Error("No location provided");

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

    // Get forecast in another api call
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
      tempType: "C" as const,
      humidity: response.data.main.humidity,
      pressure: response.data.main.pressure,
      wind: response.data.wind.speed,
      weather: response.data.weather[0],
      cityName: response.data.name,
      timezone: response.data.timezone,
      id: response.data.id,
      countryName: response.data.sys.country,
      forecastList: forecast.list,

      formattedDate: "",
    };

    return filteredData;
  } catch (error) {
    console.error(error);
    throw error;
  }
}

export const getWeatherByCityName = async (
  searchTerm: string
): Promise<WeatherData> => {
  try {
    const response = await axios.get(
      `https://api.openweathermap.org/data/2.5/weather`,
      {
        params: {
          q: searchTerm,

          appid: API_KEY,
        },
      }
    );
    // Get forecast
    const forecast = await getForecastByCityName(response.data.name);
    console.log(response.data);
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
      tempType: "C" as const,
      humidity: response.data.main.humidity,
      pressure: response.data.main.pressure,
      wind: response.data.wind.speed,
      weather: response.data.weather[0],
      cityName: response.data.name,
      timezone: response.data.timezone,
      id: response.data.id,
      countryName: response.data.sys.country,
      forecastList: forecast.list,

      formattedDate: "",
    };

    return filteredData;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export async function getForecastByCityName(cityName: string) {
  // Abort if no city name provided
  if (!cityName)
    return new Response(JSON.stringify({ error: "No location provided" }), {
      status: 400,
      statusText: "Bad request",
    });

  // Get forecast
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
    console.error(error);
    throw error;
  }
}
