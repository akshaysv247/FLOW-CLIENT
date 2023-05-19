/* eslint-disable no-shadow */
/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable import/no-extraneous-dependencies */
import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import Button from '@mui/material/Button';
import toast, { Toaster } from 'react-hot-toast';
import { RecaptchaVerifier, signInWithPhoneNumber } from 'firebase/auth';
import { Auth } from '../../Config/firebase.config';
import { getPhone, resetPassword } from '../../Api/authentication';

function ResetPassword() {
  const [otpVerified, SetOtpVerified] = useState(false);
  const [error, setError] = useState('');
  // const [emailErr, setEmailErr] =
  const [res, setRes] = useState(false);
  const [vOtp, setVotp] = useState(false);
  const [gotOtp, setGotOtp] = useState(false);
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [role, setRole] = useState('fan');
  const [minutes, setMinutes] = useState(1);
  const [seconds, setSeconds] = useState(30);
  const navigate = useNavigate();

  const {
    register, handleSubmit, formState: { errors }, watch,
  } = useForm();
  const password = useRef({});
  password.current = watch('password', '');

  // eslint-disable-next-line no-shadow
  async function setUpRecaptcha(phone) {
    try {
      const recaptchaVerifier = new RecaptchaVerifier(
        'recaptcha-seeker-container',
        {},
        Auth,
      );
      console.log(phone);
      recaptchaVerifier.render();

      const ress = await signInWithPhoneNumber(Auth, `+91${phone}`, recaptchaVerifier);
      console.log(ress, 're');
      if (ress) {
        setGotOtp(true);
        setRes(ress);
        const element = document.getElementById('recaptcha-seeker-container');
        element.style.display = 'none';
        // document.getElementById('recaptcha-seeker-container').style.display = 'none';
      }
    } catch (error) {
      console.log(error.message);
      toast(error.message);
    }
  }
  async function setResendRecaptcha(phone) {
    try {
      const recaptchaVerifier = new RecaptchaVerifier(
        'recaptcha-seeker-container-2',
        {},
        Auth,
      );
      recaptchaVerifier.render();
      const ress = await signInWithPhoneNumber(Auth, `+91${phone}`, recaptchaVerifier);
      if (ress) {
        setRes(ress);
        const element = document.getElementById('recaptcha-seeker-container-2');
        element.style.display = 'none';
      }
    } catch (error) {
      console.log(error);
    }
  }

  const validateEmail = (email) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  };

  const handleVerify = async (e) => {
    e.preventDefault();
    if (email) {
      const isValid = validateEmail(email);
      console.log(isValid, 'valid');
      if (isValid) {
        const result = await getPhone(email);
        console.log(result, 'phoneress');
        if (result.success) {
          setPhone(result.phoneNo);
          // setGotOtp(true);
          setUpRecaptcha(result.phoneNo);
        }
        setError(result.message);
        toast(result.message);
      } else {
        setError('Please give a valid email');
      }
    } else {
      setError('please provide a valid email address or phone number');
    }
  };
  const handleVerificationOtp = async () => {
    try {
      await res.confirm(vOtp).then((result) => {
        console.log(result, 'otp verified');
        toast.success(result.message);
        SetOtpVerified(true);
      });
    } catch (err) {
      console.log(err.message);
      toast.error(err.message);
    }
  };
  const resetthePassword = async (data) => {
    if (data && role) {
      const result = await resetPassword(data, role, email);
      console.log(result, 'resss');
      if (result.success) {
        toast.success(result.message);
        navigate('/');
      } else {
        toast.error(result.message);
      }
    }
  };
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

  const validatePasswordMatch = (value) => {
    if (value === password.current) {
      return true;
    }
    return false;
  };
  const resendOTP = () => {
    // console.log(recaptcha);
    console.log(phone);
    setResendRecaptcha(phone);
    setMinutes(1);
    setSeconds(30);
    // setRecaptcha(true);
  };

  return (
    <div className="w-[100vw] h-[100vh] bg-hero flex justify-center items-center bg-cover bg-center">
      <Toaster
        position="bottom-center"
        reverseOrder={false}
      />
      {otpVerified
        ? (
          <div>
            <form onSubmit={handleSubmit(resetthePassword)} className="w-508 h-510 bg-[#ff00e1b6] flex flex-col justify-center p-10 rounded-lg hover:ease-in-out transition-all">
              <h1 className="text-3xl text-center font-extrabold">Enter Your New Password</h1>
              <div className="w-full flex flex-col mt-2">
                <h1 className="text-white">Password:</h1>
                <input
                  type="password"
                  placeholder="Enter Password"
                  className="w-full rounded-md border border-[#e727ca] p-2 outline-none"
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
                {errors?.password && <span className="text-[red]">{errors.password.message}</span>}
              </div>
              <div className="w-full flex flex-col mt-2">
                <h1 className="text-white">Confirm Password:</h1>
                <input
                  type="password"
                  placeholder="Enter your password"
                  className="w-full rounded-md border border-[#e727ca] p-2 outline-none"
                  {...register('ConfirmPassword', {
                    required: 'Please confirm your password',
                    validate: validatePasswordMatch,
                  })}
                />
                {errors.ConfirmPassword && errors.ConfirmPassword.type === 'required' && (
                <p className="text-black-800">Confirm Password is required</p>
                )}
                {errors.ConfirmPassword && errors.ConfirmPassword.type === 'validate' && (
                <p className="text-black-800">Passwords do not match</p>
                )}
              </div>
              <div className="flex flex-col w-full justify-center mt-3 items-center">
                <h1 className="text-xl font-semibold">Select Your Role</h1>
                <label htmlFor="Role">
                  {/* Role: */}
                  <select value={role} onChange={(e) => setRole(e.target.value)} className="w-32 bg-[#1616e2] rounded-md p-2 text-white">
                    <option value="fan">Fan</option>
                    <option value="artist">Artist</option>
                  </select>
                </label>
              </div>
              <button type="submit" className="bg-[#001944] mt-5 h-10 rounded-lg text-white font-semibold hover:bg-[blue]">RESET</button>
            </form>
          </div>
        )
        : (
          <form className="w-508 h-510 bg-[#ff00e1b6] flex flex-col justify-center p-10 rounded-lg hover:ease-in-out transition-all" onSubmit={handleVerify}>
            <h1 className="text-2xl font-extrabold text-center">Verify Your Account</h1>
            <hr />
            <div className="flex flex-col justify-center">
              <h1 className="text-xl font-bold mt-3">Enter Your Email Address</h1>
              <input
                type="email"
                className="h-10 w-full rounded-md outline-none"
                placeholder="Enter your email address here"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required="false"
              />
              { error && <span className="text-grey-800">{error}</span>}
              <div id="recaptcha-seeker-container" className="mt-3" />
              {
              gotOtp && (
                <div className="w-full flex-col justify-center">
                  <h1 className="text-xl font-bold mt-3">Enter the OTP we send</h1>
                  <input
                    type="number"
                    className="h-10 w-full rounded-md mt-3 outline-none"
                    placeholder="Enter your OTP here"
                    value={vOtp}
                    onChange={(e) => setVotp(e.target.value)}
                  />
                  <div className="flex w-full justify-between items-center mt-2">
                    {seconds > 0 || minutes > 0 ? (
                      <p style={{ fontSize: '12px' }}>
                        Time Remaining:
                        {' '}
                        {minutes < 10 ? `0${minutes}` : minutes}
                        :
                        {seconds < 10 ? `0${seconds}` : seconds}
                      </p>
                    ) : ''}
                    { (!seconds > 0 && !minutes > 0) && (
                    <Button
                      className="w-full bg-blue hover:shadow-black hover:shadow-md"
                      onClick={resendOTP}
                      variant="contained"
                    >
                      Resend OTP
                    </Button>
                    )}
                  </div>
                  <div id="recaptcha-seeker-container-2" className="mt-3" />
                  <button type="button" className="w-full bg-[#001944] mt-3 h-10 rounded-lg text-white font-semibold hover:bg-[blue]" onClick={handleVerificationOtp}>Verify</button>
                </div>
              )
            }
              {!gotOtp && <button type="submit" className="bg-[#001944] mt-3 h-10 rounded-lg text-white font-semibold hover:bg-[blue]">SEND OTP</button>}
            </div>
          </form>
        )}
    </div>
  );
}

export default ResetPassword;
