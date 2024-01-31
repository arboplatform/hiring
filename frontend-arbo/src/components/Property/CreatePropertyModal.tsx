import React, { ChangeEvent, FormEvent, useState } from "react";
import { Modal, Form, Button, Row, Col } from "react-bootstrap";
import { usePropertyContext } from "../../context/PropertyContex";

// Interface para os props
interface CreatePropertyModalProps {
    show: boolean;
    onHide: () => void;
    onCadastroSuccess: () => void;
    onCadastroError: () => void;
}

const CreatePropertyModal: React.FC<CreatePropertyModalProps> = ({
    show,
    onHide,
    onCadastroSuccess,
    onCadastroError,
}) => {
    // Context
    const { state, createProperty } = usePropertyContext();

    // Estados local
    const [property, setProperty] = useState({
        title: "",
        description: "",
        price: 0,
        area: 0,
        type: "",
        address: {
            street: "",
            city: "",
            state: "",
            zipCode: "",
        },
        features: [],
        img: [],
    });

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

        const parsedValue =
            type === "number"
                ? Number(value)
                : type === "checkbox" && name === "features"
                ? checked
                    ? [...property.features, value]
                    : property.features.filter((item) => item !== value)
                : value;

        setProperty({ ...property, [name]: parsedValue });
    };

    // Handle Address
    const handleAddressChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setProperty({
            ...property,
            address: { ...property.address, [name]: value },
        });
    };

    // Handle Submit para enviar ao context > backend
    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        try {
            property.features = Array.from(new Set(property.features));
            await createProperty(property);
            onCadastroSuccess();
            onHide();
        } catch (error) {
            onCadastroError();
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
                            required
                            onChange={handleChange}
                        />
                        <Form.Label>Descrição</Form.Label>
                        <Form.Control
                            as="textarea"
                            type="text"
                            name="description"
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
                                    required
                                    onChange={handleChange}
                                />
                            </Col>
                            <Col>
                                <Form.Label>Area do imóvel</Form.Label>
                                <Form.Control
                                    type="number"
                                    name="area"
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
                            required
                            onChange={handleAddressChange}
                        />
                        <Row>
                            <Col>
                                <Form.Label>Cidade</Form.Label>
                                <Form.Control
                                    type="text"
                                    name="city"
                                    required
                                    onChange={handleAddressChange}
                                />
                            </Col>
                            <Col>
                                <Form.Label>Estado</Form.Label>
                                <Form.Control
                                    type="text"
                                    name="state"
                                    required
                                    onChange={handleAddressChange}
                                />
                            </Col>
                            <Col>
                                <Form.Label>Cep</Form.Label>
                                <Form.Control
                                    type="text"
                                    name="zipCode"
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

export default CreatePropertyModal;
