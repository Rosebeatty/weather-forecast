import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import Location from "./pages/Location";
import styled from "styled-components";

const StyledApp = styled.div`
  background: linear-gradient(to left, #ffafbd, #ffc3a0);
  height: 100%;
  min-height: 100vh;
  margin: 0 auto;
  padding: 0.6em 1.4em;
  text-align: center;
  color: white;
`;

function App() {
  return (
    <StyledApp>
      <BrowserRouter>
        <Routes>
          <Route exact path="/" element={<Dashboard />} />
          <Route exact path="/weather/:location" element={<Location />} />
        </Routes>
      </BrowserRouter>
    </StyledApp>
  );
}

export default App;
