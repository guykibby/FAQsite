import { useParams } from "react-router-dom";

const PostQuestionsPage = () => {
  const { id } = useParams();

  return <p>This is the POST questions page UNDER CONSTRUCTION: {id}</p>;
};

export default PostQuestionsPage;
