/* eslint-disable no-shadow */
/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable import/no-extraneous-dependencies */
import React, { useState, useRef, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import toast, { Toaster } from 'react-hot-toast';
import Button from '@mui/material/Button';
import { RecaptchaVerifier, signInWithPhoneNumber } from 'firebase/auth';
import VerifiedIcon from '@mui/icons-material/Verified';
import { Auth } from '../../Config/firebase.config';
import Logo from '../Logo/Logo2';
import { SignupArtist } from '../../Api/authentication';

function artistSignup() {
  const {
    register, handleSubmit, formState: { errors }, watch,
  } = useForm();

  const password = useRef({});
  password.current = watch('password', '');
  const [otp, setOtp] = useState(false);
  const [vOtp, setVOtp] = useState('');
  const [res, setRes] = useState('');
  const [verified, setVerified] = useState(false);
  const [phone, setPhone] = useState('');
  const [minutes, setMinutes] = useState(1);
  const [seconds, setSeconds] = useState(30);

  const [resError, setResError] = useState(null);

  const navigate = useNavigate();
  useEffect(() => {
    const interval = setInterval(() => {
      if (seconds > 0) {
        setSeconds(seconds - 1);
      }

      if (seconds === 0) {
        if (minutes === 0) {
          clearInterval(interval);
        } else {
          setSeconds(59);
          setMinutes(minutes - 1);
        }
      }
    }, 1000);

    return () => {
      clearInterval(interval);
    };
  }, [seconds]);

  const handleRegistration = async (data) => {
    const obj = {
      name: data.name,
      email: data.email,
      password: data.password,
      phone: data.phone,
    };
    try {
      if (data && verified) {
        const response = await SignupArtist(obj);
        console.log(response, 'res');
        if (response.success) {
          setResError(response.message);
          toast(response.message);
          navigate('/artist/login');
        } else {
          setResError(response.message);
          toast(response.message);
        }
      } else {
        setResError('plases fill all the fields properly');
      }
    } catch (err) {
      setResError('Something went wrong');
    }
  };

  function setUpRecaptcha(phone) {
    console.log(phone);
    const recaptchaVerifier = new RecaptchaVerifier(
      'recaptcha-seeker-container',
      {},
      Auth,
    );
    recaptchaVerifier.render();
    signInWithPhoneNumber(Auth, `+91${phone}`, recaptchaVerifier).then((response) => {
      setRes(response);
    });
  }
  const handleVerification = () => {
    try {
      setUpRecaptcha(phone);
      setOtp(true);
      toast.success('OTP has been sent successfully');
    } catch (error) {
      console.log(error.message);
      toast.error(error.message);
    }
  };
  const handleVerificationOtp = async () => {
    try {
      await res.confirm(vOtp).then((result) => {
        console.log(result);
        toast.success(result.message);
        setVerified(true);
      });
    } catch (error) {
      console.log(error.message);
      toast.error(error.message);
    }
  };
  const resendOTP = () => {
    console.log('gd');
    setUpRecaptcha(phone);
  };

  const validatePasswordMatch = (value) => {
    const passwordFieldValue = watch('password');
    return value === passwordFieldValue || 'Passwords do not match';
  };
  return (
    <div className="w-screen h-[900px] grid grid-cols-2 bg-hero2 bg-cover bg-center">
      <div className="justify-center w-1/screen h-screen items-center hidden sm:flex">
        <Logo />
      </div>
      <div className="w-screen sm:w-6/12 h-fit sm:h-screen flex justify-center items-center">
        <Toaster position="bottom-center" reverseOrder={false} />
        <form
          onSubmit={handleSubmit(handleRegistration)}
          className="w-full max-w-sm min-w-[300px] p-6 h-fit max-h-fit bg-[#5408e17b] rounded-lg shadow-lg shadow-[#b908e1fb]"
        >
          <h3 className="text-4xl text-white font-bold  text-center">
            Sign Up
          </h3>
          <div className="w-full flex flex-col mt-5">
            <h1 className="text-white">Name:</h1>
            <input
              type="text"
              placeholder="Enter Name"
              className="w-full rounded-md border border-[#e727ca] p-2"
              {...register('name', {
                required: 'Fill this field with your name',
                maxLength: {
                  value: 20,
                  message: 'Username cannot exceed 20 characters',
                },
                minLength: {
                  value: 4,
                  message: 'Username must be at least 4 characters',
                },
              })}
            />
            {errors?.name && (
              <span className="text-[red]">{errors.name.message}</span>
            )}
          </div>
          <div className="w-full flex flex-col mt-2">
            <h1 className="text-white">Email Address:</h1>
            <input
              type="email"
              placeholder="Enter your email address"
              className="w-full rounded-md border border-[#e727ca] p-2"
              {...register('email', {
                required: 'Fill this field with your email address',
                minLength: {
                  value: 6,
                  message: 'Email must be at least 6 characters',
                },
                pattern: {
                  value: /\S+@\S+\.\S+/,
                  message: 'Invalid email address',
                },
              })}
            />
            {errors?.email && (
              <span className="text-[red]">{errors.email.message}</span>
            )}
          </div>
          <h1 className="text-white">Phone Number:</h1>
          <div className="w-full mt-2 flex justify-center gap-2">
            <input
              type="number"
              placeholder="Enter Phone Number"
              className="w-full rounded-md border border-[#e727ca] p-2"
              {...register('phone', {
                required: 'Fill this field with a valid phone number.',
                maxLength: {
                  value: 12,
                  message: 'Phone number cannot exceed 12 characters',
                },
                minLength: {
                  value: 10,
                  message: 'Phone number must be at least 10 characters',
                },
              })}
              onChange={(e) => setPhone(e.target.value)}
            />
            {phone.length >= 10 && (
              <button
                type="button"
                className="bg-[#0800ff] text-white w-20 h-10 rounded-lg p-2 "
                onClick={handleVerification}
              >
                Confirm
              </button>
            )}
          </div>
          {errors?.phone && (
            <span className="text-[red]">{errors.phone.message}</span>
          )}
          <div id="recaptcha-seeker-container" />
          {otp && (
            <div>
              <h1 className="text-white">Enter Otp:</h1>
              <div className="w-full mt-2 flex flex-col justify-center">
                <div className="w-full flex gap-3 justify-center">
                  <input
                    type="text"
                    placeholder="Enter Otp"
                    className="w-full rounded-md border border-[#e727ca] p-2"
                    onChange={(e) => setVOtp(e.target.value)}
                  />
                  {!verified ? (
                    <button
                      type="button"
                      className="bg-[#0800ff] text-white w-20 h-10 rounded-lg p-2 "
                      onClick={handleVerificationOtp}
                    >
                      VERIFY
                    </button>
                  ) : (
                    <VerifiedIcon className="text-[blue] w-16 h-14" />
                  )}
                </div>
                <div className="flex w-full items-center mt-2">
                  {seconds > 0 || minutes > 0 ? (
                    <p className="text-xl text-black">
                      Time Remaining:
                      {minutes < 10 ? `0${minutes}` : minutes}
                      :
                      {seconds < 10 ? `0${seconds}` : seconds}
                    </p>
                  ) : (
                    ''
                  )}

                  {!seconds > 0 && !minutes > 0 && (
                    <Button
                      className="w-full bg-blue"
                      onClick={resendOTP}
                      variant="contained"
                    >
                      Resend OTP
                    </Button>
                  )}
                </div>
              </div>
            </div>
          )}
          <div className="w-full flex flex-col mt-2">
            <h1 className="text-white">Password:</h1>
            <input
              type="password"
              placeholder="Enter Password"
              className="w-full rounded-md border border-[#e727ca] p-2"
              {...register('password', {
                required: 'Fill this field with valid password',
                minLength: {
                  value: 6,
                  message: 'Password must be at least 6 characters',
                },
                pattern: {
                  value: /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{6,}$/,
                  message:
                    'Password must contain at least one uppercase letter, one lowercase letter, one number, and be at least 6 characters long',
                },
              })}
            />
            {errors?.password && (
              <span className="text-[red]">{errors.password.message}</span>
            )}
          </div>
          <div className="w-full flex flex-col mt-2">
            <h1 className="text-white">Confirm Password:</h1>
            <input
              type="password"
              placeholder="Enter your password"
              className="w-full rounded-md border border-[#e727ca] p-2"
              {...register('ConfirmPassword', {
                required: 'Please confirm your password',
                validate: validatePasswordMatch,
              })}
            />
            {errors?.ConformPassword && (
              <span className="text-[red]">
                {errors.ConfirmPassword.message}
              </span>
            )}
          </div>
          {resError && <div className="text-[red]">{resError}</div>}
          <div className="w-full flex flex-col my-4 mt-5">
            <div id="recaptcha-seeker-container" />
            <button
              className="w-full text-[20px] font-semibold text-white bg-[#d036afb1] hover:shadow-lg shadow-[#070706ee] rounded-md p-2 text-center flex items-center justify-center border-2 border-black hover:bg-gray-900 hover:border-[#fff6fb9e]"
              type="submit"
            >
              Register
            </button>
            <hr className="mt-5 text-red-900" />
            <Link to="/">
              <button
                className="w-full text-black my-2 font-semibold bg-[#e82ca9bc] hover:bg-gray-900 hover:text-white hover:border-white hover:shadow-lg hover:shadow-black border-2 border-black rounded-md p-2 text-center"
                type="button"
              >
                Log in
              </button>
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}

export default artistSignup;
