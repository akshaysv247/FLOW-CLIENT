import React from 'react';
import { Navigate } from 'react-router-dom';

function AdminPublicRoute(props) {
  if (!localStorage.getItem('adminToken')) {
    // eslint-disable-next-line react/destructuring-assignment, react/prop-types
    return props.children;
  }
  if (localStorage.getItem('adminToken')) {
    return <Navigate to="/admin/home" />;
  }
}

export default AdminPublicRoute;
