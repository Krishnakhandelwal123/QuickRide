import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const CaptainLogin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [CaptainData, setCaptainData] = useState({})

  const handleSubmit = (e) => {
    e.preventDefault();
    setCaptainData({
      email: email,
      password: password
    })
    setEmail('');
    setPassword('');
  }

  return (
    <div className="h-screen flex flex-col justify-between bg-white px-5 pt-10 pb-10">
      <div>
        <div className="flex items-center gap-2 mb-10">
          <h1 className="text-3xl font-semibold">QuickRide</h1>
          <lord-icon
            src="https://cdn.lordicon.com/njpauqoc.json"
            trigger="hover"
            style={{ width: "40px", height: "40px" }}>
          </lord-icon>
        </div>


        <form onSubmit={(e) => {
          handleSubmit(e)
        }}>
          {/* Email */}
          <label className="block text-gray-900 font-medium mb-1">What’s your email</label>
          <input
            required
            type="email"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value)
            }}
            placeholder="email@example.com"
            className="w-full mt-1 bg-gray-100 text-gray-900 placeholder-gray-500 border border-gray-200 rounded-md px-3 py-3 mb-5 focus:outline-none focus:ring-2 focus:ring-black"
          />

          {/* Password */}
          <label className="block text-gray-900 font-medium mb-1">Enter Password</label>
          <input
            required
            type="password"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value)
            }}
            placeholder="password"
            className="w-full mt-1 bg-gray-100 text-gray-900 placeholder-gray-500 border border-gray-200 rounded-md px-3 py-3 mb-6 focus:outline-none focus:ring-2 focus:ring-black"
          />

          {/* Login Button */}
          <button
            className="w-full bg-black text-white py-3 rounded-md font-medium mb-4 hover:bg-gray-900 transition">
            Login
          </button>
          <p className="text-center text-gray-600 mt-3">
            Ready to earn with QuickRide?{" "}
            <Link to="/captain-signup" className="text-blue-600 font-semibold hover:underline cursor-pointer">
              Join as Captain
            </Link>
          </p>

        </form>
      </div>
      <div>
        <Link to='/user-Login'
          className="w-full flex justify-center text-white items-center bg-green-500 py-3 rounded-md font-medium hover:bg-yellow-500 transition">
          Sign in as User
        </Link>
      </div>
    </div>
  );
};

export default CaptainLogin;
