import { motion } from "framer-motion";
import AnimationRevealPage from "../../helpers/AnimationRevealPage";
import Navbar from "./Navbar";
import { ExternalLink } from "lucide-react";

const container = {
    hidden: { y: 20, opacity: 0 },
    visible: {
        y: 0,
        opacity: 1,
        transition: {
            duration: 0.6
        }
    }
}

const HeroWithBackgroundSingle = ({ 
    title = "Cargando info", 
    titleMarked = "del curso.", 
    subtitle = "Encuentra el curso perfecto para ti, al alcance de un clic.",
    bgImage = "/pexels-julia-m-cameron-4144923.jpg",
    video = false,
    link = "/",
    defaultSubtitle = "Actualmente no hay información disponible sobre este curso. Por favor, vuelve más tarde para obtener detalles actualizados y completos."
}) => {
    return (
        <motion.div
            variants={container}
            initial="hidden"
            animate="visible"
            className={`relative bg-center bg-cover h-screen min-h-144`}
            style={{ backgroundImage : `url(${bgImage})` }}
        >
            <div className="z-10 absolute inset-0 bg-black opacity-75" />
            <div className="z-20 relative sm:px-8 mx-auto h-full">
                <AnimationRevealPage>
                    <Navbar light={true} className="w-full max-w-screen-xl mx-auto" />
                    <div className="lg:pt-24 sm:pb-32 sm:px-4 grid justify-between items-center grid-cols-1 lg:grid-cols-[55%_45%] lg:gap-x-4">
                        <div className="flex flex-col items-center lg:block">
                            <p title={subtitle} className="text-justify max-w-[90%] line-clamp-2 my-4 pl-3 py-1 text-gray-100 border-l-4 border-blue-500 font-medium text-sm">
                                {(subtitle && subtitle.toLocaleLowerCase() !== "no aplica") 
                                ? subtitle
                                : defaultSubtitle
                                }
                            </p>
                            <h1 className="text-3xl text-center lg:text-left sm:text-4xl lg:text-5xl xl:text-6xl font-bold text-gray-100">
                                <span title={title} className="line-clamp-2">{title}</span>
                                <span title={titleMarked} className="relative text-sky-600 px-4 -mx-4 py-1 before:content-[''] before:absolute before:inset-0 before:bg-gray-100 before:transform before:-skew-x-12 before:-z-10">
                                    {titleMarked}
                                </span>
                            </h1>
                            <a
                                href={link}
                                target="_blank"
                                rel="noreferrer"
                                className="hidden sm:inline-flex px-10 py-4 text-lg truncate font-medium rounded-full sm:items-center sm:gap-2 bg-white text-sky-700 hover:bg-sky-700 focus:bg-sky-700 
                                hover:text-gray-200 focus:text-gray-200 focus:shadow-outline focus:outline-none transition duration-300 mt-16"
                            >
                                <span>Visitar sitio oficial</span>
                                <ExternalLink className="size-5" />
                            </a>
                        </div>
                        <div className="w-full mt-16 lg:mt-0">
                            { video ? (
                                <iframe
                                    title={video}
                                    className="w-full aspect-video rounded bg-gray-900 shadow-xl"
                                    allowFullScreen={true}
                                    src={video}
                                />
                            ) : (
                                <img 
                                    src={bgImage}
                                    alt="imagen de curso" 
                                    className="relative rounded aspect-[16/9] w-full object-cover"  
                                />
                            )}
                        </div>
                    </div>
                </AnimationRevealPage>
            </div>
        </motion.div>
    );
}

export default HeroWithBackgroundSingle;