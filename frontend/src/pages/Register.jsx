import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../provider/AuthProvider";
import { HeadProvider } from "../provider/HeadProvider";
import { useState } from "react";
import axios from "axios";
import { Info } from 'lucide-react';
import { motion } from "framer-motion";

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

const Register = () => {
    const { handleToken } = useAuth();
    const navigate = useNavigate();
    
    const [form, setForm] = useState({
        name: "",
        email: "",
        password: "",
        terms: false
    });
    
    const [errors, setErrors] = useState({
        name: null,
        email: null,
        password: null,
        terms: false
    });

    const handleRegister = (e) => {
        e.preventDefault();

        if (!form.terms) {
            setErrors(errors => {return {...errors, terms: true}});
            return;
        } else {
            setErrors(errors => {return {...errors, terms: false}});
        }

        axios.post("http://localhost:8090/api/users/register", {
            username: form.name,
            email: form.email,
            password: form.password
        })
        .then(response => {
            if (response.data) {
                handleLogin(response.data.username, form.password);
            }
        })
        .catch(error => {
            if (error.response && error.response.data) {
                setErrors(errors => {return {
                    ...errors,
                    name: error.response.data.username,
                    password: error.response.data.password,
                    email: error.response.data.email
                }});
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
                navigate("/inicio", {replace: true});
            }
        }).catch(error => {
            navigate("/acceso");
        });
    }

    return (
        <>
            <HeadProvider title="Registro" />
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
                            Crea tu cuenta y empieza ahora
                        </motion.h2>
                        <motion.p variants={itemMotion} className="text-base text-gray-600 line-clamp-3 font-light mt-2">
                            Únete a nuestra plataforma de aprendizaje y explora una variedad de cursos 
                            diseñados para mejorar tus habilidades y conocimientos.
                        </motion.p>
                    </article>
                    <form onSubmit={(e) => handleRegister(e)} className="w-full">
                        <motion.div variants={itemMotion} className="w-full">
                            <label htmlFor="name" className="text-base text-gray-900 font-medium">Nombre</label>
                            <input 
                                id="name"
                                type="text"
                                value={form.name}
                                onChange={(e) => setForm({
                                    ...form,
                                    name: e.target.value
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
                            <label htmlFor="name" className="text-base text-gray-900 font-medium">Correo Electronico</label>
                            <input 
                                id="email"
                                type="email"
                                value={form.email} 
                                onChange={(e) => setForm({
                                    ...form,
                                    email: e.target.value
                                })}
                                autoComplete="email"
                                className="w-full bg-transparent placeholder:text-slate-400 text-slate-700 text-sm border 
                                border-slate-200 rounded-md px-3 py-2 transition duration-300 ease focus:outline-none 
                                focus:border-blue-500 hover:border-blue-300 shadow-sm focus:shadow mt-2"
                            />
                            { errors.email && 
                                <p className="flex items-start mt-2 gap-1 text-xs text-red-600 line-clamp-2">
                                    <Info className="w-4 h-4" />
                                    <span>
                                        {errors.email}
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
                            { errors.password && 
                                <p className="flex items-start mt-2 gap-1 text-xs text-red-600 line-clamp-2">
                                    <Info className="w-4 h-4" />
                                    <span>
                                        {errors.password}
                                    </span>
                                </p> 
                            } 
                        </motion.div>
                        <motion.div variants={itemMotion} className="inline-flex items-center mt-4">
                            <label className="flex items-center cursor-pointer relative" htmlFor="terms">
                                <input type="checkbox"
                                    checked={form.terms}
                                    onChange={e =>  {
                                        setForm({ ...form, terms: !form.terms })
                                    }}
                                    className="peer h-5 w-5 cursor-pointer transition-all appearance-none rounded shadow hover:shadow-md border border-slate-300 checked:bg-blue-600 checked:border-blue-600"
                                    id="terms" 
                                />
                                <span className="absolute text-white opacity-0 peer-checked:opacity-100 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5" viewBox="0 0 20 20" fill="currentColor" stroke="currentColor" strokeWidth="1">
                                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"></path>
                                    </svg>
                                </span>
                            </label>
                            <label className="cursor-pointer ml-2 text-slate-600 text-sm" htmlFor="terms">
                                <p>Al registrarse, está creando una cuenta de Courseed y acepta los Términos de uso y la Política de privacidad de Courseed.</p>
                            </label>
                        </motion.div>
                        { errors.terms &&
                            <p className="flex items-start mt-2 gap-1 text-xs text-red-600">
                                <Info className="w-4 h-4" />
                                <span>
                                    Acepta los terminos y condiciones para continuar.
                                </span>
                            </p>
                        }  
                        <motion.button 
                            variants={itemMotion}
                            className="w-full rounded-md bg-sky-600 py-2 px-4 border border-transparent text-center text-sm text-white 
                            shadow-md hover:shadow-lg focus:bg-sky-700 focus:shadow-none active:bg-sky-700 font-medium mt-4
                            hover:bg-sky-700 active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none "
                            type="submit"
                        >
                            <span>Registrarse</span>
                        </motion.button>
                        <motion.div variants={itemMotion} className="w-full flex items-center justify-center">
                            <p className="text-base text-gray-600 line-clamp-2 font-light mt-2">
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
                        src="/3d-hygge-man-and-young-woman-working (1).png" 
                        alt="Imagen de logo" 
                        className="object-cover w-4/6 2xl:max-w-full"
                    />
                    <motion.h2
                        variants={itemMotion}
                        className="line-clamp-3 text-white text-xl font-semibold text-center w-full">
                        ¡Regístrate y accede a una variedad de cursos para tu crecimiento!
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

export { Register };
