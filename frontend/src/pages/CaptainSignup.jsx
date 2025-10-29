import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const CaptainSignup = () => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [CaptainSignupData, setCaptainSignupData] = useState({})

  const handleSubmit = (e) => {
    e.preventDefault();
    const data = { fullName:{firstName, lastName}, email, password };

    setCaptainSignupData(data);
    setFirstName('');
    setLastName('');
    setEmail('');
    setPassword('');
  };

  return (
    <div className="h-screen flex flex-col justify-between bg-white px-5 pt-10 pb-10">

      {/* Header */}
      <div>
        <div className="flex items-center gap-2 mb-10">
          <h1 className="text-3xl font-semibold">QuickRide</h1>
          <lord-icon
            src="https://cdn.lordicon.com/njpauqoc.json"
            trigger="hover"
            style={{ width: "35px", height: "35px" }}>
          </lord-icon>
        </div>

        <form onSubmit={handleSubmit}>

          {/* First Name + Last Name */}
          <div className="flex gap-3">
            <div className="w-1/2">
              <label className="block text-gray-900 font-medium mb-1">First Name</label>
              <input
                required
                type="text"
                placeholder="First Name"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                className="w-full mt-1 bg-gray-100 text-gray-900 placeholder-gray-500 border border-gray-200 rounded-md px-3 py-3 mb-5 focus:outline-none focus:ring-2 focus:ring-black"
              />
            </div>

            <div className="w-1/2">
              <label className="block text-gray-900 font-medium mb-1">Last Name</label>
              <input
                required
                type="text"
                placeholder="Last Name"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                className="w-full mt-1 bg-gray-100 text-gray-900 placeholder-gray-500 border border-gray-200 rounded-md px-3 py-3 mb-5 focus:outline-none focus:ring-2 focus:ring-black"
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
            className="w-full bg-gray-100 text-gray-900 placeholder-gray-500 border border-gray-200 rounded-md px-3 py-3 mb-5 focus:outline-none focus:ring-2 focus:ring-black"
          />

          {/* Password */}
          <label className="block text-gray-900 font-medium mb-1">Password</label>
          <input
            required
            type="password"
            placeholder="Create a password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full bg-gray-100 text-gray-900 placeholder-gray-500 border border-gray-200 rounded-md px-3 py-3 mb-5 focus:outline-none focus:ring-2 focus:ring-black"
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
            <Link to="/captain-login" className="text-blue-600 font-semibold hover:underline cursor-pointer">
              Sign in
            </Link>
          </p>
        </form>
      </div>

      {/* Switch Role */}
      <div>
        <Link
          to="/user-signup"
          className="w-full flex justify-center text-white items-center bg-amber-800 py-3 rounded-md font-medium hover:bg-yellow-500 transition">
          Register as User
        </Link>
      </div>
    </div>
  );
};

export default CaptainSignup;
