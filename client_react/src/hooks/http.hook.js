import { useState, useCallback } from "react";
import axios from "axios";

export const useHttp = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const request = useCallback(
    async (url, method = "GET", data = null, headers = {}) => {
      setLoading(true);
      try {
        const response = await axios(url, {
          method,
          data,
          headers,
        });
        const dataResp = response.data;
        if (response.statusText !== "OK") {
          console.error(dataResp.message || "Something went wrong");
        }

        setLoading(false);
        return dataResp;
      } catch (error) {
        setLoading(false);
        setError(error.message);
        throw error;
      }
    },
    []
  );

  const clearError = useCallback(() => setError(null), []);

  return { loading, request, error, clearError };
};
