import React, { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import CarService from '../services/CarService';
import AuthContext from '../context/Auth';
import 'bulma/css/bulma.min.css';

const ListOfCars = () => {
    // const initialCars = [
    //     {id: '1', marka: 'Toyota', model: 'Corolla'},
    //     {id: '2', marka: 'Opel', model: 'Astra'},
    //     {id: '3', marka: 'Volkswagen', model: 'Passat'}
    // ];

    const API_URL = "http://127.0.0.1:8000/"; 

    const navigate = useNavigate();

    const authCtx = useContext(AuthContext);

    const [cars, setCars] = useState([]);
    //const [isLoggedIn, setIsLoggedIn] = useState(false);

    // useEffect(() => {
    //     const token = localStorage.getItem('token');
    //     if(token) {
    //         setIsLoggedIn(true);
    //     } else {
    //         setIsLoggedIn(false);
    //     }
    // }, []);

    const openDetails = (car_id) => {
        navigate(`/cars/${car_id}`);
    };

    useEffect(() => {
        CarService.getCars(0).then((res) => {
            console.log(res);
            setCars(res.data);
        });
    }, []);

    const deleteCarHandler = (car_id) => {
        return CarService.deleteCarById(car_id).then((res) => {
            console.log(res);
        })
    };

    const goToEditCarForm = (car_id) => {
        navigate(`/editCar/${car_id}`);
    };

    const goToAddCarForm = () => {
        navigate('/addCar');
    };

    return (
        <div>
            {authCtx.role == 'admin' && <button className="button is-primary" onClick={goToAddCarForm}>Add car</button>}
            {cars.map(car => (
                <div key={car.id}>
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
                        {authCtx.role == 'admin' && <a className="button is-primary" onClick={goToEditCarForm}>Edit car</a>}
                        {authCtx.role == 'admin' && <a className="button is-danger" onClick={deleteCarHandler}>Delete car</a>}
                    </div>
                </div>
            ))}
        </div>
    );
};

export default ListOfCars;