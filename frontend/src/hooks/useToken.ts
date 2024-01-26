import { useQuery } from "@tanstack/react-query";
import { QUERY_KEY } from "../constants";
import api from "../api";
import { getToken, clearToken, setToken } from "../lib/localStorage";
import { useEffect } from "react";

export const useToken = () => {
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
  });

  useEffect(() => {
    if (!data && !isLoading) {
      clearToken();
    }

    if (data) {
      setToken(data);
    }
  }, [data, isLoading]);

  return { isLoading, data };
};
