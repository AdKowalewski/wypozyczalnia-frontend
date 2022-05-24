import React, { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import CarService from '../services/CarService';
import AuthContext from '../context/Auth';
import Pagination from './Pagination';
import 'bulma/css/bulma.min.css';
import '../css/style.css';

const ListOfCars = () => {
    // const initialCars = [
    //     {id: '1', marka: 'Toyota', model: 'Corolla'},
    //     {id: '2', marka: 'Opel', model: 'Astra'},
    //     {id: '3', marka: 'Volkswagen', model: 'Passat'}
    // ];

    const API_URL = "http://127.0.0.1:8000/"; 

    const navigate = useNavigate();

    const authCtx = useContext(AuthContext);
    const role = localStorage.getItem('role');

    const [cars, setCars] = useState([]);
    const [loading, setLoading] = useState(false);
    const [offset, setOffset] = useState(0);

    const openDetails = (car_id) => {
        navigate(`/cars/${car_id}`);
    };

    const previous = () => {
        setOffset(offset - 1);
        if (offset < 0) setOffset(0);
        console.log('offset: ' + offset);
    };

    const next = () => {
        setOffset(offset + 1);
        console.log('offset: ' + offset);
    };

    useEffect(() => {
        setLoading(true);
        CarService.getCars(offset).then((res) => {
            console.log(res);
            setCars(res.data);
            setLoading(false);
        })
    }, [offset]);

    const deleteCarHandler = (car_id) => {
        return CarService.deleteCarById(car_id).then((res) => {
            console.log(res);
            setCars(cars.filter((car) => car.id !== car_id));
        })
    };

    const goToEditCarForm = (car_id) => {
        navigate(`/editCar/${car_id}`);
    };

    const goToAddCarForm = () => {
        navigate('/addCar');
    };

    const goToCarRentals = (car_id) => {
        navigate(`/carRentals/${car_id}`);
    };

    return (
        <div>
            {role === 'admin' && <br/>}
            {role === 'admin' && <button className="button is-primary" onClick={goToAddCarForm}>Add car</button>}
            <Pagination previous={previous} next={next} />
            {loading ? <h2>Loading...</h2> : cars.map(car => (
                <div className='container' key={car.id}>
                    <div className='card'>
                        <div className='card-image'>
                            <figure className="image is-4by3">
                                <img src={API_URL + car.img} alt="car"/>
                            </figure>
                        </div>
                        <div className='card-content'>
                            <div className="media-content">
                                <p className="title is-4">{car.brand}</p>
                                <p className="subtitle is-6">{car.model}</p>
                            </div>
                        </div>
                        <div className="content">
                            Price for 1 day: {car.price}zł
                        </div>
                        {authCtx.isLoggedIn && <a className="button is-primary" onClick={() => openDetails(car.id)}>
                            <strong>Reserve</strong>
                        </a>}
                        {role === 'admin' && <a className="button is-primary" onClick={() => goToCarRentals(car.id)}>Car rentals</a>}
                        {role === 'admin' && <a className="button is-primary" onClick={() => goToEditCarForm(car.id)}>Edit car</a>}
                        {role === 'admin' && <a className="button is-danger" onClick={() => deleteCarHandler(car.id)}>Delete car</a>}
                    </div>
                </div>
            ))}
            <br/>
            <Pagination previous={previous} next={next} />
        </div>
    );
};

export default ListOfCars;