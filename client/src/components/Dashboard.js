import { useEffect, useState } from "react";
import dashboardStyles from "./Dashboard.module.css";
// import Popup from "reactjs-popup";
import "reactjs-popup/dist/index.css";

const Dashboard = () => {
  const [faqs, setFaqs] = useState([]);
  const [open, setOpen] = useState(false);
  const [index, setIndex] = useState(0);
  const [answer, setAnswer] = useState("");

  // Fetch all Q&As from DB which are waiting for review by instructor
  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await fetch(
          `${process.env.REACT_APP_API_URL}/dashboard`
        );
        const data = await result.json();
        setFaqs(data);
      } catch (error) {
        console.log("Error fetching products");
      }
    };
    fetchData();
  }, []);

  const Popup = ({ closePopup }) => {
    return (
      <div className={dashboardStyles.popupContainer}>
        <div className={dashboardStyles.popupBody}>
          <p>
            <span className={dashboardStyles.bold}>Answer {index + 1}: </span>{" "}
            {answer}
          </p>
          <button onClick={closePopup}>Close X</button>
        </div>
      </div>
    );
  };

  return (
    <div className={dashboardStyles.dashboardContainer}>
      <h1 className={dashboardStyles.dashboardTitle}>DASH BOARD</h1>
      <div className={dashboardStyles.dashboardQAContainer}>
        {faqs.map((faq, index) => (
          <div key={index} className={dashboardStyles.dashboardQA}>
            <div className={dashboardStyles.dashboardQuestionContainer}>
              <p className={dashboardStyles.dashboardQuestion}>
                {faq.description}
              </p>
              {faq.json_build_object.answers.length > 0 && (
                <p className={dashboardStyles.dashboardQuestionCount}>
                  {faq.json_build_object.answers.length} Answers
                </p>
              )}
            </div>
            <div className={dashboardStyles.dashboardAnswerContainer}>
              {faq.json_build_object.answers.map((answer, index) => (
                <div>
                  <p
                    key={index}
                    className={dashboardStyles.dashboardAnswer}
                    onClick={() => {
                      setOpen(true);
                      setIndex(index);
                      setAnswer(answer);
                    }}
                  >
                    <span className={dashboardStyles.bold}>
                      Answer {index + 1}:
                    </span>
                    {answer}
                  </p>
                  {open ? <Popup closePopup={() => setOpen(false)} /> : null}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Dashboard;
