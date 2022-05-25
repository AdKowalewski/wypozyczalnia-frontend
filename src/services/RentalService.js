import axios from "axios";
import AuthHeader from "./AuthHeader";

const API_URL = "http://127.0.0.1:8000/rentals";

const getCarActiveRentals = (car_id) => {
    return axios.get(API_URL + `/car/${car_id}/active`);
};

const getCarAllRentals = (car_id) => {
    return axios.get(API_URL + `/car/${car_id}`, {
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
    return axios.get(API_URL + `/unpaid`, {
        headers: AuthHeader()
    });
};

const getUserUnreturnedRentals = () => {
    return axios.get(API_URL + `/unreturned`, {
        headers: AuthHeader()
    });
};

const payRental = (rental_id) => {
    return axios.get(API_URL + `/pay/${rental_id}`, {
        headers: AuthHeader()
    });
};

const returnRental = (rental_id) => {
    return axios.get(API_URL + `/${rental_id}/return`, {
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
    return axios.delete(API_URL + `/${rental_id}`, {
        headers: AuthHeader()
    });
};

const RentalService = {
    getCarActiveRentals,
    getCarAllRentals,
    getAllUserRentals,
    getUserActiveRentals,
    getUserUnpaidRentals,
    getUserUnreturnedRentals,
    payRental,
    createRental,
    changeRental,
    stopRental,
    returnRental
};

export default RentalService;