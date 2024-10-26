import { AnimatePresence } from "framer-motion";
import { ArrowDownWideNarrow, ArrowUpNarrowWide, ChevronDown, ChevronLeft, ChevronRight, Heart, Settings2 } from "lucide-react";
import { motion } from "framer-motion";
import Avatar from "../Landing/Avatar";
import { ROLES } from "../../configs/roles";
import Dropdown from "./Dropdown";

export const ORDERS = Object.freeze({
    ASCENDING: "ascending",
    DESCENDING: "descending"
});

const container = {
    hidden: {
        opacity: 0,
        x: -10
    },
    visible: {
        opacity: 1,
        x: 0,
        transition: {
            delayChildren: 0.3,
            staggerChildren: 0.2
        }
    },
} 

const item = {
    hidden: { x: -10, opacity: 0 },
    visible: { x: 0, opacity: 1 }
}

const UsersTable = ({
    title = "Tabla de Usuarios",
    tHeaders = ["Usuario", "Cursos de Interes", "Rol", "Contraseña"],
    users = [],
    loading = true,
    pageSize = 10,
    pageNo = 0,
    onChangeRol = () => {},
    dropdownMenu, 
    onChangePassword = (username) => {},
    onChangePageNo = (newPageNo) => {},
    totalPages = 1,
    order = false,
    setOrder = () => {}
}) => {
    return (
        <div 
            className="!z-[5] relative flex flex-col rounded-[20px] bg-white 
            bg-clip-border shadow-[14px_17px_40px_4px] shadow-[rgba(112,_144,_176,_0.08)] 
            dark:!bg-[#111c44] dark:text-white dark:shadow-none w-full pb-10 p-4 h-full min-h-[50vh]"
        >
            <header className="relative flex items-center justify-between">
                <div className="text-xl font-semibold text-[#1B254B] dark:text-white">
                    {title}
                </div>
                <div className="w-auto flex items-center gap-3">
                    <AnimatePresence mode="wait">
                        <motion.button
                            key={order ? order : "empty"}
                            type="button"
                            variants={item}
                            initial="hidden"
                            animate="visible"
                            exit={{ x: 10, opacity: 0 }}
                            title={{
                                [ORDERS.ASCENDING]: "Ascendente",
                                [ORDERS.DESCENDING]: "Descendente"
                                }[order]
                            }
                            onClick={() => setOrder(order === ORDERS.ASCENDING ? ORDERS.DESCENDING : ORDERS.ASCENDING)}
                            className={`flex items-center text-xl hover:cursor-pointer bg-[#F4F7FE] 
                            p-2 text-sky-600 hover:bg-gray-100 dark:bg-[#1B254B] dark:text-white 
                            dark:hover:bg-white/[0.2] dark:active:bg-white/10 linear justify-center rounded-lg 
                            font-bold transition duration-200 ${order === false && "hidden"}`}
                        >
                            {{
                                [ORDERS.ASCENDING]: <ArrowUpNarrowWide className="size-6" />,
                                [ORDERS.DESCENDING]: <ArrowDownWideNarrow className="size-6" />
                            }[order]}
                        </motion.button>
                    </AnimatePresence> 
                    {dropdownMenu}
                </div>
            </header>
            <div className="mt-6 overflow-x-scroll xl:overflow-x-hidden">
                <table className="w-full table-auto">
                    <thead>
                        <tr className="border-b border-b-gray-100 dark:border-b-white/[0.2]">
                            { tHeaders.map((tHeader, i) => (
                                <th 
                                    key={i}
                                    scope="col"
                                    className="py-3 px-4 text-start text-sm font-semibold 
                                    text-gray-400 uppercase dark:text-neutral-400"
                                >
                                    {tHeader}
                                </th>
                            ))}
                        </tr>
                    </thead>
                    <AnimatePresence mode="wait">
                        <motion.tbody
                            key={loading ? "skeleton" : "data"}
                            variants={container}
                            initial="hidden"
                            animate="visible"
                            exit={{ x: 10, opacity: 0 }}
                        >
                            {!loading ? (
                                users.map((user, i) => (
                                    <UserRow 
                                        key={user.username} 
                                        user={user} 
                                        onChangeRol={(user, role) => onChangeRol(user, role)}
                                        onChangePassword={(username) => onChangePassword(username)}
                                    />
                                ))
                            ) : (
                                Array(pageSize).fill(1).map((x, i) => (
                                    <tr key={i} className="animate-pulse">
                                        <td className="max-w-0 py-4 min-w-[15rem] lg:w-[25%] px-4">
                                            <div className="w-full grid items-center grid-cols-[auto_1fr] gap-3">
                                                <div className="bg-slate-200 h-10 w-10 rounded-md dark:bg-white/10" />
                                                <div className="space-y-3">
                                                    <div className="grid grid-cols-3 gap-3">
                                                        <div className="h-2 bg-slate-200 rounded col-span-2 dark:bg-white/5"></div>
                                                        <div className="h-2 bg-slate-200 rounded col-span-1 dark:bg-white/5"></div>
                                                    </div>
                                                    <div className="h-2 bg-slate-200 rounded mr-6 dark:bg-white/5"></div>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="max-w-0 py-4 min-w-[15rem] w-full lg:w-[15%] px-4">
                                            <div className="w-full grid items-center grid-cols-[1fr_auto] gap-3">
                                                <div className="space-y-3">
                                                    <div className="h-2 bg-slate-200 rounded col-span-1 dark:bg-white/5"></div>
                                                    <div className="h-2 bg-slate-200 rounded mr-6 dark:bg-white/5"></div>
                                                </div>
                                                <Heart className="size-6 text-slate-200 dark:text-white/10" />
                                            </div>
                                        </td>
                                        <td className="max-w-0 py-4 min-w-[10rem] w-full lg:w-[17.5%] px-4">
                                            <div className="w-full grid items-center grid-cols-[1fr_auto] gap-3">
                                                <div className="space-y-3">
                                                    <div className="grid grid-cols-3 gap-3">
                                                        <div className="h-2 bg-slate-200 rounded col-span-2 dark:bg-white/5"></div>
                                                        <div className="h-2 bg-slate-200 rounded col-span-1 dark:bg-white/5"></div>
                                                    </div>
                                                    <div className="h-2 bg-slate-200 rounded mr-6 dark:bg-white/5"></div>
                                                </div>
                                                <ChevronDown className="size-6 text-slate-200 dark:text-white/10" />
                                            </div>
                                        </td>
                                        <td className="max-w-0 py-4 min-w-[15rem] w-full lg:w-[25%] px-4">
                                            <div className="w-full grid items-center grid-cols-[1fr_auto] gap-3">
                                                <div className="space-y-3">
                                                    <div className="grid grid-cols-3 gap-3">
                                                        <div className="h-2 bg-slate-200 rounded col-span-2 dark:bg-white/5"></div>
                                                        <div className="h-2 bg-slate-200 rounded col-span-1 dark:bg-white/5"></div>
                                                    </div>
                                                    <div className="h-2 bg-slate-200 rounded col-span-1 dark:bg-white/5 mr-6"></div>
                                                </div>
                                                <Settings2 className="size-6 text-slate-200 dark:text-white/10" />
                                            </div>
                                        </td>
                                    </tr>
                                ))
                            )}
                        </motion.tbody>
                    </AnimatePresence>
                </table>
                <div className="w-full flex items-center justify-end gap-3">
                    <button
                        type="button"
                        title="Pagina Anterior"
                        onClick={() => onChangePageNo(pageNo - 1)}
                        className="flex items-center text-xl hover:cursor-pointer bg-[#F4F7FE] 
                        p-2 text-sky-600 hover:bg-gray-100 dark:bg-[#1B254B] dark:text-white 
                        dark:hover:bg-white/[0.2] dark:active:bg-white/10 linear justify-center rounded-lg 
                        font-bold transition duration-200"
                    >
                        <ChevronLeft className="size-6" />
                    </button>
                    <button
                        type="button"
                        title="Pagina Posterior"
                        onClick={() => onChangePageNo(pageNo + 1)}
                        className="flex items-center text-xl hover:cursor-pointer bg-[#F4F7FE] 
                        p-2 text-sky-600 hover:bg-gray-100 dark:bg-[#1B254B] dark:text-white 
                        dark:hover:bg-white/[0.2] dark:active:bg-white/10 linear justify-center rounded-lg 
                        font-bold transition duration-200"
                    >
                        <ChevronRight className="size-6" />
                    </button>
                </div>
            </div>
        </div>
    );
}

const UserRow = ({
    user = {},
    onChangeRol = (user, role) => {},
    onChangePassword = (username) => {}
}) => {

    const getRole = (user) => {
        const role = (Array.isArray(user.roles) && user.roles.length > 0) ? user.roles[0].authority : ROLES.USER;

        switch (role) {
            case ROLES.ADMIN:
                return "Administrador";
            case ROLES.USER:
                return "Usuario";
            default:
                return "Usuario";
        }
    }

    const getPassword = (user) => {
        return user.username.replace(/./g, '•');
    }

    return (
        <motion.tr variants={item}>
            <td 
                className="max-w-0 py-4 min-w-[15rem] lg:w-[25%] px-4
                text-sm font-medium text-gray-800 dark:text-neutral-200 
                overflow-hidden"
            >
                <div className="w-full grid items-center grid-cols-[auto_1fr] gap-3 tracking-wide">
                    <Avatar username={user.username} className="size-10 rounded-md shadow-sm dark:shadow-none" />
                    <p>{user.username}</p>
                </div>
            </td>
            <td 
                className="max-w-0 py-4 px-4 min-w-[15rem] w-full lg:w-[15%] 
                text-sm font-medium text-gray-800 dark:text-neutral-200 
                overflow-hidden"
            >
                <div className="w-full flex items-center justify-start gap-3 tracking-wide">
                    <p className="block">{Array.isArray(user.likes) ? user.likes.length : 0} cursos de interes</p>
                    <Heart className="size-6 text-sky-600 dark:text-white/50" />
                </div>
            </td>
            <td 
                className="max-w-0 py-4 min-w-[10rem] w-full lg:w-[17.5%] px-4
                text-sm font-medium text-gray-800 dark:text-neutral-200"
            >
                <div className="w-full flex items-center justify-start gap-3 tracking-wide">
                    <AnimatePresence mode="wait">
                        <motion.p
                            key={`${getRole(user)}-${user.username}`}
                            variants={item}
                            initial="hidden"
                            animate="visible"
                            exit={{ x: 10, opacity: 0 }}
                        >
                            {getRole(user).toUpperCase()}
                        </motion.p>
                    </AnimatePresence>
                    <Dropdown 
                        button={
                            <button type="button" className="text-slate-400 dark:text-white/50">
                                <ChevronDown className="size-6" />
                            </button>
                        }
                        classNames="py-2 top-[2rem] -left-[180px] w-[max-content]"
                    >
                        <div 
                            className="flex w-56 flex-col justify-start rounded-[20px] 
                            bg-white bg-cover bg-no-repeat shadow-xl shadow-[rgba(112,144,176,0.08)] 
                            border border-gray-100 dark:border-transparent
                            dark:!bg-[#1B254B] dark:text-white dark:shadow-none"
                        >
                            <div className="p-4">
                                <div className="flex items-center gap-2">
                                    <p className="text-sm font-semibold text-[#1B254B] dark:text-white">
                                        Asignar Nuevo Rol
                                    </p>
                                </div>
                            </div>
                            <div className="h-px w-full bg-gray-200 dark:bg-white/25 " />
                            <div className="flex flex-col p-4 gap-y-2">
                                <label 
                                    htmlFor={`${ROLES.ADMIN}-${user.username}`}
                                    className="flex items-center justify-start gap-3"
                                >
                                    <input
                                        id={`${ROLES.ADMIN}-${user.username}`}
                                        defaultValue={ROLES.ADMIN}
                                        checked={user.roles.some(r => r.authority === ROLES.ADMIN)}
                                        onChange={() => {
                                            onChangeRol(user, ROLES.ADMIN);
                                        }}
                                        type="checkbox"
                                        className="h-4 min-h-4 w-4 min-w-[1rem] rounded border-gray-300 text-sky-600 focus:ring-sky-500"
                                    />
                                    <span className={user.roles.some(r => r.authority === ROLES.ADMIN) ? "text-gray-800 dark:text-white" : "text-gray-400"}>
                                        {"Administrador".toUpperCase()}
                                    </span>
                                </label>
                                <label 
                                    htmlFor={ROLES.USER}
                                    className="flex items-center justify-start gap-3"
                                >
                                    <input
                                        id={ROLES.USER}
                                        defaultValue={ROLES.USER}
                                        checked={user.roles.some(r => r.authority === ROLES.USER)}
                                        onChange={() => {
                                            onChangeRol(user, ROLES.USER);
                                        }}
                                        type="checkbox"
                                        className="h-4 min-h-4 w-4 min-w-[1rem] rounded border-gray-300 text-sky-600 focus:ring-sky-500"
                                    />
                                    <span className={user.roles.some(r => r.authority === ROLES.USER) ? "text-gray-800 dark:text-white" : "text-gray-400"}>
                                        {"Usuario".toUpperCase()}
                                    </span>
                                </label>
                            </div>
                        </div>
                    </Dropdown>
                </div>
            </td>
            <td 
                className="max-w-0 py-4 min-w-[15rem] w-full lg:w-[25%] lg:max-w-[25%] px-4
                text-lg font-medium text-gray-800 dark:text-neutral-200 
                overflow-hidden"
            >
                <div className="w-full grid items-center grid-cols-[1fr_auto] gap-3 tracking-widest">
                    <p className="truncate">{getPassword(user)}</p>
                    <button
                        type="button"
                        onClick={() => onChangePassword(user.username)}
                        className="text-slate-400 hover:text-sky-600 dark:text-white/50 dark:hover:text-white"
                    >
                        <Settings2 className="size-6 " />
                    </button>
                </div>
            </td>
        </motion.tr>
    );
}

export default UsersTable;