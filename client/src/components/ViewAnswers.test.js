import React from "react";
import { render, screen } from "@testing-library/react";
import ViewAnswers from "./ViewAnswers";
import { BrowserRouter as Router } from "react-router-dom";

describe("ViewAnswers", () => {
  test("Renders the ViewAnswers page", () => {
    render(
      <Router>
        <ViewAnswers />
      </Router>
    );
    expect(screen.getByRole("button", { name: /edit answer/i })).toBeEnabled();
  });
});
