import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { QUERY_KEY } from "../constants";
import { AxiosResponse } from "axios";
import api from "../api";
import { propertySchemaData } from "../components/Home/CollapsibleTable";

export const useProperties = () => {
  const queryClient = useQueryClient();

  const { data, isFetching, isLoading } = useQuery<
    AxiosResponse<propertySchemaData[]>
  >({
    queryKey: [QUERY_KEY.properties],
    queryFn: () => api.get("/properties"),
    refetchOnWindowFocus: false,
    refetchOnMount: false,
  });

  const { mutateAsync: mutateAsyncDeleteProperty } = useMutation({
    mutationFn: (id: number) => api.delete(`/properties/${id}`),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEY.properties],
      });
    },
  });

  return { data, isFetching, isLoading, mutateAsyncDeleteProperty };
};
