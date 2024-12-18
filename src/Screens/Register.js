import React, { useState } from "react";
import "../Style/Register.css";
import { useNavigate, Link } from "react-router-dom";

const Register = () => {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [number, setNumber] = useState("");
  const [landline, setLandline] = useState("");
  const [city, setCity] = useState("");
  const [isAgree, setIsAgree] = useState(false);
  const [address, setAddress] = useState("");

  const [errors, setErrors] = useState({}); // State for storing validation errors

  const cities = ["Karachi", "Lahore", "Islamabad", "Peshawar", "Quetta"];

  const validateFields = () => {
    const errors = {};

    if (!name.trim()) errors.name = "Name cannot be empty.";
    if (!email.trim()) {
      errors.email = "Email cannot be empty.";
    } else if (!/^\S+@\S+\.\S+$/.test(email)) {
      errors.email = "Enter a valid email address.";
    }
    if (!password.trim()) {
      errors.password = "Password cannot be empty.";
    } 
    if (!number.trim()) {
      errors.number = "Phone number cannot be empty.";
    } else if (!/^\d{11}$/.test(number)) {
      errors.number = "Phone number must be exactly 11 digits.";
    }
    if (!landline.trim()) {
      errors.landline = "Landline number cannot be empty.";
    } else if (!/^\d{10}$/.test(landline)) {
      errors.landline = "Landline number must be exactly 10 digits.";
    }
    if (!city) errors.city = "City must be selected.";
    if (!address.trim()) errors.address = "Address cannot be empty.";
   

    return errors;
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    const fieldErrors = validateFields();

    if (Object.keys(fieldErrors).length > 0) {
      setErrors(fieldErrors); 
      return;
    }

    const data = {
      name,
      email,
      password,
      phone: number,
      landline,
      address,
      city,
    };

    try {
      const response = await fetch("http://localhost:3000/api/user/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        const result = await response.json();
        console.log(result);
        alert("Registration Successful!");
        navigate(-1);
      } else {
        const errorData = await response.json();
        alert(`Registration failed: ${errorData.message || "Unknown error"}`);
      }
    } catch (err) {
      console.error("Error during registration:", err);
      alert("Error during registration. Please try again.");
    }
  };

  return (
    <div className="signup-container">
      <div className="form-section">
        <h1>Hello, friend!</h1>
        <form onSubmit={handleRegister}>
          <div className="input-group">
            <label htmlFor="name">Name</label>
            <input
              type="text"
              id="name"
              placeholder="Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            {errors.name && <p className="error-message">{errors.name}</p>}
          </div>

          <div className="input-group">
            <label htmlFor="email">E-mail</label>
            <input
              type="email"
              id="email"
              placeholder="E-mail"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            {errors.email && <p className="error-message">{errors.email}</p>}
          </div>

          <div className="input-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            {errors.password && (
              <p className="error-message">{errors.password}</p>
            )}
          </div>

          <div className="input-group">
            <label htmlFor="number">Phone Number</label>
            <input
              type="number"
              id="number"
              placeholder="Number"
              value={number}
              onChange={(e) => setNumber(e.target.value)}
            />
            {errors.number && <p className="error-message">{errors.number}</p>}
          </div>

          <div className="input-group">
            <label htmlFor="landline">Landline Number</label>
            <input
              type="number"
              id="landline"
              placeholder="Landline"
              value={landline}
              onChange={(e) => setLandline(e.target.value)}
            />
            {errors.landline && (
              <p className="error-message">{errors.landline}</p>
            )}
          </div>

          <div className="input-group">
            <label htmlFor="city">City</label>
            <select
              id="city"
              value={city}
              onChange={(e) => setCity(e.target.value)}
            >
              <option value="" disabled>
                Select City
              </option>
              {cities.map((cityName, index) => (
                <option key={index} value={cityName}>
                  {cityName}
                </option>
              ))}
            </select>
            {errors.city && <p className="error-message">{errors.city}</p>}
          </div>

          <div className="input-group">
            <label htmlFor="address">Address</label>
            <input
              type="text"
              id="address"
              placeholder="Address"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
            />
            {errors.address && (
              <p className="error-message">{errors.address}</p>
            )}
          </div>

          <div className="terms">
            <input
              type="checkbox"
              id="terms"
              checked={isAgree}
              onChange={(e) => setIsAgree(e.target.checked)}
            />
            <label htmlFor="terms">
              I’ve read and agree to <a href="#">Terms & Conditions</a>
            </label>
            {errors.isAgree && (
              <p className="error-message">{errors.isAgree}</p>
            )}
          </div>

          <button type="submit" className="create-account">
            CREATE ACCOUNT
          </button>
        </form>
        <p>
          Already have an account? <Link to="../../">Sign in</Link>
        </p>
      </div>

      <div className="info-section">
        <img src={require("../register.png")} alt="LunarSpace" />
        <h2>Glad to see You!</h2>
        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
      </div>
    </div>
  );
};

export default Register;
