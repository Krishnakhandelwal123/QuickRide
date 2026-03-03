import React, { useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { CaptainDataContext } from '../context/CaptainContext';

const CaptainProtectWrapper = ({ children }) => {
  const token = localStorage.getItem('captain_token');
  const navigate = useNavigate();
  const { captain, setCaptain } = useContext(CaptainDataContext);

  useEffect(() => {
    if (!token) {
      navigate('/captain-login');
      return;
    }
    if (captain?._id) return;
    const fetchProfile = async () => {
      try {
        const res = await axios.get(`${import.meta.env.VITE_BASE_URL}/captains/profile`, {
          headers: { Authorization: `Bearer ${token}` },
          withCredentials: true
        });
        if (res.data?.captain) setCaptain(res.data.captain);
      } catch {
        navigate('/captain-login');
      }
    };
    fetchProfile();
  }, [token, navigate, captain, setCaptain]);

  return token ? <>{children}</> : null;
};

export default CaptainProtectWrapper;
