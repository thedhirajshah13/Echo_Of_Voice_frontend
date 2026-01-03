import { useState } from "react";
import logo from "../asset/Icon.webp";
import "./login.css";
import { Button } from "@mui/material";
import axios from "axios";
import { Link } from "react-router-dom";

import { useNavigate } from "react-router-dom";
import { useAuthContext } from "../Context/authContext";

const Login = () => {
  const { setAuth, auth } = useAuthContext();
  const [login, setlogin] = useState({
    email: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [error, seterror] = useState("");
  const [loading, setLoading] = useState(false);
  const [fieldError, setFieldError] = useState("");

  const Naviagte = useNavigate();
  function handleChange(e) {
    setlogin({ ...login, [e.target.name]: e.target.value });
  }
  async function handleSubmit(e) {
    e.preventDefault();
    // client-side validation
    if (!login.email || !login.password) {
      setFieldError("Email and password are required.");
      return;
    }
    // basic email pattern check
    const emailPattern = /\S+@\S+\.\S+/;
    if (!emailPattern.test(login.email)) {
      setFieldError("Please enter a valid email address.");
      return;
    }
    setFieldError("");
    setLoading(true);
    try {
      const url = `${process.env.REACT_APP_API_URL}/login`;
      const response = await axios.post(url, JSON.stringify(login), {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      });
      // handle non-2xx responses gracefully
      if (!response || response.status !== 201) {
        const msg =
          response?.data?.msg || "Login failed. Please check your credentials.";
        seterror(msg);
        return;
      }
      const result = response.data;
      // console.log("Login successful:", result);
      localStorage.setItem("blog-user", JSON.stringify(result));
      setAuth(result);
      console.log(auth)
      // console.log("Auth set in context" + result);
      Naviagte("/");
    } catch (error) {
      console.log(`client->login Error ${error}`);
      const msg =
        error?.response?.data?.msg || "Network error. Please try again.";
      seterror(msg);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="auth-page">
      <div className="login auth-card">
        {loading && (
          <div className="auth-overlay" aria-hidden="true">
            <span className="spinner large"></span>
          </div>
        )}
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
          <button type="submit" className="login-btn btn" disabled={loading}>
            {loading ? (
              <span className="spinner" aria-hidden="true"></span>
            ) : (
              "Login"
            )}
          </button>
        </form>
        {fieldError && (
          <div className="auth-error" role="alert">
            {fieldError}
          </div>
        )}
        {error && (
          <div className="auth-error" role="alert">
            {error}
          </div>
        )}

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
