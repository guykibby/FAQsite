import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
// import dashboardStyles from "./Dashboard.module.css";

const Dashboard = () => {
  const [newPosts, setNewPosts] = useState([[], []]);
  const [error, setError] = useState(true);
  const [errorMessage, setErrorMessage] = useState("Loading . . .");
  // Fetch all Q&As from DB which are waiting for review by instructor
  useEffect(() => {
    const fetchData = async () => {
      try {
        setError(false);
        const result = await fetch(
          `${process.env.REACT_APP_API_URL}/dashboard`
        );
        if (!result.ok) {
          throw new Error("API Error");
        }
        setErrorMessage("");
        const data = await result.json();
        console.log("AAAAA : " + JSON.stringify(data));
        setNewPosts(data);
      } catch (error) {
        console.log("Error fetching products");
      }
    };
    fetchData();
  }, []);
  return (
    <>
      <h1>Dashboard</h1>
      {error && <p>{errorMessage}</p>}
      <h2>Questions</h2>
      {newPosts[0].map((newPost, index) => (
        <Link
          to={"/editquestion/" + newPost.questionid}
          state={{
            questionId: newPost.questionid,
            questiondescription: newPost.questiondesc,
            questionstarred: newPost.isstarred,
            questionreviewed: newPost.isreviewed,
            topicId: newPost.topicId,
          }}
          className="list-item"
        >
          {newPost.questiondesc}
        </Link>
      ))}
      <h2>Answers</h2>
      {newPosts[1].map((newPost, index) => (
        <Link
          to={"/editanswer/" + newPost.answerid}
          state={{
            answerId: newPost.answerid,
            questionid: newPost.questionid,
            answerdescription: newPost.answerdesc,
            answerstarred: newPost.isstarred,
            answerreviewed: newPost.isreviewed,
          }}
          className="list-item"
        >
          {newPost.answerdesc}
        </Link>
      ))}
    </>
  );
};

export default Dashboard;
