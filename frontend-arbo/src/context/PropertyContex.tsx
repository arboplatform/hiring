import React, { createContext, useReducer, ReactNode } from "react";
import * as propertyService from "../services";
import { Property } from "../models";

// Tipagem para o estado inicial
interface PropertyState {
    properties: Property[];
    property: Property | null;
}

// Tipagem para as ações do reducer
type PropertyAction =
    | { type: "SET_PROPERTIES"; payload: Property[] }
    | { type: "SET_CURRENT_PROPERTY"; payload: Property | null };

// Estado inicial
const INITIAL_STATE: PropertyState = {
    properties: [],
    property: null,
};

// Tipagem para o contexto
interface PropertyContextProps {
    state: PropertyState;
    dispatch: React.Dispatch<PropertyAction>;
    getAllProperties: () => Promise<void>;
}

// Criando o contexto com valor inicial ou null
const PropertyContext = createContext<PropertyContextProps | null>(null);

// Reducer para o dispatch
const propertyReducer = (
    state: PropertyState,
    action: PropertyAction
): PropertyState => {
    switch (action.type) {
        case "SET_PROPERTIES":
            return { ...state, properties: action.payload };
        case "SET_CURRENT_PROPERTY":
            return { ...state, property: action.payload };
        default:
            return state;
    }
};

// Provider para usar global nos componentes e assim ter o contexto
export const PropertyProvider = ({ children }: { children: ReactNode }) => {
    const [state, dispatch] = useReducer(propertyReducer, INITIAL_STATE);

    const getAllProperties = async () => {
        const properties: Property[] = await propertyService.getAllProperties();
        dispatch({ type: "SET_PROPERTIES", payload: properties });
    };

    const getProperty = async (id: string) => {
        const property: Property = await propertyService.getPropertyById(id);
        dispatch({ type: "SET_CURRENT_PROPERTY", payload: property });
    };

    const value = { state, dispatch, getAllProperties, getProperty };

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
