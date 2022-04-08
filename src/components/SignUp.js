import React, { useRef, useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
//import '../index.css';
import './loader.css';
import 'bulma/css/bulma.min.css';
//import { faCheck, faTimes, faInfoCircle } from "@fortawesome/free-solid-svg-icons";
//import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

//const EMAIL_REGEX = /^[A-z][A-z0-9-_]{3,23}$/;
//const PASSWORD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;
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
    //const [validName, setValidName] = useState(false);
    //const [emailFocus, setEmailFocus] = useState(false);

    const [password, setPassword] = useState('');
    //const [validPassword, setValidPassword] = useState(false);
    //const [passwordFocus, setPasswordFocus] = useState(false);

    //const [matchPassword, setMatchPassword] = useState('');
    //const [validMatch, setValidMatch] = useState(false);
    //const [matchFocus, setMatchFocus] = useState(false);

    const [errMsg, setErrMsg] = useState('');
    const [success, setSuccess] = useState(false);

    const [loading, setLoading] = useState(false);

    const navigate = useNavigate();

    useEffect(() => {
        emailRef.current.focus();
    }, [])

    // useEffect(() => {
    //     setValidName(EMAIL_REGEX.test(email));
    // }, [email])

    // useEffect(() => {
    //     setValidPassword(PASSWORD_REGEX.test(password));
    //     setValidMatch(password === matchPassword);
    // }, [password, matchPassword])

    // useEffect(() => {
    //     setErrMsg('');
    // }, [email, password, matchPassword])

    const handleSignUp = async (e) => {
        e.preventDefault();

        // const v1 = EMAIL_REGEX.test(email);
        // const v2 = PASSWORD_REGEX.test(password);
        // if (!v1 || !v2) {
        //     setErrMsg("Invalid Entry");
        //     return;
        // }

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
            //setMatchPassword('');
            setLoading(false);
        } catch (err) {
            // if (!err) {
            //     setErrMsg('No Server Response');
            // } else 
            // if (err.response.status === 409) {
            //     setErrMsg('Username Taken');
            // } else {
            //     setErrMsg('Registration Failed')
            // }
            // errRef.current.focus();
        }
    }

    const handleCancel = () => {
        navigate("/");
        window.location.reload();
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

                        <label htmlFor="email">
                            Email:
                            {/* <FontAwesomeIcon icon={faCheck} className={validName ? "valid" : "hide"} />
                            <FontAwesomeIcon icon={faTimes} className={validName || !email ? "hide" : "invalid"} /> */}
                        </label>
                        <br/>
                        <input
                            type="text"
                            id="email"
                            ref={emailRef}
                            onChange={(e) => setEmail(e.target.value)}
                            value={email}
                            required
                            //aria-invalid={validName ? "false" : "true"}
                            //aria-describedby="uidnote"
                            //onFocus={() => setEmailFocus(true)}
                            //onBlur={() => setEmailFocus(false)}
                        />
                        {/* <p id="uidnote" className={emailFocus && email && !validName ? "instructions" : "offscreen"}>
                            <FontAwesomeIcon icon={faInfoCircle} />
                            4 to 24 characters.<br />
                            Must begin with a letter.<br />
                            Letters, numbers, underscores, hyphens allowed.
                        </p> */}
                        <br/>

                        <label htmlFor="password">
                            Password:
                            {/* <FontAwesomeIcon icon={faCheck} className={validPassword ? "valid" : "hide"} />
                            <FontAwesomeIcon icon={faTimes} className={validPassword || !password ? "hide" : "invalid"} /> */}
                        </label>
                        <br/>
                        <input
                            type="password"
                            id="password"
                            onChange={(e) => setPassword(e.target.value)}
                            value={password}
                            required
                            //aria-invalid={validPassword ? "false" : "true"}
                            //aria-describedby="pwdnote"
                            //onFocus={() => setPasswordFocus(true)}
                            //onBlur={() => setPasswordFocus(false)}
                            validations={[vpassword]}
                        />
                        {/* <p id="pwdnote" className={passwordFocus && !validPassword ? "instructions" : "offscreen"}>
                            <FontAwesomeIcon icon={faInfoCircle} />
                            8 to 24 characters.<br />
                            Must include uppercase and lowercase letters, a number and a special character.<br />
                            Allowed special characters: <span aria-label="exclamation mark">!</span> <span aria-label="at symbol">@</span> <span aria-label="hashtag">#</span> <span aria-label="dollar sign">$</span> <span aria-label="percent">%</span>
                        </p> */}
                        <br/><br/>

                        {/* <label htmlFor="confirm_pwd">
                            Confirm Password:
                            <FontAwesomeIcon icon={faCheck} className={validMatch && matchPassword ? "valid" : "hide"} />
                            <FontAwesomeIcon icon={faTimes} className={validMatch || !matchPassword ? "hide" : "invalid"} />
                        </label>
                        <br/>
                        <input
                            type="password"
                            id="confirm_pwd"
                            onChange={(e) => setMatchPassword(e.target.value)}
                            value={matchPassword}
                            required
                            aria-invalid={validMatch ? "false" : "true"}
                            aria-describedby="confirmnote"
                            onFocus={() => setMatchFocus(true)}
                            onBlur={() => setMatchFocus(false)}
                        />
                        <p id="confirmnote" className={matchFocus && !validMatch ? "instructions" : "offscreen"}>
                            <FontAwesomeIcon icon={faInfoCircle} />
                            Must match the first password input field.
                        </p>
                        <br/> */}
                        {/* <button disabled={!validName || !validPassword || !validMatch ? true : false} type='submit'>Sign Up</button> */}
                        <button type='submit'>Sign Up</button>
                        {!loading 
                            ? null
                            : <span className="loader-mixin"></span>}
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