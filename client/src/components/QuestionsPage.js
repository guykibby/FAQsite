import { useParams } from "react-router-dom";

const QuestionsPage = () => {
  const { id } = useParams();

  return <div className="list-item">UNDER CONSTRUCTION. CODE: {id}</div>;
};

export default QuestionsPage;
