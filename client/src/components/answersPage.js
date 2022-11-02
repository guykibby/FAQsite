import { useParams } from "react-router-dom";

const AnswersPage = () => {
  const { id } = useParams();

  return <p>This is the answer page UNDER CONSTRUCTION: {id}</p>;
};

export default AnswersPage;
