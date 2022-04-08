import axios from "axios";
import AuthHeader from "./AuthHeader";

const API_URL = "http://127.0.0.1:8000/users";

const getUsers = (skip = 0, limit = 100) => {
    return axios.get(API_URL + "?skip=" + skip + "&limit=" + limit, {
        headers: AuthHeader()
    });
};

const editUser = (email, name, surname, password) => {
    return axios.post(API_URL, {'email': email, 'name': name, 'surname': surname, 'password': password}, {
        headers: AuthHeader()
    });
};

const deleteUsers = () => {
    return axios.delete(API_URL, {
        headers: AuthHeader()
    });
};

const deleteUserById = (user_id) => {
    return axios.delete(API_URL + '/' + {user_id}, {'user_id': user_id}, {
        headers: AuthHeader()
    });
};

const UserService = {
    getUsers,
    editUser,
    deleteUsers,
    deleteUserById
};

export default UserService;