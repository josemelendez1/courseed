import { HeadProvider } from "../../provider/HeadProvider";
import { CircleHelp, MessageCircleQuestion, Phone, ShieldAlert } from "lucide-react";
import faqsData from "../../assets/faqs.json";
import Navbar from "../../components/Landing/Navbar";
import Footer from "../../components/Landing/Footer";
import AnimationRevealPage from "../../helpers/AnimationRevealPage";
import { useEffect } from "react";

const Help = () => {

    const faqs = faqsData instanceof Array ? faqsData : [];

    useEffect(() => { window.scrollTo(0, 0) }, []);

    return (
        <AnimationRevealPage>
            <HeadProvider title="CourSeed | Centro de Soporte" />
            <Navbar />
            <div className="relative">
                <section className="w-full max-w-screen-xl mx-auto py-24 sm:py-32 px-6 lg:px-8 gap-6 text-center">
                    <h2 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl mx-auto">
                        Centro de <span className="text-sky-600">Soporte</span>
                    </h2>
                    <p className="mt-6 text-lg leading-8 text-gray-600 sm:max-w-3xl mx-auto">
                        Aquí podrás encontrar respuestas a tus inquietudes, acceder a recursos útiles
                        y contactar a nuestro equipo de soporte para obtener ayuda especializada.
                        Estamos comprometidos a ofrecerte el mejor servicio y asistencia.
                    </p>
                </section>
                <img src="/svg-decorator-blob-7.svg" alt="blob" className="pointer-events-none -z-20 absolute right-0 top-0 h-56 w-56 opacity-15 transform translate-x-2/3 -translate-y-12" />
                <img src="/svg-decorator-blob-2.svg" alt="blob" className="pointer-events-none -z-20 absolute left-0 bottom-0 h-64 w-64 opacity-15 transform -translate-x-2/3" />
            </div>
            <section className="w-full max-w-screen-xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-6 grid-rows-1 px-6 lg:px-8 ">
                <div className="bg-gray-50 border border-gray-100 px-6 py-6 rounded-lg shadow-sm grid grid-cols-[auto_1fr] grid-rows-1 gap-3 overflow-hidden">
                    <Phone className="size-4 mt-1 text-sky-600" />
                    <div>
                        <h2 className="text-sky-600 font-medium truncate">Contactanos</h2>
                        <p className="text-sm text-justify text-gray-600 leading-6 line-clamp-6 mt-2">
                            Llama a nuestro centro de soporte al <b>+57 333 3333333</b>, disponible de
                            9:00 a 18:00, de lunes a viernes. Nuestro equipo está listo para atender
                            tus necesidades y resolver cualquier problema. Tu satisfacción es nuestra
                            prioridad. ¡Estamos aquí para ayudarte!
                        </p>
                    </div>
                </div>
                <div className="bg-gray-50 border border-gray-100 px-6 py-6 rounded-lg shadow-sm grid grid-cols-[auto_1fr] grid-rows-1 gap-3 overflow-hidden">
                    <MessageCircleQuestion className="w-5 h-5 mt-1 text-sky-600" />
                    <div>
                        <h2 className="text-sky-600 font-medium truncate">Soporte Tecnico</h2>
                        <p className="text-sm text-justify text-gray-600 leading-6 line-clamp-6 mt-2">
                            Envía un correo a <b>soporte@ejemplo.com</b> y nuestro equipo técnico te asistirá.
                            Estamos disponibles de lunes a viernes, de 9:00 a 18:00. Asegúrate de
                            proporcionar detalles sobre tu problema para que podamos ofrecerte la mejor
                            solución posible. ¡Estamos aquí para ayudarte!
                        </p>
                    </div>
                </div>
                <div className="bg-gray-50 border border-gray-100 px-6 py-6 rounded-lg shadow-sm grid grid-cols-[auto_1fr] grid-rows-1 gap-3 overflow-hidden">
                    <ShieldAlert className="w-5 h-5 mt-1 text-sky-600" />
                    <div>
                        <h2 className="text-sky-600 font-medium truncate">Informe de Errores</h2>
                        <p className="text-sm text-justify text-gray-600 leading-6 line-clamp-6 mt-2">
                            Envíanos un correo a <b>errores@ejemplo.com</b> con una descripción detallada del problema.
                            Nuestro equipo revisará tu informe y trabajará en una solución. Estamos disponibles
                            de lunes a viernes, de 9:00 a 18:00. Gracias por ayudarnos a mejorar nuestros
                            servicios.
                        </p>
                    </div>
                </div>
            </section>
            <section className="w-full max-w-screen-xl mx-auto dark:bg-gray-900 px-6 lg:px-8 ">
                <div className="py-8 mx-auto max-w-screen-xl sm:py-16">
                    <h2 className="mb-8 text-4xl tracking-tight font-medium text-gray-900 dark:text-white">Preguntas frecuentes</h2>
                    <div className="grid pt-8 text-left border-t border-gray-200 md:gap-16 dark:border-gray-700 md:grid-cols-2">
                        <div>
                            { faqs.slice(0, 10).map(faq => (
                                <div key={faq.title} className="mb-10">
                                    <h3 className="flex items-center gap-2 mb-4 text-lg font-medium text-gray-900 dark:text-white">
                                        <CircleHelp className="size-5 text-sky-600" />
                                        <span>{faq.title}</span>
                                    </h3>
                                    <p className="text-gray-500 dark:text-gray-400">{faq.description}</p>
                                </div>
                            ))}
                        </div>
                        <div>
                            { faqs.slice(10, 20).map(faq => (
                                <div key={faq.title} className="mb-10">
                                    <h3 className="flex items-center gap-2 mb-4 text-lg font-medium text-gray-900 dark:text-white">
                                        <CircleHelp className="size-5 text-sky-600" />
                                        <span>{faq.title}</span>
                                    </h3>
                                    <p className="text-gray-500 dark:text-gray-400">{faq.description}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>
            <Footer />
        </AnimationRevealPage>
    );
}

export default Help;