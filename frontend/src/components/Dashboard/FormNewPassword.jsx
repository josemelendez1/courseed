import { Info, KeyRound, LoaderCircle, Lock, LockKeyhole } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";

const item = {
    hidden: {
        x: -10,
        opacity: 0
    },
    visible: {
        x: 0,
        opacity: 1,
    },
    exit: {
        x: 10,
        opacity: 0,
    }
}

const FormNewPassword = ({ form, setForm, onSubmit, loading, errors }) => {
    return (
        <div className="!z-[5] relative flex flex-col rounded-[20px] 
            bg-white bg-clip-border shadow-[14px_17px_40px_4px] 
            shadow-[rgba(112,_144,_176,_0.08)] dark:!bg-[#111c44] 
            dark:text-white dark:shadow-none w-full h-full p-3"
        >
            <div className="mt-2 mb-8 w-full">
                <h4 className="px-2 text-xl font-semibold text-[#1B254B] dark:text-white">
                    Nueva Contraseña
                </h4>
                <p className="mt-2 px-2 text-base text-gray-500 text-justify sm:text-start">
                    Recomendamos encarecidamente a nuestros usuarios que utilicen combinaciones 
                    de letras, números y símbolos en sus contraseñas para fortalecer la protección 
                    de su información.
                </p>
            </div>
            <form onSubmit={onSubmit} className="grid grid-cols-1 gap-4 px-2">
                <div>
                    <label
                        htmlFor="currentPassword" 
                        className="flex flex-col items-start justify-center rounded-2xl 
                        bg-white bg-clip-border px-3 py-4 shadow-[14px_17px_40px_4px] 
                        shadow-[rgba(112,_144,_176,_0.08)] dark:!bg-[#1B254B] dark:shadow-none
                        border border-transparent hover:border-gray-100 focus-within:border-gray-100 
                        dark:hover:border-gray-600 dark:focus-within:border-gray-600"
                    >
                        <p className="text-sm text-gray-400 inline-flex items-center gap-1">
                            Contraseña Actual
                            <Lock className="text-sky-600 size-5" />
                        </p>
                        <input 
                            id="currentPassword"
                            name="currentPassword"
                            value={form.currentPassword}
                            onChange={(e) => setForm({
                                ...form,
                                currentPassword: e.target.value
                            })}
                            type="password"
                            autoComplete="current-password"
                            className="w-full text-base font-medium text-[#1B254B] 
                            dark:text-white px-0 bg-transparent border-0 focus:ring-0" 
                        />
                    </label>
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={errors.currentPassword ? "show" : "hide"}
                            variants={item}
                            initial="hidden"
                            animate="visible"
                            exit="exit"
                        >
                        {errors.currentPassword &&
                            <p className="flex items-start mt-2 gap-1 text-xs text-red-600 line-clamp-2">
                                <Info className="w-4 h-4" />
                                <span>{errors.currentPassword}</span>
                            </p>
                        }
                        </motion.div>               
                    </AnimatePresence>
                </div>
                <div>
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
                            value={form.newPassword}
                            onChange={(e) => setForm({
                                ...form,
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
                            key={errors.newPassword ? "show" : "hide"}
                            variants={item}
                            initial="hidden"
                            animate="visible"
                            exit="exit"
                        >
                        {errors.newPassword &&
                            <p className="flex items-start mt-2 gap-1 text-xs text-red-600 line-clamp-2">
                                <Info className="w-4 h-4" />
                                <span>{errors.newPassword}</span>
                            </p>
                        }
                        </motion.div>               
                    </AnimatePresence>
                </div>
                <div>
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
                            value={form.confirmNewPassword}
                            onChange={(e) => setForm({
                                ...form,
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
                            key={errors.confirmNewPassword ? "show" : "hide"}
                            variants={item}
                            initial="hidden"
                            animate="visible"
                            exit="exit"
                        >
                        {errors.confirmNewPassword &&
                            <p className="flex items-start mt-2 gap-1 text-xs text-red-600 line-clamp-2">
                                <Info className="w-4 h-4" />
                                <span>{errors.confirmNewPassword}</span>
                            </p>
                        }
                        </motion.div>               
                    </AnimatePresence>
                </div>
                <div className="flex items-center justify-end">
                    <button
                        type="submit"
                        disabled={loading}
                        className="w-auto text-center text-white bg-sky-700 px-6  
                        text-sm font-semibold shadow-sm hover:bg-sky-600 focus-visible:outline focus-visible:outline-2 py-3
                        focus-visible:outline-offset-2 focus-visible:outline-sky-700 dark:bg-blue-600 dark:hover:bg-blue-700
                        mt-6 rounded-[20px]"
                    >
                        <AnimatePresence mode="wait">
                            <motion.div
                                key={loading ? "loading" : "not-loading"}
                                variants={item}
                                initial="hidden"
                                animate="visible"
                                exit="exit"
                                className="inline-flex items-center justify-center gap-1 sm:gap-2"
                            >
                                { loading ? (
                                    <>Actualizando contraseña <LoaderCircle className="animate-spin size-5" /></>
                                ) : (
                                    <>Actualizar Contraseña</>
                                )
                                }
                            </motion.div>
                        </AnimatePresence>
                    </button>
                </div>
            </form>
        </div>
    );
}

export default FormNewPassword;