import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

const GuestRoute = () => {
  const { isAuthenticated } = useAuth();

  /* --------------------- RENDER --------------------- */

  return isAuthenticated ? <Navigate to="/assignment" replace /> : <Outlet />;
};

export default GuestRoute;
