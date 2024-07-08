import React, { useEffect, useState } from "react";
import { getLocations } from "services/WeatherService";
import { CardList } from "components/CardList";
import { ToggleSwitch } from "components/Toggle";
import { LocationSearch } from "components/LocationSearch";
import { changeUnit } from "utils/changeUnit";
import styled from "styled-components";

import "react-toggle/style.css";

const Layout = styled.div`
  display: flex;
  height: 80vh;
  margin-top: 40px;
  flex-direction: column;
  justify-content: center;
  padding: 2em;
`;

const PopupContainer = styled.div`
  position: fixed:
  background: rgba(0, 0, 0, 0.5):
  height: 100vh;
  width: 100vw;
  top: 0px;
  margin-left: -22px;
`;

const Popup = styled.div`
  z-index: 10000;
  background-color: #212121;
  backdrop-filter: blur(20px);
  border: purple;
  position: fixed;
  top: 50%;
  left: 50%;
  width: 350px;
  padding: 3em 2em;
  border-radius: 10px;
  transform: translate(-50%, -50%);
`;

function Dashboard() {
  const [locations, setLocations] = useState(null);
  const [error, setError] = useState(null);
  const [unit, setUnit] = useState(localStorage.getItem("toggle") === "false");
  const [hide, setHide] = useState(false);
  const [geolocation, setGeolocation] = useState(
    localStorage.getItem("allow") === "true",
  );

  const allowLocation = (isAllowed) => {
    localStorage.setItem("allow", JSON.stringify(isAllowed));
    setGeolocation(isAllowed);
  };

  const fetchLocations = () => {
    navigator.geolocation.getCurrentPosition((position) => {
      getLocations(
        setLocations,
        setError,
        position.coords.latitude,
        position.coords.longitude,
      );
    });
  };

  useEffect(() => {
    // Check permissions.query exists
    let isComponentMounted = true;
    if (isComponentMounted) {
      navigator.permissions.query({ name: "geolocation" }) &&
        navigator.permissions.query({ name: "geolocation" }).then((result) => {
          if (result.state === "granted") {
            fetchLocations();
            allowLocation(true);
          }
          if (result.state === "prompt") {
            fetchLocations();
          }
          if (result.state === "denied") {
            getLocations(setLocations, setError);
            allowLocation(false);
          }
        });
    }
    return () => {
      isComponentMounted = false;
    };
  }, []);

  // On permission change, update location data
  useEffect(() => {
    navigator.permissions.query({ name: "geolocation" }) &&
      navigator.permissions.query({ name: "geolocation" }).then((result) => {
        result.onchange = function () {
          if (result.state === "granted") {
            fetchLocations();
            allowLocation(true);
          }
          if (result.state === "denied") {
            getLocations(setLocations, setError);
            allowLocation(false);
          }
        };
      });
  });

  if (error) {
    return (
      <span style={{ padding: "1em" }}>
        There was a problem loading the weather forecast. Please allow location
        services, try and refresh the page or restart your internet connection.
      </span>
    );
  }

  return (
    <div>
      <ToggleSwitch
        data-testid="toggle-switch"
        changeUnit={() => changeUnit(unit, setUnit)}
        unit={unit}
      />
      <Layout>
        <h1 style={{ padding: "1em 0" }}>Dashboard</h1>
        <CardList locations={locations} unit={unit} />
        <LocationSearch setLocations={setLocations} setError={setError} />
      </Layout>
      {!geolocation && !hide && (
        <PopupContainer>
          <Popup>
            <span>
              Please allow location services in your browser settings to view
              local weather information
            </span>
            <button onClick={() => setHide(true)}>ok</button>
          </Popup>
        </PopupContainer>
      )}
    </div>
  );
}

export default Dashboard;
