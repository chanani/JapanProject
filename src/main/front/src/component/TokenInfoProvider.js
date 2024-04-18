import base64 from "base-64";
import React, { useState } from "react";
import {Cookies} from 'react-cookie';

export const tokenInfoContext = React.createContext();
const cookies = new Cookies();
const fetchRoleFromToken = () => {
  const accessToken = cookies.get("accessToken");
  if(accessToken) {
    let payload = accessToken.substring(
      accessToken.indexOf(".") + 1,
      accessToken.lastIndexOf(".")
      );
    let dec_first = JSON.parse(base64.decode(payload));
    let dec = JSON.parse(dec_first.data);
    return dec.role || "none";
  }
  return "none";
}


const TokenInfoProvider = ({children}) => {
  const cookies = new Cookies();
  const initialRole = fetchRoleFromToken();
  const initialUsername = cookies.get("username");
  const [userRole, setUserRole] = useState(initialRole);
  const [username, setUsername] = useState(initialUsername);
  const accessToken = cookies.get("accessToken");
  const refreshToken = cookies.get("refreshToken");
  const handleChange = (newUsername, newRole) => {
    setUsername(newUsername);
    setUserRole(newRole);
  }
  return (
    <tokenInfoContext.Provider value={{userRole, username, accessToken, refreshToken, handleChange}}>
      {children}
    </tokenInfoContext.Provider>
  );
}

export default TokenInfoProvider;