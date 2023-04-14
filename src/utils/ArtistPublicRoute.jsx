import React from 'react';
import { Navigate } from 'react-router-dom';

function ArtistPublicRoute(props) {
  if (!localStorage.getItem('artistToken')) {
    // eslint-disable-next-line react/prop-types, react/destructuring-assignment
    return props.children;
  }
  if (localStorage.getItem('artistToken')) {
    return <Navigate to="/artist/home" />;
  }
}

export default ArtistPublicRoute;
