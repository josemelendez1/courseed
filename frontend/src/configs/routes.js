import { Home, Heart, User, LogOut, Users } from "lucide-react";

const authRoutes = [
    {
        name: "Perfil",
        layout: "/perfil",
        icon: <User className="size-6" />
    },
    {
        name: "Salir",
        layout: "/salir",
        icon: <LogOut className="size-6" />
    }
];

const userRoutes = [
    {
        name: "Pagina de Inicio",
        layout: "/inicio",
        icon: <Home className="size-6" />
    },
    {
        name: "Cursos de Interes",
        layout: "/cursos/interes",
        icon: <Heart className="size-6" />,
    }
];

const adminRoutes = [
    {
        name: "Pagina de Inicio",
        layout: "/admin",
        icon: <Home className="size-6" />
    },
    { 
        name: "Usuarios",
        layout: "/usuarios",
        icon: <Users className="size-6" />
    }
]

export { authRoutes, userRoutes, adminRoutes };