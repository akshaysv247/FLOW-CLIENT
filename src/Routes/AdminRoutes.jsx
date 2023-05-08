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

import { AdminProtectedRoute } from '../utils/ProtectedRoute';
import AdminCopyrights from '../pages/AdminPages/AdminCopyrights';

function AdminRoutes() {
  return (
    <Routes>
      <Route
        path="/login"
        element={
          <AdminLoginPage />
        }
      />
      <Route element={(<AdminProtectedRoute />)}>
        <Route
          path="/home"
          element={
            <AdminHomePage />
        }
        />
        <Route
          path="/users"
          element={
            <AdminUserDetPage />
        }
        />
        <Route
          path="/artists"
          element={
            <AdminArtistDetPage />
        }
        />
        <Route
          path="/tracks"
          element={
            <AdminSongs />
        }
        />
        <Route
          path="/addTrack"
          element={
            <AdminAddTrack />
        }
        />
        <Route
          path="/categories"
          element={
            <AdminCategoryPage />
        }
        />
        <Route
          path="/add-category"
          element={
            <AddCategoryPage />
        }
        />
        <Route
          path="/edit-category"
          element={
            <EditCategory />
        }
        />
        <Route
          path="/copyrights"
          element={
            <AdminCopyrights />
        }
        />
      </Route>
    </Routes>
  );
}

export default AdminRoutes;
