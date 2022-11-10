import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

/** Fetch API, will fetch questions waiting for review from questions table
 *  and answers waiting for review from answers table
 * which needs to be reviewed by instructor
 * newPosts is an array viriable will holds questions in newPost[0] and answers in newPost[1]
 * to display it on dashboard which are waiting for review by instructor
 * */
const Dashboard = () => {
  /* newPosts is an array viriable will holds questions in newPost[0] and answers in newPost[1] */
  // const [newPosts, setNewPosts] = useState([{}, {}]);
  const [error, setError] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await fetch(
          `${process.env.REACT_APP_API_URL}/dashboard1`
        );

        if (result.ok === false) {
          setIsLoading(false);
          setError(true);
        } else {
          const data = await result.json();
          // setNewPosts(data);
          console.log("AAAA : " + JSON.stringify(data));
          setIsLoading(false);
        }
      } catch (error) {
        setError(true);
        setIsLoading(false);
        console.log("Error fetching products");
      }
    };
    fetchData();
  }, []);

  return (
    <div className="list-item">
      <h1>Dashboard</h1>
      {isLoading && <p className="loading-list-item">Loading....</p>}
      {error && <p className="error-list-item">Oops, something went wrong!</p>}
    </div>
  );
};

export default Dashboard;
