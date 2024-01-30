import React, { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { Modal, Form, Button, Row, Col } from "react-bootstrap";
import { usePropertyContext } from "../../context/PropertyContex";
import { ToastContainer, toast } from "react-toastify";
import { UpdateProperty } from "../../models";

// Interface para os props
interface UpdatePropertyModalProps {
    show: boolean;
    onHide: () => void;
    onUpdateSuccess: () => void;
    onUpdateError: () => void;
}

const UpdatePropertyModal: React.FC<UpdatePropertyModalProps> = ({
    show,
    onHide,
    onUpdateSuccess,
    onUpdateError,
}) => {
    // Context
    const { state, updateProperty } = usePropertyContext();

    // Estados local
    const [initialProperty, setInitialProperty] = useState(state.property);

    const [changedProperty, setChangedProperty] = useState<UpdateProperty>({});

    // useEffect para atualizar o estado local.
    useEffect(() => {
        setInitialProperty(state.property || null);
    }, [state.property]);

    // options para usar nas forms
    const typeProperty = ["Apartamento", "Casa"];

    const featuresProperty = [
        "Piscina",
        "Garagem",
        "Churrasqueira",
        "Sacada",
        "Mobiliada ",
    ];

    // Funções para ouvi e atualizar os campos dos imoveis
    // Handle geral
    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value, type, checked } = e.target;

        let newValue: any = value;
        if (type === "number") {
            newValue = Number(value);
        } else if (type === "checkbox" && name === "features") {
            const currentFeatures =
                changedProperty.features ?? initialProperty?.features ?? [];

            if (checked) {
                newValue = currentFeatures.includes(value)
                    ? currentFeatures
                    : [...currentFeatures, value];
            } else {
                const uniqueFeatures = Array.from(new Set(currentFeatures));
                newValue = uniqueFeatures.filter((item) => item !== value);
            }
        }

        if (
            initialProperty &&
            initialProperty[name as keyof typeof initialProperty] !== newValue
        ) {
            setChangedProperty({ ...changedProperty, [name]: newValue });
        }
    };

    // Handle Address
    const handleAddressChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;

        let newValue: any = value;

        if (
            initialProperty &&
            initialProperty.address[
                name as keyof typeof initialProperty.address
            ] !== newValue
        ) {
            setChangedProperty({
                ...changedProperty,
                address: { ...changedProperty.address, [name]: newValue },
            });
        }
    };

    // Handle Submit para enviar ao context > backend
    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            if (initialProperty) {
                await updateProperty(initialProperty?._id, changedProperty);
            }
            onUpdateSuccess();
            onHide();
        } catch (error) {
            onUpdateError();
        }
    };

    // "Html"
    return (
        <Modal size="xl" show={show} onHide={onHide}>
            <Modal.Header closeButton>
                <Modal.Title>Cadastrar Imóvel</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form onSubmit={handleSubmit}>
                    <Form.Group className="mb-3">
                        <Form.Label>Título</Form.Label>
                        <Form.Control
                            type="text"
                            name="title"
                            value={
                                changedProperty.title !== undefined
                                    ? changedProperty.title
                                    : initialProperty?.title || ""
                            }
                            required
                            onChange={handleChange}
                        />
                        <Form.Label>Descrição</Form.Label>
                        <Form.Control
                            as="textarea"
                            type="text"
                            name="description"
                            value={
                                changedProperty.description !== undefined
                                    ? changedProperty.description
                                    : initialProperty?.description || ""
                            }
                            required
                            onChange={handleChange}
                            rows={4}
                            cols={50}
                            placeholder="Insira a descrição do imóvel aqui."
                        />

                        <Row>
                            <Col>
                                <Form.Label>Preço</Form.Label>
                                <Form.Control
                                    type="number"
                                    name="price"
                                    value={
                                        changedProperty.price !== undefined
                                            ? changedProperty.price
                                            : initialProperty?.price || 0
                                    }
                                    required
                                    onChange={handleChange}
                                />
                            </Col>
                            <Col>
                                <Form.Label>Area do imóvel</Form.Label>
                                <Form.Control
                                    type="number"
                                    name="area"
                                    value={
                                        changedProperty.area !== undefined
                                            ? changedProperty.area
                                            : initialProperty?.area || ""
                                    }
                                    required
                                    onChange={handleChange}
                                />
                            </Col>
                        </Row>

                        <Form.Label>Tipo de imóvel</Form.Label>
                        {typeProperty.map((option, index) => (
                            <Form.Check
                                key={option}
                                type="radio"
                                name="type"
                                value={option}
                                label={option}
                                required
                                checked={
                                    changedProperty.type !== undefined
                                        ? changedProperty.type === option
                                        : initialProperty?.type === option
                                }
                                onChange={handleChange}
                            />
                        ))}
                        <Form.Label>Características do imóvel</Form.Label>
                        <div style={{ display: "flex", flexWrap: "wrap" }}>
                            {featuresProperty.map((option, index) => (
                                <Form.Check
                                    key={option}
                                    type="checkbox"
                                    name="features"
                                    value={option}
                                    label={option}
                                    checked={
                                        changedProperty.features !== undefined
                                            ? changedProperty.features.includes(
                                                  option
                                              )
                                            : initialProperty?.features.includes(
                                                  option
                                              ) || false
                                    }
                                    onChange={handleChange}
                                    style={{
                                        marginRight: "10px",
                                        marginBottom: "10px",
                                        marginTop: "10px",
                                    }}
                                />
                            ))}
                        </div>
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>Rua</Form.Label>
                        <Form.Control
                            type="text"
                            name="street"
                            value={
                                changedProperty.address?.street !== undefined
                                    ? changedProperty.address.street
                                    : initialProperty?.address.street || ""
                            }
                            required
                            onChange={handleAddressChange}
                        />
                        <Row>
                            <Col>
                                <Form.Label>Cidade</Form.Label>
                                <Form.Control
                                    type="text"
                                    name="city"
                                    value={
                                        changedProperty.address?.city !==
                                        undefined
                                            ? changedProperty.address.city
                                            : initialProperty?.address.city ||
                                              ""
                                    }
                                    required
                                    onChange={handleAddressChange}
                                />
                            </Col>
                            <Col>
                                <Form.Label>Estado</Form.Label>
                                <Form.Control
                                    type="text"
                                    name="state"
                                    value={
                                        changedProperty.address?.state !==
                                        undefined
                                            ? changedProperty.address.state
                                            : initialProperty?.address.state ||
                                              ""
                                    }
                                    required
                                    onChange={handleAddressChange}
                                />
                            </Col>
                            <Col>
                                <Form.Label>Cep</Form.Label>
                                <Form.Control
                                    type="text"
                                    name="zipCode"
                                    value={
                                        changedProperty.address?.zipCode !==
                                        undefined
                                            ? changedProperty.address.zipCode
                                            : initialProperty?.address
                                                  .zipCode || ""
                                    }
                                    required
                                    onChange={handleAddressChange}
                                />
                            </Col>
                        </Row>
                    </Form.Group>
                    <Button variant="primary" type="submit">
                        Salvar
                    </Button>
                    <Button
                        variant="danger"
                        className="ms-2"
                        onClick={() => onHide()}
                    >
                        Cancelar
                    </Button>
                </Form>
            </Modal.Body>
        </Modal>
    );
};

export default UpdatePropertyModal;
