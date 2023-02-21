import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import "./login.scss";

function login() {
  const { login } = useContext(AuthContext);
  const [inputs, setInputs] = useState({
    username: "",
    password: "",
  });
  const [error, setError] = useState(false);
  const navigate = useNavigate();

  const handleInputs = (e) => {
    setInputs((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  async function handleLogin(e) {
    e.preventDefault();
    try {
      login(inputs);
    } catch (error) {
      setError(error.response.data.message);
    }
  }

  return (
    <div className="login">
      <div className="card">
        <div className="left">
          <h1>I'M LEVON</h1>
          <p>
          Social media website design using React, SCSS. React social
            media app using React Hooks, React Query, Context API, Dark Mode, Responsive
            design. Backend was implemented with Firebase V9, MySql, ExressJS. Auth system was 
            done by using JWT token. Let's go to Home Page!
          </p>
          <span>Don't you have an account?</span>

          <Link to="/register">
            <button>Register</button>
          </Link>
        </div>
        <div className="right">
          <h1>Login</h1>
          <form>
            <input
              name="username"
              onChange={handleInputs}
              type="text"
              placeholder="Username"
            />
            <input
              name="password"
              onChange={handleInputs}
              type="password"
              placeholder="Password"
            />

            {error && <p>{error}</p>}
            <button onClick={handleLogin}>Login</button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default login;
