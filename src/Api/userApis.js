/* eslint-disable no-sequences */
/* eslint-disable consistent-return */
import axios from '../Axios/Axios';

// eslint-disable-next-line import/prefer-default-export
export const getProfile = async (id) => {
  try {
    const response = await axios.get(`/get-profile/${id}`, {
      withCredentials: true,
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
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

export const uploadPicture = async (uri, id) => {
  console.log(id, uri);
  try {
    const response = await axios.post(`/upload-picture/${id}`, { uri }, {
      withCredentials: true,
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
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

export const updateProfile = async (id, name, email) => {
  try {
    const response = await axios.put(`/update-profile/${id}`, { name, email }, {
      withCredentials: true,
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
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

export const getAllTracks = async () => {
  try {
    const response = await axios.get('/get-all-tracks', {
      withCredentials: true,
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
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

export const getAllArtist = async () => {
  try {
    const response = await axios.get('/get-all-artist', {
      withCredentials: true,
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
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

export const getFeeds = async () => {
  try {
    const response = await axios.get('/feeds', {
      withCredentials: true,
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
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
    const response = await axios.post('/search', { track, role }, {
      withCredentials: true,
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
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

export const LikeSong = async (trackId, userId) => {
  try {
    const response = await axios.put(`/like-song/${userId}/${trackId}`, {}, {
      withCredentials: true,
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
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
export const getLikedSongs = async (id) => {
  console.log('isIsd', id);
  try {
    const response = await axios.get(`/get-liked-songs/${id}`, {
      withCredentials: true,
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
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
    const response = await axios.post(`/add-new-playlist/${id}`, {}, {
      withCredentials: true,
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
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
    const response = await axios.get(`/get-my-playlists/${id}`, {
      withCredentials: true,
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
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

export const addSongToPlaylist = async (listId, songId) => {
  try {
    const response = await axios.put(`/add-song-to-playlist/${listId}/${songId}`, {}, {
      withCredentials: true,
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
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
    const response = await axios.get('/get-songs-for-playlist', {
      withCredentials: true,
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
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
  console.log(id, obj);
  try {
    const response = await axios.put(`/update-playlist/${id}`, obj, {
      withCredentials: true,
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    });
    console.log(response, 'response');
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
    const response = await axios.delete(`/delete-playlist/${id}`, {
      withCredentials: true,
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
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
    const response = await axios.get(`/check-liked/${id}/${songId}`, {
      withCredentials: true,
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
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
    const response = await axios.get(`/get-specific-playlist/${id}`, {
      withCredentials: true,
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
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
  console.log(id, artistId, 'fIds');
  try {
    const response = await axios.post(`/follow-artist/${id}/${artistId}`, {}, {
      withCredentials: true,
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
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
    const response = await axios.delete(`/unfollow-artist/${id}/${artistId}`, {
      withCredentials: true,
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
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
    const response = await axios.get(`is-following/${id}/${artistId}`, {
      withCredentials: true,
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
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

export const getCommonSongs = async (category, song) => {
  try {
    const response = await axios.get(`/get-common-songs/${category}/${song}`, {
      withCredentials: true,
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    });
    const { data } = response;
    console.log(data, 'data');
    if (data) {
      return data;
    }
  } catch (error) {
    console.log(error);
  }
};

export const removeFromPlaylist = async (id, songId) => {
  try {
    const response = await axios.put(`/remove-song-from-playlist/${id}/${songId}`, {}, {
      withCredentials: true,
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
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

export const addToPlaylist = async (id, songId) => {
  try {
    const response = await axios.put(`/add-song-to-playlist/${id}/${songId}`, {}, {
      withCredentials: true,
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
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

export const reportSong = async (id, songId, reports) => {
  try {
    const response = await axios.post(`/report-song/${id}/${songId}`, { reports }, {
      withCredentials: true,
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
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

export const getSpecificArtist = async (id) => {
  try {
    const response = await axios.get(`/get-specific-artist/${id}`, {
      withCredentials: true,
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
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

export const getAllTracksOfAnArtist = async (id) => {
  try {
    const response = await axios.get(`/get-all-tracks-of-artist/${id}`, {
      withCredentials: true,
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
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
