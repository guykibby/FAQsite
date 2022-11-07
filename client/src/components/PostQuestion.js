import { useParams } from "react-router-dom";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const PostQuestion = () => {
  const { topicId } = useParams();

  const [question, setQuestion] = useState("");

  const navigate = useNavigate();

  const handelSubmit = async (event) => {
    event.preventDefault();

    const response = await fetch(
      `http://localhost:5001/postquestion/${topicId}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ description: question }),
      }
    );
    console.log({ description: question });

    if (!response.ok) {
      console.log("Fetch not ok");
    } else {
      navigate(`/question/${topicId}`);
    }
  };

  return (
    <>
      <p className="list-item">UNDER CONSTRUCTION. CODE: {topicId}</p>;
      <form onSubmit={handelSubmit}>
        <label htmlFor="topic-heading" className="topic-heading">
          Topic
        </label>
        <input
          type="text"
          required
          id="question-description"
          name="question-description"
          className="question-description"
          value={question}
          onChange={(e) => {
            setQuestion(e.target.value);
          }}
        />

        <button className="submit-button">Submit</button>
      </form>
    </>
  );
};

export default PostQuestion;
