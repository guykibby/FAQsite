import { useParams } from "react-router-dom";

const QuestionsPage = () => {
  const { topicId } = useParams();

  return <div className="list-item">UNDER CONSTRUCTION. CODE: {topicId}</div>;
};

export default QuestionsPage;
