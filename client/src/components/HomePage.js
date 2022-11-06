import { Link } from "react-router-dom";

const HomePage = () => {
  return (
    <div>
      <Link to={"/e/" + 1} className="list-item">
        View Questions
      </Link>
    </div>
  );
};

export default HomePage;
