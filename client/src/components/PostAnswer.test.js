import React from "react";
import { unmountComponentAtNode, render } from "react-dom";
import { BrowserRouter as Router } from "react-router-dom";
import { act } from "react-dom/test-utils";
import PostAnswer from "./PostAnswer";

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

it("renders a fake answer with a questionId and description ", async () => {
  const fakeData = {
    questionId: "1",
    description: "This is an example answer",
  };

  jest.spyOn(global, "fetch").mockImplementation(() =>
    Promise.resolve({
      json: () => Promise.resolve(fakeData),
    })
  );

  await act(async () => {
    render(
      <Router>
        <PostAnswer />
      </Router>,
      container
    );

    let button = container.querySelector("button");
    expect(button.textContent).toBe("Submit");

    global.fetch.mockRestore();
  });
});

it("renders an error if fetched url is not valid", async () => {
  jest.spyOn(global, "fetch").mockImplementation(() =>
    Promise.resolve({
      ok: false,
    })
  );

  await act(async () => {
    render(
      <Router>
        <PostAnswer />
      </Router>,
      container
    );
  });

  let errorMessage = container.querySelector("error-list-item");
  expect(errorMessage.textContent).toBe("Oops, something went wrong!");

  global.fetch.mockRestore();
});
