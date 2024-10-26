
import { ProtectedAdminRoute, ProtectedRoute, ProtectedUserRoute } from "../routes/ProtectedRoute";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Dashboard } from "../pages/Dashboard/User/Dashboard";
import { Dashboard as DashboardAdmin } from "../pages/Dashboard/Admin/Dashboard";
import { Home } from "../pages/Landing/Home";
import Course from "../pages/Landing/Course";
import InterestCourses from "../pages/Dashboard/User/InterestCourses";
import Profile from "../pages/Dashboard/User/Profile";
import Logout from "../pages/Auth/Logout";
import { Register } from "../pages/Auth/Register";
import Login from "../pages/Auth/Login";
import Courses from "../pages/Landing/Courses";
import Help from "../pages/Landing/Help";
import Page404 from "../pages/Landing/404";
import Users from "../pages/Dashboard/Admin/Users";

const Routes = () => {
    const routesForAuthenticated = [
        {
            path: "/",
            element: <ProtectedRoute />,
            children: [
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
        },
        {
            path: "/cursos",
            element: <Courses />
        },
        {
            path: "/ayuda",
            element: <Help />
        },
        {
            path: "/curso/:id",
            element: <Course />
        },
    ];

    const routesForAdmin = [
        {
            path: "/",
            element: <ProtectedAdminRoute />,
            children: [
                {
                    path: "/admin",
                    element: <DashboardAdmin />
                },
                {
                    path: "/usuarios",
                    element: <Users />
                }
            ]
        }
    ];

    const routesForUser = [
        {
            path: "/",
            element: <ProtectedUserRoute />,
            children: [
                {
                    path: "/inicio",
                    element: <Dashboard />
                },
                {
                    path: "/cursos/interes",
                    element: <InterestCourses />
                },
            ]
        }
    ];

    const router = createBrowserRouter([
        {
            path: '/',
            errorElement: <Page404 />,
            children: [
                ...routesForNotAuthenticated,
                ...routesForAuthenticated,
                ...routesForAdmin,
                ...routesForUser
            ]
        }
    ]);

    return <RouterProvider router={router}></RouterProvider>
}

export default Routes;