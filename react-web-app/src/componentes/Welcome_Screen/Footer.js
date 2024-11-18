import React from "react";
import "./Footer.css";
import { FaLinkedin, FaGithub, FaTwitter } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-links">
          <a href="/" className="footer-link">
            Home
          </a>
          <a href="/about" className="footer-link">
            About
          </a>
          <a href="/contact" className="footer-link">
            Contact
          </a>
          <a href="/privacy-policy" className="footer-link">
            Privacy Policy
          </a>
        </div>

        <div className="footer-social">
          <a
            href="https://linkedin.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaLinkedin size={24} color="#0A66C2" />
          </a>
          <a
            href="https://github.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaGithub size={24} color="#171515" />
          </a>
          <a
            href="https://twitter.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaTwitter size={24} color="#1DA1F2" />
          </a>
        </div>
      </div>
      <p className="footer-text">© 2024 Mahmoud Arafat</p>
    </footer>
  );
};

export default Footer;
