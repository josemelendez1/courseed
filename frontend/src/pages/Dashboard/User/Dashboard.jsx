
import { HeadProvider } from "../../../provider/HeadProvider";
import Sidebar from "../../../components/Dashboard/Sidebar";
import { useEffect, useState } from "react";
import Footer from "../../../components/Dashboard/Footer";
import Navbar from "../../../components/Dashboard/Navbar";
import { useAuth } from "../../../provider/AuthProvider";
import Banner from "../../../components/Dashboard/Banner";
import SingleCoursesTable from "../../../components/Dashboard/SingleCoursesTable";
import FlexCourseContainer from "../../../components/Dashboard/FlexCoursesContainer";
import axios from "axios";
import { APIS } from "../../../configs/apis";
import { motion } from "framer-motion";

const container = {
    hidden: { x: -20, opacity: 0 },
    visible: { x: 0, opacity: 1, transition: { duration: 0.2, type: "keyframes" } }
} 

const Dashboard = () => {

    const coursePageSize = 12;
    const recentCoursePageNo = 0;
    const recentCoursePageSize = 6;
    const [loadingRecentCourses, setLoadingRecentCourses] = useState(true);
    const [open, setOpen] = useState(window.innerWidth >= 1280);
    const currentRoute = "Pagina de Inicio";
    const { user, loading } = useAuth();
    const [pageNo, setPageNo] = useState(0);
    const [courses, setCourses] = useState([]);
    const [recentCourses, setRecentCourses] = useState([]);
    const [isFocus, setIsFocus] = useState(false);
    const [search, setSearch] = useState("");

    const handleLike = (course) => {
        const like = !course.isLike;

        axios.post(APIS.LIKE_COURSE, {
            courseId: course.id,
            like: like
        })
            .then(response => {
                if (typeof response.data === "object") {
                    setRecentCourses(recentCourses.map(c => {
                        if (c.id === course.id) {
                            return { ...c, isLike: like }
                        } else {
                            return c;
                        }
                    }));
                }
            });
    }

    const handleRecentCourses = () => {
        axios.get(APIS.GET_RECENT_COURSES, {
            params: {
                pageNo: recentCoursePageNo,
                pageSize: recentCoursePageSize
            }
        })
        .then(response => {
            if (Array.isArray(response.data?.content)) {
                setRecentCourses(response.data?.content);
                setTimeout(() => {
                    setLoadingRecentCourses(false);
                }, 500);
            }
        });
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
                setCourses(courses => [
                    ...pageNo > 0 ? courses : [],
                    ...response.data.content ? response.data.content : []
                ]);
            }
        });
    }

    const handleScroll = (e) => {
        const bottom = e.target.scrollHeight - e.target.scrollTop - 5 <= e.target.clientHeight;
        if (bottom) setPageNo(pageNo + 1);
    }

    const updateLikesInCourses = () => {
        if (typeof user === "object") {
            setRecentCourses(prev => prev.map(course => {
                return { ...course, isLike: Array.isArray(user?.likes) && user?.likes.some(c => c.courseId === course.id) }
            }));
        }
    }

    useEffect(handleCourses, [pageNo, search]);
    useEffect(handleRecentCourses, []);
    useEffect(updateLikesInCourses, [user]);
    useEffect(() => { window.scrollTo(0, 0) }, []);

    return (
        <div className="flex w-full h-full font-inter">
            <HeadProvider title="CourSeed - Inicio" />
            <Sidebar open={open} onClose={() => setOpen(false)} roles={user?.roles} />
            <div className="h-full w-full bg-[#F4F7FE] dark:!bg-[#0b1437]">
                <motion.main variants={container} initial="hidden" animate="visible" className="mx-[12px] h-full flex-none transition-all md:pr-2 xl:ml-[313px]">
                    <div className="h-full">
                        <Navbar
                            onOpenSidenav={() => setOpen(true)}
                            brandText={currentRoute}
                            username={user?.username}
                            search={search}
                            setSearch={(value) => {
                                setSearch(value);
                                setPageNo(0);
                            }}
                            isFocus={isFocus}
                            setIsFocus={(value) => setIsFocus(value)}
                            courses={courses}
                            handleScroll={(e) => handleScroll(e)}
                        />
                        <div className="mt-5 grid h-full grid-cols-1 gap-5 xl:grid-cols-2 2xl:grid-cols-3">
                            <div className="col-span-1 h-fit w-full xl:col-span-1 2xl:col-span-2">
                                <Banner
                                    title={!loading ? (
                                        `Bienvenido ${user?.username}.👋`
                                    ) : (
                                        <div className="space-y-3">
                                            <div className="grid items-center grid-cols-[auto_1fr] gap-x-4">
                                                <span>Bienvenido</span>
                                                <div className="h-[30px] bg-sky-700 rounded"></div>
                                            </div>
                                            <div className="h-[30px] bg-sky-700 rounded mr-8"></div>
                                            <span>👋</span>
                                        </div>
                                    )
                                    }
                                    loadingTitle={loading}
                                    description="¡Descubre nuestra app para cursos y grupos de estudio, donde aprender es comunidad!"
                                    textLink1="Descubrir ahora"
                                    hrefLink1="/cursos"
                                    textLink2="Pagina principal"
                                    hrefLink2="/"
                                />
                                <FlexCourseContainer
                                    title="Cursos Recientes"
                                    courses={recentCourses}
                                    loading={loadingRecentCourses}
                                    onLike={(course) => handleLike(course)}
                                    showLikeButton={true}
                                />
                            </div>
                            <div className="col-span-1 h-full w-full rounded-xl 2xl:col-span-1">
                                <SingleCoursesTable
                                    title="Cursos populares"
                                    LinkText="Ver todos"
                                    LinkUrl="/cursos"
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