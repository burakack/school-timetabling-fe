import React, { useEffect } from 'react';
import {  Navigate } from 'react-router-dom';
import { useContext } from 'react';
import { AuthContext } from '../../context/AuthProvider';

const ProtectedRoute = ({ element: Component }) => {
    const { isAuthenticated } = useContext(AuthContext);
    const isUserAuthenticated = isAuthenticated || localStorage.getItem("access_token");
  
    return isUserAuthenticated ? <Component /> : <Navigate to="/login" />;
  };
  
  
  export default ProtectedRoute;