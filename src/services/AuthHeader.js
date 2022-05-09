export default function AuthHeader() {
    const token = localStorage.getItem('token');
    //const authCtx = useContext(AuthContext);
  
    if (token) {
      return { 'Authorization': 'Bearer ' + token };
    } else {
      return {};
    }
};