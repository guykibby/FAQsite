import { render, screen } from "@testing-library/react";
import { BrowserRouter as Router } from "react-router-dom";
import Dashboard from "./Dashboard";

test("renders learn react link", () => {
  render(
    <Router>
      <Dashboard />
    </Router>
  );
  expect(screen.getByText(/Dashboard/i)).toBeInTheDocument();
});
