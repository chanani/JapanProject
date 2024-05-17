import axios from "axios"
import { Cookies } from "react-cookie"

export const axiosInstance = axios.create({
  baseURL: process.env.REACT_APP_URL_JAVA,
  headers: {
    'Content-Type' : 'application/json',
  },
  withCredentials: true
})

axiosInstance.interceptors.request.use((config) => {
  const cookies = new Cookies();
  const token = cookies.get('accessToken');
  if(token){
    config.headers['Authorization'] = cookies.get('accessToken');
  }
  return config;
}, (error) => {
  return Promise.reject(error);
})

