import { useParams } from "react-router-dom";

const AnswersPage = () => {
  const { id } = useParams();

  return <p>This is the answer page: {id}</p>;
};

export default AnswersPage;
