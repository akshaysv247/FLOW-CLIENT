/* eslint-disable consistent-return */
/* eslint-disable import/prefer-default-export */
import axios from '../Axios/Axios';

export const getProfile = async (id) => {
  console.log(id);
  try {
    const response = await axios.get(`/artist/get-profile/${id}`, {
      withCredentials: true,
      headers: {
        Authorization: `Bearer ${localStorage.getItem('artistToken')}`,
      },
    });
    const { data } = response;
    if (data) {
      return data;
    }
  } catch (error) {
    console.log(error);
    return error.response.data.error;
  }
};

export const uploadPicture = async (uri, id) => {
  console.log(id, uri);
  try {
    const response = await axios.post(`/artist/upload-picture/${id}`, { uri }, {
      withCredentials: true,
      headers: {
        Authorization: `Bearer ${localStorage.getItem('artistToken')}`,
      },
    });
    const { data } = response;
    if (data) {
      return data;
    }
  } catch (error) {
    return error.response.data.error;
  }
};

export const updateProfile = async (id) => {
  try {
    const response = await axios.put(`/artist/update-profile/${id}`, {
      withCredentials: true,
      headers: {
        Authorization: `Bearer ${localStorage.getItem('artistToken')}`,
      },
    });
    const { data } = response;
    if (data) {
      return data;
    }
  } catch (error) {
    return error.response.data.error;
  }
};

export const getAllTracks = async (id) => {
  try {
    const response = await axios.get(`/artist/get-all-tracks/${id}`, {
      withCredentials: true,
      headers: {
        Authorization: `Bearer ${localStorage.getItem('artistToken')}`,
      },
    });
    const { data } = response;
    if (data) {
      return data;
    }
  } catch (error) {
    return error.response.data.error;
  }
};

export const addTrack = async () => {
  try {
    const response = await axios.post('/artist/addtrack', {
      withCredentials: true,
      headers: {
        Authorization: `Bearer ${localStorage.getItem('artistToken')}`,
      },
    });
    const { data } = response;
    if (data) {
      return data;
    }
  } catch (error) {
    return error.response.data.error;
  }
};

export const getCommonSongs = async (track) => {
  try {
    const response = await axios.get('/artist/get-common-songs', { track }, {
      withCredentials: true,
      headers: {
        Authorization: `Bearer ${localStorage.getItem('artistToken')}`,
      },
    });
    const { data } = response;
    if (data) {
      return data;
    }
  } catch (error) {
    console.log(error);
  }
};

export const getCategory = async () => {
  try {
    const response = await axios.get('/artist/get-category', {
      withCredentials: true,
      headers: {
        Authorization: `Bearer ${localStorage.getItem('artistToken')}`,
      },
    });
    const { data } = response;
    if (data) {
      return data;
    }
  } catch (error) {
    return error.response.data.error;
  }
};

export const getFeeds = async () => {
  try {
    const response = await axios.get('/artist/feeds', {
      withCredentials: true,
      headers: {
        Authorization: `Bearer ${localStorage.getItem('artistToken')}`,
      },
    });
    const { data } = response;
    if (data) {
      return data;
    }
  } catch (error) {
    return error.response.data.error;
  }
};
