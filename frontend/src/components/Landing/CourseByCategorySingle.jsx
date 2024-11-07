import { useEffect, useState } from "react";
import CourseGridSingle from "./CourseGridSingle";
import axios from "axios";
import { APIS } from "../../configs/apis";

const CourseByCategorySingle = () => {
    const pageSize = 12;
    const [isVisible, setIsVisible] = useState(false);
    const [courses, setCourses] = useState([]);
    const [categories, setCategories] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState(null);
    const [loading, setLoading] = useState(true);
    const [gridRef, setGridRef] = useState(null);

    const handleCourses = () => {
        if (!isVisible) return;
        setLoading(true);

        axios.get(APIS.GET_COURSES, {
            params: {
                categories: selectedCategory?.name, 
                pageSize: pageSize
            }
        })
        .then(response => {
            setCourses(response.data.content ? response.data.content : []);
        })
        .finally(() => setTimeout(() => {
            setLoading(false);
        }, 500))
    }

    const handleCategories = () => {
        if (!isVisible) return;

        axios.get(APIS.GET_CATEGORIES)
        .then(response => {
            setCategories(response.data ? response.data : []);
        });
    }

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

    useEffect(handleCategories, [isVisible]);
    useEffect(handleCourses, [selectedCategory, isVisible]);
    
    return (
        <div ref={setGridRef}>
            <CourseGridSingle
                title={<>Cursos por <span className="text-sky-600">categorías.</span></>}
                titleButton="Ver todas las categorias"
                subtitle="Desliza a través de nuestra amplia gama de cursos. 
                Filtra por categorías y elige el aprendizaje que se adapta a 
                tus metas personales y profesionales."
                defaultFilterTitle="Todas Las Categorias"
                courses={courses}
                selectedFilter={selectedCategory}
                setSelectedFilter={(value) => setSelectedCategory(value)}
                filters={categories}
                loading={loading}
                blob={<span 
                        className="pointer-events-none absolute right-0 bottom-0 w-64 
                        opacity-25 transform translate-x-32 translate-y-48"
                    >
                        <img src="/svg-decorator-blob-3.svg" alt="blob" />
                    </span>
                }
            />
        </div>
    );
}

export default CourseByCategorySingle;