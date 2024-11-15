import React from "react";
import uploaderIcon from "../assets/uploader.jpg"; // Path to any logo or icon image

const Home = () => {
  return (
    <div
      className="home-container"
      style={{
        backgroundImage: "url('/path-to-your-image.jpg')", // Update this with the correct path to your image
      }}
    >
      <div className="home-overlay">
        <h1 className="home-title">Welcome to Car Management Portal</h1>
        <p className="home-description">A simple way to manage your cars.</p>

        <img
          src={uploaderIcon}
          alt="Uploader Icon"
          className="uploader-icon"
        />
      </div>
    </div>
  );
};

export default Home;
