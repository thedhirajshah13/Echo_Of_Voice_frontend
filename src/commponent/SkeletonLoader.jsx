import React from "react";
import "./skeleton.css";

const SkeletonCard = () => {
  return (
    <div className="skeleton-card">
      <div className="skeleton skeleton-image"></div>
      <div className="skeleton skeleton-title"></div>
      <div className="skeleton skeleton-divider"></div>
      <div className="skeleton skeleton-text"></div>
    </div>
  );
};

const SkeletonLoader = ({ count = 6 }) => {
  return (
    <div className="skeleton-container">
      {Array.from({ length: count }).map((_, index) => (
        <SkeletonCard key={index} />
      ))}
    </div>
  );
};

export default SkeletonLoader;
