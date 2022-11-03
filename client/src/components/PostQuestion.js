import { useParams } from "react-router-dom";

const PostQuestion = () => {
  const { topicId } = useParams();

  return <p className="list-item">UNDER CONSTRUCTION. CODE: {topicId}</p>;
};

export default PostQuestion;
