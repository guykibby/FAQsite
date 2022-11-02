import { useParams } from "react-router-dom";

const AnswersPage = () => {
  const { id } = useParams();

  return <p className="list-item">UNDER CONSTRUCTION: {id}</p>;
};

export default AnswersPage;
