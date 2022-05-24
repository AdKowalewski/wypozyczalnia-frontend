import React, { useState, useEffect } from 'react';
import UserService from '../services/UserService';
import { useNavigate } from 'react-router-dom';
import 'bulma/css/bulma.min.css';

const AdminPanel = () => {

    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        setLoading(true);
        UserService.getUsers().then((res) => {
            console.log(res.data);
            setUsers(res.data);
            setLoading(false);
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

    const goToUserEdit = (user_id) => {
        navigate(`/editProfile/${user_id}`);
    };

    const goBackToMainPage = () => {
        navigate('/');
    };
 
    return (
        <div>
            <h3 style={{fontWeight: 'bold', marginTop: '20px'}}>List of users</h3>
            <br/>
            {!loading ? <div className="table-container">
                <table className="table is-bordered is-striped is-narrow is-hoverable is-fullwidth">
                    <tr>
                        <th>User ID</th>
                        <th>Name</th>
                        <th>Surname</th>
                        <th>Email</th>
                        <th>Actions</th>
                    </tr>
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
                                <button className="button is-primary" onClick={() => goToUserEdit(user.id)}>
                                    Edit User
                                </button>
                                <button className="button is-danger" onClick={() => deleteUserByIdHandler(user.id)}>
                                    Delete user
                                </button>
                            </td>
                        </tr>
                    ))}
                </table>
            </div> : <h2>Loading...</h2>}
            <br/>
            <a onClick={goBackToMainPage}>Go back to main page</a>
            <br/><br/>
        </div>
    );
};

export default AdminPanel;