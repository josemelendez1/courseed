import axios from "axios";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import Slider from "react-slick";
import { APIS } from "../../configs/apis";
import { Rating } from "./Reviews";
import Avatar from "./Avatar";

const Testimonial = () => {
    const pageSize = 6;
    const direction = -1;
    const containerRef = useRef();
    const [sliderRef, setSliderRef] = useState(null);
    const [isVisible, setIsVisible] = useState(false);
    const [reviews, setReviews] = useState([
        {
            rating: 5,
            description: "Este curso ha sido una experiencia transformadora. Los materiales son completos y los instructores muy profesionales. Gracias a ellos, ahora tengo más confianza y habilidades para avanzar en mi carrera.",
            username: "Charlotte Hale"
        },
        {
            rating: 5,
            description: "Este curso ha cambiado mi forma de ver mi carrera profesional. Los temas son actuales y aplicables. Las actividades prácticas me permitieron poner en práctica lo aprendido de inmediato. Además, la comunidad de estudiantes es increíble, siempre apoyándose mutuamente.",
            username: "Adam Cuppy"
        }
    ]);

    const getTitle = (review) => {
        return `${review.description.split(" ").slice(0, 6).join(" ")}...`;
    } 

    const handleReviews = () => {
        if (!isVisible) return;

        axios.get(APIS.GET_REVIEWS, {
            params: {
                pageSize: pageSize, 
                direction: direction,
            }
        })
        .then(response => {
            if (Array.isArray(response?.data?.content)) setReviews(response.data.content);
        });
    }

    useEffect(handleReviews, [isVisible, pageSize, direction]);

    useEffect(() => {
        const observer = new IntersectionObserver(entries => {
            const [entry] = entries;
            if (entry.isIntersecting) {
                setIsVisible(true);
                observer.disconnect();
            }
        });

        if (containerRef.current) observer.observe(containerRef.current);

        return () => {
            if (observer) observer.disconnect();
        }

    }, [sliderRef]);

    return (
        <div ref={containerRef} className="relative">
            <div className="max-w-screen-xl mx-auto py-20 lg:py-24">
                <div className="flex flex-col md:flex-row justify-between items-center">
                    <div className="w-full max-w-md mx-auto md:max-w-none md:mx-0 md:w-5/12 xl:w-6/12 flex-shrink-0 relative">
                        <img src="/undraw_meet_the_team_re_4h08.svg" alt="Testimonios" className="rounded" />
                    </div>
                    <div className="w-full max-w-md mx-auto md:max-w-none md:mx-0 md:w-7/12 xl:w-6/12 mt-16 md:mt-0 md:pl-12 lg:pl-16 md:order-last">
                        <h5 className="font-bold text-sky-600 text-center md:text-left uppercase tracking-widest">
                            Testimonios
                        </h5>
                        <h2 className="text-center text-4xl sm:text-5xl font-bold tracking-wide mt-4 lg:text-5xl md:text-left leading-tight">
                            Historias de Éxito <span className="text-sky-700">Estudiantil.</span>
                        </h2>
                        <p className="mt-6 text-center md:text-left text-sm md:text-base lg:text-lg font-medium leading-relaxed">
                            Descubre lo que nuestros estudiantes dicen sobre sus experiencias, logros y cómo nuestros cursos han transformado su aprendizaje y crecimiento personal.
                        </p>
                        <Slider infinite={true} slidesToShow={1} slidesToScroll={1} ref={setSliderRef} className="w-full mt-10 text-center md:text-left">
                            {reviews.map((review, i) => (
                                <div key={i} className="outline-none h-full flex flex-col">
                                    <div className="flex items-center justify-center md:justify-start">
                                        <Rating rating={review.rating} />
                                    </div>
                                    <div className="mt-4 text-xl font-bold">{ getTitle(review) }</div>
                                    <blockquote className="mt-4 mb-8 sm:mb-10 leading-relaxed font-medium text-gray-700">
                                        {review.description}
                                    </blockquote>
                                    <div className="mt-auto flex justify-between items-center flex-col sm:flex-row">
                                        <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start">
                                            <Avatar username={review.username} className="rounded-full w-16 h-16 sm:w-20 sm:h-20" />
                                            <div className="text-center md:text-left sm:ml-6 mt-2 sm:mt-0">
                                                <h5 className="font-bold text-xl">{review.username}</h5>
                                            </div>
                                        </div>
                                        <div className="flex mt-8 sm:mt-0">
                                            <button onClick={sliderRef?.slickPrev} className="mx-3 p-4 rounded-full transition duration-300 bg-gray-200 hover:bg-gray-300 text-primary-500 hover:text-primary-700 focus:outline-none focus:shadow-outline">
                                                <ArrowLeft className="w-4 h-4 stroke-3" />
                                            </button>
                                            <div className="my-3 border-r" />
                                            <button onClick={sliderRef?.slickNext} className="mx-3 p-4 rounded-full transition duration-300 bg-gray-200 hover:bg-gray-300 text-primary-500 hover:text-primary-700 focus:outline-none focus:shadow-outline">
                                                <ArrowRight className="w-4 h-4 stroke-3" />
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </Slider>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Testimonial;