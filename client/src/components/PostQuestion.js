import { useParams } from "react-router-dom";

const PostQuestion = () => {
  const { topicId } = useParams();
  const handelSubmit = async (event) => {
    event.preventDefault();
  };

  return (
    <>
      <p className="list-item">UNDER CONSTRUCTION. CODE: {topicId}</p>;
      <form onSubmit={handelSubmit}>
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
