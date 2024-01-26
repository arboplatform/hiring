import { createBrowserRouter } from "react-router-dom";
import { Login } from "../pages/Login";
import { Register } from "../pages/Register";
import { Home } from "../pages/Home";
import { ProtectedRoute } from "./ProtectedRoute";
import React from "react";
import { Loading } from "../components/Loading";
import { NotFound } from "../pages/Notfound";

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
    errorElement: <NotFound />,
  },
  {
    path: "/login",
    element: (
      <ProtectedRoute>
        <React.Suspense fallback={<Loading />}>
          <Login />
        </React.Suspense>
      </ProtectedRoute>
    ),
    errorElement: <NotFound />,
  },
  {
    path: "/register",
    element: (
      <ProtectedRoute>
        <React.Suspense fallback={<Loading />}>
          <Register />
        </React.Suspense>
      </ProtectedRoute>
    ),
    errorElement: <NotFound />,
  },
]);

export { router };
