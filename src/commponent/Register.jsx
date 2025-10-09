import React, { useState } from "react";
import "./login.css";
import logo from "../asset/Icon.webp";
import "./login.css";
import { Button } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { useAuthContext } from "../Context/authContext";

const Register = () => {
  const { setAuth } = useAuthContext();
  const [input, setinput] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const Navigate = useNavigate();
  function handleChange(e) {
    setinput({ ...input, [e.target.name]: e.target.value });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      const url = "http://localhost:8000/register";
      const response = await axios.post(url, input, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      });

      const result = response;
      console.log(result);
      if (result.status === 201) {
        setTimeout(() => {
          localStorage.setItem("blog-user", JSON.stringify(result.data));
          setAuth(result);
          setinput("");
          Navigate("/login");
        }, 1000);
      }
    } catch (error) {
      console.log(`register issue ${error}`);
    }
  }
  return (
    <div className="auth-page">
      <div className="login auth-card">
        <img src={logo} alt="Echo Of Voice logo" className="auth-logo" />
        <div className="app-name">blogApplication</div>
      <form action="/register" method="post" onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          value={input.name}
          placeholder="Enter Your Name"
          onChange={handleChange}
        />

        <input
          type="email"
          name="email"
          value={input.email}
          placeholder="Enter your Email-Id...."
          onChange={handleChange}
        />
        <div style={{ position: "relative" }}>
          <input
            type={showPassword ? "text" : "password"}
            name="password"
            value={input.password}
            placeholder="Password..."
            onChange={handleChange}
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
          Sign-Up
        </button>
      </form>

      <div>
        <p>Already have account?</p>
        <Link to="/">
          <Button variant="outlined">Login</Button>
        </Link>
      </div>
      </div>
    </div>
  );
};

export default Register;
