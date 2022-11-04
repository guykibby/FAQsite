import {
    render,
    screen,
    waitForElementToBeRemoved,
    waitFor,
  } from "@testing-library/react";
  import userEvent from "@testing-library/user-event";
import { render, screen } from "@testing-library/react";
import HomePage from "./HomePage";

beforeEach(async () => {
    render(<HomePage />);
    await waitForElementToBeRemoved(() => screen.getByTitle(/loading/i));
  });
  
  describe("HometPage", () => {
    test("WHEN a user goes to the home page, THEN the Years will be displayed", () => {
      const previousPageButton = screen.getByRole("button", {
        name: "Year 1",
      });
      const nextPageButton = screen.getByRole("button", { name: "Next page" });
      expect(previousPageButton).toBeInTheDocument();
      expect(nextPageButton).toBeInTheDocument();
    });
  
    test("WHEN a user views the first page of the Products page, THEN the previous page button will be disabled", () => {
      const previousPageButton = screen.getByRole("button", {
        name: "Previous page",
      });
      expect(previousPageButton).toBeDisabled();
    });
  
    test("WHEN the user navigates to the second page of the Products page, THEN the previous page button will be enabled", () => {
      const nextPageButton = screen.getByRole("button", { name: "Next page" });
      userEvent.click(nextPageButton);
      const previousPageButton = screen.getByRole("button", {
        name: "Previous page",
      });
      expect(previousPageButton).not.toBeDisabled();
    });
  
    test("WHEN the user navigates to the last page of the Products page, THEN the next page button of the pagination control will be disabled", () => {
      const nextPageButton = screen.getByRole("button", { name: "Next page" });
      userEvent.click(nextPageButton);
      expect(nextPageButton).toBeDisabled();
    });
  
    test("WHEN the user navigates to the next page, THEN only different products are displayed.", async () => {
      const firstProduct = screen.getByRole("heading", { level: 3 });
      expect(firstProduct).toHaveTextContent("Angel Wings Harness");
      const nextPageButton = screen.getByRole("button", { name: "Next page" });
      userEvent.click(nextPageButton);
      await waitFor(() => {
        expect(firstProduct).not.toHaveTextContent("Angel Wings Harness");
        expect(firstProduct).toHaveTextContent("Deluxe Carry Bag Orange");
      });
    });
  
    test("WHEN a user goes to the Products page, THEN the current page will be highlighted in the pagination control", () => {
      const pageDisplay = screen.queryByText(/page/i);
      expect(pageDisplay.textContent).toBe("Page 1 of 2");
      const nextPageButton = screen.getByRole("button", { name: "Next page" });
      userEvent.click(nextPageButton);
      expect(pageDisplay.textContent).toBe("Page 2 of 2");
    });
  });
  