import React from "react";
import { Table, Button, Form } from "react-bootstrap";
import { usePropertyContext } from "../../context/PropertyContex";

const PropertyTable = () => {
    const { state } = usePropertyContext();

    return (
        <div className="property-table-container">
            <Table striped bordered hover responsive>
                <thead>
                    <tr>
                        <th>Titulo</th>
                        <th>Valor</th>
                        <th>Area</th>
                        <th>Status</th>
                    </tr>
                </thead>
                <tbody>
                    {state.properties.map((property) => (
                        <tr key={property._id}>
                            <td>{property.title}</td>
                            <td>{property.price}</td>
                            <td>{property.area}</td>
                            <td
                                className={`status-${property.status.toLowerCase()}`}
                            >
                                {property.status}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>
        </div>
    );
};

export default PropertyTable;
