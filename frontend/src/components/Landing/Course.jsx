import { Heart } from "lucide-react";
import { Link } from "react-router-dom";
import LazyImage from "./LazyImage";

const Course = ({ 
    course, 
    className, 
    rounded = false, 
    showLike = false, 
    onLike, 
    likeClassName,
    defaultDescription = "Actualmente no hay información disponible sobre este curso. Por favor, vuelve más tarde para obtener detalles actualizados y completos.",
    descriptionClassName
}) => {
    return(
        <div 
            className={`group flex flex-col justify-start items-start gap-2 aspect-[2/1] 
            w-[calc(100%-3.5rem)] duration-500 relative px-4 py-6 bg-gray-100 dark:shadow-none dark:!bg-[#111c44]
            hover:-translate-y-2 hover:shadow-xl shadow-gray-300 rounded-${rounded ? "[20px]" : "lg"} ${className}`}
        >
            { showLike &&
                <button
                    onClick={() => onLike(course)}
                    className={`opacity-0 group-hover:opacity-100 absolute top-[0.75rem] right-[0.75rem] flex items-center 
                    justify-center rounded-full p-2 hover:cursor-pointer transition-all duration-200
                    ${course.isLike 
                        ? "text-white bg-sky-600 hover:bg-sky-700 dark:bg-sky-700" 
                        : "text-sky-600 bg-white hover:bg-gray-100 dark:bg-[#111c44]"
                    } 
                    ${likeClassName}`
                    }
                >
                    <Heart />
                </button>
            }
            <div 
                alt="image here" 
                className={`absolute overflow-hidden duration-700 shadow-md group-hover:-translate-y-4 
                group-hover:-translate-x-4 -bottom-[2.5rem] -right-[2.5rem] w-1/2 h-1/2 bg-gray-200
                ${rounded ? "rounded-xl" : "rounded-lg"}`}
            >
                <LazyImage src={`/images/courses/${course.image}`} className="object-cover w-full h-full" />
            </div>
            <div className="">
                <h2 className="text-2xl font-bold mb-2 text-gray-800 dark:text-white line-clamp-1" title={course.title}>{course.title}</h2>
                <p className={`text-gray-700 dark:text-white line-clamp-2 lg:line-clamp-3 ${descriptionClassName}`}>
                    {(course.description && course.description.toLowerCase() !== "no aplica")
                    ? course.description 
                    : defaultDescription
                    }
                </p>
            </div>
            <Link
                to={`/curso/${course.id}`}
                className={`inline-flex items-center gap-1 sm:gap-2 text-center text-white bg-sky-700 px-6  
                text-sm font-semibold shadow-sm hover:bg-sky-600 focus-visible:outline focus-visible:outline-2 py-[0.625rem]
                focus-visible:outline-offset-2 focus-visible:outline-sky-700 dark:bg-blue-600 dark:hover:bg-blue-700
                mt-6 ${rounded ? "rounded-[20px]" : "rounded-md"}`}
            >
                Explorar
            </Link>
        </div>
    );
}

const CourseSkeleton = ({ className, rounded = false }) => {
    return(
        <div 
            className={`group animate-pulse flex flex-col justify-start items-start gap-2 
            my-12 aspect-[2/1] w-[calc(100%-2.5rem)] aspe duration-500 relative px-4 py-6 
            bg-gray-100 hover:-translate-y-2 hover:shadow-xl shadow-gray-300 
            dark:!bg-[#111c44] dark:text-white dark:shadow-none
            ${className} ${rounded ? "rounded-[20px]" : "rounded-lg" }`}
        >
            <div 
                alt="image here" 
                className={`absolute duration-700 shadow-md group-hover:-translate-y-4 
                group-hover:-translate-x-4 -bottom-[2.5rem] -right-[2.5rem] w-1/2 h-1/2 
                bg-gray-200 dark:bg-white/10 ${rounded ? "rounded-[20px]" : "rounded-lg" }`}
            />
            <div className="w-full">
                <div className="w-4/12 h-2 bg-slate-300 rounded col-span-4 mb-[1.825rem] dark:bg-white/10"></div>
                <div className="space-y-4">
                    <div className="grid grid-cols-5 gap-4">
                        <div className="h-2 bg-slate-200 rounded col-span-4 dark:bg-white/5"></div>
                        <div className="h-2 bg-slate-200 rounded col-span-1 dark:bg-white/5"></div>
                    </div>
                    <div className="grid grid-cols-5 gap-4">
                        <div className="h-2 bg-slate-200 rounded col-span-3 dark:bg-white/5"></div>
                        <div className="h-2 bg-slate-200 rounded col-span-2 dark:bg-white/5"></div>
                    </div>
                    <div className="grid grid-cols-5 gap-4">
                        <div className="h-2 bg-slate-200 rounded col-span-2 dark:bg-white/5"></div>
                        <div className="h-2 bg-slate-200 rounded col-span-3 dark:bg-white/5"></div>
                    </div>
                    <div className="grid grid-cols-5 gap-4">
                        <div className="h-2 bg-slate-200 rounded col-span-1 dark:bg-white/5"></div>
                        <div className="h-2 bg-slate-200 rounded col-span-4 dark:bg-white/5"></div>
                    </div>
                </div>
            </div>
            <button 
                className={`hover:bg-gray-300 bg-gray-200 text-gray-800 mt-6 
                dark:bg-white/10 h-10 w-4/12 p-2 px-6 
                ${rounded ? "rounded-[20px]" : "rounded" }`}
            ></button>
        </div>
    );
}

const CourseVertical = ({ course, className, onLike, showLike}) => {
    return (
        <div 
            className={`!z-[5] relative flex flex-col rounded-[20px] bg-white bg-clip-border 
            shadow-[14px_17px_40px_4px] shadow-[rgba(112,144,176,0.08)] dark:!bg-[#111c44] 
            dark:text-white dark:shadow-none w-full h-full !p-4 2xl:p-[18px] 
            ${className}`}
        >
            <div className="w-full h-full">
                <div className="relative w-full">
                    <img
                        src={`/images/courses/${course.image}`}
                        alt={course.title}
                        className="mb-3 h-full w-full rounded-xl 2xl:h-full 2xl:w-full" 
                    />
                    { showLike &&
                        <button
                            onClick={() => onLike(course)}
                            className={`absolute top-[0.75rem] right-[0.75rem] flex items-center 
                            justify-center rounded-full p-2 hover:cursor-pointer
                            transition-all duration-200
                            ${course.isLike ? "text-white bg-sky-600 hover:bg-sky-700 dark:bg-sky-700" : "text-sky-600 bg-white hover:bg-gray-100 dark:bg-[#111c44]"}`}
                        >
                            <Heart />
                        </button>
                    }
                </div>
                <div 
                    className="mb-3 flex items-center justify-between px-1 md:flex-col md:items-start 
                    lg:flex-row lg:justify-between xl:flex-col xl:items-start 3xl:flex-row 3xl:justify-between"
                >
                    <div className="mb-2">
                        <p 
                            title={course.title}
                            className="text-lg font-bold text-[#1B254B] dark:text-white line-clamp-2"
                        >
                            {course.title}
                        </p>
                    </div>
                </div>
                <div 
                    className="flex items-center justify-between md:flex-col md:items-start 
                    lg:flex-row lg:justify-between xl:flex-col 2xl:items-start 3xl:flex-row 
                    3xl:items-center 3xl:justify-between"
                >
                    <div className="flex">
                        <p 
                            title={`Presentado por ${course.institution}`}
                            className="mb-2 text-sm font-bold text-sky-600 dark:text-white"
                        >
                            Presentado por: <span>{course.institution}</span>
                        </p>
                    </div>
                    <Link
                        to={`/curso/${course.id}`}
                        className="linear rounded-[20px] bg-sky-700 px-4 py-2 text-base 
                        font-medium text-white transition duration-200 hover:bg-sky-800
                        active:bg-sky-700 dark:bg-sky-900 dark:hover:bg-sky-800 
                        dark:active:opacity-[90]"
                    >
                        Explorar
                    </Link>
                </div>
            </div>
        </div>
    );
}

const CourseVerticalSkeleton = () => {
    return (
        <div 
            className={`!z-[5] relative flex flex-col rounded-[20px] bg-white bg-clip-border 
            shadow-[14px_17px_40px_4px] shadow-[rgba(112,144,176,0.08)] dark:!bg-[#111c44] 
            dark:text-white dark:shadow-none w-full h-full !p-4 2xl:p-[18px]`}
        >
            <div className="w-full h-full animate-pulse">
                <div className="relative w-full mb-5">
                    <div className="h-full w-full rounded-xl 2xl:h-full 2xl:w-full bg-slate-200 aspect-[16/9.5] dark:bg-white/10" />
                </div>
                <div className="space-y-3 mb-8 px-1">
                    <div className="grid grid-cols-3 gap-4">
                        <div className="h-2 bg-slate-200 rounded col-span-2 dark:bg-white/5"></div>
                        <div className="h-2 bg-slate-200 rounded col-span-1 dark:bg-white/5"></div>
                    </div>
                    <div className="h-2 bg-slate-200 rounded mr-8 dark:bg-white/5"></div>
                </div>
                <div className="space-y-3 px-1">
                    <div className="h-2 bg-slate-200 rounded mr-16 dark:bg-white/5"></div>
                    <div className="w-[50%] h-10 bg-slate-200 rounded-[20px] dark:bg-white/10"></div>
                </div>
            </div>
        </div>
    );
}

export { Course, CourseSkeleton, CourseVertical, CourseVerticalSkeleton }