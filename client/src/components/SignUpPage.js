import { useState } from "react";
import { useNavigate } from "react-router-dom";

const SignUpPage = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch(`${process.env.REACT_APP_API_URL}/users`, {
      method: "POST",
      headers: {
        "CONTENT-TYPE": "application/json",
      },
      body: JSON.stringify({ name, email, password }),
    });
    if (response.ok) {
      navigate("/LogIn");
    } else {
      window.alert("please try again");
      setName("");
      setEmail("");
      setPassword("");
    }
  };
  return (
    <div>
      <p className="list-item">PLEASE GIVE US YOUR DETAILS. </p>
      <form className="main-container" method="POST" onSubmit={handleSubmit}>
        <div>
          <label htmlFor="name">
            <p className="">Name</p>
          </label>
          <input
            id="name"
            required
            type="text"
            name="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="email">
            <p className="">Email</p>
          </label>
          <input
            id="email"
            required
            type="email"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="password">
            <p className="">Password</p>
          </label>
          <input
            id="password"
            required
            type="password"
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button type="submit">SignUp</button>
      </form>
    </div>
  );
};

export default SignUpPage;
