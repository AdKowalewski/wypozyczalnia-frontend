import React, { useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import AuthContext from '../context/Auth';
import '../css/style.css';

const HeaderComponent = () => {
    //const [isLoggedIn, setIsLoggedIn] = useState(false);

    const authCtx = useContext(AuthContext);

    const [name, setName] = useState('');
    const [surname, setSurname] = useState('');

    // useEffect(() => {
    //     const token = localStorage.getItem('token');
    //     if(token) {
    //         setIsLoggedIn(true);
    //     } else {
    //         setIsLoggedIn(false);
    //     }
    // }, []);

    /////////

    // const user_id = localStorage.getItem('user_id');

    // useEffect(() => {
    //     UserService.getUserById(user_id).then((res) => {
    //         console.log(res.data);
    //         setName(res.data.name);
    //         setSurname(res.data.surname);
    //     });
    // }, []);

    const navigate = useNavigate();

    const adminPanel = () => {
        navigate("/adminPanel");
    };

    const goToUserProfile = (user_id) => {
        navigate(`/profile/${user_id}`);
    };

    const signUp = () => {
        navigate("/users/register");
    };

    const logIn = () => {
        navigate("/users/login");
    };

    const logOut = () => {
        authCtx.onLogout();
        navigate('/');
        window.location.reload();
    }

    const logoRedirect = () => {
        navigate('/');
    };

    return (
        <nav className='navbar' role='navigation' aria-label="main navigation">
            <div className="navbar-beginning">
                <a className="logo" onClick={logoRedirect}><h1><strong>WYPOŻYCZALNIA LOGO</strong></h1></a>
            </div>
            <div className="navbar-end">
                <div className="navbar-item">
                    {/* {authCtx.isLoggedIn && <h2>{'Witaj ' + name + ' ' + surname}</h2>} */}
                    <div className="buttons">                    
                        {authCtx.role == 'admin' && <a className="button is-primary" onClick={adminPanel}>
                            <strong>Admin Panel</strong>
                        </a>}
                        {authCtx.isLoggedIn && <a className="button is-primary" onClick={() => goToUserProfile(authCtx.id)}>
                            <strong>User profile</strong>
                        </a>}
                        <a className="button is-primary" onClick={signUp}>
                            <strong>Sign up</strong>
                        </a>
                        {authCtx.isLoggedIn
                            ? <a className="button is-light" onClick={logOut}>Log out</a> 
                            : <a className="button is-light" onClick={logIn}>Log in</a>
                        }
                        {/* <a className="button is-light" onClick={logOut}>Awaryjny log out</a>  */}
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default HeaderComponent;