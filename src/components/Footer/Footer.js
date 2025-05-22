import React from "react";
import { Link } from "react-router-dom";
import "./Footer.css";

function Footer() {
  return (
    <div className="contact" id="contact">
      <div className="main-content">
        <div class="contact-content">
          <Link to="/"> Home </Link>
          <Link
            to="/about"
          >
            About
          </Link>
          <Link to="/"> FAQ </Link>
          <Link to="/"> Services </Link>
        </div>

        <div className="contact-content">
          <Link to="/"> Shipping & Returns </Link>
          <Link to="/"> Store Policy </Link>
          <Link to="/"> Payment Method </Link>
        </div>

        <div className="contact-content">
          <Link to="/feedback"> Feedback </Link>
          <Link to="mailto:tahirmansoor1231.com" target="_blank">
            Contact
          </Link>
        
        </div>

        <div className="contact-content">
          <Link
            to="https://github.com/mtahirmansoor"
            target="_blank"
          >
            GitHub
          </Link>
          <Link
            to="https://www.linkedin.com/in/muhammad-tahir-28b6b7250/"
            target="_blank"
          >
            LinkedIn
          </Link>
          
        </div>
      </div>

      <div class="action">
        <form onSubmit={(event) => event.preventDefault()}>
          <input
            type="email"
            name="email"
            placeholder="Your Email"
            required
          ></input>
          <input type="submit" name="submit" value="Submit" required></input>
        
        </form>
      </div>
      <div class="last">
        <p>@ 2025 AR-Website | All Rights Reserved</p>
      </div>
    </div>
  );
}

export default Footer;
