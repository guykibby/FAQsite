import { Link, useParams } from "react-router-dom";
import React, { useState, useEffect } from "react";

const ViewQuestions = () => {
  const { topicId } = useParams();
  const [questions, setQuestions] = useState([{}]);

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(
        `${process.env.REACT_APP_API_URL}/questions/${topicId}`
      );

      const data = await response.json();
      setQuestions(data);
    };

    fetchData();
  }, [topicId]);

  return (
    <>
      <p>{questions[0].name}</p>
      {questions.map((e, i) => {
        return (
          <Link key={i} to={"/answers/" + e.id} className="list-item">
            {e.description}
          </Link>
        );
      })}
    </>
  );
};

export default ViewQuestions;
