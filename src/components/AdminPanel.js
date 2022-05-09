import React, { useState, useEffect } from 'react';
import UserService from '../services/UserService';
import 'bulma/css/bulma.min.css';
import { useNavigate } from 'react-router-dom';

const AdminPanel = () => {

    const [users, setUsers] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        UserService.getUsers().then((res) => {
            console.log(res.data);
            setUsers(res.data);
        });
    }, []);

    const deleteUserByIdHandler = (user_id) => {

        try {
            UserService.deleteUserById(user_id).then((res) => {
                console.log(res.data);
                setUsers(users.filter((user) => user.id !== user_id));
            });
        } catch (err) {
            console.log(err);
        }
    };

    const goToUserRentals = (user_id) => {
        navigate(`/userRentals/${user_id}`);
    };
 
    return (
        <div>
            <h2>ADMINISTRATION PANEL</h2>
            <br/>
            <h3>List of users</h3>
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
                                    <button className="button is-primary" onClick={() => goToUserRentals(user.id)}>
                                        User rentals
                                    </button>
                                    <button className="button is-danger" onClick={() => deleteUserByIdHandler(user.id)}>
                                        Delete user
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default AdminPanel;