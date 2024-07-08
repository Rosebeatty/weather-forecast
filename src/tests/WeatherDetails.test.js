import React from "react";
import { render, screen } from "@testing-library/react";
import WeatherDetails from "components/WeatherDetails";
import { mockLocations } from "./mockData";
import { fahrenheit } from "utils/fahrenheit";
import { format } from "date-fns";

beforeEach(() => {
  const mockProps = {
    destination: mockLocations[0],
    unit: true,
  };
  render(<WeatherDetails {...mockProps} />);
});

it("renders without crashing", () => {
  const { asFragment } = render(
    <WeatherDetails destination={mockLocations[0]} unit={false} />,
  );
  expect(asFragment()).toMatchSnapshot();
});

it("rounds decimals to whole numbers", () => {
  const unitElement = screen.getByTestId("unit");
  expect(unitElement.textContent).not.toContain(".");
});

it("converts sunrise to datetime", () => {
  const sunrise = mockLocations[0].daily.sunrise[0];
  const date = format(new Date(sunrise), "HH:mm");
  expect(date).toEqual("05:41");
});

it("converts sunset to datetime", () => {
  const sunset = mockLocations[0].daily.sunset[0];
  const date = format(new Date(sunset), "HH:mm");
  expect(date).toEqual("21:15");
});
