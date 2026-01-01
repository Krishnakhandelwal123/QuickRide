import React, { useState } from "react";
import { Link, useNavigate} from "react-router-dom";
import axios from "axios";
import {UserDataContext} from "../context/UserContext";

const UserSignup = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const {user, setUser} = React.useContext(UserDataContext);

  const handleSubmit = async(e) => {
    e.preventDefault();

    const newUser = {
      fullname: { 
       firstname:firstName, 
       lastname:lastName 
      },
      email,
      password,
    };
    try {
      const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/users/register`, newUser);
      if(response.status === 201){
        const data=response.data;
        setUser(data.user)
        localStorage.setItem('user_token',data.token)
        setFirstName("");
        setLastName("");
        setEmail("");
        setPassword("");
        navigate("/home");
      }
    } catch (error) {
      console.error("Signup failed:", error);
      // You could show an error message to the user here
    }
  };

  return (
    <div className="h-screen flex flex-col justify-between bg-white px-5 pt-10 pb-10">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-semibold mb-10">QuickRide</h1>

        <form onSubmit={handleSubmit}>
          {/* First and Last Name */}
          <label className="block text-gray-900 font-medium mb-1">What's Your name?</label>
          <div className="flex gap-3 mb-5">
            <div className="w-1/2">
              <input
                required
                type="text"
                placeholder="First name"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                className="w-full bg-gray-100 text-gray-900 placeholder-gray-500 border border-gray-200 rounded-md px-3 py-3 focus:outline-none focus:ring-2 focus:ring-black"
              />
            </div>

            <div className="w-1/2">
              <input
                required
                type="text"
                placeholder="Last name"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                className="w-full bg-gray-100 text-gray-900 placeholder-gray-500 border border-gray-200 rounded-md px-3 py-3 focus:outline-none focus:ring-2 focus:ring-black"
              />
            </div>
          </div>

          {/* Email */}
          <label className="block text-gray-900 font-medium mb-1">Email</label>
          <input
            required
            type="email"
            placeholder="email@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full mt-1 bg-gray-100 text-gray-900 placeholder-gray-500 border border-gray-200 rounded-md px-3 py-3 mb-5 focus:outline-none focus:ring-2 focus:ring-black"
          />

          {/* Password */}
          <label className="block text-gray-900 font-medium mb-1">Password</label>
          <input
            required
            type="password"
            placeholder="Create a password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full mt-1 bg-gray-100 text-gray-900 placeholder-gray-500 border border-gray-200 rounded-md px-3 py-3 mb-5 focus:outline-none focus:ring-2 focus:ring-black"
          />

          {/* Signup Button */}
          <button
            type="submit"
            className="w-full bg-black text-white py-3 rounded-md font-medium hover:bg-gray-900 transition mb-4">
            Create Account
          </button>

          {/* Already have an account */}
          <p className="text-center text-gray-600 mt-3">
            Already have an account?{" "}
            <Link to="/user-login" className="text-blue-600 font-semibold hover:underline cursor-pointer">
              Sign in
            </Link>
          </p>
        </form>
      </div>

      {/* Switch Role */}
      <div>
        <Link
          to="/captain-signup"
          className="w-full flex justify-center text-black items-center bg-orange-400 py-3 rounded-md font-medium hover:bg-yellow-500 transition">
          Register as Captain
        </Link>
      </div>
    </div>
  );
};

export default UserSignup;
