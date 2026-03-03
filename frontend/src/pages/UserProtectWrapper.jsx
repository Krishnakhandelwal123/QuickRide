import React, { useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { UserDataContext } from '../context/UserContext';

const UserProtectWrapper = ({ children }) => {
  const token = localStorage.getItem('user_token');
  const navigate = useNavigate();
  const { user, setUser } = useContext(UserDataContext);

  useEffect(() => {
    if (!token) {
      navigate('/user-login');
      return;
    }
    if (user?._id) return;
    const fetchProfile = async () => {
      try {
        const res = await axios.get(`${import.meta.env.VITE_BASE_URL}/users/profile`, {
          headers: { Authorization: `Bearer ${token}` },
          withCredentials: true
        });
        if (res.data?.user) setUser(res.data.user);
      } catch {
        navigate('/user-login');
      }
    };
    fetchProfile();
  }, [token, navigate, user, setUser]);

  return token ? <>{children}</> : null;
};

export default UserProtectWrapper;
