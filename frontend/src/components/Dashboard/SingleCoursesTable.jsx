
import axios from "axios";
import { useEffect, useState } from "react";
import { APIS } from "../../configs/apis";
import { Heart, LoaderCircle } from "lucide-react";
import { Link } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";

const container = {
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
} 

const item = {
    hidden: { x: -10, opacity: 0 },
    visible: { x: 0, opacity: 1 }
}

const SingleCoursesTable = ({
    title = "Check Table",
    LinkText = "See all",
    LinkUrl = "/",
}) => {

    const pageNo = 0;
    const pageSize = 10;
    const [courses, setCourses] = useState([]);
    const [loading, setLoading] = useState([]);

    useEffect(() => {
        axios.get(APIS.COURSES_BY_LIKES, {
            params: {
                pageNo: pageNo,
                pageSize: pageSize
            }
        })
            .then(response => {
                if (typeof response.data?.content === 'object') {
                    setCourses(response.data?.content);
                }
            })
            .finally(() => {
                setTimeout(() => {
                    setLoading(false);
                }, 500);
            });
    }, []);

    return (
        <div
            className="!z-[5] relative flex flex-col rounded-[20px] 
            bg-white bg-clip-border shadow-[14px_17px_40px_4px] 
            shadow-[rgba(112,144,176,0.08)] dark:!bg-[#111c44] 
            dark:text-white dark:shadow-none w-full sm:overflow-auto"
        >
            <header className="relative flex items-center justify-between pt-4 px-6 pb-6 shadow-slate-100 shadow-2xl dark:shadow-none">
                <div className="text-lg flex items-center gap-2 font-semibold text-[#1B254B] dark:text-white">
                    <span>{title}</span>
                    <AnimatePresence>
                        <motion.div
                            key={loading ? "skeleton" : "data"}
                            variants={container}
                            initial="hidden"
                            animate="visible"
                            exit={{ x: 10, opacity: 0 }}
                        >
                            { loading && <LoaderCircle className="size-5 animate-spin text-gray-400" /> }
                        </motion.div>
                    </AnimatePresence>
                </div>
                <Link
                    to={LinkUrl}
                    className="dark:active:bg-white/[0.2] rounded-3xl bg-[#F4F7FE] px-4 py-2 text-base font-medium 
                    text-sky-600 transition duration-200 hover:bg-gray-100 active:bg-gray-200 dark:bg-white/5 
                    dark:text-white dark:hover:bg-white/10"
                >
                    {LinkText}
                </Link>
            </header>
            <div className="overflow-x-scroll xl:overflow-x-hidden overflow-y-hidden px-6">
                <table className="w-full table-auto">
                    <thead>
                        <tr className="">
                            <th
                                scope="col"
                                className="py-3 text-start text-xs font-semibold 
                                text-gray-400 uppercase dark:text-neutral-400"
                            >
                                
                            </th>
                            <th
                                scope="col"
                                className="py-3 text-end text-xs font-semibold 
                                text-gray-400 uppercase dark:text-neutral-400"
                            >
                                popularidad
                            </th>
                        </tr>
                    </thead>
                    <AnimatePresence mode="wait">
                        <motion.tbody
                            key={loading ? "skeleton" : "data"}
                            variants={container}
                            initial="hidden"
                            animate="visible"
                            exit={{ x: 10, opacity: 0 }}
                        >
                            {!loading ? (
                                courses.map((course, i) => (
                                    <motion.tr variants={item} key={i}>
                                        <td className="max-w-0 py-4 w-full text-sm font-medium text-gray-800 dark:text-neutral-200 overflow-hidden">
                                            <Link
                                                key={i}
                                                to={`/curso/${course.id}`}
                                                className="w-full group"
                                            >
                                                <div className="w-full truncate flex items-center gap-3">
                                                    <img
                                                        src={`/images/courses/${course.image}`}
                                                        alt="Imagen de curso"
                                                        className="w-10 h-10 rounded-md object-cover"
                                                    />
                                                    <p className="text-base text-gray-900 font-medium truncate group-hover:underline dark:text-white" title={course.title}>
                                                        {course.title}
                                                    </p>
                                                </div>
                                            </Link>
                                        </td>
                                        <td className="max-w-0 py-4 whitespace-nowrap text-sm text-gray-800 dark:text-neutral-200">
                                            <div className="w-full flex items-center justify-end gap-1 text-base text-gray-400 font-medium">
                                                <span className="truncate">{course.likes}</span>
                                                <Heart className="size-6 text-sky-600 dark:text-sky-700" />
                                            </div>
                                        </td>
                                    </motion.tr>
                                ))
                            ) : (
                                Array(pageSize).fill(1).map((x, i) => (
                                    <tr key={i} className="animate-pulse">
                                        <td className="max-w-0 py-4 w-full">
                                            <div className="w-full grid items-center grid-cols-[auto_1fr] gap-3">
                                                <div className="bg-slate-200 h-10 w-10 rounded-md dark:bg-white/10" />
                                                <div className="space-y-3">
                                                    <div className="grid grid-cols-3 gap-3">
                                                        <div className="h-2 bg-slate-200 rounded col-span-2 dark:bg-white/5"></div>
                                                        <div className="h-2 bg-slate-200 rounded col-span-1 dark:bg-white/5"></div>
                                                    </div>
                                                    <div className="h-2 bg-slate-200 rounded mr-6 dark:bg-white/5"></div>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="max-w-0 py-4">
                                            <div className="w-full grid items-center justify-end">
                                                <Heart className="size-6 text-slate-200 dark:text-white/10" />
                                            </div>
                                        </td>
                                    </tr>
                                ))
                            )}
                        </motion.tbody>
                    </AnimatePresence>
                </table>
            </div>
        </div>
    );
}

export default SingleCoursesTable;