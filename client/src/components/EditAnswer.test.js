import { render, screen } from "@testing-library/react";
import { BrowserRouter as Router } from "react-router-dom";
import { unmountComponentAtNode } from "react-dom";
import { act } from "react-dom/test-utils";
import EditAnswer from "./EditAnswer";
describe("EditAnswer Page", () => {
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
  test("Renders an EditAnswer Page with checkboxes and button", async () => {
    render(
      <Router>
        <EditAnswer />
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
          <EditAnswer />
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
          <EditAnswer />
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
      description:
        "Lorem ipsum dolor sit amet. Et molestias voluptatem qui doloremque soluta sit culpa porro et tenetur repellat vel beatae quas id reprehenderit esse.",
      isstarred: false,
      isreviewed: false,
      questionid: 1,
      userid: null,
      questiondescription: "What is HTML?",
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
          <EditAnswer />
        </Router>,
        container
      );
    });

    expect(
      screen.getByText(
        `Lorem ipsum dolor sit amet. Et molestias voluptatem qui doloremque soluta sit culpa porro et tenetur repellat vel beatae quas id reprehenderit esse.`
      )
    ).toBeInTheDocument;
    expect(screen.getByText("What is HTML?")).toBeInTheDocument();
    global.fetch.mockRestore();
  });
});
