import React from 'react';
import { Route, Routes } from 'react-router-dom';
import './App.css';
import 'bulma/css/bulma.min.css';
import ListOfCars from './components/ListOfCars';
import HeaderComponent from './components/HeaderComponent';
import SignUp from './components/SignUp';
import Login from './components/Login';
import AddCar from './components/AddCar';
import Missing from './components/Missing';
import Unauthorized from './components/Unauthorized';
import AdminPanel from './components/AdminPanel';
import RequireAuth from './components/RequireAuth';
import UserProfile from './components/UserProfile';
import CarDetails from './components/CarDetails';
import EditCar from './components/EditCar';
import EditRental from './components/EditRental';
import EditProfile from './components/EditProfile';

function App() {

  return (
    <div className="App">
      <HeaderComponent />
      <Routes>
        <Route path='/' exact element={<ListOfCars/>} />
        <Route path='/cars' exact element={<ListOfCars/>} />
        <Route path='/users/register' element={<SignUp/>} />
        <Route path='/users/login' element={<Login/>} />
        <Route path='/unauthorized' element={<Unauthorized/>} />
        <Route path='/profile/:id' element={<UserProfile/>} />

        <Route element={<RequireAuth allowedRole='regular_user'/>}>
          <Route path='/editProfile/:id' element={<EditProfile/>} />
          <Route path='/cars/:car_id' element={<CarDetails/>} />
        </Route>

        <Route element={<RequireAuth allowedRole='admin'/>}>
          <Route path='/adminPanel' element={<AdminPanel/>} />
          <Route path='/addCar' element={<AddCar/>} />
          <Route path='/editCar/:car_id' element={<EditCar/>} />
          <Route path='/editRental/:rental_id' element={<EditRental/>} />
        </Route>

        <Route path='*' element={<Missing/>} />
      </Routes>
    </div>
  );
}

export default App;
