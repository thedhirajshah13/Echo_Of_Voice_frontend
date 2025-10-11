import React,{useEffect, useState} from "react";
import { Link } from "react-router-dom";
// import { usefeaturedBlogContex } from "../Context/featuredBlogContext";
import ModeCommentOutlinedIcon from "@mui/icons-material/ModeCommentOutlined";
import axios from "axios";
import "./featured.css";

const Featured = () => {
  const [featuredBlog, setfeaturedBlog] = useState(null);

  useEffect(() => {
    const getFeaturedBlog = async () => {
      try {
        const response = await axios.get("http://localhost:8000/featured/blog", { withCredentials: true });
        setfeaturedBlog(response.data.featuredBlog[0]);
        console.log("Featured", response.data.featuredBlog[0]);
      } catch (err) {
        console.error(err);
      }
    };
    getFeaturedBlog();
  }, []);

  const imageSrc =
    featuredBlog?.image ||
    "https://images.unsplash.com/photo-1515378791036-0648a3ef77b2";

  return (
    <div className="featured-post">
      <h1>Featured Post</h1>
      <div className="item">
        {featuredBlog ? (
          <>
            <img
              src={imageSrc}
              onError={(e) => { e.target.src = "https://images.unsplash.com/photo-1515378791036-0648a3ef77b2"; }}
              alt="Featured"
            />

            <div className="featured-details">
              <div className="top">
                <div className="minor-details">
                  <span>Date</span>
                  <span>2 min read</span>
                </div>

                <h3>{featuredBlog.title}</h3>

                <Link to={`fullblog/${featuredBlog._id}`}>
                  <p>{featuredBlog?.blog?.substr(0, 150) + "..."}</p>
                </Link>
              </div>

              <div className="bottom">
                <hr />
                <div className="meta-row">
                  <span className="comment-count">
                    <ModeCommentOutlinedIcon /> {featuredBlog?.comments?.length || 0}
                  </span>
                </div>
              </div>
            </div>
          </>
        ) : (
          <p>Loading...</p>
        )}
      </div>
    </div>
  );
};
export default Featured;