import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const UserLogin = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [UserData, setUserData] = useState({})

    const handleSubmit = (e) => {
        e.preventDefault();
        setUserData({
            email: email,
            password: password
        })
        setEmail('');
        setPassword('');
    }

    return (
        <div className="h-screen flex flex-col justify-between bg-white px-5 pt-10 pb-10">
            <div>
                <h1 className="text-3xl font-semibold mb-10">QuickRide</h1>

                <form onSubmit={(e)=>{
                    handleSubmit(e)
                }}>
                    {/* Email */}
                    <label className="block text-gray-900 font-medium mb-1">What’s your email</label>
                    <input
                        required
                        type="email"
                        value={email}
                        onChange={(e)=>{
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
                        onChange={(e)=>{
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
                        New here?{" "}
                        <Link to='/user-signup' className="text-blue-600 font-semibold hover:underline cursor-pointer">
                            Create New Account
                        </Link>
                    </p>
                </form>
            </div>
            <div>
                <Link to='/captain-Login'
                    className="w-full flex justify-center items-center bg-yellow-400 text-black py-3 rounded-md font-medium hover:bg-yellow-500 transition">
                    Sign in as Captain
                </Link>
            </div>
        </div>
    );
};

export default UserLogin;
