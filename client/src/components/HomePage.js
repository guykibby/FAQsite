import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

// the topics array to be fetched from the DB
let theTopics = [];

// theTopics will be filtered with the use of keys
const levelKeys = ["year", "term", "topic"];

// the branchs will be determined by the users menu selections
let branch = "";

const HomePage = () => {
  const [level, setLevel] = useState(1);
  const navigate = useNavigate();

  // Filtering through the array depending on the level and branch the user is on
  const branchArray = theTopics.filter((x) =>
    level === 0 ? true : x[levelKeys[level - 1]] === branch
  );

  // Mapping to get the data we wish to display
  let displayArray = branchArray.map((x) => x[levelKeys[level]]);

  // Only displayying uniques values
  displayArray = [...new Set(displayArray)];

  // Fetching the topics data from DB
  useEffect(() => {
    const fetchData = async () => {
      const result = await fetch(`${process.env.REACT_APP_API_URL}/topics`);
      const data = await result.json();
      theTopics = data;
      setLevel(0);
    };
    fetchData();
  }, []);

  // handling menu selections
  const handleClick = (choice) => {
    if (level === 2) {
      const topic = theTopics.filter(
        (e) => e.term === branch && e.topic === choice
      );
      navigate(`/questions/${topic[0].id}`);
    }
    branch = choice;
    setLevel((t) => t + 1);
  };

  return (
    <>
      {displayArray.map((e, i) => (
        <button
          value={e}
          key={i}
          onClick={(e) => handleClick(e.target.value)}
          className="list-item"
        >
          {e}
        </button>
      ))}
    </>
  );
};
export default HomePage;
