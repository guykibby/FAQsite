import { useParams } from "react-router-dom";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const PostQuestion = () => {
  const { topicId } = useParams();

  // const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  // const [topicId, setTopicId] = useState("");
  // const [question, setQuestion] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [errorStatus, setErrorStatus] = useState("");

  const navigate = useNavigate();

  const handelSubmit = async (event) => {
    event.preventDefault();
    setIsLoading(true);
    const body = {
      //title,
      description,
      //topicId,
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

  // if (isError) {
  //   return <>An error has occurred. {errorStatus}.</>;
  // }

  return (
    <>
      <p className="list-item">UNDER CONSTRUCTION. CODE: {topicId}</p>;
      <form onSubmit={handelSubmit}>
        <label htmlFor="topic-heading" className="topic-heading">
          {topicId}
        </label>
        <input
          type="text"
          required
          id="question-description"
          name="question-description"
          className="question-description"
          /*value={question}
          onChange={(e) => {
            setQuestion(e.target.value);
          }}*/
          value={description}
          onChange={(event) => {
            const value = event.target.value;
            setDescription(value);
          }}
        />

        <button className="submit-button" disabled={isLoading}>
          Submit
        </button>
      </form>
    </>
  );
};

export default PostQuestion;
