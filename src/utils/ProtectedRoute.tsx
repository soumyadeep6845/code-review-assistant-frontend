import { useEffect, useRef, useState } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import { apiClient } from "../api/ApiClient";

const isValidToken = (token: string) => {
  try {
    const decoded: any = jwtDecode(token);
    return decoded.exp * 1000 > Date.now(); // Ensure token is not expired
  } catch (error) {
    return false;
  }
};

const ProtectedRoute = () => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);
  const hasChecked = useRef(false);

  useEffect(() => {
    if (hasChecked.current) return; 
    const verifyToken = async () => {
      const token = localStorage.getItem("token");
      

      if (!token || !isValidToken(token)) {
        localStorage.removeItem("token");
        setIsAuthenticated(false);
        return;
      }

      try {
        // Verify token with the backend
        const response = await apiClient.get("/auth/verify", {
          headers: { Authorization: `Bearer ${token}` },
        });
        

        if (response.status === 200) {
          setIsAuthenticated(true);
        } else {
          localStorage.removeItem("token");
          setIsAuthenticated(false);
        }
      } catch (error) {
        localStorage.removeItem("token");
        setIsAuthenticated(false);
      }
    };

    verifyToken();
  }, []);

  if (isAuthenticated === null) {
    return <div>Loading...</div>; // Show loading while verifying
  }

  return isAuthenticated ? <Outlet /> : <Navigate to="/auth" replace />;
};

export default ProtectedRoute;
