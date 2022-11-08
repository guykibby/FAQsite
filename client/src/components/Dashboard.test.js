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

/** HAPPY Paths - if server able to fetch data using API,
 */
it("renders questions data using fakeQuestionsData", async () => {
  const fakeQuestionsData = [
    [
      {
        questionid: 1,
        questiondesc: "What is HTML?",
        isstarred: false,
        isreviewed: false,
      },
      {
        questionid: 2,
        questiondesc: "What is CSS?",
        isstarred: false,
        isreviewed: false,
      },
    ],
    [],
  ];

  jest.spyOn(global, "fetch").mockImplementation(() =>
    Promise.resolve({
      json: () => Promise.resolve(fakeQuestionsData, []),
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

it("renders answers data using fakeAnswersData", async () => {
  const fakeAnswersData = [
    [],
    [
      {
        questionid: 5,
        answerid: 10,
        questiondesc: "When do i run npm Install?",
        answerdesc:
          "Et eaque galisum ex nisi libero ad soluta repellat a internos culpa eum repellat officiis ad ullam consequatur.",
        isstarred: false,
        isreviewed: false,
      },
      {
        questionid: 5,
        answerid: 9,
        questiondesc: "When do i run npm Install?",
        answerdesc:
          "Ut harum facilis quo adipisci temporibus 33 numquam illum sed galisum eius quo veritatis nemo. Id illo fugit et laboriosam repudiandae ut omnis deleniti.",
        isstarred: false,
        isreviewed: false,
      },
    ],
  ];

  jest.spyOn(global, "fetch").mockImplementation(() =>
    Promise.resolve({
      json: () => Promise.resolve(fakeAnswersData),
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

  const answerButton = container.querySelector(".answer-list-item");
  expect(answerButton.textContent).toBe(
    "Et eaque galisum ex nisi libero ad soluta repellat a internos culpa eum repellat officiis ad ullam consequatur."
  );
  // remove the mock to ensure tests are completely isolated
  global.fetch.mockRestore();
});

it("renders questions & answers data using fakeQuestionsAnswersData", async () => {
  const fakeQuestionsAnswersData = [
    [
      {
        questionid: 1,
        questiondesc: "What is HTML?",
        isstarred: false,
        isreviewed: false,
      },
      {
        questionid: 2,
        questiondesc: "What is CSS?",
        isstarred: false,
        isreviewed: false,
      },
    ],
    [
      {
        questionid: 5,
        answerid: 10,
        questiondesc: "When do i run npm Install?",
        answerdesc:
          "Et eaque galisum ex nisi libero ad soluta repellat a internos culpa eum repellat officiis ad ullam consequatur.",
        isstarred: false,
        isreviewed: false,
      },
      {
        questionid: 5,
        answerid: 9,
        questiondesc: "When do i run npm Install?",
        answerdesc:
          "Ut harum facilis quo adipisci temporibus 33 numquam illum sed galisum eius quo veritatis nemo. Id illo fugit et laboriosam repudiandae ut omnis deleniti.",
        isstarred: false,
        isreviewed: false,
      },
    ],
  ];

  jest.spyOn(global, "fetch").mockImplementation(() =>
    Promise.resolve({
      json: () => Promise.resolve(fakeQuestionsAnswersData),
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

  const answerButton = container.querySelector(".answer-list-item");
  expect(answerButton.textContent).toBe(
    "Et eaque galisum ex nisi libero ad soluta repellat a internos culpa eum repellat officiis ad ullam consequatur."
  );
  // remove the mock to ensure tests are completely isolated
  global.fetch.mockRestore();
});

/** UNHAPPY Path - if server is down or API fetch fails,
it need to display "Oops, something went wrong!" error message 
*/
it(`renders "Oops, something went wrong!" unable to fetch data from api`, async () => {
  //Mock an unsuccesful fetch response (ie status 500, internal server error)
  jest.spyOn(global, "fetch").mockImplementation(() =>
    Promise.resolve({
      ok: false,
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

  let errorMessage = container.querySelector(".error-list-item");
  expect(errorMessage.textContent).toBe("Oops, something went wrong!");

  // remove the mock to ensure tests are completely isolated
  global.fetch.mockRestore();
});
