import axios from 'axios';

const instance = axios.create({
  baseURL: 'https://flow-musics-backend.onrender.com',
  // baseURL: 'http://localhost:3002',
});

export default instance;
