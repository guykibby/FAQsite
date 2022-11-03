import { Link } from "react-router-dom";

const HomePage = () => {
  return (
    <div>
      <Link to={"/questions/" + 1} className="list-item">
        View Questions
      </Link>
    </div>
  );
};

export default HomePage;
