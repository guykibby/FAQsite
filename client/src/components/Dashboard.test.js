import React from "react";
import { render, unmountComponentAtNode } from "react-dom";
import { act } from "react-dom/test-utils";
import { BrowserRouter as Router } from "react-router-dom";
import Dashboard from "./Dashboard";

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
  ];
  jest.spyOn(global, "fetch").mockImplementation(() =>
    Promise.resolve({
      json: () => Promise.resolve(fakeTopicsData),
    })
  );

  // Use the asynchronous version of act to apply resolved promises
  act(() => {
    render(
      <Router>
        <Dashboard />
      </Router>,
      container
    );
  });

  let button = container.querySelector("button");
  expect(button.textContent).toBe("Year 1");

  act(() => {
    button.dispatchEvent(new MouseEvent("click", { bubbles: true }));
  });
});

// beforeEach(async () => {
//   render(<Dashboard />);
//   // await waitForElementToBeRemoved(() => screen.getByTitle(/loading/i));
// });
// describe("Dashboard page", () => {
//   test("WHEN a user goes to the Dashboard, THEN list of Q&As to be displayed", () => {
//     const mainHeading = screen.getByRole("heading", { name: "Dashboard" });
//     console.log("AAA : " + mainHeading);
//     expect(mainHeading).toBeInTheDocument();
//     // expect(nextPageButton).toBeInTheDocument();
//   });
// });

// describe("ProductList", () => {
//   test("Renders a list of products", () => {
//     const newQuestions = [
//       {
//         questionid: 1,
//         questiondesc: "What is HTML?",
//         isstarred: false,
//         isreviewed: false,
//       },
//       {
//         questionid: 2,
//         questiondesc: "What is CSS?",
//         isstarred: false,
//         isreviewed: false,
//       },
//     ];
//     render(<Dashboard newQuestions={newQuestions} />);
//     expect(screen.getAllByRole("listitem").length).toBe(2);
//   });
//   // test("WHEN there are no products THEN the product list is empty", () => {
//   //   const questions = [];
//   //   render(<ProductList products={products} />);
//   //   expect(screen.queryAllByRole("listitem")).toStrictEqual([]);
//   // });
//   // test("WHEN there is one product THEN one product is rendered", () => {
//   //   const products = [
//   //     {
//   //       id: 1,
//   //       name: "Angel Wings Harness",
//   //       description:
//   //         "The purrrfect accessory to take your kitty to the next level.",
//   //       price: "$10.00",
//   //       categoryName: "Costumes",
//   //       imageName: "cat-photo_0000.jpg",
//   //       imageDescription: "Wings harness",
//   //       discountValue: null,
//   //       discountType: null,
//   //     },
//   //   ];
//   //   render(<ProductList products={products} />);
//   //   expect(screen.getAllByRole("listitem").length).toBe(1);
//   // });
// });
// import { render, screen } from "@testing-library/react";
// import Dashboard from "./Dashboard";
// import { BrowserRouter as Router } from "react-router-dom";

// test("renders learn react link", () => {
//   render(
//     <Router>
//       <Dashboard />
//     </Router>
//   );
//   expect(screen.getByText(/Dash Board/i)).toBeInTheDocument();
// });
/* eslint-disable testing-library/no-unnecessary-act */
// import React from "react";
// import { render, unmountComponentAtNode } from "react-dom";
// import { act } from "react-dom/test-utils";
// import Dashboard from "./Dashboard";
// import { BrowserRouter as Router } from "react-router-dom";

// let container = null;
// beforeEach(() => {
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

// it("renders topic data", async () => {
//   const fakeTopicsData = [
//     { id: 1, description: "What is HTML?" },
//     { id: 2, description: "What is CSS?" },
//   ];
//   jest.spyOn(global, "fetch").mockImplementation(() =>
//     Promise.resolve({
//       json: () => Promise.resolve(fakeTopicsData),
//     })
//   );

//   // Use the asynchronous version of act to apply resolved promises
//   await act(async () => {
//     render(
//       <Router>
//         <Dashboard />
//       </Router>,
//       container
//     );
//   });

//   let button = container.querySelector("Link");
//   console.log("AAA : " + button);
//   // expect(button.textContent).toBe("What is HTML?");

//   act(() => {
//     button.dispatchEvent(new MouseEvent("click", { bubbles: true }));
//   });

//   // remove the mock to ensure tests are completely isolated
//   global.fetch.mockRestore();
// });
