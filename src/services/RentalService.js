import axios from "axios";
import AuthHeader from "./AuthHeader";

const API_URL = "http://127.0.0.1:8000/rentals";

const getRentalsByCarId = (car_id) => {
    return axios.get(API_URL + `/car/${car_id}`, {'car_id': car_id});
};

const getRentalsByUser = () => {
    return axios.get(API_URL + '/user', {
        headers: AuthHeader()
    });
};

const createRental = (rental_start, rental_end, car_id) => {
    return axios.post(API_URL, {'rental_start': rental_start, 'rental_end': rental_end, 'car_id': car_id}, {
        headers: AuthHeader()
    });
};

const changeRental = async (rental_start, rental_end, car_id) => {
    return await axios.patch(API_URL, {'rental_start': rental_start, 'rental_end': rental_end, 'car_id': car_id}, {
        headers: AuthHeader()
    });
};

const stopRental = async (rental_id) => {
    return await axios.patch(API_URL + `/${rental_id}`, {'rental_id': rental_id}, {
        headers: AuthHeader()
    });
};

const RentalService = {
    getRentalsByCarId,
    getRentalsByUser,
    createRental,
    changeRental,
    stopRental
};

export default RentalService;