import api from "../api/axios";

export const createProperty = async (property: any) => {
    const response = await api.post("/propertys", property);
    return response.data;
};

export const getAllProperties = async () => {
    const response = await api.get("/propertys");
    return response.data;
};

export const getPropertyById = async (id: string) => {
    const response = await api.get(`/propertys/${id}`);
    return response.data;
};

export const updateProperty = async (id: string, property: any) => {
    const response = await api.put(`/propertys/${id}`, property);
    return response.data;
};

export const deleteProperty = async (id: string) => {
    const response = await api.delete(`/propertys/${id}`);
    return response.data;
};
