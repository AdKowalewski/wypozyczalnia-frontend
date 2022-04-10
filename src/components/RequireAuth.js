import React from "react";
import { useLocation, Navigate, Outlet } from "react-router-dom";

const RequireAuth = (props) => {
    const location = useLocation();

    const role = localStorage.getItem('role');

    return (
        <>
            {role == props.allowedRole
                ? <Outlet />
                : <Navigate to='/unauthorized' state={{ from: location }} replace />}
        </>
    );
}

export default RequireAuth;