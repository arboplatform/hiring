import React, { useState, useEffect } from "react";
import PropertyTable from "../../components/Property/PropertyTable";
import { Button, Form } from "react-bootstrap";
import "./PropertyPage.scss";
import { usePropertyContext } from "../../context/PropertyContex";

const PropertyPage = () => {
    const [statusFilter, setStatusFilter] = useState("");
    const [typeFilter, setTypeFilter] = useState("");

    const { state, getAllProperties } = usePropertyContext();

    const getState = async () => {
        console.log(
            "Ver o state no console ou pode usar Devtools",
            state.property,
            state.properties
        );
    };

    useEffect(() => {
        getState();
        getAllProperties();
    }, []);

    return (
        <div className="property-page">
            <h1>Propriedades</h1>
            <div className="filters">
                <Button variant="primary" className="add-btn">
                    Adicionar
                </Button>

                <Form.Control
                    type="text"
                    placeholder="Filtrar por status..."
                    value={statusFilter}
                    onChange={(e) => setStatusFilter(e.target.value)}
                />
                <Form.Control
                    type="text"
                    placeholder="Filtrar por tipo..."
                    value={typeFilter}
                    onChange={(e) => setTypeFilter(e.target.value)}
                />
                <Button variant="info" onClick={getAllProperties}>
                    Filtrar
                </Button>
            </div>
            <PropertyTable />
        </div>
    );
};

export default PropertyPage;
