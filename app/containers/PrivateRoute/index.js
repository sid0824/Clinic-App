/**
 *
 * Auth
 * Higher order component that block navigation when the user is not logged in
 * and redirect the user to login page
 * wrap your protected routes to secure your container
 *
 */

import React, { Component } from 'react';
import { Redirect, Route } from 'react-router-dom';

import auth from '../../utils/auth';

const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={props =>
      auth.getToken() !== null ? (
        <Component {...props} />
      ) : (
        <Redirect
          to={{
            pathname: '/login',
            state: { from: props.location },
          }}
        />
      )
    }
  />
);

export default PrivateRoute;
