import axios from "axios"
import { Cookies } from "react-cookie"

export const axiosInstance = axios.create({
  baseURL: process.env.REACT_APP_URL_JAVA,
  headers: { 'Content-Type' : 'application/json'},
  withCredentials: true
})

axiosInstance.interceptors.request.use((config) => {
  const cookies = new Cookies();
  console.log(cookies.get('accessToken'));
  config.headers['Authorization'] = cookies.get('accessToken')
  return config;
})

