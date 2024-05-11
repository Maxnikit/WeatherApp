// src/stores/WeatherStore.ts
import { makeAutoObservable } from "mobx";
import { WeatherData } from "../types/weather.types";

class WeatherStore {
  weatherList: WeatherData[] = [];

  constructor() {
    makeAutoObservable(this);
  }

  addWeatherData = (weatherData: WeatherData) => {
    // check if city is already added to prevent dublicates
    const isCityAlreadyInList = this.weatherList.find(
      (city) => city.cityName === weatherData.cityName
    );
    if (isCityAlreadyInList) return;

    // add city to list
    this.weatherList.push(weatherData);
  };

  removeWeatherData = (cityName: string) => {
    this.weatherList = this.weatherList.filter(
      (city) => city.cityName !== cityName
    );
  };

  clearWeatherData = () => {
    this.weatherList = [];
  };
}

const weatherStore = new WeatherStore();
export default weatherStore;
