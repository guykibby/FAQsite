import { render, screen } from "@testing-library/react";
import EditQuestion from "./EditQuestion";

describe("EditQuestion Page", () => {
  test("Renders an EditQuestion Page with checkboxes and button", () => {
    render(<EditQuestion />);
    expect(screen.getByRole("button")).toBeEnabled();
    expect(screen.getByTestId("review-checkbox")).toBeEnabled();
    expect(screen.getByTestId("star-checkbox")).toBeEnabled();
    expect(screen.getByTestId("review-checkbox")).not.toBeNull();
    expect(screen.getByTestId("star-checkbox")).not.toBeNull();
    expect(screen.getByText(/Delete Question/i)).toBeInTheDocument();
    expect(screen.getByText(/Review/i)).toBeInTheDocument();
    expect(screen.getByText(/Star/i)).toBeInTheDocument();
  });
});
