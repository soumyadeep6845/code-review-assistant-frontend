import { jwtDecode } from "jwt-decode";
import { Navigate, Outlet } from "react-router-dom";

const isValidToken = (token: string) => {
  try {
    const decoded: any = jwtDecode(token);
    return decoded.exp * 1000 > Date.now(); // Ensure token is not expired
  } catch (error) {
    return false;
  }
};

const ProtectedRoute = () => {
  const token = localStorage.getItem("token");
  const isAuthenticated = token && isValidToken(token);

  return isAuthenticated ? <Outlet /> : <Navigate to="/auth" replace />;
};

export default ProtectedRoute;
