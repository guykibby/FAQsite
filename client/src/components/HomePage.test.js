import {
  render,
  screen,
  waitForElementToBeRemoved,
  waitFor,
} from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import HomePage from "./HomePage";
import { BrowserRouter as Router } from "react-router-dom";

beforeEach(async () => {
  render(
    <Router>
      <HomePage />
    </Router>
  );
  // await waitForElementToBeRemoved(() => screen.getByTitle(/loading/i));
});

describe("ProductPage", () => {
  test("WHEN", () => {
    expect(true).toBe(true);
  });
});

// import {
//   render,
//   screen,
//   waitForElementToBeRemoved,
//   waitFor,
// } from "@testing-library/react";
// import userEvent from "@testing-library/user-event";
// import HomePage from "./HomePage";
// import { unmountComponentAtNode } from "react-dom";
// import { BrowserRouter as Router } from "react-router-dom";
// import { act } from "react-dom/test-utils";

// let container = null;
// beforeEach(async () => {
//   // setup a DOM element as a render target
//   container = document.createElement("div");
//   document.body.appendChild(container);
// });

// afterEach(() => {
//   // cleanup on exiting
//   unmountComponentAtNode(container);
//   container.remove();
//   container = null;
// });

// beforeEach(async () => {
//   render(
//     <Router>
//       <HomePage />
//     </Router>
//     // ,
//     // container
//   );
//   await waitForElementToBeRemoved(() => screen.queryByText("Loading"));
// });

// describe("HomePage", () => {
//   await act(async () => {

// await waitForElementToBeRemoved(() => screen.getByTitle(/loading/i));
//   await waitForElementToBeRemoved(() => screen.queryByText("Loading"));
//   });

// test("Renders the list of years for the user to select from", async () => {
//   render(
//     <Router>
//       <HomePage />
//     </Router>
//   ,
//   container
// );
// expect(screen.getByText(/Loading/i)).toBeInTheDocument();
// await waitForElementToBeRemoved(() => screen.queryByText("Loading"));
// jest.setTimeout(3000);
// expect(screen.getByRole("button")).toBeEnabled();
// const yearButton = screen.getByText(/Year/i);
// const yearButton = screen.getByRole(/Year/i);
// const yearButton = screen.getByRole("button", {
//   name: "Year 1",
// });

// expect(yearButton).toBeInTheDocument();
// });
// });
//   test("WHEN a user views the first page of the Products page, THEN the previous page button will be disabled", () => {
//     const previousPageButton = screen.getByRole("button", {
//       name: "Previous page",
//     });
//     expect(previousPageButton).toBeDisabled();
//   });

//   test("WHEN the user navigates to the second page of the Products page, THEN the previous page button will be enabled", () => {
//     const nextPageButton = screen.getByRole("button", { name: "Next page" });
//     userEvent.click(nextPageButton);
//     const previousPageButton = screen.getByRole("button", {
//       name: "Previous page",
//     });
//     expect(previousPageButton).not.toBeDisabled();
//   });

//   test("WHEN the user navigates to the last page of the Products page, THEN the next page button of the pagination control will be disabled", () => {
//     const nextPageButton = screen.getByRole("button", { name: "Next page" });
//     userEvent.click(nextPageButton);
//     expect(nextPageButton).toBeDisabled();
//   });

//   test("WHEN the user navigates to the next page, THEN only different products are displayed.", async () => {
//     const firstProduct = screen.getByRole("heading", { level: 3 });
//     expect(firstProduct).toHaveTextContent("Angel Wings Harness");
//     const nextPageButton = screen.getByRole("button", { name: "Next page" });
//     userEvent.click(nextPageButton);
//     await waitFor(() => {
//       expect(firstProduct).not.toHaveTextContent("Angel Wings Harness");
//       expect(firstProduct).toHaveTextContent("Deluxe Carry Bag Orange");
//     });
//   });

//   test("WHEN a user goes to the Products page, THEN the current page will be highlighted in the pagination control", () => {
//     const pageDisplay = screen.queryByText(/page/i);
//     expect(pageDisplay.textContent).toBe("Page 1 of 2");
//     const nextPageButton = screen.getByRole("button", { name: "Next page" });
//     userEvent.click(nextPageButton);
//     expect(pageDisplay.textContent).toBe("Page 2 of 2");
//   });
