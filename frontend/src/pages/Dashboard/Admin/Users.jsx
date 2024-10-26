import { useEffect, useState } from "react";
import { HeadProvider } from "../../../provider/HeadProvider";
import Sidebar from "../../../components/Dashboard/Sidebar";
import { useAuth } from "../../../provider/AuthProvider";
import { AnimatePresence, motion } from "framer-motion";
import Navbar from "../../../components/Dashboard/Navbar";
import axios from "axios";
import { APIS } from "../../../configs/apis";
import Footer from "../../../components/Dashboard/Footer";
import UsersTable, { ORDERS } from "../../../components/Dashboard/UsersTable";
import DialogForm from "../../../components/Dashboard/DialogForm";
import { Ellipsis, Heart, Info, KeyRound, LoaderCircle, LockKeyhole, User } from "lucide-react";
import Notification from "../../../components/Landing/Notification";
import { ROLES } from "../../../configs/roles";
import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";

const container = {
    hidden: { x: -20, opacity: 0 },
    visible: { x: 0, opacity: 1, transition: { duration: 0.2, type: "keyframes" } }
}

const containerForm = {
    hidden: { opacity: 0, x: -10 },
    visible: {
        opacity: 1, x: 0,
        transition: {
            type: "tween",
            delayChildren: 0.2,
            staggerChildren: 0.1
        }
    }
}

const itemForm = {
    hidden: { x: -10, opacity: 0 },
    visible: {
        x: 0,
        opacity: 1,
        transition: {
            type: "tween"
        }
    },
    exit: {
        x: 10,
        opacity: 0,
        transition: {
            type: "tween"
        }
    }
}

const notification = {
    hidden: { x: 50, opacity: 0 },
    visible: { x: 0, opacity: 1 }
}

const sortableColumns = [
    {
        name: "username",
        icon: <User className="size-4 fill-white/30" />,
        title: "Ordenar por Usuarios", 
    },
    {
        name: "likes",
        icon: <Heart className="size-4 fill-white/30" />,
        title: "Ordenar Por Interes", 
    },
]

const Users = () => {
    const pageSize = 10;
    const { user } = useAuth();
    const currentRoute = "Usuarios";
    const [loading, setLoading] = useState(true);
    const [pageNo, setPageNo] = useState(0);
    const [totalPages, setTotalPages] = useState(1);
    const [search, setSearch] = useState("");
    const [users, setUsers] = useState([]);
    const [order, setOrder] = useState(false);
    const [sortableColumn, setSortableColumn] = useState(null);
    const [open, setOpen] = useState(window.innerWidth >= 1280);
    const [openFormChangePassword, setOpenChangePassword] = useState(false);
    const [changedPassword, setChangedPassword] = useState(false);
    const [loadingChangePassword, setLoadingChangePassword] = useState(false);
    const [formChangePassword, setFormChangePassword] = useState({
        username: "",
        newPassword: "",
        confirmNewPassword: ""
    });

    const [errorFormChangePassword, setErrorFormChangePassword] = useState({
        username: null,
        newPassword: null,
        confirmNewPassword: null,
        matchChangePassword: null
    });

    const handleUsers = () => {
        axios.get(APIS.GET_USERS, {
            params: {
                pageNo: pageNo,
                pageSize: pageSize
            }
        })
            .then(response => {
                const content = response.data?.content;
                const totalPages = response.data?.totalPages;
                
                if (Array.isArray(content)) setUsers(content);
                if (typeof totalPages === "number") setTotalPages(totalPages);
            })
            .catch(error => {
                setUsers([]);
            })
            .finally(() => {
                setTimeout(() => setLoading(false), 500);
            })
    }

    const handleChangeRole = (user, role) => {
        axios.put(APIS.UPDATE_ROLE, {
            username: user.username,
            role: role
        })
            .then(response => {
                if (typeof response.data === "object") {
                    setUsers(users.map(u => {
                        if (u.username === user.username) {
                            return {
                                ...u,
                                roles: [...response.data.roles],
                            };
                        } else {
                            return u;
                        }
                    }));
                }
            })
            .catch(error => {
                console.log(error);
            })
    }

    const handleChangePassword = (e) => {
        e.preventDefault();
        setLoadingChangePassword(true);
        axios.put(APIS.UPDATE_PASSWORD_ADMIN, formChangePassword)
            .then(response => {
                if (typeof response?.data === "object") {
                    setUsers(users.map(user => {
                        if (user.username === response.data.username) {
                            return {
                                ...user,
                                password: response.data.password
                            };
                        } else {
                            return user;
                        }
                    }))
                    setErrorFormChangePassword({
                        username: null,
                        newPassword: null,
                        confirmNewPassword: null,
                        matchChangePassword: null
                    });
                    setFormChangePassword({
                        ...formChangePassword,
                        newPassword: "",
                        confirmNewPassword: ""
                    });
                    setChangedPassword(true);
                    setOpenChangePassword(false);
                }
                setChangedPassword(true);
            })
            .catch(error => {
                const data = error?.response?.data;
                if (typeof data === "object") {
                    setErrorFormChangePassword({
                        username: data.username,
                        newPassword: data.newPassword,
                        confirmNewPassword: data.confirmNewPassword,
                        matchChangePassword: data.matchChangePassword 
                    });

                    if (data.matchChangePassword) {
                        setFormChangePassword({
                            ...formChangePassword,
                            confirmNewPassword: ""
                        });
                    }

                    if (data.username) {
                        setFormChangePassword({
                            newPassword: "",
                            confirmNewPassword: ""
                        });
                    }
                }
            })
            .finally(() => {
                setTimeout(() => {
                    setLoadingChangePassword(false);
                }, 1000);
            });
    }

    const handlePagination = (newPageNo) => {
        if (newPageNo >= 0 && newPageNo < totalPages) setPageNo(newPageNo);
    }

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

    const handleSearchUser = (user) => {
        if (search.trim().length === 0) return true;
        return (typeof user.username === "string" && user.username.toLowerCase().includes(search.toLowerCase().trim())) || 
        getRole(user).toLowerCase().includes(search.trim().toLowerCase());
    }

    const handleOrder = (a, b) => {
        return order === ORDERS.ASCENDING 
            ? handleSortableColumn(a, b)
            : handleSortableColumn(b, a)
    }

    const handleSortableColumn = (a, b) => {
        return sortableColumn === sortableColumns[0].name 
            ? a.username.localeCompare(b.username) 
            : a.likes.length - b.likes.length;
    } 

    useEffect(handleUsers, [pageSize, pageNo]);
    useEffect(() => { window.scrollTo(0, 0) }, []);

    return (
        <div className="flex w-full h-full">
            <HeadProvider title="CourSeed - Usuarios" />
            <Sidebar open={open} onClose={() => setOpen(false)} roles={user?.roles} />
            <div className="h-full w-full bg-[#F4F7FE] dark:!bg-[#0b1437]">
                <motion.main
                    variants={container}
                    initial="hidden"
                    animate="visible"
                    className="mx-[12px] h-full flex-none transition-all md:pr-2 xl:ml-[313px]"
                >
                    <div className="h-full">
                        <Navbar
                            search={search}
                            brandText={currentRoute}
                            username={user?.username}
                            onOpenSidenav={() => setOpen(true)}
                            setSearch={(value) => setSearch(value)}
                        />
                        <div className="pt-5 mx-auto mb-auto h-full min-h-[84vh] p-2 md:pr-2">
                            <UsersTable
                                pageNo={pageNo}
                                loading={loading}
                                order={order}
                                pageSize={pageSize}
                                totalPages={totalPages}
                                users={!order ? users.filter(handleSearchUser) : users.filter(handleSearchUser).toSorted(handleOrder)}
                                onChangeRol={(user, role) => handleChangeRole(user, role)}
                                tHeaders={["Usuario", "Cursos de Interes", "Rol", "Contraseña"]}
                                onChangePageNo={(newPageNo) => handlePagination(newPageNo)}
                                setOrder={(newOrder) => setOrder(newOrder)}
                                onChangePassword={(username) => {
                                    setOpenChangePassword(true);
                                    setFormChangePassword({
                                        ...formChangePassword,
                                        username: username
                                    });
                                }}
                                dropdownMenu={
                                    <Menu>
                                        <MenuButton 
                                            as="button"
                                            className="flex items-center text-xl hover:cursor-pointer bg-[#F4F7FE] 
                                            p-2 text-sky-600 hover:bg-gray-100 dark:bg-[#1B254B] dark:text-white 
                                            dark:hover:bg-white/[0.2] dark:active:bg-white/10 linear justify-center rounded-lg 
                                            font-bold transition duration-200"
                                        >
                                            <Ellipsis className="size-6" />
                                        </MenuButton>
                                        <MenuItems
                                            transition
                                            anchor="bottom end"
                                            className="w-52 origin-top-right rounded-xl border border-gray-50 p-1 z-50
                                            text-sm/6 text-gray-600 dark:text-white transition duration-100 ease-out 
                                            [--anchor-gap:var(--spacing-1)] dark:border-transparent
                                            focus:outline-none data-[closed]:scale-95 data-[closed]:opacity-0 shadow-xl
                                            flex flex-col justify-center items-start gap-y-1 bg-white dark:!bg-[#1B254B]"
                                        >
                                            {sortableColumns.map((column, i) => (
                                                <MenuItem key={i}>
                                                    <button 
                                                        onClick={() => {
                                                            setOrder(ORDERS.ASCENDING);
                                                            setSortableColumn(column.name);
                                                        }}
                                                        className="group flex w-full items-center gap-2 rounded-lg py-1.5 px-3
                                                        hover:bg-gray-100 dark:hover:bg-white/[0.1] py-2"
                                                    >
                                                        {column.icon}
                                                        {column.title}
                                                    </button>
                                                </MenuItem>
                                            ))}
                                        </MenuItems>
                                    </Menu>
                                }
                            />
                            <DialogForm
                                isOpen={openFormChangePassword}
                                setIsOpen={(value) => setOpenChangePassword(value)}
                                className="rounded-[21px]"
                                title={formChangePassword.username}
                                onSubmit={handleChangePassword}
                            >
                                <motion.div
                                    variants={containerForm}
                                    initial="hidden"
                                    animate="visible"
                                    className="grid grid-cols-1 gap-4"
                                >
                                    <motion.div variants={itemForm} className="w-full mt-4">
                                        <label
                                            htmlFor="newPassword"
                                            className="flex flex-col items-start justify-center rounded-2xl 
                                            bg-white bg-clip-border px-3 py-4 shadow-[14px_17px_40px_4px] 
                                            shadow-[rgba(112,_144,_176,_0.08)] dark:!bg-[#1B254B] dark:shadow-none
                                            border border-transparent hover:border-gray-100 focus-within:border-gray-100 
                                            dark:hover:border-gray-600 dark:focus-within:border-gray-600"
                                        >
                                            <p className="text-sm text-gray-400 inline-flex items-center gap-1">
                                                Nueva Contraseña
                                                <LockKeyhole className="size-5 text-sky-600" />
                                            </p>
                                            <input
                                                id="newPassword"
                                                name="newPassword"
                                                value={formChangePassword.newPassword}
                                                onChange={(e) => setFormChangePassword({
                                                    ...formChangePassword,
                                                    newPassword: e.target.value
                                                })}
                                                type="password"
                                                autoComplete="new-password"
                                                className="w-full text-base font-medium text-[#1B254B] 
                                                dark:text-white px-0 bg-transparent border-0 focus:ring-0"
                                            />
                                        </label>
                                        <AnimatePresence mode="wait">
                                            <motion.div
                                                key={(errorFormChangePassword.newPassword || errorFormChangePassword.username || errorFormChangePassword.matchChangePassword) ? "show" : "hide"}
                                                variants={itemForm}
                                                initial="hidden"
                                                animate="visible"
                                                exit="exit"
                                            >
                                                {(errorFormChangePassword.newPassword || errorFormChangePassword.username || errorFormChangePassword.matchChangePassword) &&
                                                    <p className="flex items-start mt-2 gap-1 text-xs text-red-600 line-clamp-2">
                                                        <Info className="w-4 h-4" />
                                                        <span>
                                                            {
                                                                errorFormChangePassword.newPassword
                                                                    ? errorFormChangePassword.newPassword
                                                                    : errorFormChangePassword.username
                                                                        ? errorFormChangePassword.username
                                                                        : errorFormChangePassword.matchChangePassword
                                                            }
                                                        </span>
                                                    </p>
                                                }
                                            </motion.div>
                                        </AnimatePresence>
                                    </motion.div>
                                    <motion.div variants={itemForm} className="w-full mt-4">
                                        <label
                                            htmlFor="confirmNewPassword"
                                            className="flex flex-col items-start justify-center rounded-2xl 
                                            bg-white bg-clip-border px-3 py-4 shadow-[14px_17px_40px_4px] 
                                            shadow-[rgba(112,_144,_176,_0.08)] dark:!bg-[#1B254B] dark:shadow-none
                                            border border-transparent hover:border-gray-100 focus-within:border-gray-100 
                                            dark:hover:border-gray-600 dark:focus-within:border-gray-600"
                                        >
                                            <p className="text-sm text-gray-400 inline-flex items-center gap-1">
                                                Confirmar Nueva Contraseña
                                                <KeyRound className="size-5 text-sky-600" />
                                            </p>
                                            <input
                                                id="confirmNewPassword"
                                                name="confirmNewPassword"
                                                value={formChangePassword.confirmNewPassword}
                                                onChange={(e) => setFormChangePassword({
                                                    ...formChangePassword,
                                                    confirmNewPassword: e.target.value
                                                })}
                                                type="password"
                                                autoComplete="new-password"
                                                className="w-full text-base font-medium text-[#1B254B] 
                                                dark:text-white px-0 bg-transparent border-0 focus:ring-0"
                                            />
                                        </label>
                                        <AnimatePresence mode="wait">
                                            <motion.div
                                                key={errorFormChangePassword.confirmNewPassword ? "show" : "hide"}
                                                variants={itemForm}
                                                initial="hidden"
                                                animate="visible"
                                                exit="exit"
                                            >
                                                {errorFormChangePassword.confirmNewPassword &&
                                                    <p className="flex items-start mt-2 gap-1 text-xs text-red-600 line-clamp-2">
                                                        <Info className="w-4 h-4" />
                                                        <span>{errorFormChangePassword.confirmNewPassword}</span>
                                                    </p>
                                                }
                                            </motion.div>
                                        </AnimatePresence>
                                    </motion.div>
                                    <motion.div variants={itemForm} className="w-full text-end">
                                        <button
                                            type="submit"
                                            disabled={loadingChangePassword}
                                            className="w-auto text-center text-white bg-sky-700 px-6  
                                            text-sm font-semibold shadow-sm hover:bg-sky-600 focus-visible:outline focus-visible:outline-2 py-3
                                            focus-visible:outline-offset-2 focus-visible:outline-sky-700 dark:bg-blue-600 dark:hover:bg-blue-700
                                            mt-6 rounded-[25px]"
                                        >
                                            <AnimatePresence mode="wait">
                                                <motion.div
                                                    key={loadingChangePassword ? "loading" : "not-loading"}
                                                    variants={itemForm}
                                                    initial="hidden"
                                                    animate="visible"
                                                    exit="exit"
                                                    className="inline-flex items-center justify-center gap-1 sm:gap-2"
                                                >
                                                    { loadingChangePassword ? (
                                                        <>Actualizando contraseña <LoaderCircle className="animate-spin size-5" /></>
                                                    ) : (
                                                        <>Actualizar Contraseña</>
                                                    )
                                                    }
                                                </motion.div>
                                            </AnimatePresence>
                                        </button>
                                    </motion.div>
                                </motion.div>
                            </DialogForm>
                            <AnimatePresence mode="wait">
                                <motion.div
                                    key={changedPassword ? "show" : "hide"}
                                    variants={notification}
                                    initial="hidden"
                                    animate="visible"
                                    exit="hidden"
                                    className="fixed top-[11rem] sm:top-[7.5rem] right-[1.25rem] z-30"
                                >
                                    { changedPassword && (
                                        <Notification 
                                            title="Contraseña actualizada" 
                                            description={<>Contraseña de <b>{formChangePassword.username}</b> actualizada.</>}
                                            onClose={() => setChangedPassword(false)} 
                                        />
                                    )}
                                </motion.div>
                            </AnimatePresence>
                        </div>
                        <div className="p-3">
                            <Footer />
                        </div>
                    </div>
                </motion.main>
            </div>
        </div>
    );
}

export default Users;