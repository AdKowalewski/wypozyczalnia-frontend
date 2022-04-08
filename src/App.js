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

const ROLES = {
  User: 'regular_user',
  Admin: 'admin'
}

function App() {

  return (
    <div className="App">
      <HeaderComponent/>
      <Routes>
        <Route path='/' exact element={<ListOfCars/>} />
        <Route path='/cars' element={<ListOfCars/>} />
        <Route path='/cars/:car_id' element={<CarDetails/>} />
        <Route path='/users/register' element={<SignUp/>} />
        <Route path='/users/login' element={<Login/>} />
        <Route path='/unauthorized' element={<Unauthorized />} />

        <Route path='/profile' element={<UserProfile/>} />

        <Route element={<RequireAuth allowedRoles={[ROLES.User, ROLES.Admin]}/>}>
          <Route path='/profile' element={<UserProfile/>} />
        </Route>

        <Route element={<RequireAuth allowedRoles={[ROLES.Admin]}/>}>
          <Route path='/addCar' element={<AddCar/>} />
        </Route>

        <Route element={<RequireAuth allowedRoles={[ROLES.Admin]}/>}>
          <Route path='/addCar' element={<AdminPanel/>} />
        </Route>

        <Route path='*' element={<Missing />} />
      </Routes>
    </div>
  );
}

export default App;
