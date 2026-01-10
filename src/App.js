import { BrowserRouter, Navigate, Routes, Route } from "react-router-dom";
import BlogPost from "./Pages/BlogPost";
import { useAuthContext } from "./Context/authContext";
import { BlogContentProvider } from "./Context/blogContentContext";
import { SocketContextProvider } from "./Context/socketContext";

import Login from "./commponent/Login";
import Register from "./commponent/Register";
import Main from "./Pages/Main";
import Fullblog from "./commponent/Fullblog";
import Profile from "./commponent/Profile";

import "./app.css";

function App() {
  const { auth, loading } = useAuthContext();
  // const {success}=auth
  console.log(auth);
  // console.log(process.env.REACT_APP_API_URL);

  return (
    <BrowserRouter>
      <BlogContentProvider>
        <SocketContextProvider>
          <Routes>
            <Route path="/" element={<PrivateRoute />} />
            <Route path="/login" element={<Login />} />
            <Route path="register" element={<Register />} />
            <Route path="/fullblog/:id" element={<Fullblog />} />

            <Route path="/profile" element={<Profile />} />

            {/* <Route path="createblog" element={<Blog/>}/> */}

            <Route
              path="createpost"
              element={
                loading ? null : auth ? ( // or loader
                  <BlogPost />
                ) : (
                  <Navigate to="/login" />
                )
              }
            />
          </Routes>
        </SocketContextProvider>
      </BlogContentProvider>
    </BrowserRouter>
  );
}

const PrivateRoute = () => {
  const { auth, loading } = useAuthContext();

  if (loading) return null; // or loader

  return auth ? <Main /> : <Navigate to="/login" />;
};

export default App;
