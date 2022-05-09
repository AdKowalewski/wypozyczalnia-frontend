import React, { useContext, useEffect, useRef, useState } from 'react';
import RentalService from '../services/RentalService';
import CarService from '../services/CarService';
//import { Datepicker } from 'vanillajs-datepicker';
//import '../../node_modules/vanillajs-datepicker/sass/datepicker-bulma';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import 'bulma/css/bulma.min.css';
import '../css/style.css';
import { useNavigate, useParams } from 'react-router-dom';
import AuthContext from '../context/Auth';

const CarDetails = () => {
    
    const navigate = useNavigate();
    const { car_id } = useParams();
    const authCtx = useContext(AuthContext);

    const [carRentals, setCarRentals] = useState([]);
    const [startDate, setStartDate] = useState(new Date());
    const [endDate, setEndDate] = useState(null);

    //const [image, setImage] = useState(null);
    const [brand, setBrand] = useState(null);
    const [model, setModel] = useState(null);
    const [description, setDescription] = useState(null);
    const [price, setPrice] = useState(null);

    //const dateRef = useRef();

    useEffect(() => {
        CarService.getCarById(car_id).then((res) => {
            console.log(res.data);
            //setImage(res.data.img);
            setBrand(res.data.brand);
            setModel(res.data.model);
            setDescription(res.data.description);
            setPrice(res.data.price);
        });
    }, []);

    useEffect(() => {
        RentalService.getRentalsByCarId(car_id).then((res) => {
            setCarRentals(res.data);
        });
    }, []);

    const getDates = (startDate, endDate) => {
        let dates = [];
        let currentDate = new Date(startDate);

        while (currentDate <= endDate) {
          dates = [...dates, new Date(currentDate)];
          currentDate.setUTCDate(currentDate.getUTCDate() + 1);
        }
        console.log('dates: ' + dates);
        return dates;
    };

    const handleCancel = () => {
        navigate(-1);
    };

    const getDisabledDates = () => { 
        let disabledDatesPerRental = [];
        let disabledDates = [];

        carRentals.map(rental => {
            let start = rental.rental_start.split('-');
            let end = rental.rental_end.split('-');
            disabledDatesPerRental = getDates(
                new Date(start[0], start[1]-1, start[2]), 
                new Date(end[0], end[1]-1, end[2])
            );
            disabledDates = [...disabledDates, disabledDatesPerRental];
            disabledDatesPerRental = [];
        });

        for(let date of disabledDates) {
            date = new Date(date.getFullYear(), date.getMonth(), date.getDate());
        }

        console.log('disabledDates : ' + disabledDates);
        return disabledDates;
    };

    const disabledDatesExample = [
        new Date(2022,4,20),
        new Date(2022,4,21),
        new Date(2022,4,22),
        new Date(2022,4,23)
    ];

    const handleRental = () => {
        const disabledDatesList = getDisabledDates();
        for(let date of disabledDatesList) {
            date = formatDate(date);
        }

        let start = startDate.split('-');
        let end = endDate.split('-');

        const datesList = getDates(
            new Date(start[0], start[1]-1, start[2]),
            new Date(end[0], end[1]-1, end[2])
        );
        for(let date of datesList) {
            date = formatDate(date);
        }

        if (disabledDatesList.some(date => datesList.includes(date))) {
            alert('There is another rental created in between your chosen date range!');
            setStartDate(null);
            setEndDate(null);
        } else {
            RentalService.createRental(startDate, endDate, car_id).then(res => {
                console.log(res);
                navigate(`/profile/${authCtx.id}`);
            });
        } 
    };

    const formatDate = (date) => {
        const d = new Date(date);
        let month = '' + (d.getMonth() + 1);
        let day = '' + d.getDate();
        let year = d.getFullYear();
    
        if (day.length < 2) 
            day = '0' + day;
        if (month.length < 2) 
            month = '0' + month;
    
        return [year, day, month].join('-');
    }

    return (
        <div className='container'>
            {/* <figure className="image is-128x128 is-centered">
                <img src={API_URL + image}/>
            </figure> */}
            <h2><strong>Brand: </strong>{brand}</h2>
            <h3><strong>Model: </strong>{model}</h3>
            <h3><strong>Price for 1 day: </strong>{price}</h3>
            <p><strong>Description: </strong>{description}</p>
            <br/>
            <form onSubmit={handleRental}>
                <label>Rental date range (required format: yyyy-mm-dd):</label>
                <br/>
                <input required type='text' onChange={(e) => setStartDate(e.target.value)} />
                <br/>
                <input required type='text' onChange={(e) => setEndDate(e.target.value)} />
                <br/>
                <label>Check which dates are occupied:</label>
                <DatePicker
                    dateFormat="yyyy/dd/MM" 
                    excludeDates={disabledDatesExample}
                    inline
                />
                {/* <DatePicker 
                    required
                    dateFormat="yyyy/dd/MM"
                    selected={startDate}
                    selectsRange 
                    closeOnScroll={true}
                    placeholderText='Rental end'
                    excludeDates={disabledDates}
                    onChange={endDatePickerChangeHandler}
                /> */}
                <br/><br/>
                <button className='button is-primary' type="submit">Rent a car</button>
            </form>
            <br/>
            <button onClick={handleCancel}>Go back</button>
        </div>
    );
};

export default CarDetails;