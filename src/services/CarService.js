import axios from "axios";
import AuthHeader from "./AuthHeader";

const API_URL = "http://127.0.0.1:8000/cars";

const getCars = (offset) => {
    return axios.get(API_URL + "?offset=" + offset);
}

const getCarById = (car_id) => {
    return axios.get(API_URL + `/${car_id}`, {'car_id': car_id});
};

const createCar = (brand, model, description, img, price) => {
    return axios.post(API_URL, {'brand': brand, 'model': model, 'description': description, 'img': img, 'price': price}, {
        headers: AuthHeader()
    });
};

const editCar = (brand, model, description, img, price) => {
    return axios.patch(API_URL, {'brand': brand, 'model': model, 'description': description, 'img': img, 'price': price}, {
        headers: AuthHeader()
    });
};

const deleteCarById = (car_id) => {
    return axios.delete(API_URL + `/${car_id}`, {'car_id': car_id}, {
        headers: AuthHeader()
    });
};

const CarService = {
    getCars,
    getCarById,
    createCar,
    editCar,
    deleteCarById
};

export default CarService;