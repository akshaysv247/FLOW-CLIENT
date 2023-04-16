/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable no-underscore-dangle */
import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import Avatar from '@mui/material/Avatar';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useFormik } from 'formik';
import { useDispatch } from 'react-redux';
import { artistAcions } from '../../Redux/Slice/ArtistSlice';
import Logo from '../Logo/Logo2';
import { artistLogin } from '../../Api/authentication';

function ArtistLogin() {
  const [error, setError] = useState('');
  const navigate = useNavigate();
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
        const result = await artistLogin(obj);
        console.log(result);
        if (result.success) {
          localStorage.setItem('artistToken', result.token);
          dispatch(
            artistAcions.setArtistLogin({
              artist: 'artist',
              name: result.artist.name,
              artistToken: result.token,
              id: result.artist._id,
              ImgURL: result?.artist.ImgUrl,
              email: result?.artist.email,
            }),
          );
          navigate('/artist/home');
        } else {
          toast.error('Login Failed');
          setError(result.message);
        }
      } catch (err) {
        toast.error('Ivalid Password or email');
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
    <div className=" w-full h-screen flex items-start bg-hero1">
      <div className="relative w-1/2 h-screen flex flex-col">
        <div className="absolute top-24 left-20 flex flex-col">
          <Logo />
        </div>
        <div className="absolute top-[60%] left-[25%] flex flex-col">
          <h1 className=" text-2xl text-[#000000] font-extrabold mt-5">
            Get Into Flow Then Never Feel Low
          </h1>
        </div>
      </div>
      <div className="w-1/2 h-screen flex flex-col pt-[130px]">
        <ToastContainer />
        <div className="w-full flex flex-col max-w-[450px] max-h-[550px] text-white bg-[#393da547] px-10 py-8 rounded-lg">
          <Avatar
            sx={{
              color: 'black',
              padding: '3px',
              marginLeft: '168px',
            }}
          />
          <div className="w-full flex flex-col mb-5">
            <h3 className="text-3xl font-semibold mb-4 text-center mt-4">
              Login
            </h3>
          </div>
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
            <div className="w-full flex items-center justify-between">
              <div className="w-full flex items-center mt-5">
                {/* <input type="checkbox" className="w-4 h-4 mr-2" />
                <p className="text-sm">Remember Me</p> */}
              </div>
              <Link to="/ForgetPassword">
                <p className="text-sm font-medium whitespace-nowrap cursor-pointer underline underline-offset-2 mt-5 hover:text-[blue]">
                  Forgot Password ?
                </p>
              </Link>
            </div>
            { error && <div className="text-[red]">{ error }</div>}
            <div className="w-full flex flex-col my-4">
              <button
                className="w-full text-[20px] font-semibold text-white bg-[#e60c7d9e] hover:shadow-lg shadow-[#070706ee] rounded-md p-2 text-center flex items-center justify-center border-2 border-teal-500 hover:bg-teal-600 hover:border-[#e60c7d9e]"
                type="submit"
              >
                Log in
              </button>
              <Link to="/signOps">
                <button
                  className="w-full text-white my-2 font-semibold bg-teal-600 hover:bg-[#e60c7d9e] hover:text-white hover:border-teal-600 hover:shadow-lg hover:shadow-black border-2 border-[#e60c7d9e] rounded-md p-2 text-center "
                  type="button"
                >
                  Register
                </button>
              </Link>
            </div>
          </form>
          <div className="flex items-center justify-center">
            <Link to="/">
              <p className="text-black font-serif">Login as an FAN ?</p>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ArtistLogin;
