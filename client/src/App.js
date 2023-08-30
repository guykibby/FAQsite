import { Routes, Route, Link } from "react-router-dom";
import Dashboard from "./components/Dashboard";
import HomePage from "./components/HomePage";
import PostAnswer from "./components/PostAnswer";
import PostQuestion from "./components/PostQuestion";
import ViewQuestions from "./components/ViewQuestions";
import "./App.css";
import EditQuestion from "./components/EditQuestion";
import EditAnswer from "./components/EditAnswer";
import ViewAnswers from "./components/ViewAnswers";
import LogInPage from "./components/LogInPage";
import SignUpPage from "./components/SignUpPage";
import Header from "./components/Header";

const App = () => {
  const token = localStorage.getItem("x-auth-token");

  return (
    <>
      <div className="main-container">
        <Routes>
          <Route path="/SignUp" element={<SignUpPage />} />
          <Route path="/LogIn" element={<LogInPage />} />
          <Route path="/" element={<HomePage />} />
          <Route path="/questions/:topicId" element={<ViewQuestions />} />
          <Route path="/postquestion/:topicId" element={<PostQuestion />} />
          <Route path="/answers/:questionId" element={<ViewAnswers />} />
          <Route path="/postanswer/:questionId" element={<PostAnswer />} />
          <Route path="/editquestion/:questionId" element={<EditQuestion />} />
          <Route path="/editanswer/:answerId" element={<EditAnswer />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/login" element={<LogInPage />} />
        </Routes>
      </div>
    </>
  );
};

export default App;
