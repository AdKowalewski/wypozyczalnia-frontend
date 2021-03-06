import React, { useState, useRef, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import UserService from '../services/UserService';
import 'bulma/css/bulma.min.css';
import '../css/style.css';

const EditProfile = () => {

    const { id } = useParams();
    const navigate = useNavigate();

    const [name, setName] = useState('');
    const [surname, setSurname] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errMsg, setErrMsg] = useState('');

    const nameRef = useRef();
    const surnameRef = useRef();
    const emailRef = useRef();
    const passwordRef = useRef();

    useEffect(() => {
        UserService.getUserById(id).then((res) => {
            console.log(res.data);
            setName(res.data.name);
            setSurname(res.data.surname);
            setEmail(res.data.email);
        });
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await UserService.editUser(id, email, name, surname, password);
            console.log(JSON.stringify(response.data));
            setName(name);
            setSurname(surname);
            setEmail(email);
            setPassword(password);
            navigate(-1);
        } catch (err) {
            console.log(err);
            setErrMsg('Error - could not edit user due to invalid data!');
        }
    };

    const handleCancel = () => {
        navigate(-1);
    };

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <br/>
                <div className='field'>
                    <label className='label' htmlFor="name">Name:</label>
                    <div className='control'>
                        <input
                            className='input'
                            type="text"
                            id="name"
                            onChange={(e) => setName(e.target.value)}
                            ref={nameRef}
                            value={name}
                            placeholder='Name'
                        />
                    </div>
                </div>

                <div className='field'>
                    <label className='label' htmlFor="surname">Surname:</label>
                    <div className='control'>
                        <input
                            className='input'
                            type="text"
                            id="surname"
                            onChange={(e) => setSurname(e.target.value)}
                            ref={surnameRef}
                            value={surname}
                            placeholder='Surname'
                        />
                    </div>
                </div>
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
                            ref={passwordRef}
                            value={password}
                            placeholder='Password'
                        />
                        <span className="icon is-small is-left">
                            <i className="fas fa-lock"></i>
                        </span>
                    </p>
                </div>
                <br/>
                <button className="button is-primary" type='submit'>Edit profile</button>
                <br/>
                {<div><h2 style={errMsg ? {color: 'red', fontWeight: 'bold'} : {display: 'none'}}>{errMsg}</h2></div>}
            </form>
            <br/>
            <a onClick={handleCancel}>Go back</a>
            <br/>
        </div>
    );
};

export default EditProfile;