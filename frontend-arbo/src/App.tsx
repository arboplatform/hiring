import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import PropertyPage from "./pages/PropertyPage/PropertyPage";
import "bootstrap/dist/css/bootstrap.min.css";
import "react-toastify/dist/ReactToastify.css";
import { PropertyProvider } from "./context/PropertyContex";

const PropertyPageWithProvider = () => (
    <PropertyProvider>
        <PropertyPage />
    </PropertyProvider>
);

const App = () => {
    return (
        <Router>
            <Routes>
                {/* <Route
                    path="/properties"
                    element={<PropertyPageWithProvider />}
                /> */}
                <Route path="/" element={<PropertyPageWithProvider />} />
            </Routes>
        </Router>
    );
};

export default App;
