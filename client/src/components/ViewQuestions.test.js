import { render, screen } from "@testing-library/react";
import ViewQuestions from "./ViewQuestions";

describe("ViewQuestions", () => {
  test("Renders a list of questions", () => {
    render(<ViewQuestions />);

    expect().to();
  });
});

// render(<ViewQuestions description="Test description" />);
// expect(screen.getByTestId("question-description")).toHaveTextContent(
//     "Test description"
//   );
