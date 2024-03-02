import base64 from "base-64";
import React, { useState } from "react";

export const tokenInfoContext = React.createContext();
const fetchRoleFromToken = () => {
  const token = localStorage.getItem("token");
  if(token) {
    let payload = token.substring(
      token.indexOf(".") + 1,
      token.lastIndexOf(".")
      );
    let dec = JSON.parse(base64.decode(payload));
    return dec.role || "none";
  }
  return "none";
}


const TokenInfoProvider = ({children}) => {
  const initialRole = fetchRoleFromToken();
  const initialUsername = localStorage.getItem("username");
  const [userRole, setUserRole] = useState(initialRole);
  const [username, setUsername] = useState(initialUsername);

  const handleChange = (newUsername, newRole) => {
    setUsername(newUsername);
    setUserRole(newRole);
  }
  return (
    <tokenInfoContext.Provider value={{userRole, username, handleChange}}>
      {children}
    </tokenInfoContext.Provider>
  );
}

export default TokenInfoProvider;