import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
// import dashboardStyles from "./Dashboard.module.css";

const Dashboard = () => {
  const [newPosts, setNewPosts] = useState([[], []]);

  const [error, setError] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  // Fetch all Q&As from DB which are waiting for review by instructor
  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await fetch(
          `${process.env.REACT_APP_API_URL}/dashboard`
        );

        if (result.ok === false) {
          setError(true);
          return;
        }
        setIsLoading(false);
        const data = await result.json();
        setNewPosts(data);
      } catch (error) {
        console.log("Error fetching products");
      }
    };
    fetchData();
  }, []);

  return (
    <>
      <h1>Dashboard</h1>
      {isLoading && <p className="loading-list-item list-item">Loading....</p>}
      {error && (
        <p className="error-list-item list-item">Oops, something went wrong!</p>
      )}
      <h2>Questions</h2>
      {newPosts[0].map((question, index) => (
        <Link
          key={index}
          to={"/editquestion/" + question.id}
          state={question}
          className="question-list-item list-item"
        >
          {question.description}
        </Link>
      ))}
      <h2>Answers</h2>
      {newPosts[1].map((answer, index) => (
        <Link
          key={index}
          to={"/editanswer/" + answer.id}
          state={answer}
          className="answer-list-item list-item"
        >
          {answer.answerdescription}
        </Link>
      ))}
    </>
  );
};

export default Dashboard;

// import { useEffect, useState } from "react";
// import { Link } from "react-router-dom";
// // import dashboardStyles from "./Dashboard.module.css";

// const Dashboard = () => {
//   const [newPosts, setNewPosts] = useState([[], []]);
//   const [error, setError] = useState(true);
//   const [errorMessage, setErrorMessage] = useState("Loading . . .");
//   // Fetch all Q&As from DB which are waiting for review by instructor
//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         setError(false);
//         const result = await fetch(
//           `${process.env.REACT_APP_API_URL}/dashboard`
//         );
//         if (!result.ok) {
//           throw new Error("API Error");
//         }
//         setErrorMessage("");
//         const data = await result.json();
//         console.log("AAAAA : " + JSON.stringify(data));
//         setNewPosts(data);
//       } catch (error) {
//         console.log("Error fetching products");
//       }
//     };
//     fetchData();
//   }, []);

//   const Question = ({ question }) => {
//     return (
//       <Link
//         to={"/editquestion/" + question.questionid}
//         state={question}
//         className="list-item"
//       >
//         {question.questiondesc}
//       </Link>
//     );
//   };

//   function QuestionsList({ questions }) {
//     return (
//       <>
//         {questions.map((question, index) => (
//           <Question key={index} question={question} />
//         ))}
//       </>
//     );
//   }

//   const Answer = ({ answer }) => {
//     return (
//       <Link
//         to={"/editquestion/" + answer.questionid}
//         state={answer}
//         className="list-item"
//       >
//         {answer.answerdesc}
//       </Link>
//     );
//   };

//   const AnswersList = ({ answers }) => {
//     return (
//       <>
//         {answers.map((answer, index) => (
//           <Answer key={index} answer={answer} />
//         ))}
//       </>
//     );
//   };

//   return (
//     <>
//       <h1>Dashboard</h1>
//       {error && <p>{errorMessage}</p>}
//       <h2>Questions</h2>
//       <QuestionsList questions={newPosts[0]} />
//       <h2>Answers</h2>
//       <AnswersList answers={newPosts[1]} />
//     </>
//   );
// };

// export default Dashboard;
