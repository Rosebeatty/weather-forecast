import styled from "styled-components";
import { fahrenheit } from "utils/fahrenheit";
import { format } from "date-fns";

const Grid = styled.div`
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  color: purple;
  margin: 0 auto;
  max-width: 75vw;
  @media only screen and (max-width: 720px) {
  }
`;
const Box = styled.div`
  padding: 0.7em;
  width: 25vw;

  &.box-1 {
    border-right: 1px solid purple;
    border-bottom: 1px solid purple;
  }
  &.box-2 {
    border-bottom: 1px solid purple;
  }
  &.box-4 {
    border-left: 1px solid purple;
  }
`;
const Card = styled.div`
  min-height: 35vh;
  max-width: 60vw;
  display: flex;
  color: purple;
  flex-direction: column;
  justify-content: center;
  margin: 1.7em auto;
  text-align: left;
  align-items: center;
  background-color: rgba(245, 245, 245, 0.2);
  border-radius: 5px;

  @media only screen and (max-width: 720px) {
    min-height: 38vh;
    min-width: 75vw;
  }
`;
const MaxMin = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
  gap: 0.5em;
  width: 40vw;
`;
const Temp = styled.h1`
  font-size: 3.7em;
  margin: 0.2em 0;
`;

// Weather details display for chosen location
function WeatherDetails({ destination, selectedResult, unit, isLocal }) {
  const { current, current_units, daily, daily_units } = destination;
  const sunrise = format(new Date(daily.sunrise[0]), "HH:mm");
  const sunset = format(new Date(daily.sunset[0]), "HH:mm");

  return (
    <div>
      <h1>
        {(selectedResult &&
          `${selectedResult?.name}, ${selectedResult?.country}`) ||
          (isLocal === true && "Local Weather") ||
          `${destination.longitude}° long - ${destination.longitude}° lat`}
      </h1>
      <h2 style={{ fontSize: "16px" }}>
        {format(new Date(daily.time[0]), "EEEE LLLL do y")}
      </h2>
      <Card>
        <Temp>
          <p id="unit" data-testid="unit">
            {unit
              ? `${Math.round(current.temperature_2m)} ${current_units.temperature_2m}`
              : `${fahrenheit(current.temperature_2m)}°F`}
          </p>
        </Temp>
        <MaxMin>
          <p>
            Min:{" "}
            {unit
              ? `${Math.round(daily.temperature_2m_min)} ${daily_units.temperature_2m_min}`
              : `${fahrenheit(daily.temperature_2m_min)}°F`}
          </p>
          <p>
            Max:{" "}
            {unit
              ? `${Math.round(daily.temperature_2m_max)} ${daily_units.temperature_2m_max}`
              : `${fahrenheit(daily.temperature_2m_max)}°F`}
          </p>
        </MaxMin>
      </Card>
      <Grid>
        {selectedResult && (
          <>
            <Box className="box-1">
              <h4>Sunrise</h4>
              <p>{sunrise}</p>
            </Box>
            <Box className="box-2">
              <h4>Sunset</h4>
              <p>{sunset}</p>
            </Box>
          </>
        )}
        <Box className="box-1">
          <h4>Wind Speed</h4>
          <p>
            {current.wind_speed_10m} {current_units.wind_speed_10m}
          </p>
        </Box>
        <Box className="box-2">
          <h4>Percipitation</h4>
          <p>
            {current.precipitation} {current_units.precipitation}
          </p>
        </Box>
        <Box>
          <h4>Humidity</h4>
          <p>
            {current.relative_humidity_2m} {current_units.relative_humidity_2m}
          </p>
        </Box>
      </Grid>
    </div>
  );
}

export default WeatherDetails;
