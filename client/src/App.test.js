import { render, screen } from "@testing-library/react";
import App from "./App.js";
import { BrowserRouter as Router } from "react-router-dom";

test("renders learn react link", () => {
  render(
    <Router>
      <App />
    </Router>
  );
  const linkElement = screen.getByText(/view/i);
  expect(linkElement).toBeInTheDocument();
});
