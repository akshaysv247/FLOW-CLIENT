import React from 'react';
import { Routes, Route } from 'react-router-dom';
import AdminAddTrack from '../pages/AdminPages/AdminAddTrack';
import AdminArtistDetPage from '../pages/AdminPages/AdminArtistDetPage';
import AdminHomePage from '../pages/AdminPages/AdminHomePage';
import AdminSongs from '../pages/AdminPages/AdminSongs';
import AdminUserDetPage from '../pages/AdminPages/AdminUserDetPage';
import AdminLoginPage from '../pages/AdminPages/AdminLoginPage';
import AdminCategoryPage from '../pages/AdminPages/AdminCategoryPage';
import AddCategoryPage from '../pages/AdminPages/AddCategoryPage';
import EditCategory from '../components/AdminPagecomponents/AdminComps/EditCategory';

// import AdminPublicRoute from './utils/AdminPublicRoute';
// import AdminPrivateRoute from './utils/AdminPrivateRoute';

function AdminRoutes() {
  return (
    <Routes>
      <Route
        path="/login"
        element={
          // <AdminPublicRoute>
          <AdminLoginPage />
          // </AdminPublicRoute>
        }
      />
      <Route
        path="/home"
        element={
          // <AdminPrivateRoute>
          <AdminHomePage />
          // </AdminPrivateRoute>
        }
      />
      <Route
        path="/users"
        element={
          // <AdminPrivateRoute>
          <AdminUserDetPage />
          // </AdminPrivateRoute>
        }
      />
      <Route
        path="/artists"
        element={
          // <AdminPrivateRoute>
          <AdminArtistDetPage />
          // </AdminPrivateRoute>
        }
      />
      <Route
        path="/tracks"
        element={
          // <AdminPrivateRoute>
          <AdminSongs />
          // </AdminPrivateRoute>
        }
      />
      <Route
        path="/addTrack"
        element={
          // <AdminPrivateRoute>
          <AdminAddTrack />
          // </AdminPrivateRoute>
        }
      />
      <Route
        path="/categories"
        element={
          // <AdminPrivateRoute>
          <AdminCategoryPage />
          // </AdminPrivateRoute>
        }
      />
      <Route
        path="/add-category"
        element={
          // <AdminPrivateRoute>
          <AddCategoryPage />
          // </AdminPrivateRoute>
        }
      />
      <Route
        path="/edit-category"
        element={
          // <AdminPrivateRoute>
          <EditCategory />
          // </AdminPrivateRoute>
        }
      />
    </Routes>
  );
}

export default AdminRoutes;
