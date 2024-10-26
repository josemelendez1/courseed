import { useAuth } from "../provider/AuthProvider";
import { Navigate, Outlet } from "react-router-dom";

const ProtectedRoute = () => {
    const { token } = useAuth();
    
    if (!token) {
        return <Navigate to="/acceso" />
    }

    return <Outlet />
}

export { ProtectedRoute };