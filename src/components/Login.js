import React, { useRef, useState, useEffect, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import 'bulma/css/bulma.min.css';
import jwt from 'jwt-decode';
import AuthContext from '../context/Auth';

const API_URL = 'http://127.0.0.1:8000';

const Login = () => {

    const navigate = useNavigate();

    const authCtx = useContext(AuthContext);

    const emailRef = useRef();
    const errRef = useRef();

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
        }
    }

    const handleCancel = () => {
        navigate("/");
    };

    return (
        <section>
            <p ref={errRef} style={errMsg ? {color: 'red'} : {display: 'none'}} aria-live="assertive">{errMsg}</p>
            <h1>Sign In</h1>
            <form onSubmit={handleLogin}>
                <label htmlFor="email">Email:</label>
                <br/>
                <input 
                    type='email' 
                    id='email'
                    placeholder='email'
                    required
                    ref={emailRef}
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
                <br/>

                <label htmlFor="password">Password:</label>
                <br/>
                <input 
                    type='password' 
                    id='password'
                    placeholder='password' 
                    required
                    onChange={(e) => setPassword(e.target.value)}
                />
                <br/><br/>
                <button type='submit'>Sign In</button>
                {!loading 
                    ? null
                    : <span>.....</span>}
                <br/>
                <button type='button' onClick={handleCancel}>Go back</button>
            </form>
            <p>
                Need an Account?<br />
                <span className="line">
                    <Link to="/users/register">Sign Up</Link>
                </span>
            </p>
        </section>
    );
};

export default Login;