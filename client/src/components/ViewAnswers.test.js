// import React from "react";
// import { render, screen } from "@testing-library/react";
// import ViewAnswers from "./ViewAnswers";
// import { BrowserRouter as Router } from "react-router-dom";

// describe("ViewAnswers", () => {
//   test("Renders the ViewAnswers page", () => {
//     render(
//       <Router>
//         <ViewAnswers />
//       </Router>
//     );
//     expect(screen.getByRole("button", { name: /edit answer/i })).toBeEnabled();
//     // expect(screen.getByRole("link", { name: /Edit Answer/i })).toBeEnabled();
//   });
// });

import React from "react";
import { render, unmountComponentAtNode } from "react-dom";
import { act } from "react-dom/test-utils";
import ViewAnswers from "./ViewAnswers";
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
it("renders answers data using fakeQuestionsData", async () => {
  const fakeQuestionsData = [
    {
      id: 1,
      questionid: 1,
      questiondescription: "What is HTML?",
      answerdescription:
        "Lorem ipsum dolor sit amet. Et molestias voluptatem qui doloremque soluta sit culpa porro et tenetur repellat vel beatae quas id reprehenderit esse.",
      isstarred: false,
      isreviewed: false,
    },
    {
      id: 2,
      questionid: 1,
      questiondescription: "What is HTML?",
      answerdescription:
        "Aut quibusdam incidunt ea error aliquam 33 atque odio At corrupti Quis et recusandae impedit sit exercitationem distinctio.",
      isstarred: false,
      isreviewed: false,
    },
  ];

  jest.spyOn(global, "fetch").mockImplementation(() =>
    Promise.resolve({
      json: () => Promise.resolve(fakeQuestionsData),
    })
  );

  // Use the asynchronous version of act to apply resolved promises
  await act(async () => {
    render(
      <Router>
        <ViewAnswers />
      </Router>,
      container
    );
  });

  const questionButton = container.querySelector(".question-title");

  expect(questionButton.textContent).toBe("What is HTML?");

  // remove the mock to ensure tests are completely isolated
  global.fetch.mockRestore();
});
it("renders answers data using fakeAnswersData", async () => {
  const fakeAnswersData = [
    {
      id: 1,
      questionid: 1,
      questiondescription: "What is HTML?",
      answerdescription:
        "Lorem ipsum dolor sit amet. Et molestias voluptatem qui doloremque soluta sit culpa porro et tenetur repellat vel beatae quas id reprehenderit esse.",
      isstarred: false,
      isreviewed: false,
    },
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
        <ViewAnswers />
      </Router>,
      container
    );
  });

  const answerButton = container.querySelector(".list-item");
  expect(answerButton.textContent).toBe(
    "Lorem ipsum dolor sit amet. Et molestias voluptatem qui doloremque soluta sit culpa porro et tenetur repellat vel beatae quas id reprehenderit esse."
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
        <ViewAnswers />
      </Router>,
      container
    );
  });

  let errorMessage = container.querySelector(".error-list-item");
  expect(errorMessage.textContent).toBe("Oops, something went wrong!");

  // remove the mock to ensure tests are completely isolated
  global.fetch.mockRestore();
});
