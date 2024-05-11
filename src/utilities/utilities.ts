const convertToCelsius = (k: number) => {
  return (k - 273.15).toFixed(1);
};

const convertToFahrenheit = (k: number) => {
  return (((k - 273.15) * 9) / 5 + 32).toFixed(1);
};
export { convertToCelsius, convertToFahrenheit };
