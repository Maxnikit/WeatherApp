import { AreaChart } from "@mantine/charts";

import { convertToCelsius, convertToFahrenheit } from "../utilities/utilities";

type TemperatureUnit = "C" | "F";
interface Props {
  forecastList: any;
  tempType: TemperatureUnit;
  color: string;
}

function WeatherChart({ forecastList, tempType, color }: Props) {
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
  let zeroTemp = 0;
  if (tempType === "C") {
    yAxis = "temp.celsius";
    zeroTemp = 0;
  } else if (tempType === "F") {
    yAxis = "temp.fahrenheit";
    zeroTemp = 32;
  }

  // TODO Решить, использовать Mantine Charts или Recharts
  const renderCustomLabel = (props: any) => {
    const { x, y, value } = props;

    // TODO find a way to only remove 0 from start and end of chart
    if (value === zeroTemp) {
      return null;
    }

    // Equal to gray.5 from Mantine Colors
    const labelColor = "rgb(173, 181, 189)";
    let verticalOffset = 0;
    if (value > 0) {
      verticalOffset = -7;
    } else {
      verticalOffset = 14;
    }
    return (
      <text
        x={x}
        y={y}
        dy={verticalOffset}
        fill={labelColor}
        fontSize={10}
        textAnchor="middle"
      >
        {value}
      </text>
    );
  };

  return (
    <AreaChart
      my={20}
      h={120}
      data={[
        { date: "Start", temp: { celsius: 0, fahrenheit: 32 } }, // Start point at 0
        ...daysArray,
        { date: "End", temp: { celsius: 0, fahrenheit: 32 } }, // End point at 0
      ]}
      dataKey="date"
      series={[
        {
          name: yAxis,
          color: color,
        },
      ]}
      curveType="bump"
      withGradient
      withTooltip={false}
      strokeWidth={0}
      // type="stacked"
      textColor="gray.5"
      gridAxis="none"
      withYAxis={false}
      withDots={false}
      areaProps={{ label: renderCustomLabel }}
      // Does not render Start and End placeholders
      xAxisProps={{
        tickFormatter: (date) =>
          date === "Start" || date === "End" ? "" : date,
      }}
    />
  );
}
export default WeatherChart;
