import React, { useEffect, useState } from 'react';
import RentalService from '../services/RentalService';
import CarService from '../services/CarService';
import DatePicker from 'react-datepicker';
import 'bulma/css/bulma.min.css';
import "react-datepicker/dist/react-datepicker.css";
import { useNavigate, useParams } from 'react-router-dom';

const API_URL = "http://127.0.0.1:8000/";

const CarDetails = () => {
    
    const navigate = useNavigate();
    const { car_id } = useParams();

    const [carRentals, setCarRentals] = useState([]);
    const [startDate, setStartDate] = useState(new Date());
    const [endDate, setEndDate] = useState(null);

    const [image, setImage] = useState(null);
    const [brand, setBrand] = useState(null);
    const [model, setModel] = useState(null);
    const [description, setDescription] = useState(null);
    const [price, setPrice] = useState(null);

    useEffect(() => {
        CarService.getCarById(car_id).then((res) => {
            console.log(res.data);
            setImage(res.data.img);
            setBrand(res.data.brand);
            setModel(res.data.model);
            setDescription(res.data.description);
            setPrice(res.data.price);
        });
    }, []);

    useEffect(() => {
        RentalService.getRentalsByCarId(car_id).then((res) => {
            console.log(res.data);
            setCarRentals(res.data);
        });
    }, []);

    const handleRental = () => {
        const start = formatDate(startDate);
        const end = formatDate(endDate);
        RentalService.createRental(start, end, car_id).then(res => console.log(res));
    };

    const getDates = (startDate, endDate) => {
        const dates = [];
        let currentDate = new Date(startDate);

        while (currentDate <= new Date(endDate)) {
          dates.push(new Date(currentDate));
          currentDate.setUTCDate(currentDate.getUTCDate() + 1);
        }

        return dates;
    };

    const handleCancel = () => {
        navigate(-1);
    };

    const getDisabledDates = () => {
        let disabledDates = [];
        let disabledDatesPerRental = [];

        for(const rental of carRentals) {
            disabledDatesPerRental = getDates(rental.rental_start, rental.rental_end);
            disabledDates.push(...disabledDatesPerRental);
            disabledDatesPerRental = [];
        }

        return disabledDates;
    };

    const datePickerChangeHandler = (dates) => {
        const [start, end] = dates;
        const datesList = getDates(start, end);
        const disabledDatesList = getDisabledDates();
        if (disabledDatesList.some(item => datesList.includes(item))) {
            alert('There is another rental created in between your chosen date range!');
            setStartDate(new Date());
            setEndDate(null);
        } else {
            setStartDate(start);
            setEndDate(end);
        }
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

    return (
        <div className={{justifyContent: 'center'}}>
            <figure className="image is-128x128">
                <img src={API_URL + image}/>
            </figure>
            <h2>{brand}</h2>
            <h3>{model}</h3>
            <h3>Price for 1 day: {price}</h3>
            <p>{description}</p>
            <br/>
            <form onSubmit={handleRental}>
                <label>Rental date range:</label>
                <DatePicker 
                    dateFormat="yyyy/dd/MM"
                    selected={startDate} 
                    closeOnScroll={true}
                    placeholderText='Click here'
                    //excludeDates={getDisabledDates}
                    onChange={datePickerChangeHandler}
                    selectsRange
                />
                <br/><br/>
                <button type="submit">Rent a car</button>
            </form>
            <button onClick={handleCancel}>Go back</button>
        </div>
    );
};

export default CarDetails;