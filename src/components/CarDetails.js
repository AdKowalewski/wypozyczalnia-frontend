import React, { useContext, useEffect, useRef, useState } from 'react';
import RentalService from '../services/RentalService';
import CarService from '../services/CarService';
import { useNavigate, useParams } from 'react-router-dom';
import AuthContext from '../context/Auth';
import 'bulma/css/bulma.min.css';
import '../css/style.css';

const CarDetails = () => {
    
    const navigate = useNavigate();
    const { car_id } = useParams();
    //const authCtx = useContext(AuthContext);
    const user_id = localStorage.getItem('user_id');

    const [carRentals, setCarRentals] = useState([]);
    const [startDate, setStartDate] = useState(null);
    const [endDate, setEndDate] = useState(null);

    const [brand, setBrand] = useState(null);
    const [model, setModel] = useState(null);
    const [description, setDescription] = useState(null);
    const [price, setPrice] = useState(null);

    const [isTableShown, setIsTableShown] = useState(false);
    const [errMsg, setErrMsg] = useState('');

    const [loading, setLoading] = useState(false);

    useEffect(() => {
        setLoading(true);
        CarService.getCarById(car_id).then((res) => {
            console.log(res.data);
            setLoading(false);
            setBrand(res.data.brand);
            setModel(res.data.model);
            setDescription(res.data.description);
            setPrice(res.data.price);
        });
    }, []);

    useEffect(() => {
        setLoading(true);
        RentalService.getRentalsByCarId(car_id).then((res) => {
            setCarRentals(res.data);
            setLoading(false);
        });
    }, []);

    const getDates = (start, end) => {
        let dates = [];
        let sd = new Date(start);
        let ed = new Date(end);
        let theDate = new Date(sd.getTime());

        while(theDate <= ed) {
            dates.push(new Date(theDate));
            theDate.setUTCDate(theDate.getUTCDate() + 1);
        }

        return dates;
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
            disabledDates = disabledDates.concat(disabledDatesPerRental);
            disabledDatesPerRental = [];
        });

        // for (let date of disabledDates) {
        //     date = formatDate(date);
        // }

        console.log('disabled dates ddd: ' + disabledDates);
        return disabledDates;
    };

    const getDisabledDatesAsStrings = () => {
        let disabledDates = getDisabledDates();
        let disabledStrings = [];

        for(let date of disabledDates) {
            disabledStrings.push(formatDate(date));
        }

        console.log('disabledStrings: ' + disabledStrings);
        return disabledStrings;
    };

    const formatDate = (date) => {
        const d = new Date(date);
        let year = d.getFullYear();
        let month = '' + (d.getMonth() + 1);
        let day = '' + d.getDate();

        if (day.length < 2) {
            day = '0' + day;
        }
        if (month.length < 2) {
            month = '0' + month;
        }

        return [year, month, day].join('-');
    };

    const handleRental = async (e) => {
        e.preventDefault();

        const disabledDatesList = getDisabledDatesAsStrings();

        // let startDate = `${startYear}-${startMonth}-${startDay}`;
        // let endDate = `${endYear}-${endMonth}-${endDay}`;

        let start = startDate.split('-');
        let end = endDate.split('-');
        const datesList = getDates(
            new Date(start[0], start[1]-1, start[2]),
            new Date(end[0], end[1]-1, end[2])
        );
        let datesListAsStrings = [];
        for (let date of datesList) {
            datesListAsStrings.push(formatDate(date));
        }

        try {
            if (disabledDatesList.some(date => datesListAsStrings.includes(date))) {
                setErrMsg('There is another rental created in between your chosen date range!');
                setStartDate(null);
                setEndDate(null);
            } else if (new Date(endDate) < new Date(startDate)) {
                setErrMsg('End date must be after start date!');
                setStartDate(null);
                setEndDate(null);
            } else if (!disabledDatesList.some(date => datesListAsStrings.includes(date))) {
                setErrMsg('');
                await RentalService.createRental(startDate, endDate, car_id)
                .then(
                    navigate(`/profile/${user_id}`),
                    window.location.reload()
                );
            }
        } catch (err) {
            console.log(err);
            setErrMsg('Error - could not create a rental');
        }
    };

    const handleCancel = () => {
        navigate(-1);
    };

    return (
        <>
            {!loading ? (<div className='container'>
                <br/>
                <div className="table-container">
                    <table className="table is-bordered is-striped is-narrow is-hoverable is-fullwidth">
                        <tr>
                            <th>Brand</th>
                            <th>Model</th>
                            <th>Price for 1 day</th>
                            <th>Description</th>
                        </tr>
                        <tr>
                            <td>{brand}</td>
                            <td>{model}</td>
                            <td>{price}</td>
                            <td>{description}</td>
                        </tr>
                    </table>
                </div>
                <br/>
                <form onSubmit={handleRental}>              
                    <div>Date from: </div> 
                    <input className='input' required type='date' onChange={(e) => setStartDate(e.target.value)} />
                    <br/>
                    <div>Date to: </div> 
                    <input className='input' required type='date' min={startDate} onChange={(e) => setEndDate(e.target.value)} />
                    <br/><br/>
                    <button className='button is-primary' type="submit">Rent a car</button>
                    {<div><h2 style={errMsg ? {color: 'red', fontWeight: 'bold'} : {display: 'none'}}>{errMsg}</h2></div>}
                </form>
                <br/>
                {(!isTableShown)
                    ? (carRentals.length === 0 ? <div><br/><p>This car has no occupied dates yet.</p></div> : <button className='button' onClick={() => setIsTableShown(true)}>Check which dates are occupied</button>)
                    : <button className='button' onClick={() => setIsTableShown(false)}>Hide occupied dates</button>}
                {(isTableShown && carRentals.length !== 0) &&
                    <div className="table-container">
                        <table className="table is-bordered is-striped is-narrow is-hoverable is-fullwidth">
                            <thead>
                                <th>From</th>
                                <th>To</th>
                            </thead>
                            <tbody>
                                {carRentals.map(rental => (
                                    <tr key={rental.id}>
                                        <td>{rental.rental_start}</td>
                                        <td>{rental.rental_end}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                }
                <br/><br/>
                <a onClick={handleCancel}>Go back</a>
            </div>) : <h2>Loading...</h2>}
        </>
    );
};

export default CarDetails;