import { useParams } from "react-router-dom";

const QuestionsPage = () => {
  const { id } = useParams();

  return <p>This is the QUESTIONS page UNDER CONSTRUCTION: {id}</p>;
};

export default QuestionsPage;
