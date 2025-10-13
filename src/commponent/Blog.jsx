import React, { useEffect, useState } from "react";
import "./blog.css";
import PhotoCameraBackOutlinedIcon from "@mui/icons-material/PhotoCameraBackOutlined";
import CircularProgress from "@mui/material/CircularProgress"; // ✅ Spinner
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Blog = () => {
  const postData = {
    image: "",
    title: "",
    blog: "",
    catergories: "",
    date: new Date(),
  };

  const [imgfile, setimgfile] = useState("");
  const [post, setpost] = useState(postData);
  const [blogimg, setblogimg] = useState("");
  const [loading, setLoading] = useState(false); // ✅ Spinner state
  const navigate = useNavigate();

  function handlechange(e) {
    setpost({
      ...post,
      [e.target.name]: e.target.value,
    });
  }

  let url = blogimg
    ? blogimg
    : "https://img.freepik.com/premium-photo/modern-dark-wooden-office-desk-night-warm-light-from-table-lamp-with-laptop_67155-24625.jpg?w=1380";

  useEffect(() => {
    async function handleImage() {
      if (imgfile) {
        const formdata = new FormData();
        formdata.append("file", imgfile);
        setLoading(true); // ✅ Start loader

        try {
          const response = await axios.post(
            `${process.env.REACT_APP_API_URL}/file/upload`,
            formdata,
            {
              headers: {
                "Content-Type": "multipart/form-data",
              },
            }
          );

          console.log(response.data);
          const imageUrl = response.data.url; // ✅ Corrected response usage
          setblogimg(imageUrl);
          setpost((prevState) => ({
            ...prevState,
            image: imageUrl,
          }));
        } catch (error) {
          console.error("Image upload failed:", error);
          alert("Image upload failed. Please try again.");
        } finally {
          setLoading(false); // ✅ Stop loader
        }
      }
    }

    handleImage();
  }, [imgfile]);

  async function handlePublish(e) {
    e.preventDefault();
    try {
      const responseData = await axios.post(
        `${process.env.REACT_APP_API_URL}/blogpost`,
        post,
        { withCredentials: true }
      );
      if (responseData.status === 200) {
        navigate("/");
      }
    } catch (error) {
      console.error("Error publishing blog:", error);
    }
  }

  return (
    <>
      <div className="blog">
        <div className="image-container" style={{ position: "relative" }}>
          <img src={url} alt="url" className="blog-preview" />
          {loading && (
            <div
              style={{
                position: "absolute",
                top: "50%",
                left: "50%",
                transform: "translate(-50%, -50%)",
                backgroundColor: "rgba(0,0,0,0.4)",
                borderRadius: "10px",
                padding: "10px",
              }}
            >
              <CircularProgress color="inherit" />
            </div>
          )}
        </div>

        <form onSubmit={handlePublish}>
          <div className="first-part">
            <label htmlFor="upload" style={{ cursor: "pointer" }}>
              <PhotoCameraBackOutlinedIcon />
            </label>
            <input
              type="file"
              id="upload"
              style={{ display: "none" }}
              onChange={(e) => setimgfile(e.target.files[0])}
            />
            <input
              type="text"
              name="title"
              placeholder="Title"
              onChange={handlechange}
            />
            <input
              type="text"
              placeholder="Add Category.."
              name="catergories"
              onChange={handlechange}
            />
            <button type="submit" disabled={loading}>
              {loading ? "Uploading..." : "Publish"}
            </button>
          </div>

          <textarea
            placeholder="blog"
            name="blog"
            rows={10}
            cols={50}
            onChange={handlechange}
          />
        </form>
      </div>
    </>
  );
};

export default Blog;
