import React, { useEffect, useContext } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { CaptainDataContext } from '../context/CaptainContext';

const CaptainLogout = () => {
    const navigate = useNavigate();
    const { setCaptain } = useContext(CaptainDataContext);

    useEffect(() => {
        const token = localStorage.getItem('captain_token');

        const performLogout = async () => {
            try {
                // Call backend to invalidate the token on the server
                await axios.get(`${import.meta.env.VITE_BASE_URL}/captains/logout`, {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                });
            } catch (error) {
                console.error("Captain logout API call failed, proceeding with client-side logout:", error);
            } finally {
                // Always clear client-side data and redirect
                localStorage.removeItem('captain_token');
                setCaptain(null); // Clear captain from context
                navigate('/captain-login');
            }
        };

        performLogout();
    }, [navigate, setCaptain]);

    return null; // This component doesn't render any UI
};

export default CaptainLogout;