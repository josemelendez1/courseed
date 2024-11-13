import { X } from "lucide-react";
import SidebarLinks from "./SidebarLinks";
import { adminRoutes, userRoutes } from "../../configs/routes";
import { useEffect, useState } from "react";
import { ROLES } from "../../configs/roles";
import { Link } from "react-router-dom";
import Avatar from "../Landing/Avatar";
import { useAuth } from "../../provider/AuthProvider";
import { AnimatePresence, motion } from "framer-motion";

const Sidebar = ({ open, onClose, roles = [] }) => {
    const [routes, setRoutes] = useState([]);
    const {user} = useAuth();

    useEffect(() => {
        if (!Array.isArray(roles)) return;
        
        setRoutes(roles.some(r => r.authority === ROLES.ADMIN) ? adminRoutes : userRoutes);
    }, [roles]);

    return (
        <div
            className={`fixed !z-50 flex min-h-full 
            flex-col bg-white pb-10 shadow-2xl shadow-white/5 transition-transform duration-200
            dark:!bg-[#111c44] dark:text-white md:!z-50 lg:!z-50 xl:!z-0
            ${ open ? "translate-x-0" : "-translate-x-96"}`}
        >
            <span
                className="absolute top-[1rem] right-[1rem] block cursor-pointer xl:hidden"
                onClick={onClose}
            >
                <X  className="size-5" />
            </span>
            <Link
                to="/"
                className="mx-[56px] mt-[50px] flex items-center"
            >
                <img
                    src="/logo.png"
                    alt="logo"
                    className="w-10 h-auto"
                />
                <p className="ml-1 text-[26px] font-bold text-[#1B254B] dark:text-white">
                    Cour<span className="font-normal">Seed</span>
                </p>
            </Link>
            <div className="mt-[38px] mb-[1.75rem] h-px bg-gray-300" />
            <ul className="mb-auto pt-1 ">
                <SidebarLinks routes={routes} />
            </ul>
            <div className="flex justify-center">
                <div className="relative mt-[3.5rem] flex w-[256px] justify-center rounded-[20px] bg-gradient-to-br from-sky-300 via-sky-600 to-sky-900 pb-4">
                    <div className="absolute -top-[3rem] flex h-24 w-24 items-center justify-center rounded-full border-[4px] border-white bg-gradient-to-b from-sky-300 to-sky-600 dark:!border-sky-950">
                        <AnimatePresence mode="wait">
                            <motion.div
                                key={user ? "show" : "hide"}
                                initial={{ opacity: 0, scale: 0.8 }}
                                animate={{ opacity: 1, scale: 1, transition: {type: "spring", stiffness: 100} }}
                                exit={{ opacity: 0, scale: 0.8 }}
                            >
                                { user && (
                                    <Avatar username={user?.username} className="rounded-full" />
                                )}
                            </motion.div>
                        </AnimatePresence>
                    </div>
                    <div className="mt-16 flex h-fit flex-col items-center">
                        <h2 className="text-lg font-bold text-white">{user?.username}</h2>
                        <p className="mt-1 px-4 text-center text-sm text-white">
                            Sesión iniciada correctamente.
                            Estás listo para comenzar tus cursos.
                        </p>
                        <Link
                            to="/salir"
                            className="mt-[1.75rem] block rounded-full bg-gradient-to-b from-white/50 to-white/10 py-[12px] px-[2.75rem] text-center text-base text-white hover:bg-gradient-to-b hover:from-white/[0.4] hover:to-white/5 "
                        >
                            Cerrar Sessión
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Sidebar;