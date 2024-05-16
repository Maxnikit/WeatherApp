// src/stores/WeatherStore.ts
import { makeAutoObservable } from "mobx";
import { makePersistable } from "mobx-persist-store";
import { WeatherData } from "../types/weather.types";
import { formatDateTime } from "../utilities/utilities";

class WeatherStore {
  weatherList: WeatherData[] = [];

  constructor() {
    makeAutoObservable(this);

    makePersistable(this, {
      name: "WeatherStore",
      properties: ["weatherList"],
      storage: window.localStorage,
    });
  }

  //  a function to find a city in list by id
  findCityById = (id: number) => {
    return this.weatherList.find((city) => city.id === id);
  };

  addWeatherData = (weatherData: any) => {
    // check if city is already added to prevent dublicates
    if (this.findCityById(weatherData.id)) return;

    // Ensure tempType is set when adding new data
    const defaultTempType = "C";
    // add city to list
    this.weatherList.push({
      ...weatherData,
      tempType: weatherData.tempType || defaultTempType,
      formattedDate: formatDateTime(weatherData.timezone),
    });
  };

  removeWeatherData = (id: number) => {
    this.weatherList = this.weatherList.filter((city) => city.id !== id);
  };

  updateWeatherDataTempType = (id: number, newTempType: "C" | "F") => {
    const cityWeather = this.weatherList.find((city) => city.id === id);
    if (cityWeather) {
      cityWeather.tempType = newTempType;
    }
  };

  getTempType = (id: number): "C" | "F" => {
    const cityWeather = this.weatherList.find((city) => city.id === id);
    if (cityWeather) {
      return cityWeather.tempType;
    } else return "C";
  };

  getFormattedDate = (id: number): string => {
    const cityWeather = this.weatherList.find((city) => city.id === id);
    if (cityWeather) {
      return cityWeather.formattedDate;
    } else return "";
  };

  updateTimeGlobally = () => {
    this.weatherList.forEach((city) => {
      city.formattedDate = formatDateTime(city.timezone);
    });
  };

  getWeatherList = () => {
    return this.weatherList;
  };

  consoleLogWeatherList = () => {
    console.log(JSON.parse(JSON.stringify(this.weatherList)));
  };

  clearWeatherList = () => {
    this.weatherList = [];
  };
}

const weatherStore = new WeatherStore();
export default weatherStore;
