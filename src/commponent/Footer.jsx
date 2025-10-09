import React from "react";
import Logo from "../asset/Icon.webp";

import "./footer.css";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <>
      <div className="footer">
        <div className="footer-items">
          <div className="logo child">
            <img src={Logo} alt="logo" />
            <span>Echo Of Voice</span>
          </div>
          <div className="links child">
            <Link to="/home">Home</Link>
            <Link to="/home">About Us</Link>
            <Link to="/home">Work with me</Link>
            <Link to="/home">Instagram</Link>
            <Link>Contact</Link>
          </div>
          <div className="contact child">
            <p className="para">
              Subscribe here and get the latest travel tips and my insider
              secrets!
            </p>
            <div>
              <label>Email*</label>
              <input type="email" placeholder="Enter" />
            </div>
            <div className="btn">
              <label style={{ display: "flex", gap: "10px"  }}>
                <input
                  type="checkbox"
                  style={{ width: "10%", height: "90%", backgroundColor:"transparent", border:"1px solid " }}
                />
                Yes, Subscrib me to your newsletter.
              </label>
              <button type="submit">Subscrib</button>
            </div>
          </div>
        </div>
        <p className="date">© { new Date(Date.now()).getFullYear()} by On the Trail. Powered and secured by Voice of echo</p>
      </div>
    </>
  );
};

export default Footer;
