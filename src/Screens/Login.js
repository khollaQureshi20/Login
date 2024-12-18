import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../Style/Login.css";

const Login = () => {
  const [email, setEmail] = useState("");     
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false); 
  const [errorMessage, setErrorMessage] = useState(""); 
  const navigate = useNavigate();

  const handleSignIn = async () => {
    
    setErrorMessage("");
  
   
    if (!email) {
      setErrorMessage("Email is required.");
      return;
    }
    if (!/\S+@\S+\.\S+/.test(email)) {
      setErrorMessage("Please enter a valid email address.");
      return;
    }
    if (!password) {
      setErrorMessage("Password is required.");
      return;
    }
  
    try {
      const response = await fetch(
        `http://localhost:3000/api/user/login?email=${email}&password=${password}`
      );
      if (response.ok) {
        const data = await response.json();
        console.log("Login successful:", data);
        alert("Login successful");
        navigate("/Dashboard")
        //navigate("/BasicTable");
      } else {
        const errorData = await response.json();
        setErrorMessage(errorData.message || "Failed to login");
      }
    } catch (error) {
      console.error("Error logging in:", error);
      setErrorMessage("An error occurred while logging in. Please try again.");
    }
  };
  

  const togglePasswordVisibility = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
  };

  return (
    <div className="screen-container">
      <div className="left-section">
        <div className="welcome-text">
          <h1>WELCOME TO</h1>
          <div className="logo">
          <img src={require('../logo.png')} alt="LunarSpace" />

            <h2>Login</h2>
          </div>
          <p>
            Explore the universe of possibilities by joining our community. Sign
            up to start your journey.
          </p>
        </div>
      </div>
      <div className="right-section">
        <h2>Login your account</h2>
        <form onSubmit={(e) => e.preventDefault()}>
          <div className="form-group">
            <label>Email Address</label>
            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="form-group password-group">
            <label>Password</label>
            <div className="password-input-container">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <button
                type="button"
                className="toggle-password-btn"
                onClick={togglePasswordVisibility}
              >
                {showPassword ? "🙈" : "👁️"}
              </button>
            </div>
          </div>
          {errorMessage && <p className="error-message">{errorMessage}</p>}
          <div className="terms">
            <input type="checkbox" />
            <label>By signing up, you agree with our Terms & Conditions</label>
          </div>
          <div className="button-group">
            <button className="signup-btn" type="button" onClick={handleSignIn}>
              Sign In
            </button>
            <button
              className="signin-btn"
              type="button"
              onClick={() => navigate("/Register")}
            >
              Sign Up
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
