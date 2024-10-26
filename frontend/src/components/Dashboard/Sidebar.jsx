import { X } from "lucide-react";
import SidebarLinks from "./SidebarLinks";
import { adminRoutes, userRoutes } from "../../configs/routes";
import { useEffect, useState } from "react";
import { ROLES } from "../../configs/roles";

const Sidebar = ({ open, onClose, roles = [] }) => {

    const [routes, setRoutes] = useState([]);

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
            <div className="mx-[56px] mt-[50px] flex items-center ">
                <img
                    src="/logo.png"
                    alt="logo"
                    className="w-10 h-auto"
                />
                <p className="ml-1 text-[26px] font-bold uppercase text-[#1B254B] dark:text-white">
                    Cour<span className="font-medium">SEED</span>
                </p>
            </div>
            <div className="mt-[38px] mb-[1.75rem] h-px bg-gray-300" />
            <ul className="mb-auto pt-1 ">
                <SidebarLinks routes={routes} />
            </ul>
        </div>
    );
}

export default Sidebar;