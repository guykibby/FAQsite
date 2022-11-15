import { useState } from "react";

const LogInPage = () => {
  const [email, setEmail] = useState("bla bla");

  const handleSubmit = async (event) => {
    // event.preventDefault();
    // setIsLoading(true);
    // try {
    //   const response = await fetch(
    //     `${process.env.REACT_APP_API_URL}/postQuestion/${topicId}`,
    //     {
    //       method: "POST",
    //       headers: {
    //         "Content-Type": "application/json",
    //       },
    //       body: JSON.stringify({ description: question }),
    //     }
    //   );
    //   if (!response.ok) {
    //     console.log("Fetch not ok");
    //     setError(true);
    //   } else {
    //     setIsLoading(false);
    //     navigate(`/questions/${topicId}`);
    //   }
    // } catch (error) {
    //   setError(true);
    // }
  };

  return (
    <>
      <p className="list-item">UNDER CONSTRUCTION. </p>
      <form onSubmit={handleSubmit} className="main-container">
        <input
          type="text"
          required
          id="email"
          name="email"
          className="list-item"
          value={email}
          onChange={(e) => {
            setAnswer(e.target.value);
          }}
        />
        <button className="list-item">Submit</button>
      </form>
    </>
  );
};

export default LogInPage;
