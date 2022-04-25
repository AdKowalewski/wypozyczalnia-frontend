import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import UserService from '../services/UserService';
import 'bulma/css/bulma.min.css';

const AdminPanel = () => {

    const [users, setUsers] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        UserService.getUsers().then((res) => {
            console.log(res.data);
            setUsers(res.data);
        });
    }, []);

    const handleCancel = () => {
        navigate(-1);
    };

    const deleteUsersHandler = async (e) => {
        e.preventDefault();

        try {
            await UserService.deleteUsers().then((res) => {
                console.log(res.data);
            });
        } catch (err) {
            console.log(err);
        }
    };

    const deleteUserByIdHandler = async (e, user_id) => {
        e.preventDefault();

        try {
            await UserService.deleteUser(user_id).then((res) => {
                console.log(res.data);
            });
        } catch (err) {
            console.log(err);
        }
    };
 
    return (
        <div>
            <h2>ADMINISTRATION PANEL</h2>
            <br/>
            <h3>List of users</h3>
            <br/>
            <a className="button is-danger" onClick={deleteUsersHandler}>Delete all users</a>
            <br/>
            <div className="table-container">
                <table className="table is-bordered is-striped is-narrow is-hoverable is-fullwidth">
                    <thead>
                        <th>User ID</th>
                        <th>Name</th>
                        <th>Surname</th>
                        <th>Email</th>
                        <th>Actions</th>
                    </thead>
                    <tbody>
                        {users.map(user => (
                            <tr key={user.id}>
                                <td>{user.id}</td>
                                <td>{user.name}</td>
                                <td>{user.surname}</td>
                                <td>{user.email}</td>
                                <td>
                                    <button className="button is-danger" onClick={() => deleteUserByIdHandler(user.id)}>
                                        Delete user
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            <br/>
            <button onClick={handleCancel}>Go to home page</button>
        </div>
    );
};

export default AdminPanel;