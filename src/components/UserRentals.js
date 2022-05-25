import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import UserService from '../services/UserService';
import RentalService from '../services/RentalService';

const UserRentals = () => {

    const [rentals, setRentals] = useState([]);
    const navigate = useNavigate();

    const { id } = useParams();

    const [name, setName] = useState('');
    const [surname, setSurname] = useState('');

    const [loading, setLoading] = useState(false);
    const [err, setErr] = useState('');

    useEffect(() => {
        UserService.getUserById(id).then((res) => {
            console.log(res.data);
            setName(res.data.name);
            setSurname(res.data.surname);
        });
    }, []);

    useEffect(() => {
        setLoading(true);
        RentalService.getAllUserRentals(id).then((res) => {
            console.log(res);
            setRentals(res.data);
            setLoading(false);
        });
    }, []);

    const handleCancel = () => {
        navigate(-1);
    };

    const markRentalReturned = async (rental_id) => {
        try {
            await RentalService.returnRental(rental_id).then((res) => {
                console.log(res.data);
            });
        } catch (err) {
            console.log(err);
            if (err.response.status === 400) setErr('Car already returned!');
        }
    };

    return (
        <div>
            <h1 style={{fontWeight: 'bold', margin: '20px'}}>{'Rentals of ' + name + ' ' + surname}</h1>
            <br/>
            {!loading ? (rentals.length !== 0 ? <div className="table-container">
                <table className="table is-bordered is-striped is-narrow is-hoverable is-fullwidth">
                    <tr>
                        <th>Rental ID</th>
                        <th>Start date</th>
                        <th>End date</th>
                        <th>Brand</th>
                        <th>Model</th>
                        <th>Total price</th>
                        <th>Status</th>
                    </tr>
                    {rentals.map(rental => (
                        <tr key={rental.id}>
                            <td>{rental.id}</td>
                            <td>{rental.rental_start}</td>
                            <td>{rental.rental_end}</td>
                            <td>{rental.car.brand}</td>
                            <td>{rental.car.model}</td>
                            <td>{rental.total_price} zł</td>
                            <td>
                                {rental.returned === false
                                    ? <button 
                                        className="button is-primary"  
                                        onClick={() => markRentalReturned(rental.id)}>
                                            Mark returned
                                    </button> : <h2>Returned</h2>}
                            </td>
                        </tr>
                    ))}
                </table>
            </div> : <h2>This user has no any rentals yet.</h2>) : <h2>Loading...</h2>}
            {err && <br/>}
            {<div><h2 style={err ? {color: 'red', fontWeight: 'bold'} : {display: 'none'}}>{err}</h2></div>}
            <br/>
            <a onClick={handleCancel}>Go back</a>
        </div>
    );
};

export default UserRentals;