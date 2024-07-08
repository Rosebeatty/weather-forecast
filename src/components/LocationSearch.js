import React, { useCallback, useState, useMemo } from "react";
import { getLocations, searchLocation } from "services/WeatherService";
import debounce from "lodash/debounce";
import styled from "styled-components";
import DatePicker from "react-datepicker";
import { useNavigate } from "react-router-dom";
import { addDays } from "date-fns";

import "react-datepicker/dist/react-datepicker.css";

const FlexBox = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 4em;
  padding: 2.8em 0;
`;

const InputField = styled.input`
  padding: 10px;
  border: 2px solid purple;
  color: purple;
  background-color: rgba(245, 245, 245, 0.2);
  border-radius: 4px;
  font-size: 16px;
  min-width: 50px;
  transition: border-color 0.3s;

  &:focus {
    border-color: #007bff;
    outline: none;
  }
  &:disabled {
    background-color: lightgrey;
    opacity: 1;
  }
`;
const Label = styled.label`
  width: 69px;
  font-size: 14px;
  font-weight: bold;
  text-align: left;
  padding: 10px;
  padding-left: 0px;
  color: purple;
  margin-bottom: 5px;
`;

const SearchContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 3vw;
`;

const SearchButton = styled.button`
  padding: 10px 20px;
  border: none;
  border-radius: 4px;
  background-color: purple;
  color: #fff;
  font-size: 16px;
  cursor: pointer;
  transition: background-color 0.3s;
  opacity: ${(props) => (props.disabled ? 0.5 : 1)};
  pointer-events: ${(props) => (props.disabled ? "none" : "auto")};

  &:hover {
    background-color: #0056b3;
  }
`;

const Dropdown = styled.ul`
  list-style: none;
  padding: 0;
  margin-top: 41px;
  border: 1px solid #ccc;
  border-radius: 4px;
  position: absolute;
  width: 190px;
  background-color: rgba(0, 0, 0, 0.6);
  max-height: 150px;
  overflow-y: auto;
  z-index: 1000;
`;

const DropdownItem = styled.li`
  padding: 10px;
  cursor: pointer;

  &:hover {
    background-color: rgba(245, 245, 245, 0.2);
  }
`;

// Search weather by location name or coordinates
export const LocationSearch = ({ setLocations, setError }) => {
  const [startDate, setStartDate] = useState("");
  const [timezone, setTimezone] = useState(null);
  const [locations, setSearchLocations] = useState([]);
  const [longitude, setLongitude] = useState("");
  const [latitude, setLatitude] = useState("");
  const [locationQuery, setLocationQuery] = useState("");
  const [selectedResult, setSelectedResult] = useState(null);

  const navigate = useNavigate();

  const debouncedSearchLocation = useCallback(
    debounce(searchLocation, 500),
    [],
  );
  const handleInputChange = (e) => {
    const locationValue = e.target.value;
    setLocationQuery(locationValue);
    setSelectedResult(null);
    debouncedSearchLocation(setSearchLocations, setError, locationValue);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Backspace") {
      setLocationQuery("");
      setSelectedResult(null);
      setLongitude("");
      setLatitude("");
    }
  };

  const handleLongitudeChange = (e) => {
    if (e.target.value <= 180 && e.target.value >= -180) {
      setLongitude(e.target.value);
    }
  };

  const handleLatitudeChange = (e) => {
    if (e.target.value <= 90 && e.target.value >= -90) {
      setLatitude(e.target.value);
    }
  };

  const handleResultClick = (result) => {
    setLocationQuery(`${result.name}, ${result.country}`);
    setLatitude(result.latitude);
    setLongitude(result.longitude);
    setTimezone(result.timezone);
    setSelectedResult(result);
    setSearchLocations([]);
  };

  const handleSearch = async (setLocations) => {
    const [destination] = await getLocations(
      setLocations,
      setError,
      latitude,
      longitude,
      startDate,
      timezone,
    );
    if (destination) {
      return navigate(`/weather/${selectedResult?.name || "newLocation"}`, {
        state: { destination, selectedResult },
      });
    }
  };

  const isSearchButtonDisabled = useMemo(
    () =>
      !Boolean(startDate) ||
      (!Boolean(selectedResult) && !Boolean(longitude)) ||
      !Boolean(latitude),
    [startDate, selectedResult, longitude, latitude],
  );

  return (
    <FlexBox>
      <SearchContainer>
        <Label htmlFor="date">Date*:</Label>
        <div>
          <DatePicker
            selected={startDate}
            onChange={(date) => setStartDate(date)}
            placeholderText="Pick a Date"
            maxDate={addDays(new Date(), 13)}
            customInput={
              <InputField type="text" required value={locationQuery} />
            }
          />
        </div>
      </SearchContainer>
      <div>
        <SearchContainer>
          <Label htmlFor="location">Location:</Label>
          <div style={{ display: "flex", flexDirection: "column" }}>
            <InputField
              id="location"
              type="text"
              disabled={
                !Boolean(selectedResult) &&
                (Boolean(longitude) || Boolean(latitude))
              }
              value={locationQuery}
              onChange={handleInputChange}
              onKeyDown={handleKeyDown}
              placeholder="City, Town or Zip Code"
            />

            {locations?.length > 0 && (
              <Dropdown>
                {locations.map((location, index) => (
                  <DropdownItem
                    key={index}
                    onClick={() => handleResultClick(location)}
                  >
                    {location?.name}, {location?.country}
                  </DropdownItem>
                ))}
              </Dropdown>
            )}
          </div>
        </SearchContainer>
        <p style={{ fontWeight: "bold", padding: "1em 0" }}>OR</p>
        <SearchContainer>
          <Label htmlFor="latitude">
            Latitude: <span style={{ fontSize: "10px" }}>(-90 to 90)</span>
          </Label>

          <InputField
            id="latitude"
            type="number"
            min="-90"
            max="90"
            disabled={Boolean(selectedResult)}
            value={latitude}
            onChange={handleLatitudeChange}
            style={{ width: "100%" }}
            placeholder="-5"
          />

          <Label htmlFor="longitude">
            Longitude: <span style={{ fontSize: "10px" }}>(-180 to 180)</span>
          </Label>
          <InputField
            id="longitude"
            type="number"
            min="-180"
            max="180"
            value={longitude}
            disabled={Boolean(selectedResult)}
            onChange={handleLongitudeChange}
            style={{ width: "100%" }}
            placeholder="10"
          />
        </SearchContainer>
      </div>
      <div>
        <SearchButton
          onClick={() => handleSearch(setLocations)}
          disabled={isSearchButtonDisabled}
        >
          Search
        </SearchButton>
      </div>
    </FlexBox>
  );
};
