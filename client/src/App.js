// import { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import AnswersPage from "./components/answersPage";

const App = () => {
  // const [questionsList, setQuestionsList] = useState([
  //   { id: 2, question_description: "waiting for data!" },
  // ]);

  // useEffect(() => {
  //   const fetchData = async () => {
  //     try {
  //       const result = await fetch(`${process.env.REACT_APP_API_URL}/getData`);
  //       const data = await result.json();
  //       console.log(data);
  //       setQuestionsList(data);
  //     } catch (error) {
  //       console.log(error.message);
  //     }
  //   };
  //   fetchData();
  // }, []);

  return (
    <>
      <Routes>
        <Route path="/answers/:id" element={<AnswersPage />} />
      </Routes>

      {/* <h1>Test data render</h1>
      {questionsList.map((question, index) => (
        <div key={index}>
          <p>{question.question_description}</p>
        </div>
      ))} */}
    </>
  );
};

export default App;
