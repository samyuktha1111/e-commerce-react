import React from 'react'
import { Navigate } from 'react-router-dom';
const PrivateRoute=({ children, ...rest })=>{
const person = JSON.parse(localStorage.getItem('login'));


	return !person ? <Navigate to="/user" /> : children;
}
export default PrivateRoute
