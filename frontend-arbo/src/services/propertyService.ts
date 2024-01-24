import api from "../api/axios";

export const createProperty = async (property: any) => {
    const response = await api.post("/properties", property);
    return response.data;
};

export const getAllProperties = async () => {
    const response = await api.get("/properties");
    return response.data;
};

export const getPropertyById = async (id: string) => {
    const response = await api.get(`/properties/${id}`);
    return response.data;
};

export const updateProperty = async (id: string, property: any) => {
    const response = await api.put(`/properties/${id}`, property);
    return response.data;
};

export const deleteProperty = async (id: string) => {
    const response = await api.delete(`/properties/${id}`);
    return response.data;
};
