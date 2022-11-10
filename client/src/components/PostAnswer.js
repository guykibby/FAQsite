import { useParams } from "react-router-dom";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const PostAnswer = ({ answerObject }) => {
  // const { questiondescription } = answerObject;
  const questiondescription = "What is HTML?";

  const { questionId } = useParams();

  const [answer, setAnswer] = useState("");
  const [error, setError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errorStatus, setErrorStatus] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsLoading(true);

    try {
      const response = await fetch(
        `${process.env.REACT_APP_API_URL}/postanswer/${questionId}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ description: answer }),
        }
      );

      if (!response.ok) {
        console.log("Fetch not ok");
        setError(true);
        setErrorStatus(response.status);
        return;
      } else {
        setIsLoading(false);
        navigate(`/answers/${questionId}`);
      }
    } catch {
      setIsError(true);
      setErrorStatus("unknown");
    }
  };

  if (error) {
    return (
      <p className="error-list-item">
        Oops, something went wrong! {errorStatus}
      </p>
    );
  }

  return (
    <>
      <p className="title">{questiondescription}</p>
      <form onSubmit={handleSubmit}>
        <label htmlFor="answer-form" className="answer-form"></label>
        <input
          type="text"
          required
          id="answer-description"
          name="answer-description"
          className="answer-description"
          value={answer}
          onChange={(e) => {
            setAnswer(e.target.value);
          }}
        />
        <button className="list-item" disabled={isLoading}>
          Submit
        </button>
      </form>
    </>
  );
};

export default PostAnswer;
