import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { TailSpin } from "react-loader-spinner";
import { fahrenheit } from "utils/fahrenheit";

const Cards = styled.div`
  display: flex;
  width: 100%;
  justify-content: center;
  flex-wrap: wrap;
`;
const Card = styled.div`
  flex: 0 1 24%;
  min-width: 22vw;
  min-height: 22vh;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin: 0.7em 1em;
  background-color: rgba(245, 245, 245, 0.2);
  border-radius: 5px;
  padding: 0 3.5em;
  &:hover {
    background-color: rgba(245, 245, 245, 0.1);
  }
  @media only screen and (max-width: 720px) {
    min-width: 50vw;
    min-height: 22vh;
  }
`;
const Loading = styled.div`
  height: 25vh;
  display: flex;
  align-items: center;
`;

export const CardList = ({ locations, unit }) => (
  <Cards>
    {locations ? (
      locations.map((destination, i) => {
        const { current, current_units, latitude, longitude } = destination;
        return (
          <div id={`${latitude}&${longitude}`} key={i}>
            <Link
              key={i}
              to={{
                pathname: `weather/localWeather`,
              }}
              state={{ destination, isLocal: true }}
              style={{ textDecoration: "none", color: "purple" }}
            >
              <Card>
                <h3>Local Weather</h3>
                <p id="unit">
                  {unit
                    ? `${Math.round(current.temperature_2m)} ${current_units.temperature_2m}`
                    : `${fahrenheit(current.temperature_2m)}°F`}
                </p>
              </Card>
            </Link>
          </div>
        );
      })
    ) : (
      <Loading>
        <TailSpin
          visible={true}
          height="80"
          width="80"
          color="purple"
          ariaLabel="tail-spin-loading"
          radius="1"
        />
      </Loading>
    )}
  </Cards>
);
