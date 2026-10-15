import axios from "axios";

const API_KEY = import.meta.env.VITE_OPENWEATHER_API_KEY;
const BASE_URL = "https://api.openweathermap.org/data/2.5/weather";

export async function fetchWeather(city) {
  if (!API_KEY) {
    throw new Error("Missing API key. Add VITE_OPENWEATHER_API_KEY to your .env file.");
  }

  // The city is inserted dynamically using a template literal.
  const url = `${BASE_URL}?q=${encodeURIComponent(city)}&appid=${API_KEY}&units=metric`;
  const response = await axios.get(url);
  return response.data;
}
