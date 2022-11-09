import { useParams } from "react-router-dom";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const PostAnswer = ({ answerObject }) => {
  // const { questiondescription } = answerObject;
  const questiondescription = "What is HTML?";

  const { questionId } = useParams();

  const [answer, setAnswer] = useState("");
  const [error, setError] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();

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
      return;
    } else {
      navigate(`/answers/${questionId}`);
    }
  };

  return (
    <>
      <p className="title">{questiondescription}</p>

      {/* can only get this to appear when i change something in the fetch url (const response) 
      as the error would only trigger once I push the submit button */}
      {error && (
        <p className="error-list-item list-item">Oops, something went wrong!</p>
      )}

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
        <button className="submit-button">Submit</button>
      </form>
    </>
  );
};

export default PostAnswer;
