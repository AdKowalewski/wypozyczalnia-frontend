import React, { useState, useEffect, useContext } from 'react';
import 'bulma/css/bulma.min.css';
import RentalService from '../services/RentalService';
import { useNavigate, useParams } from 'react-router-dom';
import UserService from '../services/UserService';

const UserProfile = () => {

    const [activeRentals, setActiveRentals] = useState([]);
    const [unpaidRentals, setUnpaidRentals] = useState([]);
    const navigate = useNavigate();

    const { id } = useParams();

    const [name, setName] = useState('');
    const [surname, setSurname] = useState('');

    const disableButton = (end_date) => {
        let today = new Date();
        if (today >= new Date(end_date)) {
            return true;
        } else {
            return false;
        }
    };

    const stopRental = (rental_id) => {
        return RentalService.stopRental(rental_id).then((res) => {
            console.log(res);
        });
    };

    const formatDate = (date) => {
        const d = new Date(date),
            month = '' + (d.getMonth() + 1),
            day = '' + d.getDate(),
            year = d.getFullYear();
    
        if (day.length < 2) 
            day = '0' + day;
        if (month.length < 2) 
            month = '0' + month;
    
        return [year, day, month].join('-');
    }

    useEffect(() => {
        UserService.getUserById(id).then((res) => {
            console.log(res.data);
            setName(res.data.name);
            setSurname(res.data.surname);
        });
    }, []);

    useEffect(() => {
        RentalService.getUserActiveRentals().then((res) => {
            console.log(res.data);
            setActiveRentals(res.data);
        });
    }, []);

    useEffect(() => {
        RentalService.getUserUnpaidRentals().then((res) => {
            console.log(res.data);
            setUnpaidRentals(res.data);
        });
    }, []);

    const deleteUserHandler = () => {
        try {
            UserService.deleteUser().then((res) => {
                console.log(res.data);
            });
        } catch (err) {
            console.log(err);
        }
    };

    const goToEditUserForm = (user_id) => {
        navigate(`/editProfile/${user_id}`);
    };

    return (
        <div>
            <h1><strong>{name + ' ' + surname}</strong></h1>
            <br/>
            <a className="button is-primary" onClick={() => goToEditUserForm(id)}>Edit profile</a>
            <br/>
            <a className="button is-danger" onClick={deleteUserHandler}>Delete account</a>
            <br/><br/>
            <h2>My Active Rentals:</h2>
            <br/>
            <div className="table-container">
                <table className="table is-bordered is-striped is-narrow is-hoverable is-fullwidth">
                    <thead>
                        <th>Rental ID</th>
                        <th>Start date</th>
                        <th>End date</th>
                        <th>Brand</th>
                        <th>Model</th>
                        <th>Total price</th>
                        <th>Actions</th>
                    </thead>
                    <tbody>
                        {activeRentals.map(rental => (
                            <tr key={rental.id}>
                                <td>{rental.id}</td>
                                <td>{rental.rental_start}</td>
                                <td>{rental.rental_end}</td>
                                <td>{rental.car.brand}</td>
                                <td>{rental.car.model}</td>
                                <td>{rental.total_price}</td>
                                <td>
                                    <button 
                                        className="button is-danger" 
                                        disabled={disableButton(rental.rental_end)} 
                                        onClick={() => stopRental(rental.id)}>
                                            Stop Rental
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            <br/><br/>
            <h2>My Unpaid Rentals:</h2>
            <br/>
            <div className="table-container">
                <table className="table is-bordered is-striped is-narrow is-hoverable is-fullwidth">
                    <thead>
                        <th>Rental ID</th>
                        <th>Start date</th>
                        <th>End date</th>
                        <th>Brand</th>
                        <th>Model</th>
                        <th>Total price</th>
                        <th>Actions</th>
                    </thead>
                    <tbody>
                        {unpaidRentals.map(rental => (
                            <tr key={rental.id}>
                                <td>{rental.id}</td>
                                <td>{rental.rental_start}</td>
                                <td>{rental.rental_end}</td>
                                <td>{rental.car.brand}</td>
                                <td>{rental.car.model}</td>
                                <td>{rental.total_price}</td>
                                <td>
                                    <button 
                                        className="button is-danger" 
                                        disabled={disableButton(rental.rental_end)} 
                                        onClick={() => stopRental(rental.id)}>
                                            Stop Rental
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

export default UserProfile;