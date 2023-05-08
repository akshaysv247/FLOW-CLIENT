/* eslint-disable consistent-return */
/* eslint-disable import/prefer-default-export */
import axios from '../Axios/Axios';

export const getAllTracks = async () => {
  try {
    const response = await axios.get('/admin/get-all-tracks', {
      withCredentials: true,
      headers: {
        Authorization: `Bearer ${localStorage.getItem('adminToken')}`,
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

export const addNewTrack = async (datas, img, audio, selectedCat, language) => {
  try {
    const response = await axios.post('/admin/add-new-track', {
      datas, img, audio, selectedCat, language,
    }, {
      withCredentials: true,
      headers: {
        Authorization: `Bearer ${localStorage.getItem('adminToken')}`,
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

export const verifyArtist = async (id) => {
  try {
    const response = await axios.put(`/admin/artist-verify/${id}`, {
      withCredentials: true,
      headers: {
        Authorization: `Bearer ${localStorage.getItem('adminToken')}`,
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

export const artistBlock = async (id) => {
  try {
    const response = await axios.get(`/admin/artist-block/${id}`, {
      withCredentials: true,
      headers: {
        Authorization: `Bearer ${localStorage.getItem('adminToken')}`,
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

export const artistDeatais = async () => {
  try {
    const response = await axios.get('/admin/artist-details', {
      withCredentials: true,
      headers: {
        Authorization: `Bearer ${localStorage.getItem('adminToken')}`,
      },
    });
    const { data } = response;
    console.log(data);
    if (data) {
      return data;
    }
  } catch (error) {
    return error.response.data.error;
  }
};

export const userBlock = async (id) => {
  try {
    const response = await axios.put(`/admin/user-block/${id}`, {
      withCredentials: true,
      headers: {
        Authorization: `Bearer ${localStorage.getItem('adminToken')}`,
      },
    });
    console.log(response, 'res');
    const { data } = response;
    console.log(data, 'vere');
    if (data) {
      return data;
    }
  } catch (error) {
    return error.response.data.error;
  }
};

export const userDetails = async () => {
  try {
    const response = await axios.get('/admin/user-details', {
      withCredentials: true,
      headers: {
        Authorization: `Bearer ${localStorage.getItem('adminToken')}`,
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

export const addCategory = async (data) => {
  try {
    const response = await axios.post('/admin/add-category', { data }, {
      withCredentials: true,
      headers: {
        Authorization: `Bearer ${localStorage.getItem('adminToken')}`,
      },
    });
    if (response) {
      console.log(response.data);
      return response.data;
    }
  } catch (error) {
    return error.response.data.error;
  }
};

export const getCatagory = async () => {
  try {
    const response = await axios.get('/admin/get-category', {
      withCredentials: true,
      headers: {
        Authorization: `Bearer ${localStorage.getItem('adminToken')}`,
      },
    });
    const { data } = response;
    console.log(data, 'catts');
    if (data) {
      return data;
    }
  } catch (error) {
    return error.response.data.error;
  }
};

export const deleteSong = async (id) => {
  console.log(id, 'idds');
  try {
    const response = await axios.delete(`/admin/delete-song/${id}`, {
      withCredentials: true,
      headers: {
        Authorization: `Bearer ${localStorage.getItem('adminToken')}`,
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

export const hideSong = async (id) => {
  try {
    const response = await axios.put(`/admin/hide-song/${id}`, {}, {
      withCredentials: true,
      headers: {
        Authorization: `Bearer ${localStorage.getItem('adminToken')}`,
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

export const getExactCategory = async (id) => {
  try {
    const response = await axios.get(`/admin/get-exact-category/${id}`, {
      withCredentials: true,
      headers: {
        Authorization: `Bearer ${localStorage.getItem('adminToken')}`,
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

export const editCategory = async (id, name, description) => {
  try {
    const response = await axios.put(`/admin/edit-category/${id}`, { name, description }, {
      withCredentials: true,
      headers: {
        Authorization: `Bearer ${localStorage.getItem('adminToken')}`,
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

export const deleteCategory = async (id) => {
  try {
    const response = await axios.delete(`/admin/delete-category/${id}`, {
      withCredentials: true,
      headers: {
        Authorization: `Bearer ${localStorage.getItem('adminToken')}`,
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

export const getCopyrights = async () => {
  try {
    const response = await axios.get('/admin/get-copyrights', {
      withCredentials: true,
      headers: {
        Authorization: `Bearer ${localStorage.getItem('adminToken')}`,
      },
    });
    const { data } = response.data;
    if (data) {
      return data;
    }
  } catch (error) {
    return error.response.data.error;
  }
};

export const getChartDets = async () => {
  try {
    const response = await axios.get('/admin/get-chart-dets', {
      withCredentials: true,
      headers: {
        Authorization: `Bearer ${localStorage.getItem('adminToken')}`,
      },
    });
    const { data } = response.data;
    if (data) {
      return data;
    }
  } catch (error) {
    return error.response.data.error;
  }
};
export const getAllHiddenSongs = async () => {
  try {
    const response = await axios.get('/admin/get-all-hidden-songs', {
      withCredentials: true,
      headers: {
        Authorization: `Bearer ${localStorage.getItem('adminToken')}`,
      },
    });
    const { data } = response.data;
    if (data) {
      return data;
    }
  } catch (error) {
    return error.response.data.error;
  }
};
