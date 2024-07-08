import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { ToggleSwitch } from "components/Toggle";
import Toggle from "react-toggle";

describe("<ToggleSwitch />", () => {
  const changeUnit = jest.fn();
  const unit = false;

  beforeEach(() => {
    render(<ToggleSwitch changeUnit={changeUnit} unit={unit} />);
  });

  it("renders without crashing", () => {
    const { asFragment } = render(
      <ToggleSwitch changeUnit={changeUnit} unit={unit} />
    );
    expect(asFragment()).toMatchSnapshot();
  });

  // test celsius/fahrenheit toggle changes value
  it("tests toggle switch on change event is called", () => {
    render(
      <Toggle
        id="toggle"
        defaultChecked={unit}
        icons={{
          checked: "°C",
          unchecked: "°F",
        }}
        onChange={changeUnit}
      />
    );

    fireEvent.click(screen.getAllByRole("checkbox")[1], {
      target: { checked: false },
    });

    expect(changeUnit).toHaveBeenCalledTimes(1);
  });
});
