import React, { useContext } from "react";
import { Outlet } from "react-router-dom";
import AuthContext from '../context/Auth';
import Unauthorized from "./Unauthorized";

const RequireAuth = (props) => {

    const authCtx = useContext(AuthContext);

    const role = localStorage.getItem('role');

    return (
        <>
            {authCtx.isLoggedIn && role === props.allowedRole
            // authCtx.role === props.allowedRole
                ? <Outlet />
                : <Unauthorized />}
        </>
    );
}

export default RequireAuth;