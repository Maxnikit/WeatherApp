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

  //   TODO: find something in place of cityID to remove cities
  //   removeWeatherData = (cityId: number) => {
  //     this.weatherList = this.weatherList.filter(
  //       (data) => data.cityId !== cityId
  //     );
  //   };

  clearWeatherData = () => {
    this.weatherList = [];
  };
}

const weatherStore = new WeatherStore();
export default weatherStore;
