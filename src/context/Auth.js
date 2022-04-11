import React, { useState } from 'react';

export const AuthContext = React.createContext({
    isLoggedIn: false,
    token: null,
    role: null,
    onLogin: ({ token, role }) => {},
    onLogout: () => {}
});

export const AuthProvider = (props) => {
    const [token, setToken] = useState(null);
    const [role, setRole] = useState(null);
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    const onLogin = ({ token, role }) => {
        setToken(token);
        setRole(role);
        setIsLoggedIn(true);
        localStorage.setItem('token', token);
        localStorage.setItem('role', role);
    };

    const onLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('role');
        setToken(null);
        setRole(null);
        setIsLoggedIn(false);
    };

    const contextValue = {
        isLoggedIn: isLoggedIn,
        token: token,
        role: role,
        onLogin: onLogin,
        onLogout: onLogout
    };

    return (
        <AuthContext.Provider value={contextValue}>
            {props.children}
        </AuthContext.Provider>
    );
};

export default AuthContext;