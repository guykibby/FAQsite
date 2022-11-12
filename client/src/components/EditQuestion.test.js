import { render, screen} from "@testing-library/react";
import { BrowserRouter as Router } from "react-router-dom";
import EditQuestion from "./EditQuestion";
describe("EditQuestion Page", () => {
  test("Renders an EditQuestion Page with checkboxes and button", async () => {
    render(
      <Router>
        <EditQuestion />
      </Router>
    );
    expect(screen.getByRole("button")).toBeEnabled();
    expect(screen.getByTestId("review-checkbox")).toBeEnabled();
    expect(screen.getByTestId("star-checkbox")).toBeEnabled();
    expect(screen.getByTestId("review-checkbox")).not.toBeNull();
    expect(screen.getByTestId("star-checkbox")).not.toBeNull();
    expect(screen.getByText(/Review/i)).toBeInTheDocument();
    expect(screen.getByText(/Star/i)).toBeInTheDocument();
  });

  test("ss", () => {
    
  });
});
