import React, { useContext, useEffect, useState } from "react";
import "./blog.css";
import PhotoCameraBackOutlinedIcon from "@mui/icons-material/PhotoCameraBackOutlined";

import axios from "axios";
import { useNavigate } from "react-router-dom";



const Blog = () => {
  let postData = {
    image: "",
    title: "",
    blog: "",
    catergories: "",

    date: new Date(),
  };

  const [imgfile, setimgfile] = useState("");
  const [post, setpost] = useState(postData);
  const [blogimg, setblogimg] = useState("");
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

          // Assuming the response contains the image URL.
          console.log(response.data);
          const imageUrl = response.data; // Adjust this based on your API response
          setblogimg(imageUrl);
          setpost((prevState) => ({
            ...prevState,
            image: imageUrl, // Update the post state with the image URL
          }));
        } catch (error) {
          console.error("Image upload failed:", error);
        }
      }
    }

    handleImage();
  }, [imgfile]);

  async function handlePublish(e) {
    e.preventDefault();
    const responseData = await axios.post(
      `${process.env.REACT_APP_API_URL}/blogpost`,
      post,
      {
        method: "POST",

        withCredentials: true,
      }
    );
    if (responseData.status === 200) {
      navigate("/");
    }
  }

  return (
    <>
      <div className="blog">
        <img src={url} alt="url" />
        <form action="/postblog" method="POST" onSubmit={handlePublish}>
          <div className="first-part">
            <label htmlFor="upload">
              <PhotoCameraBackOutlinedIcon />
            </label>
            <input
              type="file"
              id="upload"
              style={{ display: "none" }}
              onChange={(e) => {
                setimgfile(e.target.files[0]);
              }}
            />
            <input
              type="text"
              name="title"
              placeholder="Title"
              onChange={handlechange}
            />
            <input
              type="text"
              placeholder="Add Catergory.."
              name="catergories"
              onChange={handlechange}
            />
            <button type="submit">Publish</button>
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
