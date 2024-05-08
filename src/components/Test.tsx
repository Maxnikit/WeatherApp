import React, { useState, useEffect } from "react";
import { getWeatherByCoordinates } from "../api/weather";

function App() {
  const [position, setPosition] = useState<{ lat: number; lng: number } | null>(
    null
  );

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const { latitude, longitude } = pos.coords;
        setPosition({ lat: latitude, lng: longitude });
      },
      (err) => {
        console.log(err);
      }
    );
  }, []);

  useEffect(() => {
    if (position) {
      getWeatherByCoordinates(position.lat, position.lng)
        .then((response) => {
          console.log(response);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }, [position]);

  return (
    <div>
      {position && (
        <div>
          Latitude: {position.lat}
          <br />
          Longitude: {position.lng}
        </div>
      )}
    </div>
  );
}

export default App;
