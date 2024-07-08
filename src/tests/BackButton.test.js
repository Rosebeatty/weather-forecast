import React from "react";
import { render, screen } from "@testing-library/react";
import { BrowserRouter as Router } from "react-router-dom";
import { BackButton } from "components/BackButton";

describe("<BackButton />", () => {
  let asFragment;

  beforeEach(() => {
    const renderResult = render(
      <Router>
        <BackButton />
      </Router>
    );
    asFragment = renderResult.asFragment;
  });

  it("renders", () => {
    expect(asFragment()).toMatchSnapshot();
  });

  it("tests back button", () => {
    const linkElement = screen.getByRole("link", { name: /back/i });
    expect(linkElement).toHaveAttribute("href", "/");
  });
});
