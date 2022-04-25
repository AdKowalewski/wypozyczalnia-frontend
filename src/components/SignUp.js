import React, { useRef, useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import 'bulma/css/bulma.min.css';

const API_URL = 'http://127.0.0.1:8000';

const vpassword = value => {
    if (value.length < 6 || value.length > 40) {
      return (
        <div className="notification is-danger" role="alert">
            <button className="delete"></button>
            The password must be between 6 and 40 characters!
        </div>
      );
    }
};

const SignUp = () => {
    const emailRef = useRef();
    const nameRef = useRef();
    const surnameRef = useRef();
    const errRef = useRef();

    const [email, setEmail] = useState('');
    const [name, setName] = useState('');
    const [surname, setSurname] = useState('');
    const [password, setPassword] = useState('');
    const [errMsg, setErrMsg] = useState('');
    const [success, setSuccess] = useState(false);
    const [loading, setLoading] = useState(false);

    const navigate = useNavigate();

    useEffect(() => {
        emailRef.current.focus();
    }, [])

    const handleSignUp = async (e) => {
        e.preventDefault();

        setLoading(true);

        try {
            const response = await axios.post(API_URL + '/users/register',
                JSON.stringify({ email, name, surname, password }),
                {
                    headers: { 'Content-Type': 'application/json' },
                    withCredentials: true
                }
            );
            console.log(JSON.stringify(response.data));
            setSuccess(true);
            setEmail('');
            setName('');
            setSurname('');
            setPassword('');
            setLoading(false);
        } catch (err) {
            console.log(err);
        }
    }

    const handleCancel = () => {
        navigate("/");
    };

    return (
            <>
            {success ? (
                <section>
                    <h1>Success! Thank You for registration!</h1>
                    <p>
                        <Link to="/">Go to home page</Link>
                    </p>
                </section>
            ) : (
                <section>
                    <p ref={errRef} style={errMsg ? {color: 'red'} : {display: 'none'}} aria-live="assertive">{errMsg}</p>
                    <h1>Sign Up</h1>
                    <form onSubmit={handleSignUp}>
                        <label htmlFor="name">Name:</label>
                        <br/>
                        <input
                            type="text"
                            id="name"
                            onChange={(e) => setName(e.target.value)}
                            ref={nameRef}
                            value={name}
                            required
                        />
                        <br/>

                        <label htmlFor="surname">Surname:</label>
                        <br/>
                        <input
                            type="text"
                            id="surname"
                            onChange={(e) => setSurname(e.target.value)}
                            ref={surnameRef}
                            value={surname}
                            required
                        />
                        <br/>

                        <label htmlFor="email">Email:</label>
                        <br/>
                        <input
                            type="text"
                            id="email"
                            ref={emailRef}
                            onChange={(e) => setEmail(e.target.value)}
                            value={email}
                            required
                        />
                        <br/>

                        <label htmlFor="password">Password:</label>
                        <br/>
                        <input
                            type="password"
                            id="password"
                            onChange={(e) => setPassword(e.target.value)}
                            value={password}
                            required
                            validations={[vpassword]}
                        />
                        <br/><br/>
                        
                        <button type='submit'>Sign Up</button>
                        {!loading 
                            ? null
                            : <span>...</span>}
                        <br/>
                        <button type='button' onClick={handleCancel}>Go back</button>
                    </form>
                    <p>
                        Already registered?<br />
                        <span className="line">
                            <Link to="/users/login">Sign In</Link>
                        </span>
                    </p>
                </section>
            )}
        </>
    );
};

export default SignUp;