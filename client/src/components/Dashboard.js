import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

/** Fetch API, will fetch questions waiting for review from questions table
 *  and answers waiting for review from answers table
 * which needs to be reviewed by instructor
 * questions array will hold all questions waiting for review
 * answers array will hold all questions waiting for review
 * to display it on dashboard to review by instructor
 * */
const Dashboard = () => {
  /* */
  const [questions, setQuestions] = useState([]);
  const [isQuestionsEmpty, setIsQuestionsEmpty] = useState(false);
  const [answers, setAnswers] = useState([]);
  const [isAnswersEmpty, setIsAnswersEmpty] = useState(false);
  const [error, setError] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    setIsLoading(true);
    setIsQuestionsEmpty(false);
    setIsAnswersEmpty(false);
    const fetchData = async () => {
      try {
        const result = await fetch(
          `${process.env.REACT_APP_API_URL}/dashboard`
        );

        if (result.ok === false) {
          setIsLoading(false);
          setError(true);
        } else {
          const data = await result.json();
          setQuestions(data.questions);
          console.log("Questions Array length : " + data.questions.length);
          data.questions.length > 0 && setIsQuestionsEmpty(true);
          setAnswers(data.answers);
          data.answers.length > 0 && setIsAnswersEmpty(true);
          console.log("Answers Array length : " + data.answers.length);
          console.log("answers : " + JSON.stringify(data.answers));
          setIsLoading(false);
        }
      } catch (error) {
        setError(true);
        setIsLoading(false);
        console.log("Error fetching products");
      }
    };
    fetchData();
  }, []);

  return (
    <>
      <h1>Dashboard</h1>
      {isLoading && <p className="loading-list-item">Loading....</p>}
      {error && <p className="error-list-item">Oops, something went wrong!</p>}
      {/**  questions waiting for review by instructor
       * line #54- #63 can be done by creating
       * <Questions /> componet by passing newPosts[0] as props
       * in <Questions /> componet, by passing individual answer as props
       * to <Question /> component to reuse it in other modules
       * but implmented to keep it in sync with other usestories
       */}
      {isQuestionsEmpty && (
        <>
          <h2>Questions</h2>
          {questions.map((question, index) => (
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
          <h2>Answers</h2>
          {answers.map((answer, index) => (
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
