import { useState, useCallback, useEffect } from "react";

const storageName = "userData";

export const useAuth = () => {
  const [token, setToken] = useState(null);
  const [userId, setUserId] = useState(null);
  const login = useCallback((jwtToken, id) => {
    console.log("token", jwtToken);
    setToken(jwtToken);
    setUserId(id);

    localStorage.setItem(
      storageName,
      JSON.stringify({ userId: id, token: jwtToken })
    );
  }, []);

  const logout = useCallback(() => {
    setToken(null);
    setUserId(null);
    localStorage.removeItem(storageName);
  }, []);

  useEffect(() => {
    try {
      const data = JSON.parse(localStorage.getItem(storageName));
      console.log("data", data);
      if (data && data.token) {
        login(data.token, data.userId);
      }
    } catch (e) {
      console.log(e);
    }
  }, [login]);

  return { login, logout, token, userId };
};
