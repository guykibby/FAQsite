import { Link, useParams } from "react-router-dom";
import React, { useState, useEffect } from "react";
// import Loader from "../Loader";
// import ErrorMessage from "../ErrorMessage";

const ViewQuestions = () => {
  const { topicId } = useParams();
  const [questions, setQuestions] = useState([{}]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    const abortController = new AbortController();
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
        if (!abortController.signal.aborted) {
          setQuestions(data);
        }
      } catch (error) {
        if (!abortController.signal.aborted) {
          setError(true);
        }
      } finally {
        if (!abortController.signal.aborted) {
          setLoading(false);
        }
      }
    };

    fetchData();
    return () => abortController.abort();
  }, [topicId]);

  return (
    <>
      {loading}
      {error}
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

// const ViewQuestions = () => {
//   const { topicId } = useParams();
//   const [questions, setQuestions] = useState([{}]);

//   useEffect(() => {
//     const fetchData = async () => {
//       const response = await fetch(
//         `${process.env.REACT_APP_API_URL}/questions/${topicId}`
//       );

//       const data = await response.json();
//       setQuestions(data);
//     };

//     fetchData();
//   }, [topicId]);

//   return (
//     <>
//       <p>{questions[0].name}</p>
//       {questions.map((e, i) => {
//         return (
//           <Link key={i} to={"/answers/" + e.id} className="list-item">
//             {e.description}
//           </Link>
//         );
//       })}
//     </>
//   );
// };

export default ViewQuestions;
