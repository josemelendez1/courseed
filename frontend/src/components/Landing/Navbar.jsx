import { Link } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import { Home, LogOut, Menu, UserPen, X } from "lucide-react";
import useAnimatedNavToggler from "../../helpers/useAnimatedNavToggler";
import { useAuth } from "../../provider/AuthProvider";
import Dropdown from "../Dashboard/Dropdown";
import Avatar from "./Avatar";
import { ROLES } from "../../configs/roles";

const Navbar = ({ light = false, className = "" }) => {

    const { user, handleToken, setUser } = useAuth();

    const navigation = [
        { name: 'Cursos', href: '/cursos' },
        { name: 'Centro de Soporte', href: '/ayuda' },
    ]

    const { showNavLinks, animation, toggleNavbar } = useAnimatedNavToggler();

    const handleLogout = () => {
        handleToken(null);
        setUser(null);
    }

    const isAdmin = () => {
        return Array.isArray(user?.roles) && user.roles.some(c => c.authority === ROLES.ADMIN);
    }

    return (
        <header className={`flex justify-between items-center max-w-screen-xl mx-auto ${className}`} >
            <nav className="hidden lg:flex flex-1 justify-between items-center">
                <Link
                    to="/"
                    className={`
                        my-2 lg:my-0 mr-6 tracking-wide transition duration-300 font-inter
                        pb-1 border-transparent flex items-center font-bold border-b-0 text-2xl ml-0
                        ${light ? 'text-gray-100 hover:text-gray-300 focus:text-gray-300' : 'hover:text-sky-600 focus:text-sky-600'}`
                    }
                >
                    <img
                        src="/logo.png"
                        alt="logo"
                        className="w-10 mr-3"
                    />
                    CourSeed
                </Link>
                <div className="inline-flex items-center">
                    {navigation.map((link, i) => (
                        <Link
                            key={i}
                            to={link.href}
                            className={`text-lg my-2 lg:text-sm lg:mx-6 lg:my-0 
                            font-semibold tracking-wide transition duration-300 pb-1 border-b-2 border-transparent
                            ${light ? 'text-gray-100 hover:border-gray-300 hover:text-gray-300 focus:text-gray-300' : 'hover:border-sky-600 hover:text-sky-600 focus:text-sky-600'}`}
                        >
                            {link.name}
                        </Link>
                    ))}
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={user ? "show" : "hide"}
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -20 }}
                            className="flex items-center"
                        >
                            {user ? (
                                <Dropdown
                                    button={
                                        <>
                                            <p className={`my-2 text-lg lg:text-sm lg:my-0 lg:ml-12 lg:mr-3
                                                font-semibold tracking-wide transition duration-300 pb-1 border-b-2 border-transparent
                                                ${light && 'text-gray-100'}`}
                                            >
                                                {user?.username}
                                            </p>
                                            <Avatar
                                                username={user?.username}
                                                className="w-10 h-10 rounded-full cursor-pointer"
                                            />
                                        </>
                                    }
                                    classNames={"py-2 top-[2rem] right-0 w-[max-content] my-2"}
                                >
                                    <div 
                                        className="flex w-56 flex-col justify-start rounded-[20px] 
                                        bg-white bg-cover bg-no-repeat shadow-xl shadow-[rgba(112,144,176,0.08)] 
                                        dark:!bg-[#1B254B] dark:text-white dark:shadow-none border border-gray-100"
                                    >
                                        <div className="p-4">
                                            <div className="flex items-center gap-2">
                                                <p className="text-sm font-bold text-[#1B254B] dark:text-white">
                                                    👋 Hola, {user?.username}
                                                </p>
                                            </div>
                                        </div>
                                        <div className="h-px w-full bg-gray-200 dark:bg-white/25 " />
                                        <div className="flex flex-col p-4">
                                            <Link
                                                to={isAdmin() ? "/admin" : "/inicio"}
                                                className="text-sm text-gray-800 dark:text-white hover:dark:text-white inline-flex items-center gap-2"
                                            >
                                                <span>Inicio</span>
                                                <Home className="size-4" />
                                            </Link>
                                            <Link
                                                to="/perfil"
                                                className="mt-3 text-sm text-gray-800 dark:text-white hover:dark:text-white inline-flex items-center gap-2"
                                            >
                                                <span>Perfil de usuario</span>
                                                <UserPen className="size-4" />
                                            </Link>
                                            <button
                                                onClick={handleLogout}
                                                className="mt-3 text-sm font-medium text-red-500 hover:text-red-500 transition duration-150 ease-out hover:ease-in inline-flex items-center gap-2"
                                            >
                                                <span>Finalizar Sesión</span>
                                                <LogOut className="size-4" />
                                            </button>
                                        </div>
                                    </div>
                                </Dropdown>
                            ) : (
                                <>
                                    <Link
                                        to="/acceso"
                                        className={`text-lg my-2 lg:text-sm lg:mx-6 lg:my-0 lg:ml-12 
                                        font-semibold tracking-wide transition duration-300 pb-1 border-b-2 border-transparent
                                        ${light ? 'text-gray-100 hover:border-gray-300 hover:text-gray-300 focus:text-gray-300' : 'hover:border-sky-600 hover:text-sky-600 focus:text-sky-600'}`}
                                    >
                                        Iniciar Sesión
                                    </Link>
                                    <Link
                                        to="/registro"
                                        className="text-lg lg:text-sm my-2 lg:my-0 font-semibold tracking-wide transition duration-300
                                        px-6 py-[.7rem] rounded-3xl bg-sky-600 text-gray-50 hover:bg-sky-700 hover:text-white 
                                        ring-2 ring-transparent focus:ring-sky-500"
                                    >
                                        Registrarse
                                    </Link>
                                </>
                            )}
                        </motion.div>
                    </AnimatePresence>
                </div>
            </nav>
            <nav className="flex lg:hidden flex-1 items-center justify-between">
                <Link
                    to="/"
                    className={`my-2 lg:my-0 mr-6 tracking-wide transition duration-300
                    pb-1 border-transparent flex items-center font-bold border-b-0 text-2xl ml-0
                    ${light ? 'text-gray-100 hover:text-gray-300 focus:text-gray-300' : 'hover:text-sky-600 focus:text-sky-600'}`}
                >
                    <img
                        src="/logo.png"
                        alt="logo"
                        className="w-10 mr-3"
                    />
                    CourSeed
                </Link>
                <motion.div
                    initial={{ x: "150%", display: "none" }}
                    animate={animation}
                    transition={{ type: "keyframes" }}
                    className="sm:hidden z-10 fixed top-0 inset-x-0 mx-4 my-6 p-8 border text-center rounded-lg text-gray-900 bg-white"
                >
                    <div className="flex justify-center flex-col">
                        {navigation.map((link, i) => (
                            <Link
                                key={i}
                                to={link.href}
                                className="text-lg my-2 lg:text-sm lg:mx-6 lg:my-0
                                font-semibold tracking-wide transition duration-300
                                pb-1 border-b-2 border-transparent hover:border-sky-600 hover:text-sky-600 focus:text-sky-600
                                "
                            >
                                {link.name}
                            </Link>
                        ))}
                        <AnimatePresence mode="wait">
                            <motion.div
                                key={user ? "show" : "hide"}
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: -20 }}
                                className={`flex items-center justify-center ${!user && "flex-col"}`}
                            >
                                {user ? (
                                    <Dropdown
                                        button={
                                            <>
                                                <p className={`my-2 text-lg lg:text-sm lg:my-0 lg:ml-12 mr-2 lg:mr-3
                                                    font-semibold tracking-wide transition duration-300 pb-1 border-b-2 border-transparent
                                                    ${light && 'text-gray-100'}`}
                                                >
                                                    {user?.username}
                                                </p>
                                                <Avatar
                                                    username={user?.username}
                                                    className="w-12 h-12 rounded-full cursor-pointer"
                                                />
                                            </>
                                        }
                                        classNames={"py-2 top-[2rem] right-0 w-[max-content] my-2"}
                                    >
                                        <div 
                                            className="flex w-56 flex-col justify-start rounded-[20px] 
                                            bg-white bg-cover bg-no-repeat shadow-xl shadow-[rgba(112,144,176,0.08)] 
                                            dark:!bg-[#1B254B] dark:text-white dark:shadow-none border border-gray-100"
                                        >
                                            <div className="p-4">
                                                <div className="flex items-center gap-2">
                                                    <p className="text-sm font-bold text-[#1B254B] dark:text-white">
                                                        👋 Hola, {user?.username}
                                                    </p>
                                                </div>
                                            </div>
                                            <div className="h-px w-full bg-gray-200 dark:bg-white/25 " />
                                            <div className="flex flex-col p-4">
                                                <Link
                                                    to={isAdmin() ? "/admin" : "/inicio"}
                                                    className="text-sm text-gray-800 dark:text-white hover:dark:text-white inline-flex items-center gap-2"
                                                >
                                                    <span>Inicio</span>
                                                    <Home className="size-4" />
                                                </Link>
                                                <Link
                                                    to="/perfil"
                                                    className="mt-3 text-sm text-gray-800 dark:text-white hover:dark:text-white inline-flex items-center gap-2"
                                                >
                                                    <span>Perfil de usuario</span>
                                                    <UserPen className="size-4" />
                                                </Link>
                                                <button
                                                    onClick={handleLogout}
                                                    className="mt-3 text-sm font-medium text-red-500 hover:text-red-500 transition duration-150 ease-out hover:ease-in inline-flex items-center gap-2"
                                                >
                                                    <span>Finalizar Sesión</span>
                                                    <LogOut className="size-4" />
                                                </button>
                                            </div>
                                        </div>
                                    </Dropdown>
                                ) : (
                                    <>
                                        <Link
                                            to="/acceso"
                                            className={`text-lg my-2 lg:text-sm lg:mx-6 lg:my-0 lg:ml-12 
                                            font-semibold tracking-wide transition duration-300 pb-1 border-b-2 border-transparent
                                            ${light ? 'text-gray-100 hover:border-gray-300 hover:text-gray-300 focus:text-gray-300' : 'hover:border-sky-600 hover:text-sky-600 focus:text-sky-600'}`}
                                        >
                                            Iniciar Sesión
                                        </Link>
                                        <Link
                                            to="/registro"
                                            className="text-lg lg:text-sm my-2 lg:my-0 font-semibold tracking-wide transition duration-300
                                            px-6 py-[.7rem] rounded-3xl bg-sky-600 text-gray-50 hover:bg-sky-700 hover:text-white 
                                            ring-2 ring-transparent focus:ring-sky-500"
                                        >
                                            Registrarse
                                        </Link>
                                    </>
                                )}
                            </motion.div>
                        </AnimatePresence>
                    </div>
                </motion.div>
                <button
                    onClick={toggleNavbar}
                    className={`
                        lg:hidden z-20 focus:outline-none 
                        transition duration-300 ${showNavLinks ? 'open' : 'closed'} ${light ? 'text-gray-100 hover:text-gray-300 focus:text-gray-300' : 'hover:text-sky-600 focus:text-sky-600'}
                    `}
                >
                    {showNavLinks ? <X className="size-6" /> : <Menu className="size-6" />}
                </button>
            </nav>
        </header>
    );
}

export default Navbar;