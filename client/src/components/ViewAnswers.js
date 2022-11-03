import { useParams } from "react-router-dom";

const ViewAnswers = () => {
  const { questionId } = useParams();

  return <p className="list-item">UNDER CONSTRUCTION. CODE: {questionId}</p>;
};

export default ViewAnswers;
