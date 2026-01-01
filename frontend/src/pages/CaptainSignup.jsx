import React, { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { CaptainDataContext } from "../context/CaptainContext.jsx";
import axios from 'axios';


const CaptainSignup = () => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [plate, setPlate] = useState('');
  const [vehicleType, setVehicleType] = useState('car');
  const [capacity, setCapacity] = useState('');
  const [color, setColor] = useState('');

  const [step, setStep] = useState(1);

  const navigate = useNavigate();
  const {captain,setCaptain} = useContext(CaptainDataContext);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newCaptain = {
      fullname: {
        firstname: firstName,
        lastname: lastName
      },
      email,
      password,
      vehicle: {
        plate,
        vehicleType,
        capacity: Number(capacity),
        color
      }
    };

    try {
      const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/captains/register`, newCaptain);
      if (response.status === 201) {
        const data = response.data;
        setCaptain(data.captain)
        localStorage.setItem('captain_token', data.token);
        navigate('/captain-home'); 
        setFirstName('');
        setLastName('');
        setEmail('');
        setPassword('');
        setPlate('');
        setVehicleType('car');
        setCapacity('');
        setColor('');
      }
    } catch (error) {
      console.error("Captain signup failed:", error.response ? error.response.data : error);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-white px-5 py-8">
      <form onSubmit={handleSubmit} className="flex flex-col flex-grow justify-between">
        <div>
          {/* Header */}
          <div className="flex items-center gap-2 mb-8">
            <h1 className="text-3xl font-semibold">QuickRide</h1>
            <lord-icon
              src="https://cdn.lordicon.com/njpauqoc.json"
              trigger="hover"
              style={{ width: "35px", height: "35px" }}>
            </lord-icon>
          </div>

          {/* Step 1: Personal Details */}
          {step === 1 && (
            <>
              <h2 className="text-xl font-semibold mb-3">Create Captain Account</h2>
              {/* First Name + Last Name */}
              <div className="flex gap-3">
                <div className="w-1/2">
                  <label className="block text-gray-900 font-medium mb-1">First Name</label>
                  <input required type="text" placeholder="First Name" value={firstName} onChange={(e) => setFirstName(e.target.value)} className="w-full mt-1 bg-gray-100 text-gray-900 placeholder-gray-500 border border-gray-200 rounded-md px-3 py-3 mb-4 focus:outline-none focus:ring-2 focus:ring-black" />
                </div>
                <div className="w-1/2">
                  <label className="block text-gray-900 font-medium mb-1">Last Name</label>
                  <input required type="text" placeholder="Last Name" value={lastName} onChange={(e) => setLastName(e.target.value)} className="w-full mt-1 bg-gray-100 text-gray-900 placeholder-gray-500 border border-gray-200 rounded-md px-3 py-3 mb-4 focus:outline-none focus:ring-2 focus:ring-black" />
                </div>
              </div>
              {/* Email */}
              <label className="block text-gray-900 font-medium mb-1">Email</label>
              <input required type="email" placeholder="email@example.com" value={email} onChange={(e) => setEmail(e.target.value)} className="w-full mt-1 bg-gray-100 text-gray-900 placeholder-gray-500 border border-gray-200 rounded-md px-3 py-3 mb-4 focus:outline-none focus:ring-2 focus:ring-black" />
              {/* Password */}
              <label className="block text-gray-900 font-medium mb-1">Password</label>
              <input required type="password" placeholder="Create a password" value={password} onChange={(e) => setPassword(e.target.value)} className="w-full mt-1 bg-gray-100 text-gray-900 placeholder-gray-500 border border-gray-200 rounded-md px-3 py-3 mb-4 focus:outline-none focus:ring-2 focus:ring-black" />

              {/* Next Button */}
              <button type="button" onClick={() => setStep(2)} className="w-full bg-black text-white py-3 rounded-md font-medium hover:bg-gray-900 transition mb-4">
                Next
              </button>

              {/* Already have an account */}
              <p className="text-center text-gray-600 mt-3">
                Already have an account?{" "}
                <Link to="/captain-login" className="text-blue-600 font-semibold hover:underline cursor-pointer">
                  Sign in
                </Link>
              </p>
            </>
          )}

          {/* Step 2: Vehicle Details */}
          {step === 2 && (
            <>
              <h2 className="text-xl font-semibold mb-3">Vehicle Details</h2>
              {/* Vehicle Plate */}
              <label className="block text-gray-900 font-medium mb-1">Vehicle Plate Number</label>
              <input required type="text" placeholder="e.g., ABC-123" value={plate} onChange={(e) => setPlate(e.target.value)} className="w-full mt-1 bg-gray-100 text-gray-900 placeholder-gray-500 border border-gray-200 rounded-md px-3 py-3 mb-4 focus:outline-none focus:ring-2 focus:ring-black" />
              {/* Vehicle Color */}
              <label className="block text-gray-900 font-medium mb-1">Vehicle Color</label>
              <input required type="text" placeholder="e.g., Red" value={color} onChange={(e) => setColor(e.target.value)} className="w-full mt-1 bg-gray-100 text-gray-900 placeholder-gray-500 border border-gray-200 rounded-md px-3 py-3 mb-4 focus:outline-none focus:ring-2 focus:ring-black" />
              <div className="flex gap-3">
                {/* Vehicle Type */}
                <div className="w-1/2">
                  <label className="block text-gray-900 font-medium mb-1">Vehicle Type</label>
                  <select required value={vehicleType} onChange={(e) => setVehicleType(e.target.value)} className="w-full mt-1 bg-gray-100 text-gray-900 border border-gray-200 rounded-md px-3 py-3 mb-4 focus:outline-none focus:ring-2 focus:ring-black">
                    <option value="car">Car</option>
                    <option value="bike">Bike</option>
                    <option value="auto">Auto</option>
                  </select>
                </div>
                {/* Capacity */}
                <div className="w-1/2">
                  <label className="block text-gray-900 font-medium mb-1">Capacity</label>
                  <input required type="number" placeholder="e.g., 4" min="1" value={capacity} onChange={(e) => setCapacity(e.target.value)} className="w-full mt-1 bg-gray-100 text-gray-900 placeholder-gray-500 border border-gray-200 rounded-md px-3 py-3 mb-4 focus:outline-none focus:ring-2 focus:ring-black" />
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-3">
                <button type="button" onClick={() => setStep(1)} className="w-1/3 bg-gray-200 text-black py-3 rounded-md font-medium hover:bg-gray-300 transition mb-4">
                  Back
                </button>
                <button type="submit" className="w-2/3 bg-black text-white py-3 rounded-md font-medium hover:bg-gray-900 transition mb-4">
                  Create Account
                </button>
              </div>
            </>
          )}
        </div>

        {/* Switch Role */}
        <div>
          <Link
            to="/user-signup"
            className="w-full flex justify-center text-white items-center bg-amber-800 py-3 rounded-md font-medium hover:bg-yellow-500 transition">
            Register as User
          </Link>
        </div>
      </form>
    </div>
  );
};

export default CaptainSignup;
