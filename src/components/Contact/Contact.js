import React from "react";
import { Link } from "react-router-dom";

const Contact = () => {
  return (
    <div className="err-container">
      <h1>Let's Connect and Revolutionize E-commerce</h1>
      <h2>
        Reach out to Project Admin at{" "}
       
        {" "}
        <Link to="mailto:tahirmansoor1231@gmail.com" target="_blank">
          tahirmansoor1231@gmail.com
        </Link>
      </h2>
    </div>
  );
};

export default Contact;
