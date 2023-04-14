/* eslint-disable react/prop-types */
/* eslint-disable consistent-return */
import React, { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { validateUser } from '../Api/authentication';

function ProtectedRoute({ children }) {
  const { id } = useSelector((state) => state.user);
  const [isValid, setIsValid] = useState(false);

  useEffect(() => {
    async function validate() {
      try {
        const response = await validateUser(id);

        if (response.success === false) {
          localStorage.removeItem('token');
        }
        if (localStorage.getItem('token')) {
          console.log(localStorage.getItem('token'));
          setIsValid(true);
        } else {
          setIsValid(false);
        }
      } catch (error) {
        setIsValid(false);
      }
    }
    validate();
  }, [id]);

  return isValid ? children : <Navigate to="/" />;
}

export default ProtectedRoute;
