import { Link } from "react-router-dom";
import styled from "styled-components";

const Back = styled(Link)`
  position: absolute;
  top: 2%;
  left: 5%;
`;

// Button back to dashboard
export const BackButton = () => (
  <Back id="back" to="/">
    <img
      style={{ width: "40px" }}
      alt="back icon"
      src="https://img.icons8.com/material-sharp/96/000000/back--v1.png"
    />
  </Back>
);
