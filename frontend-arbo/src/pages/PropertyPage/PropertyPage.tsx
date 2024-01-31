import React, { useState, useEffect } from "react";
import PropertyTable from "../../components/Property/PropertyTable";
import { Button, Form } from "react-bootstrap";
import { ToastContainer, ToastPosition, toast } from "react-toastify";
import "./PropertyPage.scss";
import { usePropertyContext } from "../../context/PropertyContex";
import CreatePropertyModal from "../../components/Property/CreatePropertyModal";
import UpdatePropertyModal from "../../components/Property/UpdatePropertyModal";

const PropertyPage = () => {
    // Estado local para os filtros
    const [statusFilter, setStatusFilter] = useState("");
    const [typeFilter, setTypeFilter] = useState("");

    // Estado dos modal
    //Create
    const [modalShow, setModalShow] = useState(false);
    // Update
    const [modalUpdateShow, setModalUpdateShow] = useState(false);

    // Context
    const { state, getAllProperties, getProperty, deleteProperty } =
        usePropertyContext();

    // Funções
    // Get By Id Property
    const handleGetProperty = (_id: string) => {
        getProperty(_id);
    };

    // Deleta Property
    const handleDeleteProperty = (_id: string) => {
        console.log(_id);
        deleteProperty(_id);
    };

    //Função para o toast dp react-toastify genereio
    const showToast = (message: string, type = "success") => {
        const options = {
            position: "top-right" as ToastPosition,
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
        };

        if (type === "success") {
            toast.success(message, options);
        } else {
            toast.error(message, options);
        }
    };

    // UseEffect para buscar todas os property
    useEffect(() => {
        getAllProperties();
    }, []);

    // "Html"
    return (
        <div className="property-page">
            <ToastContainer />
            <h1>Imoveis</h1>
            <div className="filters">
                <Button
                    variant="primary"
                    className="add-btn"
                    onClick={() => setModalShow(true)}
                >
                    Adicionar
                </Button>

                <CreatePropertyModal
                    show={modalShow}
                    onHide={() => setModalShow(false)}
                    onCadastroSuccess={() =>
                        showToast("Cadastro realizado com sucesso!")
                    }
                    onCadastroError={() =>
                        showToast("Erro ao realizar o cadastro!", "error")
                    }
                />

                <UpdatePropertyModal
                    show={modalUpdateShow}
                    onHide={() => setModalUpdateShow(false)}
                    onUpdateSuccess={() =>
                        showToast("Cadastro atualizado com sucesso!")
                    }
                    onUpdateError={() =>
                        showToast("Erro ao atualizar o cadastro!", "error")
                    }
                />

                {/* <Form.Control
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
                </Button> */}
            </div>
            <PropertyTable
                onGetProperty={handleGetProperty}
                onModalUpdateShow={() => setModalUpdateShow(true)}
                onDeleteProperty={handleDeleteProperty}
            />
        </div>
    );
};

export default PropertyPage;
