import axios from "axios";
import { useEffect, useState } from "react";
import Footer from "../../components/Landing/Footer";
import { HeadProvider } from "../../provider/HeadProvider";
import {
    Dialog,
    DialogBackdrop,
    DialogPanel,
    Disclosure,
    DisclosureButton,
    DisclosurePanel,
} from "@headlessui/react";
import { ChevronDown, Filter, LoaderCircle, Minus, Plus, Search, X } from "lucide-react";
import { AnimatePresence, motion, easeOut } from "framer-motion";
import { Course, CourseSkeleton } from "../../components/Landing/Course";
import { Fragment } from "react";
import AnimationRevealPage from "../../helpers/AnimationRevealPage";
import BadgesFlex from "../../components/Landing/BadgesFlex";
import CommandPaleteSelectBox from "../../components/Landing/CommandPaleteSelectBox";
import HeroWithBackgroundAsImage from "../../components/Landing/HeroWithBackgroundAsImage";
import { APIS } from "../../configs/apis";

const container = {
    hidden: { opacity: 1, y: 10 },
    visible: {
        opacity: 1,
        y: 0,
        transition: {
            duration: 0.2,
            delayChildren: 0.3,
            staggerChildren: 0.2
        }
    }
}

const item = {
    hidden: { y: 20, opacity: 0 },
    visible: {
        y: 0,
        opacity: 1
    }
}

const Courses = () => {
    const pageSize = 12;
    const [pageNo, setPageNo] = useState(0);
    const [coursesNo, setCoursesNo] = useState(0);
    const [search, setSearch] = useState("");
    const [loading, setLoading] = useState(true);
    const [loadingPagination, setLoadingPagination] = useState(false);
    const [courses, setCourses] = useState([]);
    const [categories, setCategories] = useState([]);
    const [institutions, setInstitutions] = useState([]);
    const [selectedCategories, setSelectedCategories] = useState([]);
    const [selectedInstitutions, setSelectedInstitutions] = useState([]);
    const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);

    const [isPaleteCategoryOpen, setIsPaleteCategoryOpen] = useState(false);
    const [isPaleteInstitutionOpen, setIsPaleteInstitutionOpen] = useState(false);

    const [titleRef, setTitleRef] = useState();

    const handleCourses = () => {
        setLoading(true);

        axios
            .get(APIS.GET_COURSES, {
                params: {
                    title: search,
                    pageSize: pageSize,
                    pageNo: 0,
                    categories: selectedCategories.toString(),
                    institutions: selectedInstitutions.toString(),
                },
            })
            .then((response) => {
                setCoursesNo(response.data.totalElements);
                setCourses(response.data.content ? response.data.content : []);
            })
            .finally(() => {
                setTimeout(() => {
                    setLoading(false);
                }, 1000);
            });
    };

    const handleCoursesPagination = () => {
        if (pageNo > 0) {
            setLoadingPagination(true);

            axios.get(APIS.GET_COURSES, {
                params: {
                    title: search,
                    pageSize: pageSize,
                    pageNo: pageNo,
                    categories: selectedCategories.toString(),
                    institutions: selectedInstitutions.toString(),
                },
            })
                .then(response => {
                    setCourses([...courses, ...response.data.content ? response.data.content : []])
                })
                .finally(() => {
                    setTimeout(() => {
                        setLoadingPagination(false);
                    }, 1000);
                })
        }
    }

    const handleCategories = () => {
        axios.get(APIS.GET_CATEGORIES).then((response) => {
            setCategories(response.data ? response.data : []);
        });
    };

    const handleInstitutions = () => {
        axios.get(APIS.GET_INSTITUTIONS).then((response) => {
            setInstitutions(response.data ? response.data : []);
        });
    };

    const handleSelectCategories = (category, checked) => {
        if (checked) {
            setSelectedCategories((prev) => [...prev, category]);
        } else {
            setSelectedCategories((prev) => prev.filter((c) => c !== category));
        }

        setPageNo(0);
    };

    const handleSelectInstitutions = (institution, checked) => {
        if (checked) {
            setSelectedInstitutions((prev) => [...prev, institution]);
        } else {
            setSelectedInstitutions((prev) => prev.filter((i) => i !== institution));
        }

        setPageNo(0);
    };

    const handleSearch = (e) => {
        e.preventDefault();
        handleCourses();
        setPageNo(0);
    }

    useEffect(() => {
        handleCourses();
        handleCategories();
        handleInstitutions();
    }, []);
    useEffect(handleCourses, [selectedCategories, selectedInstitutions]);
    useEffect(handleCoursesPagination, [pageNo]);
    useEffect(() => { window.scrollTo(0, 0) }, []);

    return (
        <main>
            <HeadProvider title="CourSeed | Cursos" />
            <HeroWithBackgroundAsImage 
                onClick={() => {
                    if (titleRef) {
                        titleRef.scrollIntoView({ behavior: "smooth" });   
                    }
                }} 
            />
            <AnimationRevealPage>
                <div className="relative">
                    <div className="max-w-screen-xl mx-auto pt-10">
                        <div className="flex flex-col md:flex-row gap-6 md:items-center justify-between">
                            <AnimatePresence mode="wait">
                                <motion.div
                                    key={loading ? "skeleton" : "results"}
                                    initial={{ y: 10, opacity: 0 }}
                                    animate={{ y: 0, opacity: 1 }}
                                    exit={{ y: -10, opacity: 0 }}
                                    transition={{ duration: 0.2 }}
                                    className="w-full text-center md:text-left"
                                >
                                    {loading
                                        ?
                                        <div className="w-full animate-pulse md:w-7/12 grid grid-cols-12 grid-rows-2 md:grid-rows-1 gap-4 py-6">
                                            <div className="h-10 bg-slate-300 rounded col-span-2 col-start-4 md:col-start-1"></div>
                                            <div className="h-10 bg-slate-300 rounded col-span-4"></div>
                                            <div className="h-10 bg-slate-300 rounded col-span-8 row-start-2 md:row-start-1 col-start-3 md:col-start-7"></div>
                                        </div>
                                        :
                                        <h1 ref={setTitleRef} className="font-bold text-3xl md:text-3xl lg:text-4xl xl:text-5xl text-gray-900 leading-tight py-6">
                                            {coursesNo} <span className="text-sky-600">cursos</span> encontrados.
                                        </h1>
                                    }
                                </motion.div>
                            </AnimatePresence>
                            <div className="w-full lg:w-2/4 items-center lg:justify-end flex gap-2">
                                <form
                                    onSubmit={handleSearch}
                                    className="w-full relative max-w-md lg:max-w-lg text-center"
                                >
                                    <input
                                        type="text"
                                        placeholder="Buscar por titulo..."
                                        className="pr-16 md:pr-20 lg:pr-40 pl-8 py-4 sm:py-5 rounded-full border-2 
                                            w-full font-medium focus:outline-none transition duration-300  
                                            focus:border-primary-500 hover:border-gray-500"
                                        value={search}
                                        onChange={(e) => setSearch(e.target.value)}
                                    />
                                    <button
                                        type="submit"
                                        className="absolute right-0 top-0 bottom-0 bg-sky-600 
                                            text-gray-100 font-semibold mr-2 my-2 rounded-full py-4 px-4 sm:px-6 flex 
                                            items-center justify-center leading-none focus:outline-none 
                                            hover:bg-sky-900 transition duration-300 gap-2"
                                    >
                                        {loading ? (
                                            <LoaderCircle className="size-4 animate-spin" />
                                        ) : (
                                            <Search className="size-4" />
                                        )}
                                        <span className="hidden lg:block">Buscar</span>
                                    </button>
                                </form>
                                <button
                                    type="button"
                                    onClick={() => setMobileFiltersOpen(true)}
                                    className="p-2 text-gray-400 hover:text-gray-500 lg:hidden"
                                >
                                    <span className="sr-only">Filtrar</span>
                                    <Filter aria-hidden="true" className="h-5 w-5" />
                                </button>
                            </div>
                        </div>
                        <div className={`sm:border-b sm:border-gray-200 ${(selectedCategories.length > 0 || selectedInstitutions.length > 0) && "py-6"}`}>
                            <BadgesFlex
                                title="Categorias Seleccionadas"
                                badges={selectedCategories}
                                setBadges={(value) => setSelectedCategories(value)}
                            />
                            <BadgesFlex
                                title="Instituciones Seleccionadas"
                                badges={selectedInstitutions}
                                setBadges={(value) => setSelectedInstitutions(value)}
                                className={selectedInstitutions.length > 0 && selectedCategories.length > 0 ? "mt-6" : ""}
                            />
                        </div>
                    </div>
                    <img 
                        src="/svg-decorator-blob-3.svg" 
                        alt="blob" 
                        className="pointer-events-none absolute right-0 bottom-0 w-64 
                        opacity-25 transform translate-x-32 translate-y-48" 
                    />
                </div>
                <div className="relative">
                    <div className="max-w-screen-xl mx-auto pb-16 pt-6">
                        <section aria-labelledby="products-heading">
                            <h2 id="products-heading" className="sr-only">
                                Cursos
                            </h2>
                            <div className="grid grid-cols-1 gap-x-8 gap-y-10 lg:grid-cols-5">
                                <form className="hidden lg:block">
                                    <h3 className="sr-only">Filtrar Resultados</h3>
                                    <Disclosure
                                        as="div"
                                        defaultOpen={true}
                                        className="border-b border-gray-200 py-6"
                                    >
                                        {({ open }) => (
                                            <>
                                                <h3 className="-my-3 flow-root">
                                                    <DisclosureButton className="group flex w-full items-center justify-between bg-white py-3 text-sm text-gray-400 hover:text-gray-500">
                                                        <span className="font-medium text-gray-900">
                                                            Categorias
                                                        </span>
                                                        <span className="ml-6 flex items-center">
                                                            <Plus
                                                                aria-hidden="true"
                                                                className="h-5 w-5 group-data-[open]:hidden"
                                                            />
                                                            <Minus
                                                                aria-hidden="true"
                                                                className="h-5 w-5 [.group:not([data-open])_&]:hidden"
                                                            />
                                                        </span>
                                                    </DisclosureButton>
                                                </h3>
                                                <AnimatePresence mode="wait">
                                                    {open && (
                                                        <DisclosurePanel static as={Fragment} className="pt-6">
                                                            <motion.div
                                                                initial={{ opacity: 0, y: -24 }}
                                                                animate={{ opacity: 1, y: 0 }}
                                                                exit={{ opacity: 0, y: -24 }}
                                                                transition={{ duration: 0.2, ease: easeOut }}
                                                                className="origin-top space-y-4"
                                                            >
                                                                {categories.slice(0, 10).map((category, index) => (
                                                                    <div key={index} className="flex items-center">
                                                                        <input
                                                                            id={category.name}
                                                                            defaultValue={category.name}
                                                                            checked={selectedCategories.includes(
                                                                                category.name
                                                                            )}
                                                                            onChange={(e) =>
                                                                                handleSelectCategories(
                                                                                    category.name,
                                                                                    e.target.checked
                                                                                )
                                                                            }
                                                                            type="checkbox"
                                                                            className="h-4 w-4 rounded border-gray-300 text-sky-600 focus:ring-sky-500"
                                                                        />
                                                                        <label
                                                                            htmlFor={category.name}
                                                                            className="ml-3 text-sm text-gray-600"
                                                                        >
                                                                            {category.name}
                                                                        </label>
                                                                    </div>
                                                                ))}
                                                                <button
                                                                    type="button"
                                                                    className="text-lg lg:text-sm
                                                                    font-semibold tracking-wide transition duration-300
                                                                    border-b-2 border-transparent hover:border-sky-600 hover:text-sky-600 focus:text-sky-600
                                                                    "
                                                                    onClick={() => setIsPaleteCategoryOpen(true)}
                                                                >
                                                                    Ver más
                                                                </button>
                                                            </motion.div>
                                                        </DisclosurePanel>
                                                    )}
                                                </AnimatePresence>
                                            </>
                                        )}
                                    </Disclosure>
                                    <Disclosure as="div" defaultOpen={true} className="border-b border-gray-200 py-6">
                                        {({ open }) => (
                                            <>
                                                <h3 className="-my-3 flow-root">
                                                    <DisclosureButton className="group flex w-full items-center justify-between bg-white py-3 text-sm text-gray-400 hover:text-gray-500">
                                                        <span className="font-medium text-gray-900">
                                                            Instituciones
                                                        </span>
                                                        <span className="ml-6 flex items-center">
                                                            <Plus
                                                                aria-hidden="true"
                                                                className="h-5 w-5 group-data-[open]:hidden"
                                                            />
                                                            <Minus
                                                                aria-hidden="true"
                                                                className="h-5 w-5 [.group:not([data-open])_&]:hidden"
                                                            />
                                                        </span>
                                                    </DisclosureButton>
                                                </h3>
                                                <AnimatePresence mode="wait">
                                                    {open && (
                                                        <DisclosurePanel static as={Fragment} className="pt-6">
                                                            <motion.div
                                                                initial={{ opacity: 0, y: -24 }}
                                                                animate={{ opacity: 1, y: 0 }}
                                                                exit={{ opacity: 0, y: -24 }}
                                                                transition={{ duration: 0.2, ease: easeOut }}
                                                                className="origin-top space-y-4"
                                                            >
                                                                {institutions
                                                                    .slice(0, 10)
                                                                    .map((institution, index) => (
                                                                        <div key={index} className="flex items-center">
                                                                            <input
                                                                                id={institution.name}
                                                                                defaultValue={institution.name}
                                                                                checked={selectedInstitutions.includes(
                                                                                    institution.name
                                                                                )}
                                                                                onChange={(e) =>
                                                                                    handleSelectInstitutions(
                                                                                        institution.name,
                                                                                        e.target.checked
                                                                                    )
                                                                                }
                                                                                type="checkbox"
                                                                                className="h-4 w-4 rounded border-gray-300 text-sky-600 focus:ring-sky-500"
                                                                            />
                                                                            <label
                                                                                htmlFor={institution.name}
                                                                                className="ml-3 text-sm text-gray-600"
                                                                            >
                                                                                {institution.name}
                                                                            </label>
                                                                        </div>
                                                                    ))}
                                                                <button
                                                                    type="button"
                                                                    className="text-lg lg:text-sm
                                                                    font-semibold tracking-wide transition duration-300
                                                                    border-b-2 border-transparent hover:border-sky-600 hover:text-sky-600 focus:text-sky-600
                                                                    "
                                                                    onClick={() => setIsPaleteInstitutionOpen(true)}
                                                                >
                                                                    Ver más
                                                                </button>
                                                            </motion.div>
                                                        </DisclosurePanel>
                                                    )}
                                                </AnimatePresence>
                                            </>
                                        )}
                                    </Disclosure>
                                </form>
                                <AnimatePresence mode="wait">
                                    <motion.div
                                        key={loading ? "skeleton" : "courses"}
                                        variants={container}
                                        initial="hidden"
                                        animate="visible"
                                        exit={{ y: -10, opacity: 0 }}
                                        className="lg:col-span-4 grid grid-cols-1 sm:grid-cols-2 self-start lg:grid-cols-2 xl:grid-cols-3"
                                    >
                                        {loading
                                            ? Array(pageSize)
                                                .fill(1)
                                                .map((x, i) => <CourseSkeleton key={i} />)
                                            : courses.map((course, i) => (
                                                <motion.div key={i} variants={item}>
                                                    <Course course={course} className={"my-8"} />
                                                </motion.div>
                                            ))}
                                    </motion.div>
                                </AnimatePresence>
                                <div className="flex items-center justify-center w-full lg:col-span-4 lg:col-start-2 mt-6">
                                    <button
                                        onClick={() => setPageNo(pageNo + 1)}
                                        className="text-lg lg:text-sm my-2 lg:my-0 font-semibold tracking-wide transition duration-300
                                        px-6 py-[.7rem] rounded-3xl bg-sky-600 text-gray-50 hover:bg-sky-700 hover:text-white 
                                        ring-2 ring-transparent focus:ring-sky-500 flex items-center gap-3"
                                    >
                                        <span>Ver mas contenido</span>
                                        {loadingPagination
                                            ? <LoaderCircle className="size-5 animate-spin" />
                                            : <ChevronDown className="size-5" />}

                                    </button>
                                </div>
                            </div>
                        </section>
                    </div>
                    <img src="/svg-decorator-blob-6.svg" alt="blob" className="pointer-events-none -z-20 absolute left-0 bottom-0 h-64 w-64 opacity-25 transform -translate-x-1/2 translate-y-1/2" />
                    <Dialog
                        open={mobileFiltersOpen}
                        onClose={setMobileFiltersOpen}
                        className="relative z-50 lg:hidden"
                    >
                        <DialogBackdrop
                            transition
                            className="fixed inset-0 bg-black bg-opacity-25 transition-opacity duration-300 ease-linear data-[closed]:opacity-0"
                        />

                        <div className="fixed inset-0 z-50 flex">
                            <DialogPanel
                                transition
                                className="relative ml-auto flex h-full w-full max-w-xs transform flex-col overflow-y-auto bg-white py-4 pb-12 shadow-xl transition duration-300 ease-in-out data-[closed]:translate-x-full"
                            >
                                <div className="flex items-center justify-between px-4">
                                    <h2 className="text-lg font-medium text-gray-900">Filtrar</h2>
                                    <button
                                        type="button"
                                        onClick={() => setMobileFiltersOpen(false)}
                                        className="-mr-2 flex h-10 w-10 items-center justify-center rounded-md bg-white p-2 text-gray-400"
                                    >
                                        <span className="sr-only">Cerrar Menu</span>
                                        <X aria-hidden="true" className="h-6 w-6" />
                                    </button>
                                </div>
                                <form className="mt-4 border-t border-gray-200">
                                    <h3 className="sr-only">Categorias</h3>
                                    <Disclosure
                                        as="div"
                                        defaultOpen={true}
                                        className="border-t border-gray-200 py-6 px-4 "
                                    >
                                        {({ open }) => (
                                            <>
                                                <h3 className="-my-3 flow-root">
                                                    <DisclosureButton className="group flex w-full items-center justify-between bg-white py-3 text-base text-gray-400 hover:text-gray-500">
                                                        <span className="font-semibold text-gray-900">
                                                            Categorias
                                                        </span>
                                                        <span className="ml-6 flex items-center">
                                                            <Plus
                                                                aria-hidden="true"
                                                                className="h-5 w-5 group-data-[open]:hidden"
                                                            />
                                                            <Minus
                                                                aria-hidden="true"
                                                                className="h-5 w-5 [.group:not([data-open])_&]:hidden"
                                                            />
                                                        </span>
                                                    </DisclosureButton>
                                                </h3>
                                                <AnimatePresence mode="wait">
                                                    {open && (
                                                        <DisclosurePanel static as={Fragment} className="pt-6">
                                                            <motion.div
                                                                initial={{ opacity: 0, y: -24 }}
                                                                animate={{ opacity: 1, y: 0 }}
                                                                exit={{ opacity: 0, y: -24 }}
                                                                transition={{ duration: 0.2, ease: easeOut }}
                                                                className="origin-top space-y-4"
                                                            >
                                                                {categories.slice(0, 10).map((category, index) => (
                                                                    <div key={index} className="flex items-center">
                                                                        <input
                                                                            id={`${category.name}-mobile`}
                                                                            defaultValue={category.name}
                                                                            checked={selectedCategories.includes(
                                                                                category.name
                                                                            )}
                                                                            onChange={(e) =>
                                                                                handleSelectCategories(
                                                                                    category.name,
                                                                                    e.target.checked
                                                                                )
                                                                            }
                                                                            type="checkbox"
                                                                            className="h-4 w-4 rounded border-gray-300 text-sky-600 focus:ring-sky-500"
                                                                        />
                                                                        <label
                                                                            htmlFor={`${category.name}-mobile`}
                                                                            className="ml-3 text-base font-normal text-gray-600"
                                                                        >
                                                                            {category.name}
                                                                        </label>
                                                                    </div>
                                                                ))}
                                                                <button
                                                                    type="button"
                                                                    className="text-lg lg:text-sm
                                                                    font-semibold tracking-wide transition duration-300
                                                                    border-b-2 border-transparent hover:border-sky-600 hover:text-sky-600 focus:text-sky-600
                                                                    "
                                                                    onClick={() => setIsPaleteCategoryOpen(true)}
                                                                >
                                                                    Ver más
                                                                </button>
                                                            </motion.div>
                                                        </DisclosurePanel>
                                                    )}
                                                </AnimatePresence>
                                            </>
                                        )}
                                    </Disclosure>
                                    <Disclosure
                                        as="div"
                                        className="border-t border-gray-200 py-6 px-4"
                                    >
                                        {({ open }) => (
                                            <>
                                                <h3 className="-my-3 flow-root">
                                                    <DisclosureButton className="group flex w-full items-center justify-between bg-white py-3 text-base text-gray-400 hover:text-gray-500">
                                                        <span className="font-semibold text-gray-900">
                                                            Instituciones
                                                        </span>
                                                        <span className="ml-6 flex items-center">
                                                            <Plus
                                                                aria-hidden="true"
                                                                className="h-5 w-5 group-data-[open]:hidden"
                                                            />
                                                            <Minus
                                                                aria-hidden="true"
                                                                className="h-5 w-5 [.group:not([data-open])_&]:hidden"
                                                            />
                                                        </span>
                                                    </DisclosureButton>
                                                </h3>
                                                <AnimatePresence mode="wait">
                                                    {open && (
                                                        <DisclosurePanel static as={Fragment} className="pt-6">
                                                            <motion.div
                                                                initial={{ opacity: 0, y: -24 }}
                                                                animate={{ opacity: 1, y: 0 }}
                                                                exit={{ opacity: 0, y: -24 }}
                                                                transition={{ duration: 0.2, ease: easeOut }}
                                                                className="origin-top space-y-4"
                                                            >
                                                                {institutions.slice(0, 10).map((institution, index) => (
                                                                    <div key={index} className="flex items-center">
                                                                        <input
                                                                            id={`${institution.name}-mobile`}
                                                                            defaultValue={institution.name}
                                                                            checked={selectedInstitutions.includes(
                                                                                institution.name
                                                                            )}
                                                                            onChange={(e) =>
                                                                                handleSelectInstitutions(
                                                                                    institution.name,
                                                                                    e.target.checked
                                                                                )
                                                                            }
                                                                            type="checkbox"
                                                                            className="h-4 w-4 rounded border-gray-300 text-sky-600 focus:ring-sky-500"
                                                                        />
                                                                        <label
                                                                            htmlFor={`${institution.name}-mobile`}
                                                                            className="ml-3 text-base text-gray-600"
                                                                        >
                                                                            {institution.name}
                                                                        </label>
                                                                    </div>
                                                                ))}
                                                                <button
                                                                    type="button"
                                                                    className="text-lg lg:text-sm
                                                                    font-semibold tracking-wide transition duration-300
                                                                    border-b-2 border-transparent hover:border-sky-600 hover:text-sky-600 focus:text-sky-600
                                                                    "
                                                                    onClick={() => setIsPaleteInstitutionOpen(true)}
                                                                >
                                                                    Ver más
                                                                </button>
                                                            </motion.div>
                                                        </DisclosurePanel>
                                                    )}
                                                </AnimatePresence>
                                            </>
                                        )}
                                    </Disclosure>
                                </form>
                            </DialogPanel>
                        </div>
                    </Dialog>
                    <CommandPaleteSelectBox
                        title="Categorias"
                        isOpen={isPaleteCategoryOpen}
                        setIsOpen={(value) => setIsPaleteCategoryOpen(value)}
                        items={categories}
                        selectedItems={selectedCategories}
                        setSelectedItems={(item, checked) => handleSelectCategories(item, checked)}
                    />
                    <CommandPaleteSelectBox
                        title="Instituciones"
                        isOpen={isPaleteInstitutionOpen}
                        setIsOpen={(value) => setIsPaleteInstitutionOpen(value)}
                        items={institutions}
                        selectedItems={selectedInstitutions}
                        setSelectedItems={(item, checked) => handleSelectInstitutions(item, checked)}
                    />
                </div>
                <Footer />
            </AnimationRevealPage>
        </main>
    );
};

export default Courses;
