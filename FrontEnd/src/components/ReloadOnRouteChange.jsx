import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const ReloadOnRouteChange = () => {
  const location = useLocation();

  useEffect(() => {
    window.location.reload();
  }, [location]);

  return null;
};

export default ReloadOnRouteChange;
