import { useParams } from "react-router-dom";
import { HeadProvider } from "../../provider/HeadProvider";
import HeroWithBackgroundSingle from "../../components/Landing/HeroWithBackgroundSingle";
import { useEffect, useState } from "react";
import Footer from "../../components/Landing/Footer";
import axios from "axios";
import { ArrowUpWideNarrow, Bookmark, CalendarDays, CircleDollarSign, GraduationCap, Languages } from "lucide-react";
import AnimationRevealPage from "../../helpers/AnimationRevealPage";
import Features, { MainFeature, StepsFeature } from "../../components/Landing/Features";
import { APIS } from "../../configs/apis";

const Course = () => {
    let { id } = useParams();
    const [course, setCourse] = useState(null);

    const handleCourse = () => {
        if (id) {
            axios
                .get(APIS.GET_COURSE, {
                    params: { id: id }
                })
                .then(response => {
                    setCourse({
                        ...response.data,
                        video: response.data.video ? "https://www.youtube.com/embed/" + new URL(response.data.video).searchParams.get("v") : null
                    });
                });
        }
    }

    useEffect(() => { window.scrollTo(0, 0) }, []);
    useEffect(handleCourse, [id]);

    const cards = [
        {
            icon: <GraduationCap className="size-6" />,
            title: "Institución",
            description: <>Impulsa tu aprendizaje con este curso de la institución <span className="text-sky-600">{course?.institution}</span>.</>,
        },
        {
            icon: <Bookmark className="size-6" />,
            title: "Categoria",
            description: <>Amplía tus conocimientos con el catálogo de <span className="text-sky-600">{course?.category}</span>.</>,
        },
        {
            icon: <CircleDollarSign className="size-6" />,
            title: "Precio",
            description: <>Curso disponible a un increíble precio: <span className="text-sky-600">{course?.price === "$0" ? 'Gratuito' : `${course?.price}`}</span>.</>,
        },
        {
            icon: <CalendarDays className="size-6" />,
            title: "Duración",
            description: <>Curso intensivo de <span className="text-sky-600">{course?.duration}</span> para tu aprendizaje.</>,
        },
        {
            icon: <Languages className="size-6" />,
            title: "Idioma",
            description: <>Desarrolla tu fluidez en <span className="text-sky-600">{course?.about?.language === "en" ? "Ingles" : (course?.about?.language === "es" ? "Español" : course?.about?.language)}</span> con nosotros.</>,
        },
        {
            icon: <ArrowUpWideNarrow className="size-6" />,
            title: "Nivel",
            description: <>Curso de nivel <span className="text-sky-600">{course?.about?.level}</span> para estudiantes dedicados.</>,
        },
    ];

    return (
        <main className="bg-white isolate">
            <HeadProvider title={`CourSeed | ${course ? course?.title : 'cargando'}`} />
            <HeroWithBackgroundSingle
                subtitle={course?.description}
                title={course?.title}
                titleMarked={course?.institution}
                bgImage={course?.image ? `/images/courses/${course?.image}` : "/pexels-julia-m-cameron-4144923.jpg"}
                video={course?.video}
                link={course?.url}
            />
            <AnimationRevealPage>
                <MainFeature 
                    subTitle="Acerca de"
                    title={<>Descripción del <span className="text-sky-600">curso.</span></>}
                    description={course?.about?.description}
                    link={course?.url}
                />
                <Features 
                    subTitle="De un vistazo"
                    title={<>Estructura del Curso: <span className="text-sky-600">Un Vistazo al Contenido.</span></>}
                    description="Nuestra metodología incluye un contenido diversificado que se adapta a diferentes 
                    estilos de aprendizaje."
                    cards={cards}
                />
                <StepsFeature 
                    subTitle="Lo que aprenderás"
                    title={<>Descubre Todo lo que <span className="text-sky-600">Aprenderás</span> en Nuestro Curso.</>}
                    contents={course?.contents?.slice(0, 3).map(content => {
                        return typeof content?.name === "string" 
                            ? {
                                ...content,
                                name: content.name.charAt(0).toUpperCase() + content.name.slice(1)
                            } 
                            : content
                    })}
                />
                <Footer />
            </AnimationRevealPage>
        </main>
    );
}

export default Course;