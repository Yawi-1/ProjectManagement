import React, { useState } from "react";
import axios from "axios";
import "./Auth.css";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
 const {setAdmin} = useAuth();

  const login = async (e) => {
    e.preventDefault(); // Prevent form submission from reloading the page

    try {
      const { data } = await axios.post("http://localhost:3000/auth/verify", { email, password });
      console.log(data);
      localStorage.setItem('auth-token',data.token);
      setAdmin(data.token);
      // If the user is authenticated, redirect to the dashboard
         navigate('/dashboard');
    } catch (error) {
      if (error.response && error.response.data) {
        alert(error.response.data.message || "Login failed.");
      } else {
        alert("Something went wrong.");
      }
    }
  };

  return (
    <div className="auth-container">
      <h2>Login</h2>
      <form onSubmit={login}>
        <label>Email</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Enter your email"
          required
        />
        <label>Password</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Enter your password"
          required
        />
        <button type="submit" className="btn">Login</button>
      </form>
    </div>
  );
};

export default Login;
