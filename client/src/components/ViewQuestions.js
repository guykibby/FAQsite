import { Link, useParams } from "react-router-dom";
import React, { useState, useEffect } from "react";
import EditButton from "./EditButton";

const ViewQuestions = () => {
  const { topicId } = useParams();
  const [questions, setQuestions] = useState([{}]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  useEffect(() => {
    setLoading(true);
    const fetchData = async () => {
      try {
        const response = await fetch(
          `${process.env.REACT_APP_API_URL}/questions/${topicId}`
        );
        if (response.ok === false) {
          setLoading(false);
          setError(true);
          return;
        }
        setLoading(false);
        const data = await response.json();
        setQuestions(data);
      } catch (error) {
        setError(true);
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
      {loading && <p className="title">Loading....</p>}
      <p className="title">{questions[0].name}</p>
      <ul>
      {questions.map((e, i) => {
        return (
          <div key={i} className="main-container list-item">
          <Link className="link" to={"/answers/" + e.id} >
            {e.description}
          </Link>
          <div className="link"><EditButton information={e}/></div>
          </div>
        );
      })}
      </ul>

    </>
  );
};

export default ViewQuestions;
