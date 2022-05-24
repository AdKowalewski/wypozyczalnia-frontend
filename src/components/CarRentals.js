import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import RentalService from '../services/RentalService';
import CarService from '../services/CarService';

const CarRentals = () => {

    const [rentals, setRentals] = useState([]);
    const [brand, setBrand] = useState('');
    const [model, setModel] = useState('');
    const navigate = useNavigate();

    const { car_id } = useParams();

    const [loading, setLoading] = useState(false);

    useEffect(() => {
        setLoading(true);
        RentalService.getCarAllRentalsById(car_id).then((res) => {
            console.log(res);
            setRentals(res.data);
            setLoading(false);
        });
    }, []);

    useEffect(() => {
        CarService.getCarById(car_id).then((res) => {
            console.log(res.data);
            setBrand(res.data.brand);
            setModel(res.data.model);
        });
    }, []);

    const handleCancel = () => {
        navigate(-1);
    };

    return (
        <div>
            <h2 style={{fontWeight: 'bold', margin: '20px'}}>Rentals of {brand} {model}</h2>
            {!loading ? (rentals.length !== 0 ? <div className="table-container">
                <table className="table is-bordered is-striped is-narrow is-hoverable is-fullwidth">
                    <tr>
                        <th>Rental ID</th>
                        <th>Start date</th>
                        <th>End date</th>
                        <th>User</th>
                        <th>Total price</th>
                    </tr>
                    {rentals.map(rental => (
                        <tr key={rental.id}>
                            <td>{rental.id}</td>
                            <td>{rental.rental_start}</td>
                            <td>{rental.rental_end}</td>
                            <td>{rental.user.name} {rental.user.surname}</td>
                            <td>{rental.total_price} zł</td>
                        </tr>
                    ))}
                </table>
            </div> : <h2 style={{marginTop: '20px'}}>This car has no any rentals yet.</h2>) : <h2>Loading...</h2>}
            <br/>
            <a onClick={handleCancel}>Go back</a>
        </div>
    );
};

export default CarRentals;