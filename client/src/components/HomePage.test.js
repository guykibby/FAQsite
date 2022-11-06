/* eslint-disable testing-library/no-unnecessary-act */
import React from "react";
import { render, unmountComponentAtNode } from "react-dom";
import { act } from "react-dom/test-utils";
import HomePage from "./HomePage";
import { BrowserRouter as Router } from "react-router-dom";

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

it("renders topic data", async () => {
  const fakeTopicsData = [
    { id: 1, year: "Year 1", term: "Client Side", topic: "HTML" },
    { id: 9, year: "Year 1", term: "Client Side", topic: "Project1" },
  ];
  jest.spyOn(global, "fetch").mockImplementation(() =>
    Promise.resolve({
      json: () => Promise.resolve(fakeTopicsData),
    })
  );

  // Use the asynchronous version of act to apply resolved promises
  await act(async () => {
    render(
      <Router>
        <HomePage />
      </Router>,
      container
    );
  });

  let button = container.querySelector("button");
  expect(button.textContent).toBe("Year 1");

  act(() => {
    button.dispatchEvent(new MouseEvent("click", { bubbles: true }));
  });

  button = container.querySelector("button");
  expect(button.textContent).toBe("Client Side");

  act(() => {
    button.dispatchEvent(new MouseEvent("click", { bubbles: true }));
  });

  button = container.querySelector("button");
  expect(button.textContent).toBe("HTML");

  // remove the mock to ensure tests are completely isolated
  global.fetch.mockRestore();
});
