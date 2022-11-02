// import { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import Dashboard from "./components/Dashboard";
import HomePage from "./components/HomePage";
import PostAnswersPage from "./components/PostAnswersPage";
import PostQuestionsPage from "./components/PostQuestionsPage";
import QuestionsPage from "./components/QuestionsPage";
import "./App.css";
import EditQuestion from "./components/EditQuestion";
import EditAnswer from "./components/EditAnswer";
import AnswersPage from "./components/AnswersPage";
import LogInPage from "./components/LogInPage";

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
      <div className="main-container">
        <Routes>
          <Route path="/" element={<HomePage />} />{" "}
          <Route path="/questions/:topicId" element={<QuestionsPage />} />
          <Route
            path="/postquestion/:topicId"
            element={<PostQuestionsPage />}
          />
          <Route path="/answers/:questionId" element={<AnswersPage />} />
          <Route path="/postanswer/:questionId" element={<PostAnswersPage />} />
          <Route path="/editquestion/:questionId" element={<EditQuestion />} />
          <Route path="/editanswer/:answerId" element={<EditAnswer />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/login" element={<LogInPage />} />
        </Routes>
      </div>

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
