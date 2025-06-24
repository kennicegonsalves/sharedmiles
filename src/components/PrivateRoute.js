// import react.
import React from 'react';
// import react router.
import { Route, Navigate } from 'react-router-dom';

const PrivateRoute = ({ component: Component, ...rest }) => {
    return (
        <Route {...rest} element={
            localStorage.getItem('auth') ? <Component {...rest} /> : <Navigate to="/login" />
        } />
    );
};

export default PrivateRoute;
