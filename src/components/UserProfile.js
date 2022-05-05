import React, { useState, useEffect, useContext } from 'react';
import 'bulma/css/bulma.min.css';
import RentalService from '../services/RentalService';
import { useNavigate, useParams } from 'react-router-dom';
import UserService from '../services/UserService';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";

const UserProfile = () => {

    const [rentals, setRentals] = useState([]);
    const navigate = useNavigate();

    const { id } = useParams();

    const [name, setName] = useState('');
    const [surname, setSurname] = useState('');

    const [isDatePickerShown, setIsDatePickerShown] = useState(false);
    const [startDate, setStartDate] = useState(new Date());
    const [endDate, setEndDate] = useState(null);

    const disableButton = (end_date) => {
        let today = new Date();
        if (today >= new Date(end_date)) {
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

    const handleRentalChange = () => {
        const start = formatDate(startDate);
        const end = formatDate(endDate);
        RentalService.changeRental(start, end).then(res => console.log(res));
    };

    const datePickerChangeHandler = (dates) => {
        const [start, end] = dates;
        setStartDate(start);
        setEndDate(end);
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

    useEffect(() => {
        UserService.getUserById(id).then((res) => {
            console.log(res.data);
            setName(res.data.name);
            setSurname(res.data.surname);
        });
    }, []);

    useEffect(() => {
        RentalService.getRentalsByUser().then((res) => {
            console.log(res);
            setRentals(res.data);
        });
    }, []);

    const goToEditUserForm = (user_id) => {
        navigate(`/editProfile/${user_id}`);
    };

    const toggleDatePicker = () => {
        setIsDatePickerShown(!isDatePickerShown);
    };

    return (
        <div>
            <h1><strong>{name + ' ' + surname}</strong></h1>
            <br/>
            <a className="button is-primary" onClick={() => goToEditUserForm(id)}>Edit profile</a>
            <br/><br/>
            <h2>My Rentals:</h2>
            <br/>
            <div className="table-container">
                <table className="table is-bordered is-striped is-narrow is-hoverable is-fullwidth">
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
                                    {!isDatePickerShown 
                                        ? <button className="button is-primary" onClick={toggleDatePicker}>Change Rental</button> 
                                        : <button onClick={toggleDatePicker}>Cancel</button>}
                                    {isDatePickerShown && 
                                        <DatePicker 
                                            dateFormat="yyyy/dd/MM"
                                            selected={startDate} 
                                            closeOnScroll={true}
                                            placeholderText='Click here'
                                            //excludeDates={getDisabledDates}
                                            onChange={datePickerChangeHandler}
                                            selectsRange
                                        />
                                    }
                                    {!isDatePickerShown 
                                        ?   <button 
                                                className="button is-danger" 
                                                disabled={disableButton(rental.rental_end)} 
                                                onClick={() => stopRental(rental.id)}>
                                                    Stop Rental
                                            </button>
                                        :   <button 
                                                className="button is-primary" 
                                                onClick={handleRentalChange}>
                                                    Change Rental
                                            </button>}
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