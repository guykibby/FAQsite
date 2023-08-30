import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Header from "./Header";

/** Fetch API, will fetch questions waiting for review from questions table
 *  and answers waiting for review from answers table
 * which needs to be reviewed by instructor
 * questions array will hold all questions waiting for review
 * answers array will hold all questions waiting for review
 * to display it on dashboard to review by instructor
 * */
const Dashboard = () => {
  const [newPosts, setNewPosts] = useState({ questions: [] }, { answers: [] });
  const [isQuestionsEmpty, setIsQuestionsEmpty] = useState(false);
  const [noReviews, setNoReviews] = useState(false);
  const [isAnswersEmpty, setIsAnswersEmpty] = useState(false);
  const [error, setError] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);
  const navigate = useNavigate();
  const token = localStorage.getItem("x-auth-token");
  useEffect(()=>{ if (!token) {
    navigate(`/LogIn`);
  }},[])

  useEffect(() => {
    setIsLoading(true);
    setIsQuestionsEmpty(false);
    setIsAnswersEmpty(false);
    const fetchData = async () => {
      try {
        const result = await fetch(
          `${process.env.REACT_APP_API_URL}/dashboard`,
          {
            headers: {
              "Content-Type": "application/json",
              token: token,
            },
          }
        );
        if (result.status === 422) {
          localStorage.clear();
          navigate(`/LogIn`);
        }

        if (result.status === 404) {
          setIsLoading(false); 
          setIsAdmin(false);
          return; 
        }

        if (result.ok === false) {
          setIsLoading(false);
          setError(true);
          return;
        }
        setIsLoading(false);
        setIsAdmin(true);
        const data = await result.json();
        setNewPosts(data);
        data.questions.length > 0 && setIsQuestionsEmpty(true);
        data.answers.length > 0 && setIsAnswersEmpty(true);
        if (data.questions.length <= 0 && data.answers.length <= 0) {
          setNoReviews(true);
          return;
        }
      } catch (error) {
        setIsLoading(false);
        setError(true);
        console.log("Error fetching questions & answers");
      }
    };
    fetchData();
  }, []);

  return (
    <>
      <Header />
      <h1 className="dashboard-title">Dashboard</h1>
      {isLoading && <p className="loading-list-item list-item">Loading....</p>}
      {!isAdmin && <p className="error-list-item list-item">Must be Admin to access. Sorry</p>}
      {error && (
        <p className="error-list-item list-item">Oops, something went wrong!</p>
      )}
      {noReviews && (
        <p className="no-data-found list-item">
          No questions/Answers are found for review
        </p>
      )}
      {isQuestionsEmpty && (
        <>
          <h2 className="questions-title">Questions</h2>
          {newPosts["questions"].map((question, index) => (
            <Link
              key={index}
              to={"/editquestion/" + question.id}
              state={question}
              className="question-list-item list-item"
            >
              {question.description}
            </Link>
          ))}
        </>
      )}
      {isAnswersEmpty && (
        <>
          <h2 className="answers-title">Answers</h2>
          {newPosts["answers"].map((answer, index) => (
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
      )}
    </>
  );
};

export default Dashboard;
