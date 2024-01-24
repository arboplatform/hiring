import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import PropertyPage from "./pages/PropertyPage/PropertyPage";
import "bootstrap/dist/css/bootstrap.min.css";

const App = () => {
    return (
        <Router>
            <Routes>
                <Route path="/properties" element={<PropertyPage />} />
            </Routes>
        </Router>
    );
};

export default App;
