import { Link } from "react-router-dom";

const Cta = () => {
    return (
        <div className="relative mb-20 lg:mb-24">
            <div className="max-w-screen-xl mx-auto py-20 lg:py-24">
                <div className="py-20 lg:py-24 bg-sky-600 rounded-lg relative">
                    <div className="px-8 max-w-screen-lg mx-auto flex items-center relative z-10 flex-col lg:flex-row text-center lg:text-left">
                        <div className="lg:w-1/2 max-w-lg">
                            <h5 className="text-gray-100 text-2xl sm:text-3xl font-semibold">
                                Aprende nuevas habilidades hoy mismo. ¡Únete a nuestros cursos y transforma tu futuro!
                            </h5>
                        </div>
                        <div className="lg:w-1/2 max-w-lg flex justify-center lg:justify-end mt-6 lg:mt-0 flex-col sm:flex-row">
                            <Link 
                                to="/acceso" 
                                className="w-full sm:w-auto text-sm sm:text-base px-6 py-3 sm:px-8 sm:py-4 lg:px-10 lg:py-5 
                                mt-4 first:mt-0 sm:mt-0 sm:mr-8 sm:last:mr-0 rounded-full font-semibold border border-transparent 
                                tracking-wide transition duration-300 focus:outline-none focus:shadow-outline
                                bg-red-500 text-gray-100 shadow-lg hover:bg-red-600 focus:bg-red-600 hover:text-gray-200 focus:text-gray-200"
                            >
                                Empezar
                            </Link>
                            <Link
                                to="/"
                                className="w-full sm:w-auto text-sm sm:text-base px-6 py-3 sm:px-8 sm:py-4 lg:px-10 lg:py-5 
                                mt-4 first:mt-0 sm:mt-0 sm:mr-8 sm:last:mr-0 rounded-full font-semibold border border-transparent 
                                tracking-wide transition duration-300 focus:outline-none focus:shadow-outline
                                text-gray-100 border-white hover:bg-gray-100 hover:text-sky-600 hover:border-primary-500"
                            >
                                Contactanos
                            </Link>
                        </div>
                    </div>
                    <div className="absolute inset-0 overflow-hidden rounded-lg">
                        <span className="absolute bottom-0 left-0 w-80 h-80 transform -translate-x-20 translate-y-32 text-primary-700 opacity-50">
                            <img src="/svg-decorator-blob-9.svg" alt="blob" />
                        </span>
                        <span className="absolute top-0 right-0 w-80 h-80 transform  translate-x-20 -translate-y-64 text-primary-700 opacity-50">
                            <img src="/svg-decorator-blob-9.svg" alt="blob" />
                        </span>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Cta;