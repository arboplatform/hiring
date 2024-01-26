import { useQuery } from "@tanstack/react-query";
import { QUERY_KEY } from "../constants";
import { AxiosResponse } from "axios";
import api from "../api";
import { propertySchemaData } from "../components/Home/CollapsibleTable";

export const useProperties = () => {
  const { data, isFetching, isLoading } = useQuery<
    AxiosResponse<propertySchemaData[]>
  >({
    queryKey: [QUERY_KEY.properties],
    queryFn: () => api.get("/properties"),
    refetchOnWindowFocus: false,
    refetchOnMount: false,
  });

  return { data, isFetching, isLoading };
};
