import { useParams } from "react-router-dom";
import React, { useState, useEffect } from "react";

const ViewAnswers = () => {
  const { questionId } = useParams();

  const [answers, setAnswers] = useState([]);

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

  return (
    <div>
      <h1>Answers</h1>
      {answers.map((answer) => {
        return (
          <div key={answer.answerid} className="list">
            <li>
              <div>
                <strong>{answer.questiondescription}</strong>
                <div>Asked: {answer.questioncreated}</div>
                <br />
                <div>{answer.answerdescription}</div>
                <div>Answered: {answer.createdon}</div>
              </div>
              <br />
            </li>
          </div>
        );
      })}
    </div>
  );
};

export default ViewAnswers;
