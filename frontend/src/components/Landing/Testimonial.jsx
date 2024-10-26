import { ArrowLeft, ArrowRight, Star } from "lucide-react";
import { useState } from "react";
import Slider from "react-slick";

const Testimonial = () => {
    
    const [sliderRef, setSliderRef] = useState(null);
    const [testimonials, setTestimonials] = useState([
        {
          stars: 5,
          profileImageSrc:
            "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=3.25&w=512&h=512&q=80",
          heading: "Aprendí y Crecí con Estos Cursos",
          quote:
            "Este curso ha sido una experiencia transformadora. Los materiales son completos y los instructores muy profesionales. Gracias a ellos, ahora tengo más confianza y habilidades para avanzar en mi carrera.",
          customerName: "Charlotte Hale",
          customerTitle: "CEO, Delos Inc."
        },
        {
          stars: 5,
          profileImageSrc:
            "https://images.unsplash.com/photo-1531427186611-ecfd6d936c79?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2.25&w=512&h=512&q=80",
          heading: "Transformé mi carrera gracias a este curso, una experiencia invaluable.",
          quote:
            "ste curso ha cambiado mi forma de ver mi carrera profesional. Los temas son actuales y aplicables. Las actividades prácticas me permitieron poner en práctica lo aprendido de inmediato. Además, la comunidad de estudiantes es increíble, siempre apoyándose mutuamente. Recomiendo este curso a cualquier persona que quiera crecer.",
          customerName: "Adam Cuppy",
          customerTitle: "Founder, EventsNYC"
        }
    ]);

    return (
        <div className="relative">
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
                            {testimonials.map((testimonial, i) => (
                                <div key={i} className="outline-none h-full flex flex-col">
                                    <div>
                                        {Array.from({ length: testimonial.stars }).map((_,indexIcon) => (
                                            <Star key={indexIcon} className="inline-block w-5 h-5 text-orange-400 fill-current mr-1 last:mr-0" />
                                        ))}
                                    </div>
                                    <div className="mt-4 text-xl font-bold">{testimonial.heading}</div>
                                    <blockquote className="mt-4 mb-8 sm:mb-10 leading-relaxed font-medium text-gray-700">
                                        {testimonial.quote}
                                    </blockquote>
                                    <div className="mt-auto flex justify-between items-center flex-col sm:flex-row">
                                        <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start">
                                            <img src={testimonial.profileImageSrc} alt={testimonial.customerName} className="rounded-full w-16 h-16 sm:w-20 sm:h-20" /> 
                                            <div className="text-center md:text-left sm:ml-6 mt-2 sm:mt-0">
                                                <h5 className="font-bold text-xl">{testimonial.customerName}</h5>
                                                <p className="font-bold text-xl">{testimonial.customerTitle}</p>
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