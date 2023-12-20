import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "./AuthProvider";

export default function PrivateRoutes() {
    const { isAuthenticated }= useAuth();

    console.log('Authentication Status in Private Route:', isAuthenticated);

    return isAuthenticated ? <Outlet /> : <Navigate to="/login" />;
    
}