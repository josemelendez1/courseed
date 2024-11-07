import { useEffect, useState } from "react";
import CourseGridSingle from "./CourseGridSingle";
import axios from "axios";
import { APIS } from "../../configs/apis";

const CourseByInstitutionSingle = () => {
    const pageSize = 12;
    const [courses, setCourses] = useState([]);
    const [loading, setLoading] = useState(true);
    const [isVisible, setIsVisible] = useState(false);
    const [institutions, setInstitutions] = useState([]);
    const [selectedInstitution, setSelectedInstitution] = useState(null);

    const [gridRef, setGridRef] = useState(null);

    const handleCourses = () => {
        if (!isVisible) return;
        setLoading(true);
        
        axios.get(APIS.GET_COURSES, {
            params: {
                institutions: selectedInstitution?.name,
                pageSize: pageSize
            }
        })
        .then(response => {
            setCourses(response.data.content ? response.data.content : []);
        })
        .finally(() => setTimeout(() => setLoading(false), 500));
    }

    const handleInstitutions = () => {
        if (!isVisible) return;
        axios.get(APIS.GET_INSTITUTIONS).then((response) => {
            setInstitutions(response.data ? response.data : []);
        });
    };

    useEffect(() => {
        const observer = new IntersectionObserver(entries => {
            const [entry] = entries;
            if (entry.isIntersecting) {
                setIsVisible(true);
                observer.disconnect();
            }
        });

        if (gridRef) observer.observe(gridRef);

        return () => {
            if (observer) observer.disconnect();
        }
    }, [gridRef]);

    useEffect(handleInstitutions, [isVisible]);
    useEffect(handleCourses, [selectedInstitution, isVisible]);
    
    return (
        <div ref={setGridRef}>
            <CourseGridSingle 
                title={<>Cursos por <span className="text-sky-600">instituciones.</span></>}
                titleButton="Ver todas las instituciones"
                subtitle="Navega por nuestro carrusel de cursos ofrecidos por prestigiosas 
                instituciones. Tu formación, a un clic de distancia."
                defaultFilterTitle="Todas las Instituciones"
                courses={courses}
                selectedFilter={selectedInstitution}
                setSelectedFilter={(value) => setSelectedInstitution(value)}
                filters={institutions}
                loading={loading}
                blob={<img src="/svg-decorator-blob-6.svg" alt="blob" className="pointer-events-none -z-20 absolute left-0 bottom-0 h-64 w-64 opacity-25 transform -translate-x-1/2 translate-y-1/2" />}
            />
        </div>
    );
}

export default CourseByInstitutionSingle;