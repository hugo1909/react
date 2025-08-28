import { useEffect, useState, useCallback } from "react";
import { fetchWeather } from "../services/weatherAPI";

export const useWeather = () => {
  const [location, setLocation] = useState("Hanoi");
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const getWeather = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await fetchWeather(location);
      setWeather(data);
    } catch (error) {
      setError(error);
    } finally {
      setLoading(false);
    }
  }, [location]);

  const refreshWeather = () => {
    getWeather();
  };

  useEffect(() => {
    getWeather();
  }, [getWeather]);

  return { weather, loading, error, setLocation, refreshWeather };
};
