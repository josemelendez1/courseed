import { AnimatePresence, motion } from "framer-motion";
import { CourseVertical, CourseVerticalSkeleton } from "../Landing/Course"
import { LoaderCircle } from "lucide-react";

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

const FlexCourseContainer = ({
    title = "Cursos",
    courses = [],
    coursesSize = 6,
    loading = true,
    onLike,
    showLikeButton = false
}) => {

    return(
        <div className="mb-12" >
            <div className="mb-5 mt-5 flex items-center gap-2 px-[26px]">
                <h4 className="text-2xl font-semibold text-[#1B254B] dark:text-white">
                    {title}
                </h4>
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
            <AnimatePresence>
                <motion.div 
                    key={loading ? "skeleton" : "data"}
                    variants={container}
                    initial="hidden"
                    animate="visible"
                    exit={{ x: 10, opacity: 0 }}
                    className="grid grid-cols-1 gap-5 md:grid-cols-3"
                >
                    { !loading ? (
                        courses.map((course, i) => (
                            <motion.div key={i} variants={item}>
                                <CourseVertical course={course} onLike={(c) => onLike(c)} showLike={showLikeButton} /> 
                            </motion.div>
                        ))
                    ) : (
                        Array(coursesSize).fill(1).map((x, i) => (
                            <CourseVerticalSkeleton key={i} />
                        ))
                    )}
                </motion.div>
            </AnimatePresence>
        </div>
    );
}

export default FlexCourseContainer;