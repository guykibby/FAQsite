import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
// import dashboardStyles from "./Dashboard.module.css";

const Dashboard = () => {
  const [newPosts, setNewPosts] = useState([[]]);
  //  const [newQuestions, setNewQuestions] = useState([[]]);
  //  const [newAnswers, setNewAnswers] = useState([[]]);
  // const [render, setIsRender] = useState(false);
  // const [index, setIndex] = useState(0);
  // const [answer, setAnswer] = useState("");

  // Fetch all Q&As from DB which are waiting for review by instructor
  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await fetch(
          `${process.env.REACT_APP_API_URL}/dashboard`
        );
        const data = await result.json();
        setNewPosts(data);
      } catch (error) {
        console.log("Error fetching products");
      }
    };
    fetchData();
  }, []);
  return (
    <>
      <h1> dash board</h1>
      {newPosts[0].map((newPost, index) => (
        <Link
          to={"/editquestion/" + newPost.questionid}
          state={{
            questionId: newPost.questionid,
            questiondescription: newPost.questiondesc,
            questionstarred: newPost.isstarred,
            questionreviewed: newPost.isreviewed,
          }}
          className="list-item"
        >
          {newPost.questiondesc}
        </Link>
      ))}
      {/* {newPosts[1].map((newPost, index) => (
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
      ))} */}
    </>
  );
};

export default Dashboard;
