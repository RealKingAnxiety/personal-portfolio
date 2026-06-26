'use client';
import { useState, useEffect } from 'react';

type Weather = {
  temp: number;
  description: string;
  location: string;
};

export function useWeather() {
  const [weather, setWeather] = useState<Weather | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchWeather = async () => {
      try {
        // Cache Valley, UT (Logan) - NWS API
        const res = await fetch('https://api.weather.gov/gridpoints/SLC/100,100/forecast', {
          cache: 'no-store'
        });
        const data = await res.json();

        const period = data.properties.periods[0];

        setWeather({
          temp: period.temperature,
          description: period.shortForecast,
          location: "Cache Valley, UT"
        });
      } catch (error) {
        console.error("Weather fetch failed", error);
        setWeather({
          temp: 72,
          description: "Sunny",
          location: "Cache Valley, UT"
        });
      } finally {
        setLoading(false);
      }
    };

    fetchWeather();
  }, []);

  return { weather, loading };
}