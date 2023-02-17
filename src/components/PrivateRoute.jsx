import React, { useContext } from 'react';
import { AuthContext } from '../context/auth';
import { Navigate, Outlet } from 'react-router-dom';

const PrivateRoute = ({ component: Component, ...props }) => {
	const { user } = useContext(AuthContext);
	return (
		 user ? <Outlet  {...props} /> : <Navigate to="/signin" />
	);
};

export default PrivateRoute;
