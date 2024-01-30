import api from "../api/axios";
import { CreateProperty, UpdateProperty } from "../models";

export const createProperty = async (property: CreateProperty) => {
    try {
        const response = await api.post("/propertys", property);
        return response.data;
    } catch (error) {
        throw error;
    }
};

export const getAllProperties = async () => {
    try {
        const response = await api.get("/propertys");
        return response.data;
    } catch (error) {
        throw error;
    }
};

export const getPropertyById = async (_id: string) => {
    try {
        const response = await api.get(`/propertys/${_id}`);
        return response.data;
    } catch (error) {
        throw error;
    }
};

export const updateProperty = async (_id: string, data: UpdateProperty) => {
    try {
        const response = await api.put(`/propertys/${_id}`, data);
        return response.data;
    } catch (error) {
        throw error;
    }
};

export const deleteProperty = async (_id: string) => {
    try {
        const response = await api.delete(`/propertys/${_id}`);
        return response.data;
    } catch (error) {
        throw error;
    }
};
