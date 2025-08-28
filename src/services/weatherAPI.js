// API service for Weather operations
// This can be configured to work with different backends

const API_KEY = process.env.REACT_APP_WEATHER_API_KEY;
const BASE_URL = process.env.REACT_APP_WEATHER_API_URL || 'https://api.weatherapi.com/v1';

export const fetchWeather = async (location) => {
  try {
    const response = await fetch(`${BASE_URL}/forecast.json?key=${API_KEY}&q=${location}&days=7&aqi=no&alerts=no`);
    if (!response.ok) {
      throw new Error('Failed to fetch weather data');
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const searchLocations = async (query) => {
  try {
    if (!query || query.length < 3) return [];
    
    const response = await fetch(`${BASE_URL}/search.json?key=${API_KEY}&q=${query}`);
    if (!response.ok) {
      throw new Error('Failed to search locations');
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Search error:', error);
    return [];
  }
};