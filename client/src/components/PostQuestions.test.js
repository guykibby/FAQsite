import React from "react";
import { unmountComponentAtNode, render } from "react-dom";
import { BrowserRouter as Router } from "react-router-dom";
import { act } from "react-dom/test-utils";
import PostQuestion from "./PostQuestion";

let container = null;
beforeEach(() => {
  container = document.createElement("div");
  document.body.appendChild(container);
});

afterEach(() => {
  unmountComponentAtNode(container);
  container.remove();
  container = null;
});

it("test that it renders a mock question with topicId", async () => {
  const fakeData = {
    description: "Test",
    topicId: 6,
  };

  jest.spyOn(global, "fetch").mockImplementation(() =>
    Promise.resolve({
      json: () => Promise.resolve(fakeData),
    })
  );

  await act(async () => {
    render(
      <Router>
        <PostQuestion />
      </Router>,
      container
    );

    let button = container.querySelector("button");
    expect(button.textContent).toBe("Submit");

    global.fetch.mockRestore();
  });
});

it("renders question data", async () => {
  jest.spyOn(global, "fetch").mockImplementation(() =>
    Promise.resolve({
      ok: false,
    })
  );

  await act(async () => {
    render(
      <Router>
        <PostQuestion />
      </Router>,
      container
    );
  });

  // checks what is the content of the p tag with className="list-item"
  let heading = container.querySelector(".list-item");
  expect(heading.textContent).toBe("UNDER CONSTRUCTION. CODE: ");

  global.fetch.mockRestore();
});
