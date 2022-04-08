import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import CarService from '../services/CarService';
import useAuth from '../hooks/useAuth';

const ListOfCars = () => {
    // const initialCars = [
    //     {id: '1', marka: 'Toyota', model: 'Corolla'},
    //     {id: '2', marka: 'Opel', model: 'Astra'},
    //     {id: '3', marka: 'Volkswagen', model: 'Passat'}
    // ];

    const API_URL = "http://127.0.0.1:8000/";

    const { auth } = useAuth();
    //const { car_id } = useParams(); 

    const navigate = useNavigate();

    const [cars, setCars] = useState([]);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [isAdmin, setIsAdmin] = useState(false);

    // if(auth.token != null) {
    //     setIsLoggedIn(true);
    // } else {
    //     setIsLoggedIn(false);
    // }

    // if(auth.roles == `List [ "admin" ]`) {
    //     setIsAdmin(true);
    // } else {
    //     setIsAdmin(false);
    // }

    const openDetails = (car) => {
        //car_id = car;
        navigate(`/cars/${car}`);
        window.location.reload();
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
        navigate(`/addCar/${car_id}`);
        window.location.reload();
    };

    const goToAddCarForm = () => {
        navigate('/addCar');
        window.location.reload();
    };

    return (
        <div>
            {isAdmin && <button className="button is-primary" onClick={goToAddCarForm}>Add car</button>}
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
                        <button className="button is-primary" onClick={openDetails(car)}>
                            <strong>Reserve</strong>
                        </button>
                        {/* {isLoggedIn && <button className="button is-primary" onClick={openDetails(car)}>
                            <strong>Reserve</strong>
                        </button>} */}
                        {isAdmin && <button className="button is-primary" onClick={goToEditCarForm(car.id)}>Edit car</button>}
                        {isAdmin && <button className="button is-danger" onClick={deleteCarHandler(car.id)}>Delete car</button>}
                    </div>
                </div>
            ))}
        </div>
    );
};

export default ListOfCars;