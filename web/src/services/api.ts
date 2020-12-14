import axios from 'axios';
import { getToken, logout } from './auth';
import https from 'https';

const api = axios.create({
  baseURL: process.env.REACT_APP_BACKEND_URL,
  httpsAgent: new https.Agent({  
    rejectUnauthorized: false
  })
});

api.interceptors.request.use(async config => {
  const token = getToken();

  if(token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

api.interceptors.response.use((response) => {
  return response
}, (error) => {
  if(401 === error.response.status){
    logout();

    window.location.href = "/login";
  }
});

export default api;