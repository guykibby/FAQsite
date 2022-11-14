import { useParams } from "react-router-dom";
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const PostQuestion = () => {
  const { topicId } = useParams();
  const [ topic, setTopic ] = useState("");
  const [question, setQuestion] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await fetch(
          `${process.env.REACT_APP_API_URL}/questions/${topicId}`
        );

        // fetch error handling

        if (result.ok === false) {
          setError(true);
          return;
        }
        const data = await result.json();
        setTopic(data[0]);
        setIsLoading(false);
        return;
      } catch (error) {
        setError(true);
        console.log("Error fetching products");
      }
    };
    fetchData();
  }, [topicId]);

  const handelSubmit = async (event) => {
    event.preventDefault();
    setIsLoading(true);

    try {
      const response = await fetch(
        `${process.env.REACT_APP_API_URL}/postQuestion/${topicId}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ description: question }),
        }
      );

      if (!response.ok) {
        console.log("Fetch not ok");
        setError(true);
      } else {
        setIsLoading(false);
        navigate(`/questions/${topicId}`);
      }
    } catch (error) {
      setError(true);
    }
  };

  if (error) {
    return <p className="list-item">Oops, something went wrong!</p>;
  }

  return (
    <>
      <h1>Post Question</h1>
     <p className="title">{topic.name}</p>
      <form onSubmit={handelSubmit} className="main-container">
        <input
          type="text"
          required
          id="question-description"
          name="question-description"
          className="list-item"
          value={question}
          onChange={(event) => {
            const value = event.target.value;
            setQuestion(value);
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
