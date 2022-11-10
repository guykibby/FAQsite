/* eslint-disable testing-library/no-unnecessary-act */
import React from "react";
import { render, unmountComponentAtNode } from "react-dom";
import { act } from "react-dom/test-utils";
import Dashboard from "./Dashboard";
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

/** HAPPY Paths - if server able to fetch data using API */

/* using - only questions waiting for review (questions fake table), no answers waiting for review */
test("renders questions data using fakeQuestionsData", async () => {
  const fakeQuestionsData = {
    questions: [
      {
        id: 1,
        description: "What is HTML?",
        isstarred: false,
        isreviewed: false,
        topicid: 1,
      },
      {
        id: 2,
        description: "What is CSS?",
        isstarred: false,
        isreviewed: false,
        topicid: 2,
      },
      {
        id: 3,
        description: "How do i pull a branch?",
        isstarred: false,
        isreviewed: false,
        topicid: 3,
      },
    ],
    answers: [],
  };

  jest.spyOn(global, "fetch").mockImplementation(() =>
    Promise.resolve({
      json: () => Promise.resolve(fakeQuestionsData),
    })
  );

  // Use the asynchronous version of act to apply resolved promises
  await act(async () => {
    render(
      <Router>
        <Dashboard />
      </Router>,
      container
    );
  });

  const questionButton = container.querySelector(".question-list-item");
  expect(questionButton.textContent).toBe("What is HTML?");
  // remove the mock to ensure tests are completely isolated
  global.fetch.mockRestore();
});
