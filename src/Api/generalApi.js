/* eslint-disable consistent-return */
/* eslint-disable import/prefer-default-export */
import axios from '../Axios/Axios';

export const getCommonSongs = async () => {
  try {
    const response = await axios.get('/get-common-songs');
    const { data } = response;
    if (data) {
      return data;
    }
  } catch (error) {
    console.log(error);
  }
};

export const getCategory = async () => {

};

export const getLanguages = async () => {
  try {
    const response = await fetch('https://api.codetabs.com/v1/loc/iso_639-1.json');
    const { data } = response.json();
    console.log(data);
    if (data) {
      return data;
    }
  } catch (error) {
    return error.response.data.error;
  }
};
