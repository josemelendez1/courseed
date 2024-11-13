import { useEffect, useState } from "react";
import { HeadProvider } from "../../../provider/HeadProvider";
import Sidebar from "../../../components/Dashboard/Sidebar";
import { useAuth } from "../../../provider/AuthProvider";
import { motion } from "framer-motion";
import Navbar from "../../../components/Dashboard/Navbar";
import axios from "axios";
import { APIS } from "../../../configs/apis";
import Footer from "../../../components/Dashboard/Footer";
import StatsCard from "../../../components/Dashboard/StatsCard";
import { BookMarked, Heart, Layers3, MessageCircle, School, Users } from "lucide-react";
import BarChart from "../../../components/Charts/BarChart";
import PieChart from "../../../components/Charts/PieChart";

const container = {
    hidden: { x: -20, opacity: 0 },
    visible: { x: 0, opacity: 1, transition: { duration: 0.2, type: "keyframes" } }
}

const Dashboard = () => {

    const coursePageSize = 12;
    const { user } = useAuth();
    const currentRoute = "Pagina de Inicio";
    const [totalCourses, setTotalCourses] = useState(0);
    const [totalCategories, setTotalCategories] = useState(0);
    const [totalInstitutions, setTotalInstitutions] = useState(0);
    const [totalUsers, setTotalUsers] = useState(0);
    const [totalLikedCourses, setTotalLikedCourses] = useState(0);
    const [totalReviews, setTotalReviews] = useState(0);
    const [coursesByLikes, setCoursesByLikes] = useState([]);
    const [institutionsByCourses, setInstitutionsByCourses] = useState([]);
    const [pageNo, setPageNo] = useState(0);
    const [search, setSearch] = useState("");
    const [courses, setCourses] = useState([]);
    const [isFocus, setIsFocus] = useState(false);
    const [open, setOpen] = useState(window.innerWidth >= 1280);

    const handleScroll = (e) => {
        const bottom = e.target.scrollHeight - e.target.scrollTop - 5 <= e.target.clientHeight;
        if (bottom) setPageNo(pageNo + 1);
    }

    const handleCourses = () => {
        axios.get(APIS.GET_COURSES, {
            params: {
                title: search,
                pageSize: coursePageSize,
                pageNo: pageNo
            }
        })
        .then(response => {
            if (Array.isArray(response.data.content)) {
                setTotalCourses(response.data.totalElements);
                setCourses(courses => [
                    ...pageNo > 0 ? courses : [],
                    ...response.data.content ? response.data.content : []
                ]);
            }
        });
    }

    const handleCategories = () => {
        axios.get(APIS.GET_CATEGORIES).then((response) => {
            if (Array.isArray(response.data)) setTotalCategories(response.data.length);
        });
    }

    const handleInstitutions = () => {
        axios.get(APIS.GET_INSTITUTIONS).then((response) => {
            if (Array.isArray(response.data)) setTotalInstitutions(response.data.length);
        });
    }

    const handleUsers = () => {
        axios.get(APIS.GET_USERS).then((response) => {
            if (typeof response.data?.totalElements === "number") setTotalUsers(response.data.totalElements);
        });
    }

    const handleReviews = () => {
        axios.get(APIS.GET_REVIEWS)
        .then(response => {
            if (typeof response.data?.totalElements === "number") setTotalReviews(response.data.totalElements);
        })
        .catch(error => {
            setTotalReviews(0);
        });
    }

    const handleLikedCourses = () => {
        axios.get(APIS.GET_LIKED_COURSES)
        .then(response => {
            if (typeof response.data?.totalElements === "number") setTotalLikedCourses(response.data.totalElements);
        });
    }

    const handleCoursesByLikes = () => {
        axios.get(APIS.COURSES_BY_LIKES, {
            params: {
                pageNo: 0,
                pageSize: 7
            }
        })
        .then(response => {
            if (Array.isArray(response.data?.content)) {
                setCoursesByLikes(response.data.content);
            }
        })
    }

    const handleInstitutionsByCourses = () => {
        axios.get(APIS.INSTITUTIONS_BY_COURSES, {
            params: {
                pageNo: 0,
                pageSize: 4
            }
        })
        .then(response => {
            if (Array.isArray(response.data?.content)) {
                setInstitutionsByCourses(response.data.content);
            }
        })
    }

    const truncateText = (text, maxLength = 10) => {
        return text.length > maxLength ? text.slice(0, maxLength) + '...' : text;
    };

    useEffect(handleCourses, [pageNo, search]);
    useEffect(handleCategories, []);
    useEffect(handleInstitutions, []);
    useEffect(handleUsers, []);
    useEffect(handleReviews, []);
    useEffect(handleLikedCourses, []);
    useEffect(handleCoursesByLikes, []);
    useEffect(handleInstitutionsByCourses, []);
    useEffect(() => { window.scrollTo(0, 0) }, []);

    return (
        <div className="flex w-full h-full font-inter">
            <HeadProvider title="CourSeed - Administrador" />
            <Sidebar open={open} onClose={() => setOpen(false)} roles={user?.roles} />
            <div className="h-full w-full bg-[#F4F7FE] dark:!bg-[#0b1437]">
                <motion.main
                    variants={container}
                    initial="hidden"
                    animate="visible"
                    className="mx-[12px] h-full flex-none transition-all md:pr-2 xl:ml-[313px]"
                >
                    <div className="h-full">
                        <Navbar
                            search={search}
                            isFocus={isFocus}
                            courses={courses}
                            brandText={currentRoute}
                            username={user?.username}
                            onOpenSidenav={() => setOpen(true)}
                            handleScroll={(e) => handleScroll(e)}
                            setIsFocus={(value) => setIsFocus(value)}
                            setSearch={(value) => { setSearch(value); setPageNo(0); }}
                        />
                        <div className="pt-5 mx-auto mb-auto h-full min-h-[84vh] p-2 md:pr-2">
                            <div className="mt-3 grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-3 3xl:grid-cols-6">
                                <StatsCard title="Cursos" icon={<BookMarked className="size-6" />} subtitle={totalCourses} />
                                <StatsCard title="Categorias" icon={<Layers3 className="size-6" />} subtitle={totalCategories} />
                                <StatsCard title="Instituciones" icon={<School className="size-6" />} subtitle={totalInstitutions} />
                                <StatsCard title="Usuarios" icon={<Users className="size-6" />} subtitle={totalUsers} />
                                <StatsCard title="Cursos de Interes" icon={<Heart className="size-6" />} subtitle={`${totalLikedCourses} / ${totalCourses}`} />
                                <StatsCard title="Reseñas" icon={<MessageCircle className="size-6" />} subtitle={totalReviews} />
                            </div>
                            <div className="mt-5 grid grid-cols-1 gap-5 md:grid-cols-[62.5%_1fr]">
                                <BarChart
                                    title="Cursos más populares"
                                    data={coursesByLikes.map(c => {
                                        return {
                                            id: c?.id,
                                            title: truncateText(c?.title),
                                            Interesados: c?.likes,
                                            Reseñas: c?.reviews
                                        }
                                    })}
                                    indexesWithFullText={coursesByLikes.map(c => c?.title)}
                                    categories={["Interesados", "Reseñas"]}
                                    index="title"
                                />
                                <PieChart 
                                    index="name"
                                    category="courses"
                                    title="Proporción de cursos ofrecidos"
                                    categories={institutionsByCourses.map(i => i.name)}
                                    data={institutionsByCourses}
                                />
                            </div>
                        </div>
                        <div className="p-3">
                            <Footer />
                        </div>
                    </div>
                </motion.main>
            </div>
        </div>
    );
}

export { Dashboard };