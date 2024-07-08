import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import { BrowserRouter as Router } from "react-router-dom";
import { CardList } from "components/CardList";
import { mockLocations } from "./mockData";
import { fahrenheit } from "utils/fahrenheit";

describe("<CardList />", () => {
  const mockProps = {
    locations: mockLocations,
    unit: false,
  };

  beforeEach(() => {
    render(
      <Router>
        <CardList {...mockProps} />
      </Router>,
    );
  });

  it("renders without crashing", () => {
    const { asFragment } = render(
      <Router>
        <CardList {...mockProps} />
      </Router>,
    );
    expect(asFragment()).toMatchSnapshot();
  });

  it("should render 1 location's cards/links", () => {
    const links = screen.getAllByRole("link");
    expect(links).toHaveLength(1);
  });

  it("rounds decimals to whole numbers", () => {
    const unitElement = screen.getByText(
      (content, element) => element.id === "unit",
    );
    expect(unitElement.textContent).not.toContain(".");
  });

  it("converts Celsius to Fahrenheit", () => {
    const unitElement = screen.getByText(
      (content, element) => element.id === "unit",
    );
    const tempC = unitElement.textContent.split("°")[0];
    const tempF = fahrenheit(tempC);
    expect(tempF).toEqual(136);
  });

  it("tests link to Location page has correct props", async () => {
    await waitFor(() => {
      const linkElement = screen.getByRole("link", { name: /Local/i });
      expect(linkElement).toHaveAttribute("href", "/weather/localWeather");
    });
  });

  it("displays temperature on the first card", async () => {
    await waitFor(() => {
      const linkElement = screen.getByRole("link", { name: /58°F/i });
      expect(linkElement).toBeInTheDocument();
    });
  });
});
