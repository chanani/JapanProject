import axios from "axios"
import {Cookies} from "react-cookie"
import {getTokenCookies, removeTokenCookies, setTokenCookies} from "../util/cookies";

export const axiosInstance = axios.create({
    baseURL: process.env.REACT_APP_URL_JAVA,
    headers: {
        'Content-Type': 'application/json',
    },
    withCredentials: true
})

axiosInstance.interceptors.request.use((config) => {
    const cookies = new Cookies();
    const token = cookies.get('accessToken') || "";
    if (token) {
        config.headers['Authorization'] = cookies.get('accessToken');
    }
    return config;
}, (error) => {
    return Promise.reject(error);
})

axiosInstance.interceptors.response.use((response) => {
    return response;
}, async function (error) {
    const originalRequest = error.config;
    console.log("error : ", error.response);
    const cookies = getTokenCookies();

    if (!cookies.accessToken || !cookies.refreshToken || !cookies.username)
        return removeTokenCookies();
    if (error.response?.status === 401) {
        try {
            const response = await axios.post(
                process.env.REACT_APP_URL_JAVA + 'refresh',
                {
                    username: cookies.username,
                    refreshToken: cookies.refreshToken,
                },
                {headers: {'Authorization': `${cookies.accessToken}`},}
            );
            const {data} = response;
            console.log("data : ", data)
            setTokenCookies({
                refreshToken: data.data.refreshToken,
                accessToken : data.data.accessToken,
                username : data.data.username
            });
            originalRequest.headers.Authorization = `${data?.data?.accessToken}`;
            return axios(originalRequest);
        } catch (refreshError) {
            console.log("토큰 발급 시 오류 : ", refreshError.message);
            return Promise.reject(refreshError);
        }

    } else if(error.response?.status === 403) {
        removeTokenCookies();
        alert('다른 곳에서 로그인하여 로그아웃됩니다.');
        return window.location = "/";
    }


    return error;
})

