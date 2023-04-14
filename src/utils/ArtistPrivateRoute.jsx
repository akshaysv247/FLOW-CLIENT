import React from 'react';
import { Navigate } from 'react-router-dom';

function ArtistPrivateRoute(props) {
  if (localStorage.getItem('artistToken')) {
    // eslint-disable-next-line react/destructuring-assignment, react/prop-types
    return props.children;
  }
  if (!localStorage.getItem('artistToken')) {
    return <Navigate to="/artist/login" />;
  }
}

export default ArtistPrivateRoute;
