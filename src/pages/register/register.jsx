import "./register.scss";
import axios from "axios";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { BASE_URL } from "../api/consts";

function register() {
  const [inputs, setInputs] = useState({
    username: "",
    password: "",
    email: "",
    name: "",
  });
  const navigate = useNavigate();
  const [error, setError] = useState(false);
  const handleInputs = (e) => {
    setInputs((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleClick = async (e) => {
    e.preventDefault();
    setError(false);
    try {
      await axios
        .post(`${BASE_URL}/auth/register`, inputs)
        .then(() => {
          navigate("/login");
        });
    } catch (error) {
      setError(error.response.data.message);
    }
  };

  return (
    <div className="register">
      <div className="card">
        <div className="left">
          <h1>I'M LEVON</h1>
          <p>
            Social media website design using React, SCSS. React social media
            app using React Hooks, React Query, Context API, Dark Mode,
            Responsive design. Backend was implemented with Firebase V9, MySql,
            ExressJS. Auth system was done by using JWT token. Let's go to Home
            Page!
          </p>
          <span>Do you have an account?</span>
          <Link to="/login">
            <button>Login</button>
          </Link>
        </div>
        <div className="right">
          <h1>Register</h1>
          <form>
            <input
              name="username"
              onChange={handleInputs}
              type="text"
              placeholder="Username"
            />
            <input
              name="email"
              onChange={handleInputs}
              type="email"
              placeholder="Email"
            />
            <input
              name="name"
              onChange={handleInputs}
              type="text"
              placeholder="Name"
            />
            <input
              name="password"
              onChange={handleInputs}
              type="password"
              placeholder="Password"
            />
            {error && <p>{error}</p>}
            <button onClick={handleClick}>Register</button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default register;
