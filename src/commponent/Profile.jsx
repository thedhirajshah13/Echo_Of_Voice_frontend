import { useState, useEffect } from "react";
import "./profile.css";
import profileImage from "../asset/profileImage.avif";
import Navbar from "./Navbar";
import Footer from "./Footer";
import axios from "axios";

const Profile = () => {
  const [userData, setUserData] = useState([]);
  const [userBlogs, setUserBlogs] = useState([]);
  //   const { auth } = useAuthContext();
  const url = process.env.REACT_APP_API_URL;
  // getting usetDeatils

  async function getLoggedInUserDetailsAndHisBlogs() {
    try {
      const [loggedInUserDetails, loggedInUserBlogs] = await Promise.all([
        axios.get(`${url}/user/me/myprofile`, { withCredentials: true }),
        axios.get(`${url}/user/me/myblogs`, { withCredentials: true }),
      ]);
      //   console.log(
      //     "Logged in user details:",
      //     loggedInUserDetails.data,
      //     "User's blogs:",
      //     loggedInUserBlogs.data
      //   );
      setUserData(loggedInUserDetails.data.Profile);
      setUserBlogs(loggedInUserBlogs.data.myBlogs);
      console.log("User blogs:", loggedInUserBlogs.data);
      console.log("User data:", loggedInUserDetails.data);
    } catch (err) {
      console.log("Error in getting user details and his blogs", err);
    }
  }

  useEffect(() => {
    getLoggedInUserDetailsAndHisBlogs();
  }, []);
  return (
    <>
      <Navbar />
      <div className="profile">
        <header className="profile-header">
          <div className="profile-header-left">
            <img src={profileImage} alt="avatar" className="avatar" />
            <div className="user-basic">
              <h2 className="user-name">{userData.name}</h2>
              <p className="user-email">{userData.email}</p>
            </div>
          </div>
          <button className="edit-btn">Edit Profile</button>
        </header>

        <main className="profile-main">
          <section className="profile-right">
            <h3 className="section-title">Your Posts</h3>

            {userBlogs.length === 0 ? (
              <div className="posts">
                <div className="empty-post">
                  <p className="empty-title">You have not created any posts.</p>
                  <p className="empty-action">
                    Write your first blog to get started.
                  </p>
                  <button className="write-btn">Write a Blog</button>
                </div>
              </div>
            ) : (
              <div>
                {userBlogs.map((blog) => (
                  <div className="post-card" key={blog._id}>
                    <img src={blog.image} />
                    <h4 className="post-title">{blog.title}</h4>
                  </div>
                ))}
              </div>
            )}
          </section>
        </main>
      </div>
      <Footer />
    </>
  );
};

export default Profile;
