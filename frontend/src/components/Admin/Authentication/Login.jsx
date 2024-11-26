import React from "react";
import { Link } from "react-router-dom";
import "./Auth.css";

const Login = () => {
  return (
    <div className="auth-container">
      <h2>Login</h2>
      <form>
        <label>Email</label>
        <input type="email" placeholder="Enter your email" required />
        <label>Password</label>
        <input type="password" placeholder="Enter your password" required />
        <button type="submit" className="btn">Login</button>
      </form>
    </div>
  );
};

export default Login;
