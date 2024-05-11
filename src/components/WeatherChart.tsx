import { AreaChart } from "@mantine/charts";

import { convertToCelsius, convertToFahrenheit } from "../utilities/utilities";

type TemperatureUnit = "C" | "F";
interface Props {
  forecastList: any;
  tempType: TemperatureUnit;
}
function WeatherChart({ forecastList, tempType }: Props) {
  console.warn(tempType);
  // Get the forecast data for each day
  const daysMap = new Map();

  for (let i = 0; i < forecastList.length; i++) {
    const forecast = forecastList[i];
    const unixTimeStamp = forecast.dt;
    const myDate = new Date(unixTimeStamp * 1000); // convert timestamp to milliseconds and construct Date object

    // Create a date string in the "DD.MM" format
    const dateKey = myDate.toISOString().split("T")[0]; // 'YYYY-MM-DD'
    const day = myDate.getDate().toString().padStart(2, "0");
    const month = (myDate.getMonth() + 1).toString().padStart(2, "0"); // +1 because getMonth returns 0-11
    const dateProperty = `${day}.${month}`;

    const tempInCelsius = convertToCelsius(forecast.main.temp);
    const tempInFahrenheit = convertToFahrenheit(forecast.main.temp);

    if (!daysMap.has(dateKey)) {
      // Add the dateProperty to the forecast object
      const forecastWithDate = {
        ...forecast,
        date: dateProperty,
        temp: {
          celsius: tempInCelsius,
          fahrenheit: tempInFahrenheit,
        },
      };
      daysMap.set(dateKey, forecastWithDate);
    }
  }

  const daysArray = Array.from(daysMap.values());

  let yAxis = "";

  if (tempType === "C") {
    yAxis = "temp.celsius";
  } else if (tempType === "F") {
    yAxis = "temp.fahrenheit";
  }

  return (
    <AreaChart
      h={140}
      data={daysArray}
      dataKey="date"
      series={[
        {
          name: yAxis,
          color: "indigo.6",
        },
      ]}
      curveType="natural"
      withGradient
      withTooltip={false}
      strokeWidth={0.5}
      type="stacked"
      gridAxis="none"
      //   withYAxis={false}
      withDots={false}
      yAxisProps={{ width: 30 }}
    />
  );
}
export default WeatherChart;
