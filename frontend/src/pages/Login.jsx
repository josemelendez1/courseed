import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../provider/AuthProvider";
import { useState } from "react";
import { HeadProvider } from "../provider/HeadProvider";
import axios from "axios";
import { motion } from "framer-motion";
import { Info } from "lucide-react";

const containerMotion = {
    hidden: { opacity: 0, x: "var(--x-hidden)" },
    visible: {
        opacity: 1,
        x: "var(--x-visible)",
        transition: {
            type: "tween",
            delayChildren: 0.2,
            staggerChildren: 0.1
        }
    }
}

const itemMotion = {
    hidden: { x: "var(--x-hidden)", opacity: 0 },
    visible: { 
        x: "var(--x-visible)", 
        opacity: 1,
        transition: {
            type: "tween"
        }
    },
}

const Login = () => {
    const { handleToken } = useAuth();
    const navigate = useNavigate();
    
    const [form, setForm] = useState({
        username: "",
        password: "",
    });
    
    const [errors, setErrors] = useState({
        name: null,
        password: null,
        token: null
    });

    const handleLogin = (e) => {
        e.preventDefault();
        axios.post("http://localhost:8090/api/users/login", form)
        .then(response => {
            if (response.data) {
                setErrors({
                    name: null,
                    password: null,
                    token: null
                });
                handleToken(response.data.token);
                navigate("/inicio", {replace: true});
            }
        })
        .catch(error => {
            if (error.response?.data) {
                if (error.response.data.token) {
                    setForm({
                        username: form.username,
                        password: ""
                    });
                    setErrors({
                        name: null,
                        password: null,
                        token: error.response.data.token
                    });
                } else {    
                    setErrors({
                        name: error.response.data.username,
                        password: error.response.data.password,
                        token: null
                    });
                }
            }
        });
    }

    return (
        <>
            <HeadProvider title="Acceso" />
            <main 
                className="relative grid min-h-screen grid-rows-1 place-items-center lg:gap-20 2xl:gap-0
                grid-cols-1 lg:grid-cols-2 p-3 lg:p-10 bg-gray-50 overflow-hidden"
            >
                <motion.section
                    variants={containerMotion}
                    initial="hidden"
                    animate="visible"
                    className="w-full sm:max-w-md md:max-w-lg lg:max-w-xl bg-white rounded-lg 
                    shadow-xl px-6 py-8 grid grid-cols-1 grid-rows-[auto_auto_1fr] gap-4 z-10 [--x-hidden:-10%] [--x-visible:0%]"
                >
                    <motion.a
                        href="/"
                        variants={itemMotion} 
                        className="grid grid-rows-1 items-center gap-2 grid-cols-[auto_1fr] max-w-full h-auto"
                    >
                        <img src="logo.png" alt="Logo" title="Courseed" className="w-8 h-8" />
                        <span className="text-xl font-medium text-gray-900 truncate">CourSeed</span>
                    </motion.a>
                    <article variants={itemMotion} className="block w-full h-auto">
                        <motion.h2 variants={itemMotion} className="text-2xl font-semibold text-gray-900 line-clamp-2">
                            Accede a Tu Cuenta
                        </motion.h2>
                        <motion.p variants={itemMotion} className="text-base text-gray-600 line-clamp-3 font-light mt-2">
                            Accede a tu cuenta para comenzar el curso. Conéctate y empieza a explorar 
                            los materiales y recursos educativos disponibles.
                        </motion.p>
                    </article>
                    <form onSubmit={handleLogin} className="w-full">
                        <motion.div variants={itemMotion} className="w-full">
                            <label htmlFor="name" className="text-base text-gray-900 font-medium">Nombre</label>
                            <input 
                                id="name"
                                type="text"
                                value={form.username}
                                onChange={(e) => setForm({
                                    ...form,
                                    username: e.target.value
                                })}
                                autoComplete="username"
                                className="w-full bg-transparent placeholder:text-slate-400 text-slate-700 text-sm border 
                                border-slate-200 rounded-md px-3 py-2 transition duration-300 ease focus:outline-none 
                                focus:border-blue-500 hover:border-blue-300 shadow-sm focus:shadow mt-2" 
                            />
                            { errors.name &&
                                <p className="flex items-start mt-2 gap-1 text-xs text-red-600 line-clamp-2">
                                    <Info className="w-4 h-4" />
                                    <span>
                                        {errors.name}
                                    </span>
                                </p>   
                            }
                        </motion.div>
                        <motion.div variants={itemMotion} className="w-full mt-4">
                            <label htmlFor="password" className="text-base text-gray-900 font-medium">Contraseña</label>
                            <input 
                                id="password"
                                type="password"
                                value={form.password} 
                                onChange={(e) => setForm({
                                    ...form,
                                    password: e.target.value
                                })}
                                autoComplete="current-password" 
                                className="w-full bg-transparent placeholder:text-slate-400 text-slate-700 text-sm border 
                                border-slate-200 rounded-md px-3 py-2 transition duration-300 ease focus:outline-none 
                                focus:border-blue-500 hover:border-blue-300 shadow-sm focus:shadow mt-2" 
                            />
                            { (errors.password || errors.token) && 
                                <p className="flex items-start mt-2 gap-1 text-xs text-red-600 line-clamp-2">
                                    <Info className="w-4 h-4" />
                                    <span>
                                        {errors.password ? errors.password : errors.token}
                                    </span>
                                </p> 
                            } 
                        </motion.div>
                        <motion.button 
                            variants={itemMotion}
                            className="w-full inline-flex justify-center items-center bg-sky-600 py-2 px-4 border border-transparent text-sm text-white 
                            shadow-md hover:shadow-lg focus:bg-sky-700 focus:shadow-none active:bg-sky-700 font-medium mt-4
                            hover:bg-sky-700 active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none 
                            rounded-md gap-2"
                            type="submit"
                        >
                            <span>Acceder</span>
                        </motion.button>
                        <motion.div variants={itemMotion} className="w-full flex items-center justify-center">
                            <p className="text-base text-gray-600 line-clamp-2 font-light mt-2">
                                <span>¿Aún no tienes cuenta? </span>
                                <Link to="/registro" className="text-sky-600 font-medium hover:underline">Registrate aqui</Link>
                            </p>
                        </motion.div>
                    </form>
                </motion.section>
                <motion.section
                    variants={containerMotion}
                    initial="hidden"
                    animate="visible"
                    className="hidden max-w-full max-h-screen lg:flex justify-center 
                    flex-col items-center gap-4 z-10 [--x-hidden:100%] [--x-visible:0%]"
                >
                    <motion.img
                        variants={itemMotion}
                        src="/3d-hygge-young-woman-working-at-desk.png" 
                        alt="Imagen de logo" 
                        className="object-cover w-3/6 2xl:max-w-full"
                    />
                    <motion.h2
                        variants={itemMotion}
                        className="line-clamp-3 text-white text-xl font-semibold text-center w-full">
                        ¡Bienvenido a nuestra plataforma de cursos! Estamos encantados de que estés aquí.
                    </motion.h2>
                </motion.section>
                <motion.div 
                    variants={itemMotion}
                    initial="hidden"
                    animate="visible"
                    className="hidden lg:block absolute left-0 bg-sky-600 w-full aspect-square 
                    rounded-full z-0 [--x-hidden:100%] [--x-visible:50%]"

                />
                <motion.div 
                    variants={itemMotion}
                    initial="hidden"
                    animate="visible"
                    className="hidden lg:block absolute right-0 inset-x-0 bg-sky-600 bg-opacity-50 
                    w-[120vw] aspect-square rounded-full z-0 [--x-hidden:100%] [--x-visible:41.7%]" 
                />
            </main>
        </>
    );
}

export default Login;