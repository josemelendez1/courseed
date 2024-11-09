import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../provider/AuthProvider";
import { useEffect, useState } from "react";
import { HeadProvider } from "../../provider/HeadProvider";
import axios from "axios";
import { motion } from "framer-motion";
import { Info } from "lucide-react";
import { ROLES } from "../../configs/roles";
import { APIS } from "../../configs/apis";

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
    hidden: { x: "var(--x-hidden)", y: "var(--y-hidden)", opacity: 0 },
    visible: {
        x: "var(--x-visible)",
        y: "var(--y-visible)",
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
        username: null,
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
                    redirect();
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

    const redirect = () => {
        axios.get(APIS.USER_AUTHENTICATED, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}` 
            }
        })
        .then(response => {
            navigate(
                ( typeof response.data === "object" &&
                Array.isArray(response.data.roles) &&
                response.data?.roles.some(c => c.authority === ROLES.ADMIN) 
                )
                ? "/admin" 
                : "/inicio", 
            { replace: true });
        })
        .catch(error => {
            setErrors({
                ...errors,
                username: "Le informamos que estamos experimentando problemas técnicos en nuestro servidor."
            });
        });
    } 

    useEffect(() => { window.scrollTo(0, 0) }, []);

    return (
        <>
            <HeadProvider title="Acceso" />
            <main
                className="relative min-h-screen isolate overflow-hidden font-inter"
            >
                <div 
                    className="w-full max-w-screen-xl mx-auto grid grid-rows-1 place-items-center lg:gap-20
                    grid-cols-1 lg:grid-cols-2 py-12 min-h-screen"
                >
                    <motion.section
                        variants={containerMotion}
                        initial="hidden"
                        animate="visible"
                        className="w-full px-4 sm:px-0 sm:max-w-sm md:max-w-md grid grid-cols-1 grid-rows-[auto_auto_1fr] gap-4 
                        z-10 [--x-hidden:-10%] [--x-visible:0%]"
                    >
                        <Link to="/">
                            <motion.span
                                variants={itemMotion}
                                className="flex items-center justify-center lg:justify-start gap-2 max-w-full h-auto
                            text-sky-700 text-xl font-semibold"
                            >
                                <img src="logo.png" alt="Logo" title="Courseed" className="h-8 w-auto" />
                                <span className="w-auto truncate">CourSeed</span>
                            </motion.span>
                        </Link>
                        <article variants={itemMotion} className="block w-full h-auto mt-4">
                            <motion.h2 variants={itemMotion} className="text-3xl text-center lg:text-start font-semibold leading-9 tracking-tight text-gray-900 line-clamp-2">
                                Accede a tu cuenta
                            </motion.h2>
                            <motion.p variants={itemMotion} className="text-justify text-gray-600 line-clamp-3 mt-2">
                                Accede a tu cuenta para comenzar un nuevo curso. Conéctate y empieza a explorar
                                los materiales y recursos educativos disponibles.
                            </motion.p>
                        </article>
                        <form onSubmit={handleLogin} className="w-full mt-4">
                            <motion.div variants={itemMotion} className="w-full">
                                <label htmlFor="name" className="block text-sm font-medium leading-6 text-gray-900">Nombre de usuario</label>
                                <input
                                    id="name"
                                    type="text"
                                    value={form.username}
                                    onChange={(e) => setForm({
                                        ...form,
                                        username: e.target.value
                                    })}
                                    autoComplete="username"
                                    className="block mt-2 w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset 
                                ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-sky-600 
                                sm:text-sm sm:leading-6"
                                />
                                {errors.name &&
                                    <p className="flex items-start mt-2 gap-1 text-xs text-red-600 line-clamp-2">
                                        <Info className="w-4 h-4" />
                                        <span>
                                            {errors.name}
                                        </span>
                                    </p>
                                }
                            </motion.div>
                            <motion.div variants={itemMotion} className="w-full mt-4">
                                <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">Contraseña</label>
                                <input
                                    id="password"
                                    type="password"
                                    value={form.password}
                                    onChange={(e) => setForm({
                                        ...form,
                                        password: e.target.value
                                    })}
                                    autoComplete="current-password"
                                    className="block mt-2 w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 
                                ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset 
                                focus:ring-sky-600 sm:text-sm sm:leading-6"
                                />
                                {(errors.password || errors.token) &&
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
                                className="mt-6 flex w-full justify-center rounded-md bg-sky-600 px-3 py-2 text-sm 
                                font-semibold leading-6 text-white shadow-sm hover:bg-sky-500 focus-visible:outline 
                                focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-600"
                                type="submit"
                            >
                                Acceder
                            </motion.button>
                            <motion.div variants={itemMotion} className="w-full flex items-center justify-center mt-10 text-sm text-gray-500">
                                <p className="line-clamp-2">
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
                            src="/undraw_sign_in_re_o58h.svg"
                            alt="Imagen de logo"
                            className="object-cover w-10/12"
                        />
                        <motion.h2
                            variants={itemMotion}
                            className="line-clamp-3 text-white text-xl font-semibold text-center w-full">
                            ¡Bienvenido a nuestra plataforma de cursos! Estamos encantados de que estés aquí.
                        </motion.h2>
                    </motion.section>
                </div>
                <motion.div
                    variants={itemMotion}
                    initial="hidden"
                    animate="visible"
                    className="hidden lg:block transform absolute bg-sky-600 w-full aspect-square 
                    rounded-full z-0 [--x-hidden:100%] [--x-visible:50%] [--y-hidden:-75%] [--y-visible:-75%]"
                />
                <motion.div
                    variants={itemMotion}
                    initial="hidden"
                    animate="visible"
                    className="hidden lg:block absolute bg-sky-600 bg-opacity-50 w-[120vw] aspect-square 
                    rounded-full z-0 [--x-hidden:100%] [--x-visible:41.7%] [--y-hidden:-72.5%] [--y-visible:-72.5%]"
                />
            </main>
        </>
    );
}

export default Login;