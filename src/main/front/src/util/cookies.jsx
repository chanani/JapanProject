import {Cookies} from "react-cookie"

//Refresh Token & User Info
/**
 * @desc 쿠키: refreshToken, userinfo(파싱) GET
 * @return {{ refreshToken: string, accessToken: string, userInfo: any }}
 * */
export const getTokenCookies = () => {
    const cookies = new Cookies();
    const refreshToken = cookies.get("refreshToken") || "";
    const accessToken = cookies.get("accessToken") || "";
    const username = cookies.get("username") || "";
    return {refreshToken, accessToken, username};
};

/**
 * @desc 쿠키: refreshToken,userInfo SET
 * @param {{ refreshToken: string, userInfo: any }}
 * */
export const setTokenCookies = ({refreshToken, accessToken, username}) => {
    const cookies = new Cookies();
    // todo: 현재 accessToken, refreshToken, userInfo 로 되어있음
    if (refreshToken) cookies.set("refreshToken", refreshToken);
    if (accessToken) cookies.set("accessToken", accessToken);
    if (username) cookies.set("username", username);
};

/**
 * @desc 쿠키: refreshToken,userInfo DELETE
 * */
export const removeTokenCookies = () => {
    const cookies = new Cookies();
    cookies.remove("refreshToken");
    cookies.remove("accessToken");
    cookies.remove("username");
};
