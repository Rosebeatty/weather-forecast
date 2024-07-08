import Toggle from "react-toggle";
import styled from "styled-components";

import "react-toggle/style.css";

const Label = styled.div`
  position: absolute;
  top: 3%;
  right: 5%;
`;
const Icon = styled.p`
  padding-top: 0.3em;
  color: white;
  margin: 0;
`;

// Toggle to switch temperature units (°F/°C)
export const ToggleSwitch = ({ unit, changeUnit }) => (
  <Label htmlFor="toggle">
    <Toggle
      id="toggle"
      data-testid="toggle"
      defaultChecked={unit}
      icons={{
        checked: <Icon>°C</Icon>,
        unchecked: <Icon>°F</Icon>,
      }}
      onChange={changeUnit}
      aria-label="No label"
    />
  </Label>
);
