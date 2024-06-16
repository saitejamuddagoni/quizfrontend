import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import baseURL from "../baseUrl";
import jwt_decode from "jwt-decode"


export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const handleLogin = (e) => {
    e.preventDefault();
    setIsLoading(true);
    let role;
  
    axios
      .post(`${baseURL}/api/auth/login`, {
        email,
        password,
      })
      .then(
        (res) => {
          localStorage.setItem("authToken", res.data.token);
          role = getUserRole();
          setEmail("");
          setPassword("");
          setError("");
          
          console.log('User role:', role);
  
          if (role === "student") {
            navigate("/shome");
          } else if (role === "teacher") {
            navigate("/thome");
          }
        },
        (err) => {
          setError(err.response.data.error);
        }
      )
      .finally(() => {
        setIsLoading(false);
      });
  };
  
  
  return (
    <div className="w-96 mx-auto mt-20 p-6 bg-white text-blue-500 rounded-lg shadow-lg">
      <h1 className="text-3xl mb-4">Please Login</h1>
      <form >
        <input
          type="email"
          placeholder="Enter Email"
          className="w-full p-2 mb-3 rounded-md placeholder-blue-500 bg-blue-100 focus:outline-none focus:ring-2 focus:ring-blue-600"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Enter Password"
          className="w-full p-2 mb-3 rounded-md placeholder-blue-500 bg-blue-100 focus:outline-none focus:ring-2 focus:ring-blue-600"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      
        {error && <p className="text-red-300 text-sm mb-4">{error}</p>}
        <button
          className="w-full p-2 mb-4 bg-blue-500 hover:bg-blue-700 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600"
          disabled={isLoading} onClick={handleLogin}
        >
          {isLoading ? "Logging in..." : "Login"}
        </button>
      </form>
      <h5>
        New User?{" "}
        <Link to="/register" className="text-blue-200 hover:text-blue-500">
          Register
        </Link>
      </h5>
    </div>
  );
}



function getUserRole() {
  const token = localStorage.getItem("authToken");

  if (token) {
    try {
      const decodedToken = jwt_decode(token);

      const currentTime = Date.now() / 1000;
      if (decodedToken.exp < currentTime) {
        console.log("Token is expired");
        return null;
      }

      return decodedToken.role;
    } catch (error) {
      console.log("Error decoding token:", error);
      return null;
    }
  } return null 
}





