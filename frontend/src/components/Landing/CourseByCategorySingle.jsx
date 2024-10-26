import { useEffect, useState } from "react";
import CourseGridSingle from "./CourseGridSingle";
import axios from "axios";
import { APIS } from "../../configs/apis";

const CourseByCategorySingle = () => {
    const pageSize = 12;
    const [courses, setCourses] = useState([]);
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedCategory, setSelectedCategory] = useState(null);

    const handleCourses = () => {
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
            .finally(() => {
                setTimeout(() => {
                    setLoading(false);
                }, 1000);
            });
    }

    const handleCategories = () => {
        axios.get(APIS.GET_CATEGORIES)
            .then(response => {
                setCategories(response.data ? response.data : []);
            });
    }

    useEffect(() => {
        handleCourses();
        handleCategories();

        return;
    }, []);

    useEffect(() => {
        handleCourses();
    }, [selectedCategory]);
    
    return (
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
    );
}

export default CourseByCategorySingle;