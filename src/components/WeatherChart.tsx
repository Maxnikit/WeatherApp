import { AreaChart } from "@mantine/charts";

import { convertToCelsius, convertToFahrenheit } from "../utilities/utilities";
import {
  Area,
  // AreaChart,
  CartesianGrid,
  LabelList,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

type TemperatureUnit = "C" | "F";
interface Props {
  forecastList: any;
  tempType: TemperatureUnit;
}
function WeatherChart({ forecastList, tempType }: Props) {
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

  // TODO Решить, использовать Mantine Charts или Recharts
  const renderCustomLabel = (props: any) => {
    console.log(props);
    const { x, y, stroke, value, index } = props;

    // Check if the current label is for the 'Start' or 'End' data point by index
    // if (index === 0 || index === payload.length - 1) {
    //   // This is the first or last label, return null to avoid rendering it
    //   return null;
    // }
    if (value === 0) {
      return null;
    }
    console.log(index);
    // Render the label normally for all other data points
    return (
      <text
        x={x}
        y={y}
        dy={-7}
        fill="rgb(134, 142, 150)"
        fontSize={10}
        textAnchor="middle"
      >
        {value}
      </text>
    );
  };

  return (
    // MANTINE
    <AreaChart
      my={20}
      h={120}
      data={[
        { date: "Start", temp: { celsius: 0 } }, // Start point at 0
        ...daysArray,
        { date: "End", temp: { celsius: 0 } }, // End point at 0
      ]}
      dataKey="date"
      series={[
        {
          name: yAxis,
          color: "indigo.6",
        },
      ]}
      curveType="bump"
      withGradient
      withTooltip={false}
      strokeWidth={0}
      type="stacked"
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

    // RECHARTS
    // <ResponsiveContainer width="100%" height={140}>
    //   <AreaChart
    //     data={daysArray}
    //     margin={{ top: 20, right: 20, bottom: 0, left: 20 }}
    //   >
    //     <defs>
    //       <linearGradient id="colorTemperature" x1="0" y1="0" x2="0" y2="1">
    //         <stop offset="5%" stopColor="#4C51BF" stopOpacity={0.8} />
    //         <stop offset="95%" stopColor="#4C51BF" stopOpacity={0} />
    //       </linearGradient>
    //     </defs>
    //     <XAxis dataKey="date" />
    //     <Area
    //       type="bump"
    //       dataKey="temp.celsius"
    //       stroke="#4C51BF"
    //       strokeWidth={0.5}
    //       fillOpacity={1}
    //       fill="url(#colorTemperature)"
    //       stackId="1"
    //       label
    //     >
    //       <LabelList dataKey="temp.celsius" position="top" />
    //     </Area>
    //   </AreaChart>
    // </ResponsiveContainer>
  );
}
export default WeatherChart;
