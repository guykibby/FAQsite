import { render, screen } from "@testing-library/react";
import Dashboard from "./Dashboard";
import { BrowserRouter as Router } from "react-router-dom";

test("renders learn react link", () => {
  render(
    <Router>
      <Dashboard />
    </Router>
  );
  expect(screen.getByText(/Dash Board/i)).toBeInTheDocument();
});
