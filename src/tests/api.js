import axios from "axios";

export const apiCallSearch = (name) => {
  return axios
    .get(`${process.env.REACT_APP_WEATHER_GEOAPI_URL}?name=${name}`)
    .then((response) => response.data);
};

export const apiCallLocation = async (long, lat) => {
  return axios
    .get(
      `${process.env.REACT_APP_WEATHER_API_URL}?latitude=${lat}&longitude=${long}&current=temperature_2m,relative_humidity_2m,is_day,precipitation,wind_speed_10m&daily=weather_code,temperature_2m_max,temperature_2m_min,sunrise,sunset&start_date=2024-07-08&end_date=2024-07-08&timezone=Europe/Rome`
    )
    .then((response) => response.data);
};
