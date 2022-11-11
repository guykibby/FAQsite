import { useNavigate } from "react-router-dom";
const EditButton = ({ information }) => {
  const navigate = useNavigate();
  const handleClick = async () => {
    navigate(`/editanswer/${information.id}`);
  };
  return <button onClick={handleClick}>Edit Post</button>;
};

export default EditButton;