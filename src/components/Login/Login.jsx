/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable import/no-extraneous-dependencies */
import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import Avatar from '@mui/material/Avatar';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useDispatch } from 'react-redux';
import { useFormik } from 'formik';
import { userActions } from '../../Redux/Slice/UserSlice';
import Logo from '../Logo/Logo2';
import './Login.css';
import { userLogin } from '../../Api/authentication';

// eslint-disable-next-line react/prop-types
function Login() {
  const [error, setError] = useState(null);
  const Navigate = useNavigate();
  const dispatch = useDispatch();
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
        const result = await userLogin(obj);
        if (result.success) {
          localStorage.setItem('token', result.token);
          dispatch(
            userActions.setLogin({
              user: 'user',
              name: result.user.name,
              token: result.token,
              // eslint-disable-next-line no-underscore-dangle
              id: result.user._id,
              ImgURL: result?.user.ImgUrl,
            }),
          );
          toast.success(result.message);
          toast.success('Login Successful');
          Navigate('/home');
        } else {
          toast.error('Login Failed');
          setError(result.message);
        }
      } catch (err) {
        console.error(err);
        toast.error(err.message);
      }
    },
    validate: (values) => {
      const errors = {};
      if (!values.email) {
        errors.email = 'please enter a valid email';
      } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)) {
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
    <div className=" w-full min-h-screen flex items-start bg-hero2 bg-center bg-cover">
      <div className="relative w-1/2 h-screen flex-col hidden sm:flex">
        <div className="absolute top-[60px] left-[50px] flex flex-col">
          <Logo />
        </div>
        <div className="absolute top-[60%] left-[25%] flex flex-col">
          <h1 className=" text-2xl text-[#0a040b] font-extrabold ml-14">
            Get Into Flow Then Never Feel Low
          </h1>
        </div>
      </div>
      <div className="w-screen sm:w-6/12 h-screen flex items-center">
        <div className="w-full flex flex-col max-w-[450px] min-w-[250px] max-h-[550px] text-white bg-[#393da547] px-10 py-8 rounded-lg ">
          <div className="flex w-full justify-center">
            <Avatar
              sx={{
                color: 'black',
                padding: '3px',
              }}
            />
          </div>
          <div className="w-full flex flex-col mb-5">
            <h3 className="text-3xl font-semibold mb-4 text-center mt-4">
              Login
            </h3>
          </div>
          <ToastContainer />
          <form onSubmit={formik.handleSubmit}>
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
            <div>{error && <p className="text-[red]">{error}</p>}</div>
            <div className="w-full flex items-center justify-between">
              <div className="w-full flex items-center mt-5">
                {/* <input type="checkbox" className="w-4 h-4 mr-2" /> */}
                {/* <p className="text-sm">Remember Me</p> */}
              </div>
              <Link to="/ForgetPassword">
                <p className="text-sm font-medium whitespace-nowrap cursor-pointer underline underline-offset-2 mt-5 hover:text-[#e60c7d9e]">
                  Forgot Password ?
                </p>
              </Link>
            </div>
            <div className="w-full flex flex-col my-4">
              <button
                className="w-full text-[20px] font-semibold text-white bg-[#e60c7d9e] hover:shadow-lg shadow-[#070706ee] rounded-md p-2 text-center flex items-center justify-center border-2 border-teal-500 hover:bg-teal-600 hover:border-[#e60c7d9e]"
                type="submit"
                disabled={!formik.isValid}
              >
                Log in
              </button>
              <Link to="/signOps">
                <button
                  className="w-full text-white my-2 font-semibold bg-teal-600 hover:bg-[#e60c7d9e] hover:text-white hover:border-teal-600 hover:shadow-lg hover:shadow-black border-2 border-[#e60c7d9e] rounded-md p-2 text-center"
                  type="button"
                >
                  Register
                </button>
              </Link>
            </div>
          </form>
          <div className="flex items-center justify-center">
            <Link to="/artist/login">
              <p className="text-white font-extrabold font-serif">Login as an ARTIST ?</p>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
