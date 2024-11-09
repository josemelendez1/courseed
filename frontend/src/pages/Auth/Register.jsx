import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../provider/AuthProvider";
import { HeadProvider } from "../../provider/HeadProvider";
import { useState } from "react";
import axios from "axios";
import { Info } from 'lucide-react';
import { motion } from "framer-motion";
import { APIS } from "../../configs/apis";
import { ROLES } from "../../configs/roles";

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

const Register = () => {
    const { handleToken } = useAuth();
    const navigate = useNavigate();

    const [form, setForm] = useState({
        username: "",
        password: "",
        confirmPassword: "",
        terms: false
    });

    const [errors, setErrors] = useState({
        username: null,
        password: null,
        confirmPassword: null,
        terms: false
    });

    const handleRegister = (e) => {
        e.preventDefault();

        if (!form.terms) {
            setErrors(errors => { return { ...errors, terms: true } });
            return;
        } else {
            setErrors(errors => { return { ...errors, terms: false } });
        }

        axios.post("http://localhost:8090/api/users/register", {
            username: form.username,
            password: form.password,
            confirmPassword: form.confirmPassword
        })
            .then(response => {
                if (response.status === 200 && response.data) {
                    setErrors({
                        username: null,
                        password: null,
                        confirmPassword: null
                    });

                    handleLogin(response.data.username, response.data.password);
                }
            })
            .catch(error => {
                const data = error.response?.data;

                if (error.status === 400 && data) {
                    setErrors({
                        username: data.username,
                        password: data.password,
                        confirmPassword: data.matchPassword ? data.matchPassword : data.confirmPassword
                    });

                    if (data.matchPassword) {
                        setForm({
                            ...form,
                            confirmPassword: ""
                        });
                    }
                }
            });
    }

    const handleLogin = (username, password) => {
        axios.post("http://localhost:8090/api/users/login", {
            username: username,
            password: password
        }).then(response => {
            if (response.data) {
                setErrors({
                    name: null,
                    password: null,
                    token: null
                });
                handleToken(response.data.token);
                redirect();
            }
        }).catch(error => {
            navigate("/acceso");
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

    return (
        <>
            <HeadProvider title="Registro" />
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
                        className="sm:w-full px-4 sm:px-0 sm:max-w-sm md:max-w-md grid grid-cols-1 grid-rows-[auto_auto_1fr] gap-4 z-10 
                        [--x-hidden:-10%] [--x-visible:0%]"
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
                                Crea tu cuenta y empieza ahora
                            </motion.h2>
                            <motion.p variants={itemMotion} className="text-justify text-gray-600 line-clamp-3 mt-2">
                                Únete a nuestra plataforma de aprendizaje y explora una variedad de cursos
                                diseñados para mejorar tus habilidades y conocimientos.
                            </motion.p>
                        </article>
                        <form onSubmit={(e) => handleRegister(e)} className="w-full mt-4">
                            <motion.div variants={itemMotion} className="w-full">
                                <label htmlFor="username" className="block text-sm font-medium leading-6 text-gray-900">Nombre de usuario</label>
                                <input
                                    id="username"
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
                                {errors.username &&
                                    <p className="flex items-start mt-2 gap-1 text-xs text-red-600 line-clamp-2">
                                        <Info className="w-4 h-4" />
                                        <span>
                                            {errors.username}
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
                                    className="block mt-2 w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset 
                                ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-sky-600 
                                sm:text-sm sm:leading-6"
                                />
                                {errors.password &&
                                    <p className="flex items-start mt-2 gap-1 text-xs text-red-600 line-clamp-2">
                                        <Info className="w-4 h-4" />
                                        <span>
                                            {errors.password}
                                        </span>
                                    </p>
                                }
                            </motion.div>
                            <motion.div variants={itemMotion} className="w-full mt-4">
                                <label htmlFor="confirm-password" className="block text-sm font-medium leading-6 text-gray-900">Confirmar Contraseña</label>
                                <input
                                    id="confirm-password"
                                    type="password"
                                    value={form.confirmPassword}
                                    onChange={(e) => setForm({
                                        ...form,
                                        confirmPassword: e.target.value
                                    })}
                                    autoComplete="current-password"
                                    className="block mt-2 w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset 
                                ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-sky-600 
                                sm:text-sm sm:leading-6"
                                />
                                {errors.confirmPassword &&
                                    <p className="flex items-start mt-2 gap-1 text-xs text-red-600 line-clamp-2">
                                        <Info className="w-4 h-4" />
                                        <span>
                                            {errors.confirmPassword}
                                        </span>
                                    </p>
                                }
                            </motion.div>
                            <motion.div variants={itemMotion} className="inline-flex items-center mt-4">
                                <label className="flex items-center cursor-pointer relative" htmlFor="terms">
                                    <input type="checkbox"
                                        checked={form.terms}
                                        onChange={e => {
                                            setForm({ ...form, terms: !form.terms })
                                        }}
                                        className="peer h-5 w-5 cursor-pointer transition-all appearance-none rounded shadow hover:shadow-md border border-slate-300 checked:bg-sky-600 checked:border-sky-600"
                                        id="terms"
                                    />
                                    <span className="absolute text-white opacity-0 peer-checked:opacity-100 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5" viewBox="0 0 20 20" fill="currentColor" stroke="currentColor" strokeWidth="1">
                                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"></path>
                                        </svg>
                                    </span>
                                </label>
                                <label className="cursor-pointer ml-2 text-slate-600 text-sm" htmlFor="terms">
                                    <p>Al registrarse, está creando una cuenta y acepta los términos de uso y la política de privacidad de <b>CourSeed</b>.</p>
                                </label>
                            </motion.div>
                            {errors.terms &&
                                <p className="flex items-start mt-2 gap-1 text-xs text-red-600">
                                    <Info className="w-4 h-4" />
                                    <span>
                                        Acepta los terminos y condiciones para continuar.
                                    </span>
                                </p>
                            }
                            <motion.button
                                variants={itemMotion}
                                className="mt-6 flex w-full justify-center rounded-md bg-sky-600 px-3 py-2 text-sm 
                            font-semibold leading-6 text-white shadow-sm hover:bg-sky-500 focus-visible:outline 
                            focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-600"
                                type="submit"
                            >
                                <span>Registrarse</span>
                            </motion.button>
                            <motion.div variants={itemMotion} className="w-full flex items-center justify-center mt-10 text-sm text-gray-500">
                                <p className="line-clamp-2">
                                    <span>¿Ya tienes cuenta? </span>
                                    <Link to="/acceso" className="text-sky-600 font-medium hover:underline">Inicia sesión aqui</Link>
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
                            src="/undraw_undraw_undraw_undraw_sign_up_ln1s_-1-_s4bc_-1-_ee41_-1-_kf4d.svg"
                            alt="Imagen de Registro"
                            className="object-cover w-10/12"
                        />
                        <motion.h2
                            variants={itemMotion}
                            className="line-clamp-3 text-white text-xl font-semibold text-center w-full">
                            ¡Regístrate y accede a una variedad de cursos para tu crecimiento!
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

export { Register };
