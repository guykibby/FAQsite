import { useParams } from "react-router-dom";

const PostAnswerPage = () => {
  const { id } = useParams();

  return <p>This is the POST ANSWER page UNDER CONSTRUCTION: {id}</p>;
};

export default PostAnswerPage;
