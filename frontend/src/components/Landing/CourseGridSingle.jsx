import { ArrowRight, Check, ChevronDown, ChevronLeft, ChevronRight } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";
import Slider from "react-slick";
import { Course, CourseSkeleton } from "./Course";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";

const CourseGridSingle = ({ 
        title = "Cursos por categorías", 
        subtitle = `Desliza a través de nuestra amplia gama de cursos. 
        Filtra por categorías y elige el aprendizaje que se adapta a 
        tus metas personales y profesionales.`,
        titleButton = "Ver todos los cursos",
        defaultFilterTitle = "Todas Las Categorias",
        courses = [],
        selectedFilter,
        setSelectedFilter,
        filters = [],
        loading = true,
        blob = "left"
    }) => {

    const [sliderRef, setSliderRef] = useState(null);

    return (
        <div className="relative">
            <div className="max-w-screen-xl mx-auto py-16 lg:py-20">
                <div className="flex flex-col items-center md:items-start lg:items-end lg:flex-row justify-between gap-6">
                    <div className="">
                        <Menu as="div" className="relative w-full">
                            <div className="relative w-full">
                                <MenuButton title="Seleccionar Categoria" className="grid md:grid-cols-[1fr_auto] items-center md:items-end place-items-center gap-1 lg:gap-2">
                                    <h2 className="text-center text-4xl sm:text-5xl font-bold tracking-wide lg:text-5xl md:text-left leading-tight">
                                        {title}
                                    </h2>
                                    <span className="p-2 rounded-md text-gray-900 hover:bg-gray-100 my-1">
                                        <ChevronDown aria-hidden="true" className="size-6" />
                                    </span>
                                </MenuButton>
                            </div>
                            <MenuItems
                                transition
                                className="absolute left-0 z-50 mt-4 w-full md:max-w-md lg:max-w-lg overflow-y-auto origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 transition focus:outline-none data-[closed]:scale-95 data-[closed]:transform data-[closed]:opacity-0 data-[enter]:duration-100 data-[leave]:duration-75 data-[enter]:ease-out data-[leave]:ease-in"
                            >
                                <div className="py-1 max-h-[50vh]">
                                    <MenuItem>
                                        <button
                                            type="button"
                                            onClick={() => setSelectedFilter(null)}
                                            className={`${!selectedFilter && 'font-semibold text-sky-600'} w-full inline-flex items-center justify-between gap-3 text-start px-4 py-2 text-gray-700 data-[focus]:bg-gray-100 data-[focus]:text-gray-900`}
                                        >
                                            <span>{defaultFilterTitle}</span>
                                            {!selectedFilter &&
                                                <Check className="size-4 text-sky-600" />
                                            }
                                        </button>
                                    </MenuItem>
                                    {filters.map(filter => (
                                        <MenuItem key={filter.name}>
                                            <button
                                                type="button"
                                                onClick={() => setSelectedFilter(filter)}
                                                className={`${filter.name === selectedFilter?.name && 'font-semibold text-sky-600'} w-full inline-flex items-center justify-between gap-3 text-start px-4 py-2 text-gray-700 data-[focus]:bg-gray-100 data-[focus]:text-gray-900`}
                                            >
                                                <span>{filter.name}</span>
                                                {filter.name === selectedFilter?.name &&
                                                    <Check className="size-4 text-sky-600" />
                                                }
                                            </button>
                                        </MenuItem>
                                    ))}
                                </div>
                            </MenuItems>
                        </Menu>
                        <p className="w-full max-w-full lg:max-w-[70%] line-clamp-3 mt-6 text-center md:text-left text-sm md:text-base lg:text-lg font-medium leading-relaxed">
                            {subtitle}
                        </p>
                    </div>
                    <div className="">
                        <Link
                            to="/cursos"
                            className="w-auto h-auto bg-sky-600 text-gray-100 font-semibold rounded-full px-6 py-3 gap-2 flex items-center justify-cente0r focus:outline-none hover:bg-sky-900 transition duration-300"
                        >
                            <span className="truncate">{titleButton}</span>
                            <ArrowRight className="size-5" />
                        </Link>
                    </div>
                </div>
                <AnimatePresence mode="wait">
                    <motion.div
                        key={loading ? "skeleton" : "courses"}
                        initial={{ y: 10, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        exit={{ y: -10, opacity: 0 }}
                        transition={{ duration: 0.2 }}
                        className="relative"
                    >
                        <button
                            onClick={sliderRef?.slickPrev}
                            className="absolute -left-[1rem] p-2 font-bold bg-sky-600 text-gray-100 
                                focus:bg-sky-700 hover:bg-sky-700 focus:text-gray-200 hover:text-gray-200 
                                focus:shadow-outline focus:outline-none transition duration-300 rounded-full
                                top-1/2 transform -translate-y-1/2 z-10"
                        >
                            <ChevronLeft />
                        </button>
                        <Slider
                            key={loading ? "skeleton" : "courses"}
                            ref={setSliderRef}
                            arrows={false}
                            slidesToShow={3}
                            slidesToScroll={1}
                            infinite={courses.length > 3}
                            responsive={[
                                {
                                    breakpoint: 1280,
                                    settings: {
                                        slidesToShow: 2,
                                    }
                                },
                                {
                                    breakpoint: 767,
                                    settings: {
                                        slidesToShow: 1
                                    }
                                }
                            ]}
                        >
                            {loading
                                ? Array(6).fill(1).map((x, i) => (
                                    <CourseSkeleton key={i} />
                                ))
                                : courses.map((course, i) => (
                                    <Course course={course} key={i} className={"my-12"} />
                                ))
                            }
                        </Slider>
                        <button
                            onClick={sliderRef?.slickNext}
                            className="absolute -right-[1rem] p-2 font-bold bg-sky-600 text-gray-100 
                                focus:bg-sky-700 hover:bg-sky-700 focus:text-gray-200 hover:text-gray-200 
                                focus:shadow-outline focus:outline-none transition duration-300 rounded-full
                                top-1/2 transform -translate-y-1/2 z-10"
                        >
                            <ChevronRight />
                        </button>
                    </motion.div>
                </AnimatePresence>
            </div>
            { blob }
        </div>
    );
}

export default CourseGridSingle;