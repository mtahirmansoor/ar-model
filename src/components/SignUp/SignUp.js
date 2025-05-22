import React, { useState } from "react";
import "./SignUp.css";
import { Link, useNavigate } from "react-router-dom";

const SignUp = () => {
  const [error, setError] = useState("");
  const [userDetails, setUserDetails] = useState({
    name: "",
    email: "",
    password: "",
    confirm_password: "",
  });
  const navigate = useNavigate(); // Hook for navigation after successful sign-up

  // Handle input change
  const handleOnChange = (e) => {
    setUserDetails({
      ...userDetails,
      [e.target.name]: e.target.value,
    });
  };

  // Validate Email with Regular Expression
  const validateEmail = (email) => {
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    return emailRegex.test(email);
  };

  // Check password strength
  const validatePassword = (password) => {
    // Example rule: password must be at least 8 characters, contain at least one number and one letter
    const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
    return passwordRegex.test(password);
  };

  // Form submission logic
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Check if any field is empty
    if (
      userDetails.confirm_password === "" ||
      userDetails.password === "" ||
      userDetails.email === "" ||
      userDetails.name === ""
    ) {
      setError("Please fill in all the required fields");
      return;
    }

    // Check if passwords match
    if (userDetails.password !== userDetails.confirm_password) {
      setError("Passwords do not match");
      return;
    }

    // Validate email format
    if (!validateEmail(userDetails.email)) {
      setError("Please enter a valid email address");
      return;
    }

    // Validate password strength
    if (!validatePassword(userDetails.password)) {
      setError(
        "Password must be at least 8 characters long and contain both letters and numbers"
      );
      return;
    }

    // If everything is valid, clear the error and proceed (e.g., submit to backend)
    setError("");

    // Send data to backend
    try {
    const response = await fetch("http://localhost:3000/api/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: userDetails.name,
        email: userDetails.email,
        password: userDetails.password,
      }),
    });

    const data = await response.json();
    if (response.ok) {
      // Handle successful sign-up, maybe navigate to another page or show success message
      console.log("User signed up successfully:", data);
    } else {
      setError(data.error || "Something went wrong");
    }
  } catch (error) {
    setError("Error while signing up: " + error.message);
  }

    // Reset form after submission
    setUserDetails({
      name: "",
      email: "",
      password: "",
      confirm_password: "",
    });
  };

  return (
    <main className="main-sign_up_container">
      <form onSubmit={handleSubmit} className="sign-up-container">
        {/* Show error message if any */}
        <p className="error-paragraph">{error !== "" ? `Error: ${error}` : null}</p>
        <h3>Sign up</h3>

        <div className="input-div">
          <label htmlFor="name">Name</label>
          <input
            name="name"
            id="name"
            type="text"
            onChange={handleOnChange}
            value={userDetails.name}
          />
        </div>

        <div className="input-div">
          <label htmlFor="email">Email</label>
          <input
            name="email"
            id="email"
            type="email"
            onChange={handleOnChange}
            value={userDetails.email}
          />
        </div>

        <div className="input-div">
          <label htmlFor="password">Password</label>
          <input
            name="password"
            id="password"
            type="password"
            onChange={handleOnChange}
            value={userDetails.password}
          />
        </div>

        <div className="input-div">
          <label htmlFor="confirm_password">Confirm Password</label>
          <input
            name="confirm_password"
            id="confirm_password"
            type="password"
            onChange={handleOnChange}
            value={userDetails.confirm_password}
          />
        </div>

        <button className="sign-up-button">Sign up</button>

        <p className="sign-up-redirect-p">
          Already have an account? <Link to="/sign-in">Sign in</Link>
        </p>
      </form>
    </main>
  );
};

export default SignUp;
