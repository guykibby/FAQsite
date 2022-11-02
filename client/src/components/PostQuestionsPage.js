import { useParams } from "react-router-dom";

const PostQuestionsPage = () => {
  const { id } = useParams();

  return <p className="list-item">UNDER CONSTRUCTION: {id}</p>;
};

export default PostQuestionsPage;
