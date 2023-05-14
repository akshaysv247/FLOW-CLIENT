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

export const uploadPicture = async (id, uri) => {
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

export const updateProfile = async (id, name, email, uploadedUrl) => {
  try {
    const response = await axios.put(`/artist/update-profile/${id}`, { name, email, uploadedUrl }, {
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

export const LikeSong = async (trackId, artistId) => {
  try {
    const response = await axios.put(`/artist/like-song/${artistId}/${trackId}`, {}, {
      withCredentials: true,
      headers: {
        Authorization: `Bearer ${localStorage.getItem('artistToken')}`,
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

export const getAllSongs = async () => {
  try {
    const response = await axios.get('/artist/get-all-songs', {
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

export const addTrack = async (id, datas, img, audio, name, selectedCat, language) => {
  console.log(id, datas, img, audio, name, selectedCat, language, 'items');
  try {
    const response = await axios.post(`/artist/add-track/${id}`, {
      datas, img, audio, name, selectedCat, language,
    }, {
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

export const getLikedSongs = async (id) => {
  try {
    const response = await axios.get(`/artist/get-liked-songs/${id}`, {
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

export const addNewPlaylist = async (id) => {
  try {
    const response = await axios.post(`/artist/add-new-playlist/${id}`, {}, {
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
export const getMyPlaylists = async (id) => {
  try {
    const response = await axios.get(`/artist/get-my-playlists/${id}`, {
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
export const getSongsForPlayist = async () => {
  try {
    const response = await axios.get('/artist/get-songs-for-playlist', {
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

export const updateMyPlaylist = async (obj, id) => {
  try {
    const response = await axios.put(`/artist/update-playlist/${id}`, obj, {
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

export const checkLikedSong = async (id, songId) => {
  try {
    const response = await axios.get(`/artist/check-liked/${id}/${songId}`, {
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

export const getSpecificPlaylist = async (id) => {
  try {
    const response = await axios.get(`/artist/get-specific-playlist/${id}`, {
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

export const FollowArtist = async (id, artistId) => {
  try {
    const response = await axios.post(`/artist/follow-artist/${id}/${artistId}`, {}, {
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
export const UnfollowArtist = async (id, artistId) => {
  try {
    const response = await axios.delete(`/artist/unfollow-artist/${id}/${artistId}`, {
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

export const isFollowing = async (id, artistId) => {
  try {
    const response = await axios.get(`/artist/is-following/${id}/${artistId}`, {
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

export const getHiddenSongsOfAnArtist = async (id) => {
  try {
    const response = await axios.get(`/artist/get-hidden-songs-of-artist/${id}`, {
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
    return error.reponse.data.error;
  }
};

export const getFollowers = async (id) => {
  try {
    const response = await axios.get(`/artist/get-followers/${id}`, {
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

export const getChartDet = async (id) => {
  try {
    const response = await axios.get(`/artist/get-followers-for-chart/${id}`, {
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

export const hideSong = async (id) => {
  try {
    const response = await axios.put(`/artist/hide-song/${id}`, {}, {
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

export const deleteSong = async (id) => {
  try {
    const response = await axios.delete(`/artist/delete-song/${id}`, {
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

export const deletePlaylist = async (id) => {
  try {
    const response = await axios.delete(`/artist/delete-playlist/${id}`, {
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

export const search = async (track, role) => {
  try {
    const response = await axios.post('/artist/search', { track, role }, {
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
