// types/weather.types.ts
export interface WeatherData {
  coords: {
    lon: number;
    lat: number;
  };
  weather: {
    id: number;
    main: string;
    description: string;
    icon: string;
  };

  humidity: number;
  pressure: number;
  wind: number;
  temperature: {
    actual: number;
    feels_like: number;
  };
  tempType: "C" | "F";
  cityName: string; // City name
  countryName: string;
  forecastList: any;
  timezone: number;
  formattedDate: string;
  id: number;
}
