import { Link } from "react-router-dom";

const HomePage = () => {
  return (
    <div className="main-container">
      <p className="title">Home Page</p>
      <Link to={"/questions/" + 1} className="list-item">
        View Questions
      </Link>
    </div>
  );
};

export default HomePage;
