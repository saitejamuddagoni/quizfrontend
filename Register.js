import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import baseURL from "../baseUrl";

function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const [role, setUserType] = useState("student");
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const onSubmit = async (e) => {
    e.preventDefault();

    try {
      axios.post(`${baseURL}/api/auth/signup`, {
        name,
        email,
        password,
        role,
      })
      .then((res)=>navigate("/login"))
      .catch((err)=>{
      setError(err.response.data.message);
    })
  }
  catch(err){console.log(err)}
  }

  return (
    <div className="w-96 mx-auto mt-20 p-6 bg-white text-blue-500 rounded-lg shadow-lg">
      <h1 className="text-3xl mb-4">Please Register</h1>
      <form onSubmit={onSubmit}>
        <input
          type="text"
          placeholder="Enter Your Name"
          className="w-full p-2 mb-3 rounded-md placeholder-blue-500 bg-blue-100 focus:outline-none focus:ring-2 focus:ring-blue-600"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
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
        <input
          type="password"
          placeholder="Re-enter Password"
          className="w-full p-2 mb-3 rounded-md placeholder-blue-500 bg-blue-100 focus:outline-none focus:ring-2 focus:ring-blue-600"
          value={passwordConfirm}
          onChange={(e) => setPasswordConfirm(e.target.value)}
        />
        <div className="flex items-center space-x-4 mb-4">
          <label className="flex items-center space-x-2">
            <input
              type="radio"
              name="userType"
              value="student"
              className="focus:ring-blue-600"
              checked={role === "student"}
              onChange={(e) => setUserType(e.target.value)}
            />
            <span>Student</span>
          </label>

          <label className="flex items-center space-x-2">
            <input
              type="radio"
              name="userType"
              value="teacher"
              className="focus:ring-blue-600"
              checked={role === "teacher"}
              onChange={(e) => setUserType(e.target.value)}
            />
            <span>Teacher</span>
          </label>

          
        </div>
        {error && (
          <p className="text-red-300 text-sm mb-4">{error}</p>
        )}
        <button
          type="submit"
          className="w-full p-2 mb-4 bg-blue-500 hover:bg-blue-700 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600"
        >
          Register
        </button>
      </form>
      <h5 className="text-sm">
        Already Registered?{" "}
        <Link to="/login" className="text-blue-200 hover:text-blue-500">
          Login
        </Link>
      </h5>
    </div>
  );
}

export default Register