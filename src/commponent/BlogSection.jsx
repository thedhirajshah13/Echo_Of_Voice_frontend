import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import "./blogsection.css";
import {useBlogContentContex} from "../Context/blogContentContext"
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";

import ModeCommentOutlinedIcon from "@mui/icons-material/ModeCommentOutlined";
import style from "../asset/BlogImage/style.jpeg";
import shop from "../asset/BlogImage/shop.jpeg";
import sports from "../asset/BlogImage/sports.jpeg";
import tech from "../asset/BlogImage/tech.png";
import travel from "../asset/BlogImage/travel.jpeg";

const BlogSection = () => {
  
  const [post, setpost] = useState([]);
  const {setBlogContent} =useBlogContentContex();
  const [totalPage, setTotalPage] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const limit = 6;
  const page = Array.from({ length: totalPage }, (_, index) => index + 1);
  const imageCol = [
    style,
    shop,
    sports,
    tech,
    travel,
    "https://images.unsplash.com/photo-1515378791036-0648a3ef77b2",
  ];

  useEffect(() => {
    const getpost = async () => {
      const response = await axios.get(
        `http://localhost:8000/post?page=${currentPage}&limit=${limit}`,
        {
          withCredentials: true,
        }
      );
      const { posts, totalPages, currentpage } = response.data;
      console.log(posts);
      setCurrentPage(currentpage);
      setTotalPage(totalPages);

      setpost(posts);
      setBlogContent(posts)
    };
    getpost();
  }, [currentPage]);
  function handleNextPage() {
    if (currentPage < totalPage) setCurrentPage(currentPage + 1);
  }
  function handlePrevPage() {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  }

  return (
    <div className="blogsection">
      {post.length > 0 ? (
        post.map((post, index) => (
          <div className="postCard" key={index}>
            <img
              src={
                post.image ||
                "https://images.unsplash.com/photo-1515378791036-0648a3ef77b2"
              }
              onError={(e) => {
                e.target.src =
                  imageCol[Math.floor(Math.random() * imageCol.length)]; // Default image URL
              }}
              alt="blog-img"
            />
            <Link to={`fullblog/${post._id}`}>
              <h4>{post.title}</h4>
            </Link>
            <hr />

            <span className="comment-icon">
              {<ModeCommentOutlinedIcon />} {post.comments.length}{" "}
            </span>
          </div>
        ))
      ) : (
        <p>hello</p>
      )}
      <div className="pagination">
        <button onClick={handlePrevPage} disabled={currentPage === 1}>
          {<ArrowBackIosIcon />}
        </button>
        <div className="pageNumbers">
          {page.map((page, index) => (
            <button
              key={index}
              className={`pageNumber ${index + 1 === currentPage ? "active" : ""}`}
              onClick={() => setCurrentPage(index + 1)}
            >
              {page}
            </button>
          ))}
        </div>

        <button onClick={handleNextPage} disabled={currentPage === totalPage}>
          {<ArrowForwardIosIcon />}
        </button>
      </div>
    </div>
  );
};

export default BlogSection;
