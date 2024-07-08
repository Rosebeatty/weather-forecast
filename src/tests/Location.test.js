import React from "react";
import { render, fireEvent, screen } from "@testing-library/react";
import Location from "pages/Location";
import { BrowserRouter as Router } from "react-router-dom";
import { mockLocations } from "./mockData";

describe("<Location />", () => {
  const mockProps = {
    location: {
      state: {
        destination: mockLocations[0],
      },
    },
  };

  beforeEach(() => {
    localStorage.setItem("toggle", "false");
    render(
      <Router>
        <Location {...mockProps} />
      </Router>
    );
  });

  it("renders without crashing", () => {
    const { asFragment } = render(
      <Router>
        <Location {...mockProps} />
      </Router>
    );
    expect(asFragment()).toMatchSnapshot();
  });
});
