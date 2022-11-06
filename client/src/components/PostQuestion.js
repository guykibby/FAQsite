import { useParams } from "react-router-dom";

const PostQuestion = () => {
  const { topicId } = useParams();

  return (
    <>
      <p className="list-item">UNDER CONSTRUCTION. CODE: {topicId}</p>;
      <form>
        <label>
          Question Title
          <input type="text" name="name" />
        </label>
        <label>
          Questions description
          <input type="text" name="name" />
        </label>
        <input type="submit" value="Submit" />
      </form>
    </>
  );
};

export default PostQuestion;
