
import { useEffect, useState } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import EditButton from "./EditButton";
import styles from "./EditQuestion.module.css";


const EditAnswer = () => {
  const { answerId } = useParams();
  const [answer, setAnswer] = useState({});
  const [star, setStar] = useState(false);
  const [review, setReview] = useState(false);
  const [starFlag, setStarFlag] = useState(false);
  const navigate = useNavigate();

  // to update the information as per the database
  useEffect(() => {
    const getAnswer = async () => {
      const response = await fetch(
        `${process.env.REACT_APP_API_URL}/editanswer/${answerId}`
      );
      const data = await response.json();
      setAnswer(data);
      setStar(data.isstarred);
      setReview(data.isreviewed);
    };
    getAnswer();
  }, [answerId]);

  // to handle the user events
  const handleChange = (e) => {
    e.preventDefault();
    if (e.target.id === "star") {
      setStarFlag(true);
      setStar(e.target.checked);
    } else {
      setStarFlag(false);
      setReview(e.target.checked);
    }
  };

  // handle delete post
  const handleDelete = async () => {
    const response = await fetch(
      `${process.env.REACT_APP_API_URL}/editanswer/${answerId}`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    if (response.ok) {
      navigate(`/answers/${answer.questionid}`);
    } else {
      return (
        <div>
          <p>Error deleting the question.</p>
          <Link to={`/editanswer/${answerId}`}>Back to Edit Page</Link>
        </div>
      );
    }
  };

  //handle updating the database as per the user events.
  useEffect(() => {
    const edit = async () => {
      if (starFlag) {
        await fetch(`${process.env.REACT_APP_API_URL}/editanswer/${answerId}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            starFlag,
            isStarred: star,
            isReviewed: review,
          }),
        });
      } else {
        await fetch(`${process.env.REACT_APP_API_URL}/editanswer/${answerId}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            starFlag,
            isStarred: star,
            isReviewed: review,
          }),
        });
      }
    };
    edit();
  }, [star, review, answerId, starFlag, answer]);

  return (
    <>
      <h2>{answer.description}</h2>
      <div className={styles.editbar}>
        <div>
          <label htmlFor="review">Review</label>
          <input
            id="review"
            type="checkbox"
            checked={review}
            className={styles.checkbox}
            onChange={(e) => handleChange(e)}
            data-testid="review-checkbox"
          />
        </div>
        <div>
          <label htmlFor="star">Star</label>
          <input
            id="star"
            type="checkbox"
            checked={star}
            className={styles.checkbox}
            onChange={(e) => handleChange(e)}
            data-testid="star-checkbox"
          />
        </div>
        <EditButton information={answer} onClick={handleDelete} />
      </div>
    </>
  );
};

export default EditAnswer;
