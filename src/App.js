import React from 'react';
import { Route, Routes } from 'react-router-dom';
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
import EditProfile from './components/EditProfile';
import UserRentals from './components/UserRentals';
import CarRentals from './components/CarRentals';
import './App.css';
import 'bulma/css/bulma.min.css';
import './css/style.css';

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
          <Route path='/cars/:car_id' element={<CarDetails/>} />
        </Route>

        <Route element={<RequireAuth allowedRole='admin'/>}>
          <Route path='/carRentals/:car_id' element={<CarRentals/>} />
          <Route path='/editProfile/:id' element={<EditProfile/>} />
          <Route path='/adminPanel' element={<AdminPanel/>} />
          <Route path='/userRentals/:id' element={<UserRentals/>} />
          <Route path='/addCar' element={<AddCar/>} />
          <Route path='/editCar/:car_id' element={<EditCar/>} />
        </Route>

        <Route path='*' element={<Missing/>} />
      </Routes>
    </div>
  );
}

export default App;
