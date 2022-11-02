import { useParams } from "react-router-dom";

const PostAnswerPage = () => {
  const { id } = useParams();

  return <p className="list-item">UNDER CONSTRUCTION: {id}</p>;
};

export default PostAnswerPage;
