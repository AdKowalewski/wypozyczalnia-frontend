import React, { useState, useRef, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import UserService from '../services/UserService';

const EditProfile = () => {

    const { id } = useParams();
    const navigate = useNavigate();

    const [name, setName] = useState('');
    const [surname, setSurname] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

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
            const response = await UserService.editUser(email, name, surname, password);
            console.log(JSON.stringify(response.data));
            setName(name);
            setSurname(surname);
            setEmail(email);
            setPassword(password);
            navigate(-1);
        } catch (err) {
            console.log(err);
        }
    };

    const handleCancel = () => {
        navigate(-1);
    };

    return (
        <div>
            <form onSubmit={handleSubmit}>
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
                    onChange={(e) => setEmail(e.target.value)}
                    ref={emailRef}
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
                    ref={passwordRef}
                    value={password}
                    required
                />
                <br/>
                <button type='submit'>Edit profile</button>
            </form>
            <br/>
            <button onClick={handleCancel}>Go back</button> 
        </div>
    );
};

export default EditProfile;