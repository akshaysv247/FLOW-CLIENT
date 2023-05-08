import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useSelector } from 'react-redux';

export function UserProtectedRoute() {
  const { token } = useSelector((state) => state.user);
  return token ? <Outlet /> : <Navigate to="/" />;
}

export function ArtistProtectedRoute() {
  const { artistToken } = useSelector((state) => state.artist);
  return artistToken ? <Outlet /> : <Navigate to="/artist/login" />;
}

export function AdminProtectedRoute() {
  const { adminToken } = useSelector((state) => state.admin);
  return adminToken ? <Outlet /> : <Navigate to="/admin/login" />;
}
