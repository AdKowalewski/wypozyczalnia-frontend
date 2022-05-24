import React, { useRef, useState, useEffect, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import jwt from 'jwt-decode';
import AuthContext from '../context/Auth';
import 'bulma/css/bulma.min.css';
import '../css/style.css';

const API_URL = 'http://127.0.0.1:8000';

const Login = () => {

    const navigate = useNavigate();

    const authCtx = useContext(AuthContext);

    const emailRef = useRef();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errMsg, setErrMsg] = useState('');
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        emailRef.current.focus();
    }, [])

    useEffect(() => {
        setErrMsg('');
    }, [email, password])

    const handleLogin = async (e) => {
        e.preventDefault();

        setLoading(true);

        try {
            const response = await axios.post(API_URL + '/users/login',
                JSON.stringify({ email, password }),
                {
                    headers: { 'Content-Type': 'application/json' },
                    withCredentials: true
                }
            )
            console.log(JSON.stringify(response.data));
            const token = response.data.token;
            const user = jwt(token);
            const roles = user.role;
            const user_ID = user.id;
            localStorage.setItem('user_id', user_ID);
            authCtx.onLogin({token: token, id: user_ID, role: roles});
            setEmail('');
            setPassword('');
            setLoading(false);
            navigate('/');
        } catch (err) {
            console.log(err);
            if (err.response.status === 401) setErrMsg('Invalid email or password!');
            else setErrMsg('Error - could not login user!');
        }
    }

    const handleCancel = () => {
        navigate("/");
    };

    return (
        <section>
            <br/>
            <h1><strong>Sign In</strong></h1>
            <br/>
            <form onSubmit={handleLogin}>
                <div className='field'>
                    <label className='label' htmlFor="email">Email:</label>
                    <p className="control has-icons-left has-icons-right">
                        <input
                            className='input'
                            type="text"
                            id="email"
                            ref={emailRef}
                            onChange={(e) => setEmail(e.target.value)}
                            value={email}
                            placeholder='Email'
                            required
                        />
                        <span className="icon is-small is-left">
                            <i className="fas fa-envelope"></i>
                        </span>
                        <span className="icon is-small is-right">
                            <i className="fas fa-check"></i>
                        </span>
                    </p>
                </div>

                <div className='field'>
                    <label className='label' htmlFor="password">Password:</label>
                    <p className="control has-icons-left">
                        <input
                            className='input'
                            type="password"
                            id="password"
                            onChange={(e) => setPassword(e.target.value)}
                            value={password}
                            required
                            placeholder='Password'
                        />
                        <span className="icon is-small is-left">
                            <i className="fas fa-lock"></i>
                        </span>
                    </p>
                </div>
                <br/>
                <button className="button is-primary" type='submit'>Sign In</button>
                {!loading 
                    ? null
                    : <span>Loading...</span>}
                {<div><h2 style={errMsg ? {color: 'red', fontWeight: 'bold'} : {display: 'none'}}>{errMsg}</h2></div>}
                <br/><br/>
                <a type='button' onClick={handleCancel}>Go back</a>
                <br/><br/>
            </form>
            <p>
                Need an Account?<br />
                <span className="line">
                    <Link to="/users/register">Sign Up</Link>
                </span>
            </p>
            <br/>
        </section>
    );
};

export default Login;