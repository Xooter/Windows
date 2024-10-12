import "dotenv/config";
import axios from "axios";

export async function getWeatherConditions() {
  const URL = `https://api.openweathermap.org/data/2.5/weather?${process.env.COORDS}&units=metric&appid=${process.env.WEATHER_API}`;
  return axios.get(URL);
}
