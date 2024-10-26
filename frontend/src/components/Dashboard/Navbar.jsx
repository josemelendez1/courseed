import { LoaderCircle, LogOut, Menu, Moon, Search, Sun, UserPen } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";
import Dropdown from "./Dropdown";
import Avatar from "../Landing/Avatar";
import { AnimatePresence, motion } from "framer-motion";

const Navbar = ({ 
    onOpenSidenav, 
    brandText, 
    username, 
    placeHolder = "Buscar...", 
    search = "", 
    setSearch, 
    isFocus = false, 
    setIsFocus = () => {},
    courses = [],
    handleScroll = () => {} 
}) => {

    const [darkMode, setDarkMode] = useState(localStorage.getItem("theme") === "dark");

    return (
        <nav
            className="sticky top-[1rem] z-40 flex flex-row flex-wrap items-center 
            justify-between rounded-xl bg-white/10 p-2 backdrop-blur-xl
            dark:bg-[#0b14374d]"
        >
            <div className="ml-[6px]">
                <div className="h-6 w-[224px] pt-1">
                    <Link
                        className="text-sm font-normal text-[#1B254B] hover:underline dark:text-white dark:hover:text-white"
                    >
                        CourSeed
                        <span className="mx-1 text-sm text-[#1B254B] hover:text-[#1B254B] dark:text-white">
                            {" "}
                            /{" "}
                        </span>
                    </Link>
                    <Link
                        className="text-sm font-normal capitalize text-[#1B254B] hover:underline dark:text-white dark:hover:text-white"
                    >
                        {brandText}
                    </Link>
                </div>
                <p className="shrink text-[33px] capitalize text-[#1B254B] dark:text-white">
                    <Link
                        className="font-bold capitalize hover:text-[#1B254B] dark:hover:text-white"
                    >
                        {brandText}
                    </Link>
                </p>
            </div>
            <div
                className="relative mt-[3px] flex h-[61px] w-[355px] flex-grow 
                items-center justify-around gap-2 rounded-full bg-white px-2 
                py-2 shadow-xl shadow-[rgba(112,144,176,0.08)] dark:!bg-[#111c44] dark:shadow-none 
                md:w-[365px] md:flex-grow-0 md:gap-1 xl:w-[365px] xl:gap-2"
            >
                <div className="flex h-full items-center rounded-full bg-[#F4F7FE] text-[#1B254B] dark:bg-[#0b1437] dark:text-white xl:w-[260px]">
                    <p className="pl-3 text-xl">
                        <Search className="size-4 text-gray-400 dark:text-white" />
                    </p>
                    <input
                        type="text"
                        value={search}
                        onFocus={() => setIsFocus(true)}
                        onBlur={() => setIsFocus(false)}
                        onChange={(e) => setSearch(e.target.value)}
                        placeholder={placeHolder}
                        className="block h-full w-full rounded-full bg-[#F4F7FE] text-sm 
                        font-normal text-[#1B254B] outline-none placeholder:!text-gray-400 border-0 focus:ring-0
                        dark:bg-[#0b1437] dark:text-white dark:placeholder:!text-white sm:w-[fit-content]"
                    />
                </div>
                <span
                    onClick={onOpenSidenav}
                    className="flex cursor-pointer text-xl text-gray-600 dark:text-white xl:hidden"
                >
                    <Menu className="size-5" />
                </span>
                <div
                    className="cursor-pointer text-gray-600"
                    onClick={() => {
                        if (darkMode) {
                            document.body.classList.remove("dark");
                            localStorage.removeItem("theme");
                            setDarkMode(false);
                        } else {
                            document.body.classList.add("dark");
                            localStorage.setItem("theme", "dark");
                            setDarkMode(true);
                        }
                    }}
                >
                    { darkMode ? (
                        <Sun className="h-4 w-4 text-gray-600 dark:text-white" />
                    ) : (
                        <Moon className="h-4 w-4 text-gray-600 dark:text-white" />
                    )}
                </div>
                <Dropdown
                    button={ username ? (
                                <Avatar 
                                    username={username}
                                    className="w-10 h-10 rounded-full cursor-pointer"
                                />
                            ) : (
                                <div className="w-10 h-10 rounded-full cursor-pointer flex items-center justify-center">
                                    <LoaderCircle className="animate-spin text-gray-400" />
                                </div>
                            )
                    }
                    children={
                        <div 
                            className="flex w-56 flex-col justify-start rounded-[20px] 
                            bg-white bg-cover bg-no-repeat shadow-xl shadow-[rgba(112,144,176,0.08)] 
                            dark:!bg-[#1B254B] dark:text-white dark:shadow-none"
                        >
                            <div className="p-4">
                                <div className="flex items-center gap-2">
                                    <p className="text-sm font-bold text-[#1B254B] dark:text-white">
                                        👋 Hola, {username}
                                    </p>{" "}
                                </div>
                            </div>
                            <div className="h-px w-full bg-gray-200 dark:bg-white/25 " />
                            <div className="flex flex-col p-4">
                                <Link
                                    to="/perfil"
                                    className="text-sm text-gray-800 dark:text-white hover:dark:text-white inline-flex items-center gap-2"
                                >
                                    <span>Perfil de usuario</span>
                                    <UserPen className="size-4" />
                                </Link>
                                <Link
                                    to="/salir"
                                    className="mt-3 text-sm font-medium text-red-500 hover:text-red-500 transition duration-150 ease-out hover:ease-in inline-flex items-center gap-2"
                                >
                                    <span>Finalizar Sesión</span>
                                    <LogOut className="size-4" />
                                </Link>
                            </div>
                        </div>
                    }
                    classNames={"py-2 top-[2rem] -left-[180px] w-[max-content]"}
                />
                <AnimatePresence mode="wait">
                    <motion.div
                        key={isFocus ? "show" : "hide"}
                        initial={{ y: 10, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        exit={{ y: -10, opacity: 0 }}
                        transition={{ duration: 0.2 }}
                        onScroll={(e) => handleScroll(e)}
                        className={`absolute left-0 top-[100%] mt-4 z-50 w-full md:max-w-md lg:max-w-lg 
                        overflow-y-auto origin-top-right rounded-[20px] bg-white ring-1 shadow-lg
                        ring-black transition focus:outline-none dark:!bg-[#111c44]
                        ${isFocus ? 'ring-opacity-5' : 'ring-opacity-0'}`}
                    >
                        {isFocus &&
                            <div className="py-1 max-h-[50vh] sm:max-h-[60vh]">
                                {courses.length === 0 && 
                                    <h2 className="px-4 py-2 text-gray-900 dark:text-white text-lg text-start font-medium">
                                        Sin resultados
                                    </h2>
                                }
                                {courses.map((course, i) => (
                                    <Link
                                        key={i}
                                        to={`/curso/${course.id}`}
                                        className={`w-full flex items-center gap-3 text-start px-4 py-2 text-gray-700 
                                        hover:bg-gray-100 focus:bg-gray-100 hover:text-gray-900 focus:text-gray-900
                                        dark:text-white dark:hover:bg-slate-900`}
                                    >
                                        <img src={`/images/courses/${course.image}`} alt={course.title} className="h-10 w-auto rounded-sm" />
                                        <span>{course.title}</span>
                                    </Link>
                                ))}
                            </div>
                        }
                    </motion.div>
                </AnimatePresence>
            </div>
        </nav>
    );
}

export default Navbar;