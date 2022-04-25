import React, { useState } from 'react';

export const AuthContext = React.createContext({
    // isLoggedIn: false,
    // token: null,
    // role: null,
    // onLogin: ({ token, role }) => {},
    // onLogout: () => {}
});

export const AuthProvider = (props) => {
    const [token, setToken] = useState(null);
    const [role, setRole] = useState(null);
    const [isLoggedIn, setIsLoggedIn] = useState(() => {
        const isToken = localStorage.getItem('token');
        return isToken !== null;
    });

    const onLogin = ({ token, role }) => {
        setToken(token);
        setRole(role);
        setIsLoggedIn(true);
        localStorage.setItem('token', token);
    };

    const onLogout = () => {
        localStorage.removeItem('token');
        setToken(null);
        setRole(null);
        setIsLoggedIn(false);
    };
    
    let contextValue = {
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