import React from "react";
import Navbar from "../commponent/Navbar";
import Introduction from "../commponent/Introduction";
import Categories from "../commponent/Categories";
import BlogSection from "../commponent/BlogSection";
import Footer from "../commponent/Footer";

const Main = () => {
  return (
    <div className="app-root" style={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
      <Navbar />
      <Introduction />
      <main className="main-content">
        <BlogSection />
      </main>
      <Footer />
    </div>
  );
};

export default Main;
