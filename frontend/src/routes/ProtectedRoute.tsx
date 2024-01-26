import { Navigate } from "react-router-dom";
import { useToken } from "../hooks/useToken";
import { Loading } from "../components/Loading";

type ProtectedRouteProps = {
  children: React.ReactNode;
};

const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
  const { data, isLoading } = useToken();

  if (isLoading) {
    return <Loading />;
  }

  if (!data && location.pathname === "/")
    return <Navigate to="/login" replace />;

  return <>{children}</>;
};

export { ProtectedRoute };
