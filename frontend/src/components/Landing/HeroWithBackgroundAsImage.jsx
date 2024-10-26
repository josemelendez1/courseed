import Navbar from "./Navbar";
import AnimationRevealPage from "../../helpers/AnimationRevealPage";
import { motion } from "framer-motion";

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

const HeroWithBackgroundAsImage = ({ onClick }) => {
    return(
        <motion.div
            variants={container}
            initial="hidden"
            animate="visible"
            className={`relative bg-center bg-cover h-screen min-h-144 
            bg-[url('/public/pexels-jonathanborba-17771091.jpg')]`}
        >
            <div className="z-10 absolute inset-0 bg-black opacity-75" />
            <div className="z-20 relative px-6 sm:px-8 mx-auto h-full">
                <AnimationRevealPage>
                    <Navbar light={true} className="w-full max-w-screen-xl mx-auto" />
                    <div className="px-4 flex flex-col justify-center items-center h-[calc(100vh-5.75rem)] lg:h-[calc(100vh-4.75rem)]">
                        <h1 className="text-3xl text-center sm:text-4xl lg:text-5xl xl:text-6xl 
                            font-bold text-gray-100 leading-snug -mt-24 sm:mt-0"
                        >
                            Explora cursos variados y 
                            <br />
                            mejora tus habilidades ahora.
                        </h1>
                        <button 
                            onClick={onClick}
                            className="rounded-full px-8 py-3 mt-10 text-sm sm:text-base 
                            sm:mt-16 sm:px-8 sm:py-4 font-semibold shadow transition 
                            duration-300 bg-sky-600 text-gray-100 hover:bg-sky-700 focus:bg-sky-700 
                            hover:text-gray-200 focus:text-gray-200 focus:outline-none focus:shadow-outline"
                        >
                            Buscar cursos de mí interes
                        </button>
                    </div>
                </AnimationRevealPage>
            </div>
        </motion.div>
    );
}

export default HeroWithBackgroundAsImage;