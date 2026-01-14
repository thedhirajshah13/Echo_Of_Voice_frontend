import { useState, useEffect } from "react";
import "./profile.css";
import profileImage from "../asset/profileImage.avif";
import Navbar from "./Navbar";
import Footer from "./Footer";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Profile = () => {
  const [userData, setUserData] = useState([]);
  const [userBlogs, setUserBlogs] = useState([]);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [formData, setFormData] = useState({ name: "", profilePhoto: null });
  const [previewPhoto, setPreviewPhoto] = useState(profileImage);
  const navigate = useNavigate();
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

  const openEditModal = () => {
    setFormData({ name: userData.name || "", profilePhoto: null });
    setPreviewPhoto(profileImage);
    setIsEditOpen(true);
  };

  const closeEditModal = () => {
    setIsEditOpen(false);
    setFormData({ name: "", profilePhoto: null });
    setPreviewPhoto(profileImage);
  };

  const handleNameChange = (e) => {
    setFormData({ ...formData, name: e.target.value });
  };

  const handlePhotoChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData({ ...formData, profilePhoto: file });
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewPhoto(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSaveChanges = () => {
    // Handle save logic here - currently just closing modal
    console.log("Saving changes:", formData);
    closeEditModal();
  };
  return (
    <>
      <Navbar />
      <div className="profile">
        <header className="profile-header">
          <div className="profile-header-left">
            <img src={userData.profileImg || profileImage} alt="avatar" className="avatar" />
            <div className="user-basic">
              <h2 className="user-name">{userData.name}</h2>
              <p className="user-email">{userData.email}</p>
            </div>
          </div>
          <button className="edit-btn" onClick={openEditModal}>Edit Profile</button>
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
                  <button className="write-btn" onClick={()=>navigate('/createpost')}>Write a Blog</button>
                </div>
              </div>
            ) : (
              <div>
                {userBlogs.map((blog) => (
                  <div
                    className="post-card"
                    key={blog._id}
                    onClick={() => navigate(`/post/${blog._id}`)}
                    role="button"
                    tabIndex={0}
                    onKeyDown={(e) => e.key === 'Enter' && navigate(`/post/${blog._id}`)}
                  >
                    <img src={blog.image || profileImage} alt={blog.title} />
                    <div className="post-overlay" />
                    <h4 className="post-title">{blog.title}</h4>
                  </div>
                ))}
              </div>
            )}
          </section>
        </main>
      </div>
      <Footer />

      {/* Edit Modal */}
      {isEditOpen && (
        <div className="modal-overlay" onClick={closeEditModal}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h2>Edit Profile</h2>
              <button className="modal-close" onClick={closeEditModal}>×</button>
            </div>

            <div className="modal-body">
              <div className="photo-section">
                <img src={previewPhoto} alt="preview" className="preview-photo" />
                <label htmlFor="photo-input" className="photo-upload-label">
                  Change Photo
                </label>
                <input
                  id="photo-input"
                  type="file"
                  accept="image/*"
                  onChange={handlePhotoChange}
                  className="hidden-input"
                />
              </div>

              <div className="form-group">
                <label htmlFor="name-input">Full Name</label>
                <input
                  id="name-input"
                  type="text"
                  value={formData.name}
                  onChange={handleNameChange}
                  placeholder="Enter your full name"
                  className="input-field"
                />
              </div>
            </div>

            <div className="modal-footer">
              <button className="cancel-btn" onClick={closeEditModal}>Cancel</button>
              <button className="save-btn" onClick={handleSaveChanges}>Save Changes</button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Profile;
