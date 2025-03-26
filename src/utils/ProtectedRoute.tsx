import { Navigate, Outlet } from "react-router-dom";

const ProtectedRoute = () => {
  const token = localStorage.getItem("token"); // Checking if the user has a valid token

  return token ? <Outlet /> : <Navigate to="/auth" />;
};

export default ProtectedRoute;
