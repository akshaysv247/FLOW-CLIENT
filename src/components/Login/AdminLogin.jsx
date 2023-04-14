/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable no-underscore-dangle */
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { useFormik } from 'formik';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { adminActions } from '../../Redux/Slice/AdminSlice';
import { adminLogin } from '../../Api/authentication';

function AdminLogin() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [error, setError] = useState(null);

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    onSubmit: async (values) => {
      const obj = {
        email: values.email,
        password: values.password,
      };
      try {
        const result = await adminLogin(obj);
        console.log(result, 'result');
        if (result.success) {
          localStorage.setItem('adminToken', result.token);
          dispatch(
            adminActions.setAdminLogin({
              admin: 'admin',
              name: result.Admin.name,
              adminToken: result.token,
              id: result.Admin._id,
              imgURL: result.Admin?.imgUrl,
            }),
          );
          toast.success('Login successful');
          navigate('/admin/home');
        } else {
          toast.error('Login Failed');
          setError(result.message);
        }
      } catch (err) {
        console.log(err);
        toast.error('Something went wrong...');
      }
    },
    validate: (values) => {
      const errors = {};
      if (!values.email) {
        errors.email = 'please enter a valid email';
      } else if (
        !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
      ) {
        errors.email = 'Invalid email address';
      }
      if (!values.password) {
        errors.password = 'please enter a valid password';
      } else if (values.password.length < 6) {
        errors.password = 'password must be atleast 6 characters';
      }
      return errors;
    },
  });
  return (
    <div className="w-screen h-screen flex justify-center items-center bg-gray-900">
      <div className="sm:w-375 md:w-375 lg:w-1/3 h-510 flex justify-center shadow-md shadow-[#ff00a293] rounded-lg p-5">
        <ToastContainer />
        <div className="w-full md:w-375 h-full text-white p-2 ">
          <h2 className="font-semibold text-3xl text-center">LOGIN</h2>
          <form className="mt-10" onSubmit={formik.handleSubmit}>
            <div className="w-full flex flex-col gap-2">
              <div className="w-full flex flex-col">
                <label htmlFor="email">Email</label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  className="bg-transparent border-b border-black text-white px-2 h-10"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.email}
                />
                {formik.touched.email && formik.errors.email ? (
                  <p className="text-red-500">{formik.errors.email}</p>
                ) : null}
              </div>
              <div className="w-full flex flex-col">
                <label htmlFor="password">Password</label>
                <input
                  id="password"
                  name="password"
                  type="password"
                  label="password"
                  className="bg-transparent border-b border-black text-white px-2 h-10"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.password}
                />
                {formik.touched.password && formik.errors.password ? (
                  <p className="text-red-500">{formik.errors.password}</p>
                ) : null}
              </div>
            </div>
            {error && <span className="text-red-800">{error}</span>}
            <div className="flex justify-center mt-10">
              <button
                className="bg-[#bc1679] w-28 h-10 rounded-xl hover:shadow-xl hover:shadow-black hover:text-black"
                type="submit"
              >
                LOGIN
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default AdminLogin;
