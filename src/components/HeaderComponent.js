import React, { useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import AuthContext from '../context/Auth';
import UserService from '../services/UserService';
import '../css/style.css';

const HeaderComponent = () => {

    const authCtx = useContext(AuthContext);
    const role = localStorage.getItem('role');

    const [name, setName] = useState('');
    const [surname, setSurname] = useState('');

    const user_id = localStorage.getItem('user_id');

    useEffect(() => {
        UserService.getUserById(user_id).then((res) => {
            console.log(res.data);
            setName(res.data.name);
            setSurname(res.data.surname);
        });
    }, [user_id]);

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
        window.location.reload();
    };

    return (
        <nav className='navbar is-dark' role='navigation' aria-label="main navigation">
            <div className="logo" onClick={logoRedirect}><h1 style={{fontWeight: 'bold'}}>CAR RENTAL</h1></div>
            <div className="navbar-end">
                <div className="navbar-item">
                    {authCtx.isLoggedIn && <h2 style={{margin: '10px'}}>{'Welcome ' + name + ' ' + surname}</h2>}
                    <div className="buttons">                    
                        {role == 'admin' && <a className="button is-primary" onClick={adminPanel}>
                            <strong>Admin Panel</strong>
                        </a>}
                        {authCtx.isLoggedIn && <a className="button is-primary" onClick={() => goToUserProfile(user_id)}>
                            <strong>User profile</strong>
                        </a>}
                        <a className="button is-primary" onClick={signUp}>
                            <strong>Sign up</strong>
                        </a>
                        {authCtx.isLoggedIn
                            ? <a className="button is-light" onClick={logOut}>Log out</a> 
                            : <a className="button is-light" onClick={logIn}>Log in</a>
                        }
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default HeaderComponent;