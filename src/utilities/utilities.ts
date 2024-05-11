const convertToCelsius = (k: number) => {
  return (k - 273.15).toFixed(1);
};

const convertToFahrenheit = (k: number) => {
  return (((k - 273.15) * 9) / 5 + 32).toFixed(0);
};

// BUG: Date.now() uses timezone of system, not UTC 0
// Currentlu used a hack to just subtract 3 hours
// Should consider using a date timezone library?
function formatDateTime(utcShift: number) {
  const shiftInMilliseconds = utcShift * 1000;
  const threeHoursInMilliseconds = 3 * 60 * 60 * 1000;
  console.warn(shiftInMilliseconds);
  const currentTime = new Date(
    Date.now() + shiftInMilliseconds - threeHoursInMilliseconds
  );
  const daysOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  const dayOfWeek = daysOfWeek[currentTime.getUTCDay()];

  const date = currentTime.toLocaleDateString("en-US", {
    day: "numeric",
    month: "short",
  });

  const time = currentTime.toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "numeric",
    hour12: true,
  });

  return `${dayOfWeek}, ${date}, ${time}`;
}

export { convertToCelsius, convertToFahrenheit, formatDateTime };
