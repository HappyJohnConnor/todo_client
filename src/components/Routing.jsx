import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { useSelector } from 'react-redux';

export function PrivateRoute(props) {
    const {isLoggedIn} = useSelector((state) => state.auth);

    return isLoggedIn ?
        <Route {...props} /> :
        <Redirect to='/login' />
}

export function GuestRoute(props) {
    const {isLoggedIn} = useSelector((state) => state.auth);

    return isLoggedIn ?
        <Redirect to='/' /> :
        <Route {...props} />
}