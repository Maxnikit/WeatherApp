// src/stores/WeatherStore.ts
import { makeAutoObservable } from "mobx";
import { makePersistable } from "mobx-persist-store";
import { WeatherData } from "../types/weather.types";

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

  addWeatherData = (weatherData: WeatherData) => {
    // check if city is already added to prevent dublicates
    const isCityAlreadyInList = this.weatherList.find(
      (city) => city.cityName === weatherData.cityName
    );
    if (isCityAlreadyInList) return;

    // Ensure tempType is set when adding new data
    const defaultTempType = "C";
    // add city to list
    this.weatherList.push({
      ...weatherData,
      tempType: weatherData.tempType || defaultTempType,
    });
  };

  removeWeatherData = (cityName: string) => {
    this.weatherList = this.weatherList.filter(
      (city) => city.cityName !== cityName
    );
  };

  updateWeatherDataTempType = (cityName: string, newTempType: "C" | "F") => {
    console.log(cityName, newTempType);
    const cityWeather = this.weatherList.find(
      (city) => city.cityName === cityName
    );
    if (cityWeather) {
      cityWeather.tempType = newTempType;
    }
  };

  getTempTypeByCityName = (cityName: string): "C" | "F" => {
    const cityWeather = this.weatherList.find(
      (city) => city.cityName === cityName
    );
    if (cityWeather) {
      return cityWeather.tempType;
    } else return "C";
  };

  clearWeatherData = () => {
    this.weatherList = [];
  };
}

const weatherStore = new WeatherStore();
export default weatherStore;
