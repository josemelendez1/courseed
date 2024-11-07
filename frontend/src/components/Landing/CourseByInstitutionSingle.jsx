import { useEffect, useState } from "react";
import CourseGridSingle from "./CourseGridSingle";
import axios from "axios";
import { APIS } from "../../configs/apis";

const CourseByInstitutionSingle = () => {
    const pageSize = 12;
    const [courses, setCourses] = useState([]);
    const [institutions, setInstitutions] = useState([]);
    const [selectedInstitution, setSelectedInstitution] = useState(null);
    const [loading, setLoading] = useState(true);

    const handleCourses = () => {
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
            .finally(() => {
                setTimeout(() => {
                    setLoading(false);
                }, 1000);
            });
    }

    const handleInstitutions = () => {
        axios.get(APIS.GET_INSTITUTIONS).then((response) => {
            setInstitutions(response.data ? response.data : []);
        });
    };

    useEffect(() => {
        handleCourses();
        handleInstitutions();

        return;
    }, []);

    useEffect(() => {
        handleCourses();
    }, [selectedInstitution]);
    
    return (
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
    );
}

export default CourseByInstitutionSingle;