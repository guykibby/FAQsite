import { useEffect, useState } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import styles from "./EditQuestion.module.css";

const EditAnswer = () => {
  const { answerId } = useParams();
  const [star, setStar] = useState(false);
  const [review, setReview] = useState(false);
  const [starFlag, setStarFlag] = useState(false);
  const navigate = useNavigate();
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
    /*
    if (response.ok) {
      navigate(`/answers/${questionId}`);
    } else {
      return (
        <div>
          <p>Error deleting the question.</p>
          <Link to={`/editanswer/${answerId}`}>Back to Edit Page</Link>
        </div>
      );
    }
    */
  };
  useEffect(() => {
    const edit = async () => {
      if (starFlag) {
        await fetch(
          `${process.env.REACT_APP_API_URL}/editanswer/${answerId}`,
          {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              starFlag,
              isStarred: star,
              isReviewed: review,
            }),
          }
        );
      } else {
        await fetch(
          `${process.env.REACT_APP_API_URL}/editanswer/${answerId}`,
          {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              starFlag,
              isStarred: star,
              isReviewed: review,
            }),
          }
        );
      }
    };
    edit();
  }, [star, review]);
  return (
    <>
      <p>description of the Answer to be displayed here</p>
      <div className={styles.editbar}>
        <div>
          <label htmlFor="review">Review</label>
          <input
            id="review"
            type="checkbox"
            checked={review}
            className={styles.checkbox}
            onChange={(e) => handleChange(e)}
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
          />
        </div>
        <button onClick={handleDelete}>Delete Answer</button>
      </div>
    </>
  );
};

export default EditAnswer;
