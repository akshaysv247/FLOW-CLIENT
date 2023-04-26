/* eslint-disable consistent-return */
import axios from '../Axios/Axios';

export const artistLogin = async (obj) => {
  try {
    const response = await axios.post('/artist/login', obj);
    const { data } = response;
    if (data) {
      return data;
    }
  } catch (error) {
    return error.response.data.error;
  }
};

export const SignupArtist = async (obj) => {
  try {
    const response = await axios.post('/artist/signup', obj);
    const { data } = response;
    if (data) {
      return data;
    }
  } catch (error) {
    return error.response.data.error;
  }
};

export const adminLogin = async (obj) => {
  try {
    const response = await axios.post('/admin/login', obj);
    const { data } = response;
    if (data) {
      return data;
    }
  } catch (error) {
    return error.response.data.error;
  }
};

export const userLogin = async (obj) => {
  try {
    const response = await axios.post('/login', obj);
    const { data } = response;
    if (data) {
      return data;
    }
  } catch (error) {
    return error.response.data.error;
  }
};

export const userSignup = async (obj) => {
  try {
    const response = await axios.post('/signup', obj);
    const { data } = response;
    if (data) {
      return data;
    }
  } catch (error) {
    return error.response.data.error;
  }
};

export const resetPassword = async (datas, role, email) => {
  try {
    const response = await axios.post('/reset-password', { datas, role, email });
    const { data } = response;
    console.log(data, 'dat');
    if (data) {
      return data;
    }
  } catch (error) {
    return error.response.data.error;
  }
};

export const validateUser = async (id) => {
  try {
    const response = await axios.get(`/validate/${id}`);
    const { data } = response;
    if (data) {
      return data;
    }
  } catch (error) {
    return error.response.data.error;
  }
};
