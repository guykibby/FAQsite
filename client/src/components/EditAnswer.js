import { useParams } from "react-router-dom";

const EditAnswer = () => {
  const { id } = useParams();

  return <p className="list-item">UNDER CONSTRUCTION. CODE: {id}</p>;
};

export default EditAnswer;
