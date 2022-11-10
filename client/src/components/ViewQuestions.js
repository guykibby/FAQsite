import { Link, useParams } from "react-router-dom";
import React, { useState, useEffect } from "react";

const ViewQuestions = () => {
  const { topicId } = useParams();
  const [questions, setQuestions] = useState([{}]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        setError(false);
        const response = await fetch(
          `${process.env.REACT_APP_API_URL}/questions/${topicId}`
        );
        if (!response.ok) {
          throw new Error("API Error");
        }
        const data = await response.json();
        setQuestions(data);
      } catch (error) {
        setError(true);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [topicId]);

  if (error) {
    return <p className="list-item">Oops, something went wrong!</p>;
  }

  return (
    <>
      {loading && <p className="title">Loading</p>}
      <p className="title">{questions[0].name}</p>
      {questions.map((e, i) => {
        return (
          <Link key={i} to={"/answers/" + e.id} className="list-item">
            {e.description}
          </Link>
        );
      })}
      <Link to={`/postquestion/${topicId}`} className="list-item">
        <b>POST QUESTIONS</b>
      </Link>
    </>
  );
};

export default ViewQuestions;
