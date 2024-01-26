import { createBrowserRouter } from "react-router-dom";
import { Login } from "../pages/Login";
import { Register } from "../pages/Register";
import { Home } from "../pages/Home";
import { ProtectedRoute } from "./ProtectedRoute";
import React from "react";
import { Loading } from "../components/Loading";

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <ProtectedRoute>
        <React.Suspense fallback={<Loading />}>
          <Home />
        </React.Suspense>
      </ProtectedRoute>
    ),
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/register",
    element: <Register />,
  },
]);

export { router };
