import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { BASEURL } from "../utils/util.config";
import { AuthContext } from "../context/AuthContext";

const Login = () => {
  const [credentials, setCredentials] = useState({
    email: "",
    password: "",
  });

  const { dispatch } = useContext(AuthContext);
  const navigate = useNavigate()

  const handleChange = (e) => {
    setCredentials((prev) => ({
      ...prev,
      [e.target.id]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch(`${BASEURL}/user/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify(credentials),
      });

      const result = await res.json();
      console.log("LOGIN RESPONSE:", result);

      if (!res.ok) {
        throw new Error(result.message || "Login failed");
      }

      dispatch({
        type: "LOGIN_SUCCESS",
        payload: {
          user: result.data,
          token: result.token,
          role: result.role,
        },
      });

      navigate("/")
    } catch (error) {
      console.error("Login error:", error.message);
    }
  };

  return (
    <div className="row">
      <div className="col-md-4"></div>

      <div className="col-md-4 border mt-3 mb-3">
        <form className="mt-2" onSubmit={handleSubmit}>
          <p className="text-center">Login</p>

          <input
            type="email"
            className="form-control mt-2 mb-2"
            id="email"
            placeholder="Enter Your Email"
            onChange={handleChange}
          />

          <input
            type="password"
            className="form-control mt-2 mb-2"
            id="password"
            placeholder="Enter Your Password"
            onChange={handleChange}
          />

          <button className="btn btn-success mt-1">Login</button>

          <p className="mt-2">
            Don't have account? <Link to="/register">Register</Link>
          </p>
        </form>
      </div>

      <div className="col-md-4"></div>
    </div>
  );
};

export default Login;
