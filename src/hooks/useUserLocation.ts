import { useState, useEffect } from "react";

interface UserLocation {
  lat: number;
  lon: number;
  id: number;
}

const useUserLocation = () => {
  const [location, setLocation] = useState<UserLocation | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!navigator.geolocation) {
      setError("Geolocation is not supported by your browser.");
      return;
    }

    const success = (position: GeolocationPosition) => {
      setLocation({
        lat: position.coords.latitude,
        lon: position.coords.longitude,
        id: 1,
      });
    };

    const error = (err: GeolocationPositionError) => {
      console.log(err);
      setError(err.message);
    };

    navigator.geolocation.getCurrentPosition(success, error);
  }, []);

  return { location, error };
};

export default useUserLocation;
