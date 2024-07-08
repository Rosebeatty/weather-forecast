import React from "react";
import { render } from "@testing-library/react";
import Dashboard from "pages/Dashboard";
import { MemoryRouter, useNavigate } from "react-router-dom";

// Mock useNavigate
jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: jest.fn(),
}));

describe("<Dashboard />", () => {
  const mockNavigate = jest.fn();

  beforeEach(() => {
    jest.mocked(useNavigate).mockReturnValue(mockNavigate);

    localStorage.setItem("toggle", "false");
    render(
      <MemoryRouter>
        <Dashboard />
      </MemoryRouter>
    );
  });

  it("renders without crashing", () => {
    const { asFragment } = render(<Dashboard />);
    expect(asFragment()).toMatchSnapshot();
  });
});
