import React, { useContext, useState } from "react";
import logo from "../asset/Icon.webp";
import "./login.css";
import { Button } from "@mui/material";
import axios from "axios";
import { Link } from "react-router-dom";

import { useNavigate } from "react-router-dom";
import { useAuthContext } from "../Context/authContext";

const Login = () => {
  const { setAuth } = useAuthContext();
  const [login, setlogin] = useState({
    email: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [error, seterror] = useState("");

  const Naviagte = useNavigate();
  function handleChange(e) {
    setlogin({ ...login, [e.target.name]: e.target.value });
  }
  async function handleSubmit(e) {
    e.preventDefault();

    try {
      const url = "http://localhost:8000/login";
      const response = await axios.post(url, JSON.stringify(login), {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      });
      console.log(response);
      const result = response.data;

      localStorage.setItem("blog-user", JSON.stringify(result));
      setAuth(result);
      Naviagte("/");
    } catch (error) {
      console.log(`client->login Error ${error}`);
    }
  }

  return (
    <div className="auth-page">
      <div className="login auth-card">
        <img src={logo} alt="Echo Of Voice logo" className="auth-logo" />
        <div className="app-name">blogApplication</div>
      <form action="/" method="POST" onSubmit={handleSubmit}>
        <input
          type="email"
          name="email"
          value={login.email}
          onChange={handleChange}
          required
          placeholder="Enter your Email-Id...."
        />
        <div style={{ position: "relative" }}>
          <input
            type={showPassword ? "text" : "password"}
            name="password"
            value={login.password}
            onChange={handleChange}
            required
            placeholder="Password..."
          />
          <button
            type="button"
            className="pwd-toggle"
            onClick={() => setShowPassword((s) => !s)}
            aria-label={showPassword ? "Hide password" : "Show password"}
          >
            {showPassword ? "Hide" : "Show"}
          </button>
        </div>
        <br />
        <button type="submit" className="login-btn btn">
          Login
        </button>
      </form>

      <div>
        <p>New User?</p>
        <Link to="/register">
          <Button variant="outlined">Create new Account</Button>
        </Link>
      </div>
      </div>
    </div>
  );
};

export default Login;
