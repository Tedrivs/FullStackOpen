import axios from "axios";

const api_key = import.meta.env.VITE_OPEN_WEATHER_KEY;

const GetWeather = (cityName) => {
  console.log("apikey ", api_key);
  const request = axios.get(
    `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&APPID=${api_key}`
  );
  return request.then((response) => response.data);
};

export default { GetWeather };
