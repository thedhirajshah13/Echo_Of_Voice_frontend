import React from "react";
import Login from "../commponent/Login";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Register from "../commponent/Register";
import { useAuthContext } from "../Context/authContext";

const Home = ({ authenticated, isauthenticated }) => {
  const { auth } = useAuthContext();
  console.log(auth);
  return (
    <div>
      {
        <Routes>
          <Route
            path="/login"
            element={auth ? <Navigate to="/" /> : <Login />}
          />
          <Route
            path="/register"
            element={auth ? <Navigate to="/login" /> : <Register />}
          />
        </Routes>
      }
    </div>
  );
};

export default Home;
