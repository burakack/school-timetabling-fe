import React, { createContext, useState, useContext } from 'react';

import { useNavigate } from 'react-router-dom';

export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    
  const navigate = useNavigate();

    const login = () => {
        setIsAuthenticated(true);
        navigate("/");
    };

    const logout = () => { 
        setIsAuthenticated(false);
        localStorage.removeItem('access_token');
    };
    const authContextValue = {
        isAuthenticated,
        login,
        logout,
    };

    return (
        <AuthContext.Provider value={authContextValue}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;