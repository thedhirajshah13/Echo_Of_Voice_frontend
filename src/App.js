import { BrowserRouter, Navigate, Routes, Route } from "react-router-dom";
import BlogPost from "./Pages/BlogPost";
import { AuthContextProvider, useAuthContext } from "./Context/authContext";
import { BlogContentProvider } from "./Context/blogContentContext";
import { SocketContextProvider } from "./Context/socketContext";

import Login from "./commponent/Login";
import Register from "./commponent/Register";
import Main from "./Pages/Main";
import Fullblog from "./commponent/Fullblog";
import Blog from "./commponent/Blog"
import "./app.css";

function App() {
  const { auth } = useAuthContext();

  return (
    <BrowserRouter>
      <AuthContextProvider>
        <BlogContentProvider>
        <SocketContextProvider>
          <Routes>
            <Route path="/" element={<PrivateRoute />} />
            <Route path="/login" element={<Login />} />
            <Route path="register" element={<Register />} />
            <Route path="/fullblog/:id" element={<Fullblog />} />
            {/* <Route path="createblog" element={<Blog/>}/> */}
            <Route
              path="createpost"
              element={auth ? <BlogPost /> : <Navigate to="/login" />}
            />
            
          </Routes>
          </SocketContextProvider>
        </BlogContentProvider>
      </AuthContextProvider>
    </BrowserRouter>
  );
}

const PrivateRoute = () => {
  const { auth } = useAuthContext();

  return auth ? <Main /> : <Navigate to="/login" />;
};

export default App;
