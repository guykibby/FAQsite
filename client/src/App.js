import { useState, useEffect } from "react";

const App = () => {
  const [questionsList, setQuestionsList] = useState([
    { question_description: "Waiting for DATA" },
  ]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await fetch(`${process.env.REACT_APP_API_URL}/getData`);
        const data = await result.json();
        console.log(data);
        setQuestionsList(data);
      } catch (error) {
        console.log(error.message);
      }
    };
    fetchData();
  }, []);

  return (
    <>
      <h1>Test data render</h1>
      {questionsList.map((question, index) => (
        <div key={index}>
          <p>{question.question_description}</p>
        </div>
      ))}
    </>
  );
};

export default App;
