import axios from "axios";
import { format } from "date-fns";

export const searchLocation = async (setLocations, setError, locationName) => {
  try {
    const result = await axios.get(
      `${process.env.REACT_APP_WEATHER_GEOAPI_URL}?name=${locationName}`
    );
    setLocations(result.data.results);
  } catch (err) {
    setError(err);
  }
};
export const getLocations = async (
  setLocations,
  setError,
  lat,
  long,
  startDate = new Date(),
  timeZone
) => {
  let locations = [];
  try {
    if (lat && long) {
      const timezone =
        timeZone || Intl.DateTimeFormat().resolvedOptions().timeZone || "GMT";
      const date = format(new Date(startDate), "yyyy-MM-dd");
      const current = await axios.get(
        `${process.env.REACT_APP_WEATHER_API_URL}?latitude=${lat}&longitude=${long}&current=temperature_2m,relative_humidity_2m,is_day,precipitation,wind_speed_10m&daily=weather_code,temperature_2m_max,temperature_2m_min,sunrise,sunset&start_date=${date}&end_date=${date}&timezone=${timezone}`
      );
      locations.push(current.data);
    }
    setLocations(locations);
    return locations;
  } catch (err) {
    setError(err);
  }
};
