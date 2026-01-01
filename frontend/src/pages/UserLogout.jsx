import React, { useEffect, useContext } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom';
import { UserDataContext } from '../context/UserContext';

const UserLogout = () => {
    const navigate = useNavigate();
    const { setUser } = useContext(UserDataContext);

    useEffect(() => {
        const token = localStorage.getItem('user_token');

        const performLogout = async () => {
            try {
                // Optional: Call backend to invalidate the token/session
                await axios.get(`${import.meta.env.VITE_BASE_URL}/user/logout`, {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                });
            } catch (error) {
                console.error("Logout API call failed, proceeding with client-side logout:", error);
            } finally {
                // Always clear client-side data and redirect
                localStorage.removeItem('user_token');
                setUser(null); // Clear user from context
                navigate('/user-login');
            }
        }

        performLogout();
    }, [navigate, setUser]); // Dependencies for the effect

  return null; // This component doesn't need to render anything
}

export default UserLogout
