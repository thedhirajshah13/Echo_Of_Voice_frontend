import React from "react";
import { Link } from "react-router-dom";
import { useBlogContentContex } from "../Context/blogContentContext";
import ModeCommentOutlinedIcon from "@mui/icons-material/ModeCommentOutlined";
import "./featured.css";

const Featured = () => {
  const { blogContent } = useBlogContentContex();

  const imageSrc =
    blogContent?.[0]?.image ||
    "https://images.unsplash.com/photo-1515378791036-0648a3ef77b2";

  return (
    <div className="featured-post">
      <h1>Featured Post</h1>
      <div className="item">
        {blogContent && blogContent.length > 0 ? (
          <>
            <img
              src={imageSrc}
              onError={(e) => {
                e.target.src =
                  "https://images.unsplash.com/photo-1515378791036-0648a3ef77b2";
              }}
              alt="Featured"
            />

            <div className="featured-details">
              <div className="top">
                <div className="minor-details">
                  <span>Date</span>
                  <span>2 min read</span>
                </div>

                <h3>{blogContent[0].title}</h3>

                <Link to={`fullblog/${blogContent[0]._id}`}>
                  <p>{blogContent[0].blog.substr(0, 150) + "..."}</p>
                </Link>
              </div>

              <div className="bottom">
                <hr />
                <div className="meta-row">
                  <span className="comment-count">
                    <ModeCommentOutlinedIcon /> {blogContent[0].comments.length}
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
