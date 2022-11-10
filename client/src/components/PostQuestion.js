import { useParams } from "react-router-dom";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const PostQuestion = () => {
  const { topicId } = useParams();

  const [description, setDescription] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [errorStatus, setErrorStatus] = useState("");

  const navigate = useNavigate();

  const handelSubmit = async (event) => {
    event.preventDefault();
    setIsLoading(true);
    const body = {
      description,
    };
    try {
      const response = await fetch(
        `${process.env.REACT_APP_API_URL}/${topicId}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(body),
        }
      );

      if (!response.ok) {
        console.log("Fetch not ok");
        setIsError(true);
        setErrorStatus(response.status);
      } else {
        setIsLoading(false);
        navigate(`/questions/${topicId}`);
      }
    } catch (error) {
      setIsError(true);
      setErrorStatus("unknown");
    }
  };

  if (isError) {
    return <>An error has occurred. {errorStatus}.</>;
  }

  return (
    <>
      <h1>Post Question</h1>
      <form onSubmit={handelSubmit} className="main-container">
        <input
          type="text"
          required
          id="question-description"
          name="question-description"
          className="list-item"
          value={description}
          onChange={(event) => {
            const value = event.target.value;
            setDescription(value);
          }}
        />

        <button className="list-item" disabled={isLoading}>
          Submit
        </button>
      </form>
    </>
  );
};

export default PostQuestion;
