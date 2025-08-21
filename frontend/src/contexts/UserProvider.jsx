import React, { createContext, useEffect, useState } from "react";

export const UserContext = createContext({});
import { getAllUsers as apiGetAllUsers } from "../services/userServices";

function UserProvider({ children }) {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const getAllUsers = async () => {
      const data = await apiGetAllUsers();
      setUsers(data.users || []);
    };

    getAllUsers();
  }, []);

  return <UserContext.Provider value={users}>{children}</UserContext.Provider>;
}

export default UserProvider;
