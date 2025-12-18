import React, { createContext, useContext, useState } from "react";
import { useEffect } from "react";
import { authDataContext } from "./AuthContext.jsx";
import axios from "axios";

export const userDataContext = createContext();

const UserContext = ({ children }) => {
  let { serverUrl } = useContext(authDataContext);
  let [userData, setUserData] = useState(null);

  const getCurrentUser = async () => {
    try {
      let result = await axios.get(`${serverUrl}/api/user/me`, {
        withCredentials: true,
      });
      setUserData(result.data);
      console.log("Current user data:", result.data);
    } catch (error) {
      setUserData(null);
      console.log("Error fetching current user:", error);
    }
  };

  useEffect(() => {
    getCurrentUser();
  },[]);

  let value = {
    userData,
    setUserData
  };
  return (
    <div>
      <userDataContext.Provider value={value}>
        {children}
      </userDataContext.Provider>
    </div>
  );
};

export default UserContext;
