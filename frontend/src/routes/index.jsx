import Logout from "../pages/Logout";
import Login from "../pages/Login";
import { ProtectedRoute } from "../routes/ProtectedRoute";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Page404 } from "../pages/404";
import { Register } from "../pages/Register";
import { Home } from "../pages/Home";
import { Dashboard } from "../pages/Dashboard";
import { Profile } from "../pages/Profile";

const Routes = () => {
    const routesForAuthenticated = [
        {
            path: "/",
            element: <ProtectedRoute />,
            children: [
                {
                    path: "/inicio",
                    element: <Dashboard />
                },
                {
                    path: "/perfil",
                    element: <Profile />
                },
                {
                    path: "/salir",
                    element: <Logout />
                    
                }
            ]
        }
    ];

    const routesForNotAuthenticated = [
        {
            path: "",
            element: <Home />
        },
        {
            path: "/acceso",
            element: <Login />
        },
        {
            path: "/registro",
            element: <Register />
        }
    ];

    const router = createBrowserRouter([
        {
            path: '/',
            errorElement: <Page404 />,
            children: [
                ...routesForNotAuthenticated,
                ...routesForAuthenticated
            ]
        }
    ]);

    return <RouterProvider router={router}></RouterProvider>
}

export default Routes;