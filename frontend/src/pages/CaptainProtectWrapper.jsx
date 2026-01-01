import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const CaptainProtectWrapper = ({ children }) => {
  const token = localStorage.getItem('captain_token');
  const navigate = useNavigate();

  useEffect(() => {
    if (!token) {
      navigate('/captain-login');
    }
  }, [token, navigate]);

  return token ? <>{children}</> : null;
};

export default CaptainProtectWrapper;
