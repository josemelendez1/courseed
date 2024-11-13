import { useEffect, useState } from "react";
import { useAuth } from "../../../provider/AuthProvider";
import { HeadProvider } from "../../../provider/HeadProvider";
import Sidebar from "../../../components/Dashboard/Sidebar";
import Navbar from "../../../components/Dashboard/Navbar";
import Footer from "../../../components/Dashboard/Footer";
import axios from "axios";
import { APIS } from "../../../configs/apis";
import { Course, CourseSkeleton } from "../../../components/Landing/Course";
import { AnimatePresence, motion } from "framer-motion";

const container = {
    hidden: { x: -20, opacity: 0 },
    visible: { x: 0, opacity: 1, transition: { duration: 0.2, type: "keyframes" } }
}

const containerCourses = {
    hidden: {
        opacity: 0,
        x: -10
    },
    visible: {
        opacity: 1,
        x: 0,
        transition: {
            delayChildren: 0.3,
            staggerChildren: 0.2
        }
    },
    exit: { x: 10, opacity: 0 }
} 

const item = {
    hidden: { x: -10, opacity: 0 },
    visible: { x: 0, opacity: 1 },
    exit: { x: 10, opacity: 0 }
}

const InterestCourses = () => {
    
    const [open, setOpen] = useState(window.innerWidth >= 1280);
    const currentRoute = "Cursos de Interes";
    const { user } = useAuth();

    const pageNo = 0;
    const pageSize = 12;
    const [search, setSearch] = useState("");
    const [loading, setLoading] = useState(true);
    const [likedCourses, setLikedCourses] = useState([]);
    
    const handleLikedCourses = () => {
        axios.get(APIS.GET_LIKED_COURSES_AUTH, {
            params: {
                pageNo: pageNo,
                pageSize: pageSize
            }
        })
        .then(response => {
            if (Array.isArray(response.data?.content)) {
                setLikedCourses(response.data?.content.map(c => {
                    return {...c, isLike: true };
                }));
                setTimeout(() => setLoading(false), 500);
            }   
        })
        .catch(error => setLikedCourses([]));
    }

    const handleDisLike = (course) => {
        axios.post(APIS.LIKE_COURSE, {
            courseId: course.id,
            like: false
        })
        .then(response => {
            if (typeof response.data === "object") {
                setLikedCourses(prev => prev.filter(c => {
                    return c.id !== course.id;
                }))
            }
        })
    }

    const handleSearch = (course) => {
        return search.trim().length === 0 || course?.title.includes(search) || course?.description.includes(search);
    }

    useEffect(handleLikedCourses, []);
    useEffect(() => { window.scrollTo(0, 0) }, []);

    return (
        <div className="flex w-full h-full font-inter">
            <HeadProvider title="CourSeed - Cursos de Interes" />
            <Sidebar open={open} onClose={() => setOpen(false)} />
            <div className="h-full w-full bg-[#F4F7FE] dark:!bg-[#0b1437]">
                <motion.main variants={container} initial="hidden" animate="visible" className="mx-[12px] h-full flex-none transition-all md:pr-2 xl:ml-[313px]">
                    <div className="h-full">
                        <Navbar
                            onOpenSidenav={() => setOpen(true)}
                            brandText={currentRoute}
                            username={user?.username}
                            search={search}
                            setSearch={(value) => setSearch(value)}
                        />
                        <AnimatePresence mode="wait">
                            <motion.div
                                key={loading ? "skeleton" : "data"}
                                variants={containerCourses}
                                initial="hidden"
                                animate="visible"
                                exit="exit"
                                className={`mt-5 grid h-full min-h-[90vh] grid-cols-1 sm:grid-cols-2 2xl:grid-cols-3 
                                content-start ${!loading && "gap-y-16 pb-12"}`}
                            >
                                { !loading ? (likedCourses.filter(handleSearch).map((course, i) => (
                                    <motion.div 
                                        key={course.title} 
                                        variants={item}
                                    >
                                        <Course  
                                            course={course} 
                                            className="bg-white bg-clip-border shadow-[14px_17px_40px_4px] 
                                            shadow-[rgba(112,144,176,0.08)] my-8 aspect-[none] h-full"
                                            rounded={true}
                                            showLike={true}
                                            onLike={() => handleDisLike(course)}
                                        />
                                    </motion.div>
                                ))) : ( Array(pageSize).fill(1).map((x, i) => (
                                    <CourseSkeleton 
                                        key={i} 
                                        rounded={true} 
                                        className="bg-white/50 bg-clip-border shadow-[14px_17px_40px_4px] 
                                        shadow-[rgba(112,144,176,0.08)] w-[calc(100%-3.5rem)] dark:shadow-none
                                        my-8" 
                                    />
                                )))
                                }
                            </motion.div>
                        </AnimatePresence>
                        <div className="p-3 mt-6">
                            <Footer />
                        </div>
                    </div>
                </motion.main>
            </div>
        </div>
    );
}

export default InterestCourses;