import React, { useContext } from "react";
import { useLocation, Outlet } from "react-router-dom";
import AuthContext from '../context/Auth';
import Unauthorized from "./Unauthorized";

const RequireAuth = (props) => {
    //const location = useLocation();

    const authCtx = useContext(AuthContext);

    //const role = localStorage.getItem('role');

    return (
        <>
            {authCtx.isLoggedIn && authCtx.role == props.allowedRole
            // role == props.allowedRole
                ? <Outlet />
                : <Unauthorized />}
        </>
    );
}

export default RequireAuth;