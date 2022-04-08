import React, { useEffect, useState } from 'react';
import RentalService from '../services/RentalService';
import DatePicker from 'react-datepicker';
import 'bulma/css/bulma.min.css';
import { useNavigate, useParams } from 'react-router-dom';

const CarDetails = (props) => {
    const API_URL = "http://127.0.0.1:8000/";

    const navigate = useNavigate();
    //const { car_id } = useParams();

    const [carRentals, setCarRentals] = useState([]);
    const [startDate, setStartDate] = useState(new Date());
    const [endDate, setEndDate] = useState(null);

    const handleRental = () => {
        const start = formatDate(startDate);
        const end = formatDate(endDate);
        RentalService.createRental(start, end, props.id).then(res => console.log(res));
    };

    const getDates = (startDate, endDate) => {
        const dates = [];
        let currentDate = startDate;

        const addDays = (days) => {
          const date = new Date(this.valueOf());
          date.setDate(date.getDate() + days);
          return date;
        }

        while (currentDate <= endDate) {
          dates.push(currentDate);
          currentDate = addDays.call(currentDate, 1);
        }

        return dates;
    };

    useEffect(() => {
        RentalService.getRentalsByCarId(props.id).then((res) => {
            console.log(res);
            setCarRentals(res.data);
        });
    }, []);

    const handleCancel = () => {
        navigate(-1);
        window.location.reload();
    };

    const getDisabledDates = () => {
        let disabledDates = [];
        let disabledDatesPerRental = [];

        for(const rental of carRentals) {
            disabledDatesPerRental = getDates(Date.parse(rental.rental_start), Date.parse(rental.rental_end));
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
        <div>
            <figure className="image is-128x128">
                <img src={API_URL + props.img}/>
            </figure>
            <br/><br/>
            <h2>{props.brand}</h2>
            <br/><br/>
            <h3>{props.model}</h3>
            <br/><br/>
            <h3>Price for 1 day: {props.price}</h3>
            <br/><br/>
            <p>{props.description}</p>
            <br/><br/>
            <form onSubmit={handleRental}>
                <label>Rental date range:</label>
                <DatePicker 
                    dateFormat="yyyy/dd/MM"
                    selected={startDate} 
                    onChange={datePickerChangeHandler} 
                    excludeDates={getDisabledDates}
                    isClearable
                    closeOnScroll={true} 
                    endDate={endDate}
                    selectsRange
                    inline
                />
                <br/><br/>
                <button type="submit">Rent a car</button>
            </form>
            <br/>
            <button onClick={handleCancel}>Go back</button>
        </div>
    );
};

export default CarDetails;