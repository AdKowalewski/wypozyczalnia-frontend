import React, { useState } from "react";
import { useLocation, Navigate, Outlet } from "react-router-dom";
//import useAuth from "../hooks/useAuth";

const RequireAuth = ({ allowedRoles }) => {
    //const { auth } = useAuth();
    const location = useLocation();

    const role = localStorage.getItem('role');

    return (
        <>
            {allowedRoles == role
                ? <Outlet />
                : <Navigate to='/unauthorized' state={{ from: location }} replace />}
        </>
    );
}

export default RequireAuth;