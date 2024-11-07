import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Menu, X } from "lucide-react";
import useAnimatedNavToggler from "../../helpers/useAnimatedNavToggler";

const Navbar = ({ light = false, className = "" }) => {

    const navigation = [
        { name: 'Cursos', href: '/cursos' },
        { name: 'Centro de Soporte', href: '/ayuda' },
    ]
    
    const { showNavLinks, animation, toggleNavbar } = useAnimatedNavToggler();

    return (
        <header className={`flex justify-between items-center max-w-screen-xl mx-auto ${className}`} >
            <nav className="hidden lg:flex flex-1 justify-between items-center">
                <Link
                    to="/"
                    className={`
                        my-2 lg:my-0 mr-6 tracking-wide transition duration-300
                        pb-1 border-transparent flex items-center font-semibold border-b-0 text-2xl ml-0
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
                <div className="inline-block">
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
                        <Link
                            to="/acceso"
                            className="text-lg my-2 lg:text-sm lg:mx-6 lg:my-0 lg:ml-12
                            font-semibold tracking-wide transition duration-300
                            pb-1 border-b-2 border-transparent hover:border-sky-600 hover:text-sky-600 focus:text-sky-600
                            "
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