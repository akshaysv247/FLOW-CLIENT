import React from 'react';
import { Navigate } from 'react-router-dom';

function PublicRoute(props) {
  if (!localStorage.getItem('token')) {
    // eslint-disable-next-line react/destructuring-assignment, react/prop-types
    return props.children;
  }
  if (localStorage.getItem('token')) {
    return <Navigate to="/home" />;
  }
}

export default PublicRoute;
