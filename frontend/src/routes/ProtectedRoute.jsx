import { Navigate, Outlet } from "react-router-dom";
import { useIsAdmin, useIsAuth, useIsUser } from "../provider/AuthProvider";

const ProtectedRoute = () => {
    const isAuth = useIsAuth();

    if (isAuth === null) return null;

    return isAuth ? <Outlet /> : <Navigate to="/acceso" />;
}

const ProtectedAdminRoute = () => {
    const isAdmin = useIsAdmin();

    if (isAdmin === null) return null;

    return isAdmin ? <Outlet /> : <Navigate to="/acceso" />
}

const ProtectedUserRoute = () => {
    const isUser = useIsUser();

    if (isUser === null) return null;

    return isUser ? <Outlet /> : <Navigate to="/acceso" />
}

export { ProtectedRoute, ProtectedAdminRoute, ProtectedUserRoute };