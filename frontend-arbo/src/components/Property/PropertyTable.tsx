import React, { useEffect, useState } from "react";
import { Table, Button } from "react-bootstrap";
import { usePropertyContext } from "../../context/PropertyContex";
import "./PropertyTable.scss";

// Interface para os props
interface TablePropertyModalProps {
    onGetProperty: (_id: string) => void;
    onModalUpdateShow: () => void;
    onDeleteProperty: (_id: string) => void;
}

const PropertyTable: React.FC<TablePropertyModalProps> = ({
    onGetProperty,
    onModalUpdateShow,
    onDeleteProperty,
}) => {
    // Context
    const { state } = usePropertyContext();

    const [properties, setProperties] = useState(state.properties || []);

    // useEffect para atualizar o estado local.
    useEffect(() => {
        setProperties(state.properties);
    }, [state.properties]);

    // "Html"
    return (
        <div className="property-table-container">
            <Table striped bordered hover responsive>
                <thead>
                    <tr>
                        <th>Titulo</th>
                        <th>Valor</th>
                        <th>Area</th>
                        <th>Status</th>
                        <th className="option-header">Opções</th>
                    </tr>
                </thead>
                <tbody>
                    {Array.isArray(state.properties) &&
                        state.properties.map((property) => (
                            <tr key={property._id}>
                                <td>{property.title}</td>
                                <td>{property.price}</td>
                                <td>{property.area}</td>
                                <td
                                    className={`status-${property.status.toLowerCase()}`}
                                >
                                    {property.status}
                                </td>
                                <td className="button-cell">
                                    <Button
                                        variant="warning"
                                        className="edit-btn"
                                        onClick={() => {
                                            onGetProperty(property._id);
                                            onModalUpdateShow();
                                        }}
                                    >
                                        Editar
                                    </Button>

                                    <Button
                                        variant="danger"
                                        className="edit-btn"
                                        onClick={() => {
                                            onDeleteProperty(property._id);
                                        }}
                                    >
                                        Deletar
                                    </Button>
                                </td>
                            </tr>
                        ))}
                </tbody>
            </Table>
        </div>
    );
};

export default PropertyTable;
