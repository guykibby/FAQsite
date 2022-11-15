import { useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./LoginPage.module.css";
const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch(
      `${process.env.REACT_APP_API_URL}/users?email=${email}?&password=${password}`
    );
    console.log(response);

    if (response.status === 404) {
      alert("Email not Found, please sign up!");
      navigate("/SignUp");
    }

    // const user = await response.json();
    // if (!user.token) {
    //   // alert("Invalid Login Details");
    //   navigate("/LogIn");
    // } else {
    //   localStorage.setItem("x-auth-token", JSON.stringify(user.token));
    //   localStorage.setItem("user", JSON.stringify(user.user));
    //   navigate("/");
    // }
  };
  return (
    <div>
      <form className={styles.logInForm} method="POST" onSubmit={handleSubmit}>
        <div>
          <label htmlFor="email">
            <p className={styles.inputs}>Email</p>
          </label>
          <input
            id="email"
            type="email"
            required
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="password">
            <p className={styles.inputs}>Password</p>
          </label>
          <input
            id="password"
            type="password"
            required
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button type="submit">Log In</button>
      </form>
    </div>
  );
};
export default LoginPage;
