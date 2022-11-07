import { Link, useParams } from "react-router-dom";
import React, { useState, useEffect } from "react";

const ViewAnswers = () => {
  const { questionId } = useParams();

  const [answers, setAnswers] = useState([{}]);

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(
        `http://localhost:5001/answers/${questionId}`
      );
      const data = await response.json();
      setAnswers(data);
    };
    fetchData();
  }, [questionId]);
  console.log(answers[0].questiondescription);
  return (
    <>
      <div>{answers[0].questiondescription}</div>
      {answers.map((answer) => {
        return (
          <>
            <Link
              key={answer.answerid}
              to={"/editanswers/" + answer.answerid}
              className="list-item"
            >
              {answer.answerdescription}
              <br />
              <button>Edit Answer</button>
            </Link>
          </>
        );
      })}
    </>
  );
};

export default ViewAnswers;
