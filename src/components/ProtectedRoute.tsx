import { Navigate, Outlet } from "react-router-dom";
import { useAuthContext } from "../hooks/useAuthContext";

function ProtectedRoute() {
  const { isAuthenticated } = useAuthContext();
  return isAuthenticated === true ? <Outlet /> : <Navigate to="/login" />;
}

export default ProtectedRoute;
