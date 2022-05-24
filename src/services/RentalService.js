import axios from "axios";
import AuthHeader from "./AuthHeader";

const API_URL = "http://127.0.0.1:8000/rentals";

const getRentalsByCarId = (car_id) => {
    return axios.get(API_URL + `/car/${car_id}`);
};

const getCarAllRentalsById = (car_id) => {
    return axios.get(API_URL + `/car/${car_id}/all`, {
        headers: AuthHeader()
    });
};

const getAllUserRentals = (user_id) => {
    return axios.get(API_URL + `/user/${user_id}`, {
        headers: AuthHeader()
    });
};

const getUserActiveRentals = () => {
    return axios.get(API_URL, {
        headers: AuthHeader()
    });
};

const getUserUnpaidRentals = () => {
    return axios.get(API_URL + '/unpaid', {
        headers: AuthHeader()
    });
};

const payRental = (rental_id) => {
    return axios.get(API_URL + `/pay/${rental_id}`, {
        headers: AuthHeader()
    });
};

const createRental = (rental_start, rental_end, car_id) => {
    return axios.post(API_URL, {'rental_start': rental_start, 'rental_end': rental_end, 'car_id': car_id}, {
        headers: AuthHeader()
    });
};

const changeRental = (rental_start, rental_end) => {
    return axios.patch(API_URL, {'rental_start': rental_start, 'rental_end': rental_end}, {
        headers: AuthHeader()
    });
};

const stopRental = (rental_id) => {
    return axios.patch(API_URL + `/${rental_id}`, {'rental_id': rental_id}, {
        headers: AuthHeader()
    });
};

const RentalService = {
    getRentalsByCarId,
    getCarAllRentalsById,
    getAllUserRentals,
    getUserActiveRentals,
    getUserUnpaidRentals,
    payRental,
    createRental,
    changeRental,
    stopRental
};

export default RentalService;