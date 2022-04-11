import React, { useContext } from "react";
import { useLocation, Navigate, Outlet } from "react-router-dom";
//import AuthContext from '../context/Auth';

const RequireAuth = (props) => {
    const location = useLocation();

    //const authCtx = useContext(AuthContext);

    const role = localStorage.getItem('role');

    return (
        <>
            {/* {authCtx.isLoggedIn && authCtx.role == props.allowedRole */
            role == props.allowedRole
                ? <Outlet />
                : <Navigate to='/unauthorized' state={{ from: location }} replace />}
        </>
    );
}

export default RequireAuth;