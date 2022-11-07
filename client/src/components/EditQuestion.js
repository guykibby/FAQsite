import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import styles from "./EditQuestion.module.css";

const EditQuestion = () => {
  const { questionId } = useParams();
  const [star, setStar] = useState(false);
  const [review, setReview] = useState(false);
  const [starFlag, setStarFlag] = useState(false);
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
      `${process.env.REACT_APP_API_URL}/editquestion/${questionId}`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    /*
    if (response.ok) {
      navigate("/");
    } else {
      return (
        <div>
          <p>Error deleting the question.</p>
          <Link to={`/editquestion/${questionId}`}>Back to Edit Page</Link>
        </div>
      );
    }
    */
  };
  useEffect(() => {
    const edit = async () => {
      if (starFlag) {
        await fetch(
          `${process.env.REACT_APP_API_URL}/editquestion/${questionId}`,
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
          `${process.env.REACT_APP_API_URL}/editquestion/${questionId}`,
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
      <p>description of the question to be displayed here</p>
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
        <button onClick={handleDelete}>Delete Question</button>
      </div>
    </>
  );
};

export default EditQuestion;
