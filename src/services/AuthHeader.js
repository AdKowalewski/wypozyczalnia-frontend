import { useContext } from "react";
import AuthContext from "../context/Auth";

export default function AuthHeader() {
    //const token = JSON.parse(localStorage.getItem('token'));
    const authCtx = useContext(AuthContext);
  
    if (authCtx.token) {
      return { Authorization: 'Bearer ' + authCtx.token };
    } else {
      return {};
    }
};