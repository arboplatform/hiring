import { useQuery } from "@tanstack/react-query";
import { QUERY_KEY } from "../constants";
import api from "../api";
import { getToken, clearToken, setToken } from "../lib/localStorage";
import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";

export const useToken = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { data, isLoading } = useQuery<string | null>({
    queryKey: [QUERY_KEY.token],
    queryFn: async () => {
      const token = getToken();
      api.defaults.headers.common["Authorization"] = `Bearer ${token}`;

      await api.post<string>("/users/is_authenticated");

      return token;
    },
    refetchOnMount: false,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
    retry: 1,
    enabled: !!getToken(),
  });

  useEffect(() => {
    if (!data && !isLoading) {
      clearToken();
    }

    if (data) {
      setToken(data);
      if (location.pathname !== "/") {
        navigate("/");
      }
    }
  }, [data, isLoading, location.pathname, navigate]);

  return { isLoading, data, location };
};
