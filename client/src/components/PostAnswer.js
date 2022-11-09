import { useParams } from "react-router-dom";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const PostAnswer = () => {
  const { questionId } = useParams();

  const [answer, setAnswer] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();

    const response = await fetch(
      `${process.env.REACT_APP_API_URL}${questionId}`,
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
    } else {
      navigate(`/answers/${questionId}`);
    }
  };

  return (
    <>
      <p className="list-item">
        TESTING - UNDER CONSTRUCTION. CODE: {questionId}
      </p>

      <form onSubmit={handleSubmit}>
        <label htmlFor="question-heading" className="question-heading">
          {/* {questionId.description} */}
        </label>
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
