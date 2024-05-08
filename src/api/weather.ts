import axios from "axios";

const API_KEY = "api";

export async function getWeatherByCoordinates(lat: number, lon: number) {
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
}
