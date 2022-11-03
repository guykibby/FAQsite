import { useParams } from "react-router-dom";

const EditQuestion = () => {
  const { questionId } = useParams();

  return <p className="list-item">UNDER CONSTRUCTION. CODE: {questionId}</p>;
};

export default EditQuestion;
