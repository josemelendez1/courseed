import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { AnimatePresence } from "framer-motion";
import { motion } from "framer-motion";
import CommandPalete from "./CommandPalete";
import { APIS } from "../../configs/apis";

const Hero = () => {

    const pageSize = 12;
    const [isFocus, setIsFocus] = useState(false);
    const [pageNo, setPageNo] = useState(0);
    const [search, setSearch] = useState("");
    const [courses, setCourses] = useState([]);
    const [commandPaleteOpen, setCommandPaleteOpen] = useState(false);

    const handleCourses = () => {
        axios.get(APIS.GET_COURSES, {
            params: {
                title: search,
                pageSize: pageSize,
                pageNo: pageNo
            }
        })
            .then(response => {
                setCourses(courses => [
                    ...pageNo > 0 ? courses : [],
                    ...response.data.content ? response.data.content : []
                ]);
            });
    }

    const handleScroll = (e) => {
        const bottom = e.target.scrollHeight - e.target.scrollTop - 5 <= e.target.clientHeight;
        if (bottom) setPageNo(pageNo + 1);
    }

    useEffect(handleCourses, [pageNo, search]);

    const keyDownHandler = (event) => {
        if (event.ctrlKey && event.key === "k") {
            event.preventDefault();
            setCommandPaleteOpen(true);
        }
    };

    useEffect(() => {
        window.addEventListener("keydown", keyDownHandler);
        return () => {window.removeEventListener("keydown", keyDownHandler);};
    }, []);

    return (
        <div className="relative">
            <div className="flex flex-col lg:flex-row lg:items-center max-w-screen-xl mx-auto py-20 md:py-20">
                <div className="relative lg:w-5/12 text-center max-w-lg mx-auto lg:max-w-none lg:text-left">
                    <h1 className="font-bold text-3xl md:text-3xl lg:text-4xl xl:text-5xl text-gray-900 leading-tight">
                        Encuentra <span className="text-sky-600">cursos</span> perfectos para ti en un solo lugar.
                    </h1>
                    <p className="my-5 lg:my-8 text-base xl:text-lg">
                        Bienvenido a <b className="font-semibold">CourSeed</b>, Navega entre cursos en diversas áreas,
                        filtra por tus preferencias y encuentra el programa ideal para alcanzar tus metas.
                    </p>
                    <div className="relative max-w-md text-center mx-auto lg:mx-0">
                        <input
                            value={search}
                            onChange={(e) => {
                                setSearch(e.target.value)
                                setPageNo(0);
                            }}
                            onFocus={() => setIsFocus(true)}
                            onBlur={() => setIsFocus(false)}
                            type="text"
                            placeholder="Buscar por titulo..."
                            className="sm:pr-32 pl-8 py-4 sm:py-5 rounded-full border-2 w-full 
                            font-medium focus:outline-none transition duration-300 
                            focus:border-primary-500 hover:border-gray-500"
                        />
                        <button
                            onClick={() => setCommandPaleteOpen(true)}
                            className="w-full sm:w-auto sm:absolute right-0 top-0 bottom-0 bg-sky-600 
                            text-gray-100 font-semibold mr-2 my-4 sm:my-2 rounded-full py-4 px-8 flex 
                            items-center justify-center sm:leading-none focus:outline-none 
                            hover:bg-sky-900 transition duration-300 gap-2"
                        >
                            Buscar
                        </button>
                        <AnimatePresence mode="wait">
                            <motion.div
                                key={isFocus ? "show" : "hide"}
                                initial={{ y: 10, opacity: 0 }}
                                animate={{ y: 0, opacity: 1 }}
                                exit={{ y: -10, opacity: 0 }}
                                transition={{ duration: 0.2 }}
                                onScroll={handleScroll}
                                className={`absolute left-0 z-50 mt-4 w-full md:max-w-md lg:max-w-lg 
                                overflow-y-auto origin-top-right rounded-md bg-white shadow-lg ring-1 
                                ring-black  transition focus:outline-none 
                                ${isFocus ? 'ring-opacity-5' : 'ring-opacity-0'}`}
                            >
                                {isFocus &&
                                    <div className="py-1 max-h-[50vh]">
                                        {courses.length === 0 && <h2 className="px-4 py-2 text-gray-900 text-lg text-start font-medium">Sin resultados</h2>}
                                        {courses.map((course, i) => (
                                            <Link
                                                key={i}
                                                to={`/curso/${course.id}`}
                                                className={`w-full flex items-center gap-3 text-start px-4 py-2 text-gray-700 hover:bg-gray-100 focus:bg-gray-100 hover:text-gray-900 focus:text-gray-900`}
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
                    <div className="mt-12 lg:mt-20">
                        <p className="uppercase text-sm lg:text-xs tracking-wider font-bold text-gray-500">
                            Our TRUSTED Customers
                        </p>
                        <div className="flex items-center gap-6 mt-5">
                            <Link
                                to="/"
                                className="flex items-center gap-1 font-medium text-gray-800"
                            >
                                <img src="/icons8-facebook.svg" alt="Facebook" className="h-16 w-auto" />
                                <span>Facebook</span>
                            </Link>
                            <Link
                                to="/"
                                className="flex items-center gap-1 font-medium text-gray-800"
                            >
                                <img src="/icons8-x.svg" alt="X" className="h-[3.75rem] w-auto" />
                                <span>X</span>
                            </Link>
                        </div>
                    </div>
                </div>
                <div className="relative mt-12 lg:mt-0 flex-1 flex flex-col justify-center lg:self-end">
                    <div className="flex justify-center lg:justify-end items-center">
                        <img className="min-w-0 w-full max-w-lg xl:max-w-2xl" src="/undraw_remotely_-2-j6y.svg" alt="Design Illustration" />
                    </div>
                </div>
            </div>
            <img src="svg-decorator-blob-1.svg" alt="blob" className="pointer-events-none opacity-5 absolute left-0 bottom-0 h-64 w-64 transform -translate-x-2/3 -z-10" />
            <CommandPalete
                isOpen={commandPaleteOpen}
                setIsOpen={(value) => setCommandPaleteOpen(value)}
                courses={courses}
                search={search}
                setSearch={(value) => {
                    setSearch(value);
                    setPageNo(0);
                }}
                onScroll={handleScroll}
            />
        </div>
    );
}

export default Hero;