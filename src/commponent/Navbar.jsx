import React, { useState, useRef, useEffect } from "react";
// import Logo from "../asset/logo.png";
import Logo from "../asset/Icon.webp";
import "./navbar.css";
import { Link } from "react-router-dom";
import axios from "axios";
import { useAuthContext } from "../Context/authContext";
import HomeIcon from "@mui/icons-material/Home";
import CreateIcon from '@mui/icons-material/Create';
import ContactMailIcon from '@mui/icons-material/ContactMail';
import InfoIcon from '@mui/icons-material/Info';
import LogoutIcon from "@mui/icons-material/Logout";

const Navbar = () => {
  const { setAuth } = useAuthContext();
  const [open, setOpen] = useState(false);
  const [closing, setClosing] = useState(false);
  const hamburgerRef = useRef(null);
  const mobileMenuRef = useRef(null);

  const openMenu = () => setOpen(true);
  const closeMenu = () => {
    setClosing(true);
    setTimeout(() => {
      setOpen(false);
      setClosing(false);
      // return focus to hamburger for keyboard users
      hamburgerRef.current && hamburgerRef.current.focus();
    }, 220);
  };

  useEffect(() => {
    if (!open) return;

    const onKey = (e) => {
      if (e.key === "Escape") {
        closeMenu();
      }
    };

    document.addEventListener("keydown", onKey);

    return () => document.removeEventListener("keydown", onKey);
  }, [open]);
  function logout() {
    const url = "http://localhost:8000/logout";
    const response = axios.post(url, {
      withCredentials: true,
    });

    if (response) {
      localStorage.setItem("blog-user", "");
      setAuth("");
    }
  }
  return (
    <div className="navbar">
      <div className="container">
        <div className="brand">
          <img src={Logo} alt="logo" />
          <span>Echo Of Voice</span>
        </div>
        <div className="visiting_links">
          <Link to="/">{<HomeIcon />}Home</Link>
          <Link to="/about"><InfoIcon/>About</Link>
          <Link to="/contact">{<ContactMailIcon/>}Contact</Link>
          <Link to='/createpost'>{<CreateIcon/>}Share</Link>
        </div>
        <button
          ref={hamburgerRef}
          id="mobile-menu-toggle"
          className="hamburger"
          aria-label="Toggle menu"
          aria-controls="mobile-menu"
          aria-expanded={open && !closing}
          onClick={() => {
            if (open) {
              closeMenu();
            } else {
              openMenu();
            }
          }}
        >
          <span className="bar" />
          <span className="bar" />
          <span className="bar" />
        </button>
        <div className="userInfo">
          {/* <button >{<CreateIcon/>}Blog</button> */}
          <button onClick={logout}>{<LogoutIcon />}</button>
        </div>
      </div>
      {open && (
        <nav
          id="mobile-menu"
          ref={mobileMenuRef}
          className={`mobile-menu ${closing ? "closing" : "open"}`}
        >
          <Link to="/" onClick={closeMenu}>{<HomeIcon />} Home</Link>
          <Link to="/about" onClick={closeMenu}>{<InfoIcon />} About</Link>
          <Link to="/contact" onClick={closeMenu}>{<ContactMailIcon />} Contact</Link>
          <Link to='/createpost' onClick={closeMenu}>{<CreateIcon/>} Share</Link>
        </nav>
      )}

      {/* keyboard: close on Escape and manage focus */}
      <script />
    </div>
  );
};

export default Navbar;
