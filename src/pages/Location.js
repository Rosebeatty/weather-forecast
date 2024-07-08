import React, { useState } from "react";
import { BackButton } from "components/BackButton";
import { ToggleSwitch } from "components/Toggle";
import WeatherDetails from "components/WeatherDetails";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { changeUnit } from "utils/changeUnit";

function Location() {
  const [unit, setUnit] = useState(localStorage.getItem("toggle") === "false");
  const { state } = useLocation();
  const navigate = useNavigate();

  if (!state?.destination) {
    return navigate("/");
  }
  return (
    <div style={{ marginTop: "70px" }}>
      <ToggleSwitch
        data-testid="toggle-switch"
        changeUnit={() => changeUnit(unit, setUnit)}
        unit={unit}
      />
      <BackButton />
      <WeatherDetails
        destination={state.destination}
        selectedResult={state.selectedResult}
        isLocal={state.isLocal}
        unit={unit}
      />
    </div>
  );
}

export default Location;
