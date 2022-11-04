// import { useParams } from "react-router-dom";

// const ViewQuestions = () => {
//   const { topicId } = useParams();

//   return <div className="list-item">UNDER CONSTRUCTION. CODE: {topicId}</div>;
// };

const ViewQuestions = ({ topicId, description }) => {
  return (
    <li>
      <h2 className="list-item">{topicId}</h2>
      <p className="list-item">{description}</p>
    </li>
  );
};

export default ViewQuestions;
