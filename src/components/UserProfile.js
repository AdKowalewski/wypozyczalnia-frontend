import React, { useState, useEffect } from 'react';
import 'bulma/css/bulma.min.css';
import RentalService from '../services/RentalService';
import useAuth from '../hooks/useAuth';

const UserProfile = () => {
    //const { auth } = useAuth();
    //const userEmail = auth.email;

    const [rentals, setRentals] = useState([]);

    const disableButton = (end_date) => {
        let today = new Date();
        if (today >= end_date) {
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

    useEffect(() => {
        RentalService.getRentalsByUser().then((res) => {
            console.log(res);
            setRentals(res.data);
        });
    }, []);

    return (
        <div>
            {/* <h2>Rentals of User <b>{userEmail}</b></h2> */}
            <h2>Rentals of User</h2>
            <br/>
            <div class="table-container">
                <table class="table is-bordered is-striped is-narrow is-hoverable is-fullwidth">
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
                        {rentals.map(rental => (
                            <tr key={rental.id}>
                                <td>{rental.id}</td>
                                <td>{rental.rental_start}</td>
                                <td>{rental.rental_end}</td>
                                <td>{rental.car.brand}</td>
                                <td>{rental.car.model}</td>
                                <td>{rental.total_price}</td>
                                <td>
                                    <button 
                                        class="button is-danger" 
                                        disabled={disableButton(rental.rental_end)} 
                                        onClick={stopRental(rental.id)}
                                    >
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