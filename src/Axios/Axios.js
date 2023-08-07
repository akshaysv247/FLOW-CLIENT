import axios from 'axios';

const instance = axios.create({
  // baseURL: 'https://api.flowmusics.online',
  // baseURL: 'http://localhost:3002',
  baseURL: 'https://flow-backend-uyqb.onrender.com',
});

export default instance;
