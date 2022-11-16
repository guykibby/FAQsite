import { render, screen } from "@testing-library/react";
import { BrowserRouter as Router } from "react-router-dom";
import { unmountComponentAtNode } from "react-dom";
import { act } from "react-dom/test-utils";
import EditQuestion from "./EditQuestion";
describe("EditQuestion Page", () => {
  let container = null;
  beforeEach(() => {
    // setup a DOM element as a render target
    container = document.createElement("div");
    document.body.appendChild(container);
  });

  afterEach(() => {
    // cleanup on exiting
    unmountComponentAtNode(container);
    container.remove();
    container = null;
  });
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

  test("Alter the value of the Review Checkbox upon click", async () => {
    await act(async () => {
      render(
        <Router>
          <EditQuestion />
        </Router>,
        container
      );
    });

    const beforeClick = screen.getByTestId("review-checkbox").checked;
    const checkbox = screen.getByTestId("review-checkbox");
    act(() => {
      checkbox.dispatchEvent(new MouseEvent("click"));
    });
    const afterClick = screen.getByTestId("review-checkbox").checked;
    expect(beforeClick).toBe(!afterClick);
  });

  test("Alter the value of the Star Checkbox upon click", async () => {
    await act(async () => {
      render(
        <Router>
          <EditQuestion />
        </Router>,
        container
      );
    });

    const beforeClick = screen.getByTestId("star-checkbox").checked;
    const checkbox = screen.getByTestId("star-checkbox");
    act(() => {
      checkbox.dispatchEvent(new MouseEvent("click"));
    });
    const afterClick = screen.getByTestId("star-checkbox").checked;
    expect(beforeClick).toBe(!afterClick);
  });
  test("It should display the question and answer description upon visiting the page", async () => {
    const mockData = {
      id: 1,
      description: "What is HTML?",
      isstarred: false,
      isreviewed: false,
      userid: null,
      topicid: 1
    };

    //Mock a succesful fetch response (ie status 200)
    jest.spyOn(global, "fetch").mockImplementation(() =>
      Promise.resolve({
        ok: true,
        json: () => Promise.resolve(mockData),
      })
    );
    await act(async () => {
      render(
        <Router>
          <EditQuestion />
        </Router>,
        container
      );
    });
    expect(screen.getByText("What is HTML?")).toBeInTheDocument();
    global.fetch.mockRestore();
  });
});
