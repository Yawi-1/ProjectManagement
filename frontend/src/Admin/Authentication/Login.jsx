import React, { useState } from "react";
import axios from "axios";
import "./Auth.css";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { useProject } from "../../context/ProjectContext";
import Loader from '../../components/Loader/Loader'
const Login = () => {

  // State for data in this component.....
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  // Context Data......
  const { setAdmin, admin } = useAuth();
  const {url,isLoading,setIsLoading} = useProject();


  // Login admin functionality.........
  const login = async (e) => {
    e.preventDefault(); // Prevent form submission from reloading the page
    try {
      setIsLoading(true)
      const { data } = await axios.post(`${url}/admins/verify`, { email, password });
      setAdmin(data.token);  //Storing the token in admin .....
      toast(data.message)
      // If the user is authenticated, redirect to the dashboard
      admin !== null && navigate('/dashboard');
      localStorage.setItem('auth-token', data.token);
    } catch (error) {
      console.log(error)
      if (error.response && error.response.data) {
        toast(error.response.data.message || "Login failed.");
      } else {
        toast("Something went wrong.");
      }
    }
    finally{
      setIsLoading(false)
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
        <button type="submit" className="btn">Submit</button>
        <Link id="a" to='/'>
          <p>
            Don't have an account?
          </p>
        </Link>
      </form>

      {isLoading && <Loader/>}
    </div>
  );
};

export default Login;
