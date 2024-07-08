import React from "react";
import axios from "axios";
import { render, screen, fireEvent } from "@testing-library/react";
import Dashboard from "pages/Dashboard";
import { apiCallSearch, apiCallLocation } from "./api";
import { MemoryRouter, useNavigate } from "react-router-dom";
import { mockLocations } from "./mockData";

jest.mock("axios");
jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: jest.fn(),
}));

describe("<Dashboard />", () => {
  const mockNavigate = jest.fn();

  beforeEach(() => {
    jest.mocked(useNavigate).mockReturnValue(mockNavigate);

    render(
      <MemoryRouter>
        <Dashboard />
      </MemoryRouter>,
    );
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("searches weather data by searched name", async () => {
    const name = "London";
    const mockResponse = { data: mockLocations };
    axios.get.mockResolvedValue(mockResponse);

    const current = await apiCallSearch(name);
    expect(current).toBe(mockLocations);
    expect(axios.get).toHaveBeenCalledTimes(1);
    expect(axios.get).toHaveBeenCalledWith(
      `${process.env.REACT_APP_WEATHER_GEOAPI_URL}?name=${name}`,
    );
  });

  it("fetches weather data for specified location", async () => {
    const lat = 46.0;
    const long = 9.18;
    const mockResponse = { data: mockLocations[0] };
    axios.get.mockResolvedValue(mockResponse);

    const current = await apiCallLocation(long, lat);
    expect(current).toBe(mockLocations[0]);
    expect(axios.get).toHaveBeenCalledTimes(1);
    expect(axios.get).toHaveBeenCalledWith(
      `${process.env.REACT_APP_WEATHER_API_URL}?latitude=${lat}&longitude=${long}&current=temperature_2m,relative_humidity_2m,is_day,precipitation,wind_speed_10m&daily=weather_code,temperature_2m_max,temperature_2m_min,sunrise,sunset&start_date=2024-07-08&end_date=2024-07-08&timezone=Europe/Rome`,
    );
  });
});
