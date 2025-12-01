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
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const Navigate = useNavigate();
  function handleChange(e) {
    setinput({ ...input, [e.target.name]: e.target.value });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    // client-side validation
    if (!input.name || !input.email || !input.password) {
      setError('Name, email and password are required.');
      return;
    }
    const emailPattern = /\S+@\S+\.\S+/;
    if (!emailPattern.test(input.email)) {
      setError('Please enter a valid email address.');
      return;
    }
    setError("");
    setSuccess("");
    setLoading(true);
    try {
      const url = `${process.env.REACT_APP_API_URL}/register`;
      const response = await axios.post(url, input, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      });

      if (response && response.status === 201) {
        setSuccess('Account created successfully. Redirecting to login...');
        // Save user and redirect after short delay
        setTimeout(() => {
          localStorage.setItem("blog-user", JSON.stringify(response.data));
          setAuth(response.data);
          setinput("");
          Navigate("/login");
        }, 1200);
      } else {
        const msg = response?.data?.message || 'Registration failed. Please try again.';
        setError(msg);
      }
    } catch (error) {
      console.log(`register issue ${error}`);
      const msg = error?.response?.data?.message || 'Network error. Please try again.';
      setError(msg);
    }
    finally {
      setLoading(false);
    }
  }
  return (
    <div className="auth-page">
      <div className="login auth-card">
        {loading && <div className="auth-overlay" aria-hidden="true"><span className="spinner large"></span></div>}
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
        <button type="submit" className="login-btn btn" disabled={loading}>
          {loading ? <span className="spinner" aria-hidden="true"></span> : 'Sign-Up'}
        </button>
      </form>

      {error && <div className="auth-error" role="alert">{error}</div>}
      {success && <div className="auth-success" role="status">{success}</div>}

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
