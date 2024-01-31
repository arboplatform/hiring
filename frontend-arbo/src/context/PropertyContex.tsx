import React, { createContext, useReducer, ReactNode } from "react";
import * as propertyService from "../services";
import { Property, CreateProperty, UpdateProperty } from "../models";

// Tipagem para o estado inicial
interface PropertyState {
    properties: Property[];
    property: Property | null;
}

// Tipagem para as ações do reducer
type PropertyAction =
    | { type: "ADD_PROPERTY"; payload: Property }
    | { type: "SET_PROPERTIES"; payload: Property[] }
    | { type: "SET_CURRENT_PROPERTY"; payload: Property | null }
    | { type: "UPDATE_PROPERTY"; payload: Property }
    | { type: "DELETE_PROPERTY"; _id: string };

// Estado inicial
const INITIAL_STATE: PropertyState = {
    properties: [],
    property: null,
};

// Tipagem para o contexto
interface PropertyContextProps {
    state: PropertyState;
    dispatch: React.Dispatch<PropertyAction>;
    createProperty: (data: CreateProperty) => Promise<Property>;
    getAllProperties: () => Promise<void>;
    getProperty: (_id: string) => Promise<Property>;
    updateProperty: (_id: string, data: UpdateProperty) => Promise<Property>;
    deleteProperty: (_id: string) => Promise<void>;
}

// Criando o contexto com valor inicial ou null
const PropertyContext = createContext<PropertyContextProps | null>(null);

// Reducer para o dispatch
const propertyReducer = (
    state: PropertyState,
    action: PropertyAction
): PropertyState => {
    switch (action.type) {
        case "ADD_PROPERTY":
            return {
                ...state,
                properties: [...state.properties, action.payload],
            };
        case "SET_PROPERTIES":
            return { ...state, properties: action.payload };
        case "SET_CURRENT_PROPERTY":
            return { ...state, property: action.payload };
        case "UPDATE_PROPERTY":
            return {
                ...state,
                properties: state.properties.map((property) =>
                    property._id === action.payload._id
                        ? action.payload
                        : property
                ),
            };
        case "DELETE_PROPERTY":
            return {
                ...state,
                properties: state.properties.filter(
                    (property) => property._id !== action._id
                ),
            };
        default:
            return state;
    }
};

// Provider para usar global nos componentes e assim ter o contexto
export const PropertyProvider = ({ children }: { children: ReactNode }) => {
    const [state, dispatch] = useReducer(propertyReducer, INITIAL_STATE);

    const createProperty = async (data: CreateProperty) => {
        try {
            const create = await propertyService.createProperty(data);
            dispatch({ type: "ADD_PROPERTY", payload: create });
            return create;
        } catch (error) {
            throw error;
        }
    };

    const getAllProperties = async () => {
        try {
            const properties: Property[] =
                await propertyService.getAllProperties();
            dispatch({ type: "SET_PROPERTIES", payload: properties });
        } catch (error) {
            throw error;
        }
    };

    const getProperty = async (_id: string) => {
        try {
            const property: Property = await propertyService.getPropertyById(
                _id
            );
            dispatch({ type: "SET_CURRENT_PROPERTY", payload: property });
            return property;
        } catch (error) {
            throw error;
        }
    };

    const updateProperty = async (_id: string, data: UpdateProperty) => {
        try {
            const update: Property = await propertyService.updateProperty(
                _id,
                data
            );
            dispatch({ type: "UPDATE_PROPERTY", payload: update });
            return update;
        } catch (error) {
            throw error;
        }
    };

    const deleteProperty = async (_id: string) => {
        try {
            await propertyService.deleteProperty(_id);
            dispatch({ type: "DELETE_PROPERTY", _id: _id });
            return;
        } catch (error) {
            throw error;
        }
    };

    const value = {
        state,
        dispatch,
        createProperty,
        getAllProperties,
        getProperty,
        updateProperty,
        deleteProperty,
    };

    return (
        <PropertyContext.Provider value={value}>
            {children}
        </PropertyContext.Provider>
    );
};

// Hook
export const usePropertyContext = () => {
    const context = React.useContext(PropertyContext);
    if (!context) {
        throw new Error("usePropertyContext error!");
    }
    return context;
};
