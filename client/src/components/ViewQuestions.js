import { Link, useParams } from "react-router-dom";
import React, { useState, useEffect } from "react";

const ViewQuestions = () => {
  const { topicId } = useParams();
  const [questions, setQuestions] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(
        `${process.env.REACT_APP_API_URL}/questions/${topicId}`
      );

      // if (response.ok === false) {
      //   setIsNotFound(true);
      //   return;
      // }

      const data = await response.json();
      setQuestions(data);

      // setIsLoading(false);
    };

    fetchData();
  }, [topicId]);

  //   return <div className="list-item">UNDER CONSTRUCTION. CODE: {topicId}</div>;
  // };

  // const ViewQuestions = ({ topicId, description }) => {
  return (
    <>
      <Link to={"/answers/1"} className="list-item">
        {questions[0].description}
      </Link>
      {/* <p className="list-item">{description}</p> */}
    </>
  );
};

export default ViewQuestions;
