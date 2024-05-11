// src/stores/WeatherStore.ts
import { makeAutoObservable } from "mobx";
import { WeatherData } from "../types/weather.types";

class WeatherStore {
  weatherList: WeatherData[] = [];

  constructor() {
    makeAutoObservable(this);
  }

  addWeatherData = (weatherData: WeatherData) => {
    this.weatherList.push(weatherData);
  };

  removeWeatherData = (cityName: string) => {
    console.log("city to remove: ", cityName);
    console.log("weatherList: ", this.weatherList);
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
