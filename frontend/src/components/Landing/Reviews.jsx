import { ArrowDown, ArrowUp, CalendarArrowUp, Forward, Info, LoaderCircle, RefreshCw, Star, Trash2 } from "lucide-react";
import Avatar from "./Avatar";
import dayjs from "dayjs";
import { useEffect, useRef, useState } from "react";
import Slider from "react-slick";
import { AnimatePresence, motion } from "framer-motion";
import { useAuth } from "../../provider/AuthProvider";
import { Textarea } from "@headlessui/react";
import axios from "axios";
import { APIS } from "../../configs/apis";
import Notification from "./Notification";

const Reviews = ({ 
    subTitle, 
    title, 
    reviews = [], 
    setReviews = (reviews) => {},
    handlePagination = () => {},
    loading,
    reviewsRef,
    courseId
}) => {

    const slidesToShow = (reviews.length > 0 && reviews.length < 3) ? reviews.length : 3;
    const slidesToScroll = 1;
    const { user } = useAuth();
    
    const settings = {
        infinite: false,
        slidesToShow: slidesToShow,
        slidesToScroll: slidesToScroll,
        vertical: true,
        verticalSwiping: true,
        swipeToSlide: true,
    }

    const reviewMotion = {
        hidden: { x: -20, opacity: 0 },
        visible: { x: 0, opacity: 1, transition: {
            type: "spring", stiffness: 250
        }}
    }

    const [sliderRef, setSliderRef] = useState({
        slickNext: () => {},
        slickPrev: () => {},
        slickGoTo: () => {}
    });

    const [slideIndex, setSlideIndex] = useState(0);

    const handleSlideChange = (newSlideIndex) => {
        setSlideIndex(newSlideIndex);
        if ((newSlideIndex + 1) * slidesToScroll + slidesToShow > reviews.length) {
            handlePagination();
        } 
        sliderRef.slickGoTo(newSlideIndex)
    }

    useEffect(() => {
        dayjs.extend(require("dayjs/plugin/localizedFormat"));
        dayjs.locale(require("dayjs/locale/es"));
    }, []);

    return (
        <div ref={reviewsRef} className="relative">
            <div className="flex flex-col md:flex-row justify-between max-w-screen-xl mx-auto py-20 md:py-24 items-center">
                <div className="w-full max-w-md mx-auto md:max-w-none md:mx-0 md:w-6/12 mt-16 md:mt-0 order-last md:-order-last">
                    <div className="relative lg:py-8 text-center md:text-left overflow-hidden max-h-full">
                        <h5 className="font-bold text-primary-500 mb-4 uppercase tracking-widest text-sky-600">
                            {subTitle}
                        </h5>
                        <div className="grid grid-cols-1 md:grid-cols-[1fr_auto] items-center">
                            <h2 className="text-4xl sm:text-5xl font-bold tracking-wide text-center lg:text-5xl md:text-left leading-tight">
                                {title}
                            </h2>
                            <div className="flex justify-center mt-4 sm:mt-0">
                                <button 
                                    onClick={() => handleSlideChange(slideIndex - 1)}
                                    disabled={slideIndex === 0} 
                                    className="mr-2 p-4 rounded-full transition duration-300 bg-gray-200 hover:bg-gray-300 
                                    text-primary-500 hover:text-primary-700 focus:outline-none focus:shadow-outline"
                                >
                                    <ArrowUp className="size-4 stroke-3" />
                                </button>
                                <div className="my-3 border-r" />
                                <button 
                                    onClick={() => handleSlideChange(slideIndex + 1)} 
                                    disabled={(slideIndex + 1) * slidesToScroll + slidesToShow > reviews.length}
                                    className="ml-2 p-4 rounded-full transition duration-300 
                                    bg-gray-200 hover:bg-gray-300 text-primary-500 hover:text-primary-700 focus:outline-none 
                                    focus:shadow-outline"
                                >
                                    <ArrowDown className="size-4 stroke-3" />
                                </button>
                            </div>
                        </div>
                        <Slider ref={setSliderRef} {...settings}>
                            { (loading || reviews.length === 0)  ? (
                                Array(slidesToShow).fill(1).map((_, i) => (
                                    <ReviewSkeleton key={i} className="py-6" />
                                ))
                            ) : (
                                reviews.map((review, i) => (
                                    <motion.div
                                        key={review.username}
                                        variants={reviewMotion}
                                        initial="hidden"
                                        animate="visible"
                                    >
                                        <Review
                                            username={review.username} 
                                            rating={review.rating} 
                                            createdAt={review.createdAt}
                                            updatedAt={review.updatedAt}
                                            description={review.description}
                                            className="py-6 border-b border-b-gray-200 h-full bg" 
                                        />
                                    </motion.div>
                                ))  
                            )}
                        </Slider>
                        { user && (
                            <ReviewForm 
                                className="py-6" 
                                courseId={courseId} 
                                onCreate={(review) => setReviews([review, ...reviews])}
                                onUpdate={(review) => setReviews(reviews.map(r => {
                                    if (r.id === review.id) {
                                        return {
                                            ...r,
                                            description: review.description,
                                            rating: review.rating,
                                            updatedAt: review.updatedAt
                                        }
                                    } else {
                                        return r;
                                    }
                                }))}
                                onDelete={(review) => setReviews(reviews.filter(r => r.id !== review.id))}
                            />
                        )}
                    </div>
                </div>
                <div className="w-full max-w-md mx-auto md:max-w-none md:mx-0 md:w-6/12 flex-shrink-0 relative md:ml-12 lg:ml-16">
                    <img src="/undraw_reviews_lp8w.svg" alt="Imagen de pasos" className="md:max-w-[90%]" />
                </div>
            </div>
        </div>
    );
}

const Review = ({ username, description, rating, createdAt, updatedAt, className }) => {
    return (
        <div className={`relative grid grid-cols-[auto_1fr] gap-x-4 ${className}`}>
            <Avatar username={username} className="rounded-full w-16 h-16" />
            <div className="max-w-full overflow-hidden">
                <div className="w-full max-w-full grid grid-cols-1 md:grid-cols-[1fr_auto] grid-rows-2 md:grid-rows-1 items-center justify-between gap-x-2">
                    <div className="overflow-hidden">
                        <h5 title={username} className="text-start font-bold text-lg truncate mb-1">{username}</h5>
                        <Rating rating={rating} />
                    </div>
                    <div className="flex gap-x-1 items-center">
                        <p title={dayjs(createdAt).format("LL")} className="md:max-w-40 truncate text-sm font-medium text-gray-600">
                            {dayjs(createdAt).format("LL")}
                        </p>
                        {createdAt !== updatedAt && (
                            <span title={`Comentario actualizado`}>
                                <CalendarArrowUp className="size-5 text-sky-600" />
                            </span>
                        )}
                    </div>
                </div>
                <blockquote className="text-start md:mt-4 leading-relaxed font-medium text-gray-700 line-clamp-4 h-[6.5rem]">
                    {description}
                </blockquote>
            </div>
        </div>
    );
}

const ReviewSkeleton = ({ className }) => {
    return (
        <div className={`relative grid grid-cols-[auto_1fr] gap-x-4 animate-pulse ${className}`}>
            <div className="rounded-full w-16 h-16 bg-slate-200" />
            <div className="max-w-full overflow-hidden">
                <div className="w-full max-w-full grid grid-cols-1 md:grid-cols-[1fr_auto] grid-rows-2 md:grid-rows-1 items-center justify-between gap-x-2">
                    <div className="overflow-hidden">
                        <div className="h-[1.5rem] w-[70%] md:w-[50%] bg-slate-200 rounded mb-1" />
                        <Rating rating={5} classNameStar="size-5 text-slate-200" fill="#e2e8f0" />
                    </div>
                    <div className="flex gap-x-1 items-center">
                        <div className="w-40 h-4 bg-slate-200 rounded" />
                    </div>
                </div>
                <div className="space-y-3 md:mt-5 h-[6.5rem]">
                    <div className="grid grid-cols-4 gap-4">
                        <div className="h-3 bg-slate-200 rounded col-span-3"></div>
                        <div className="h-3 bg-slate-200 rounded col-span-1"></div>
                    </div>
                    <div className="grid grid-cols-4 gap-4">
                        <div className="h-3 bg-slate-200 rounded col-span-2"></div>
                        <div className="h-3 bg-slate-200 rounded col-span-2"></div>
                    </div>
                    <div className="grid grid-cols-4 gap-4">
                        <div className="h-3 bg-slate-200 rounded col-span-1"></div>
                        <div className="h-3 bg-slate-200 rounded col-span-2"></div>
                    </div>
                </div>
            </div>
        </div>
    );
}

const Rating = ({ 
    rating, 
    classNameStar = "size-5 text-yellow-400", 
    fill = "#facc15",
    handleClickStar = (value) => {} 
}) => {
    return (
        <div className="flex items-center justify-start flex-wrap gap-x-1">
            { Array(5).fill(1).map((_, i) => (
                <Star 
                    key={i} 
                    fill={i < rating ? fill : "transparent" } 
                    className={classNameStar} 
                    onClick={() => handleClickStar(i + 1)}
                />
            ))}
        </div>
    );
}

const ReviewForm = ({ 
    className, 
    courseId, 
    onCreate = (review) => {},
    onUpdate = (review) => {},
    onDelete = (review) => {}
}) => {

    const notificationCreated = {
        show: true,
        title: "¡Gracias! Tu reseña ha sido registrada correctamente",
        description: "¡Tu opinión es importante y ahora está disponible para la comunidad!"
    }

    const notificationUpdated = {
        show: true,
        title: "¡Tu reseña ha sido actualizada!",
        description: "Gracias por compartir tu opinión, ahora está disponible para la comunidad.",
        icon: <RefreshCw className="size-4" />
    }

    const notificationDeleted = {
        show: true,
        title: "¡Tu reseña ha sido eliminada!",
        description: "La reseña ha sido eliminada correctamente. ¡Gracias por tu apoyo",
        icon: <Trash2 className="size-4" />
    }

    const { user } = useAuth();
    const [notification, setNotification] = useState({
        show: false,
        title: "",
        description: "",
        icon: false
    });
    const [review, setReview] = useState(null);
    const [form, setForm] = useState({
        courseId: courseId,    
        description: review?.description ? review.description : "",
        rating: review?.rating ? review.rating : "" 
    });
    const [errors, setErrors] = useState({
        id: null,
        courseId: null,
        description: null,
        rating: null
    });
    const [loading, setLoading] = useState(false);
    const [isVisible, setIsVisible] = useState(false);

    const formRef = useRef();

    const handleSubmit = (e) => {
        e.preventDefault();
        review ? handleUpdate() : handleCreate();
    }

    const handleCreate = () => {
        setLoading(true);

        axios.post(APIS.CREATE_REVIEW, form)
        .then(response => {
            if (typeof response.data === "object") {
                setNotification(notificationCreated);
                setErrors({
                    id: null,
                    courseId: null,
                    description: null,
                    rating: null
                });
                setReview(response.data);
                onCreate(response.data);
            }
        })
        .catch(error => {
            const data = error?.response?.data;
            if (typeof data === "object") {
                setErrors({
                    courseId: data.courseId,
                    description: data.description,
                    rating: data.rating
                });
            }
        })
        .finally(() => setTimeout(() => setLoading(false), 500));
    }

    const handleUpdate = () => {
        setLoading(true);

        axios.put(APIS.UPDATE_REVIEW, {
            id: review.id,
            description: form.description,
            rating: form.rating
        })
        .then(response => {
            if (typeof response.data === "object") {
                setNotification(notificationUpdated);
                setErrors({
                    id: null,
                    courseId: null,
                    description: null,
                    rating: null
                });
                onUpdate(response.data);
                setReview(response.data);
            }
        })
        .catch(error => {
            const data = error?.response?.data;
            if (typeof data === "object") {
                setErrors({
                    id: data.id,
                    description: data.description,
                    rating: data.rating
                });
            }
        })
        .finally(() => setTimeout(() => setLoading(false), 500));
    }

    const handleDelete = () => {
        axios.delete(APIS.DELETE_REVIEW, {
            data: {
                id: review.id
            }
        })
        .then(response => {
            setNotification(notificationDeleted);
            setErrors({
                id: null,
                courseId: null,
                description: null,
                rating: null
            });
            setForm({
                description: "",
                rating: ""
            });
            onDelete(review);
            setReview(null);
        })
        .catch(error => {
            const data = error?.response?.data;
            if (typeof data === "object") {
                setErrors({
                    ...errors,
                    id: data.id
                });
            }
        });
    }

    const handleReview = () => {
        if (!isVisible) return;

        axios.get(APIS.GET_REVIEW_BY_AUTH, {
            params: {
                id: courseId
            }
        })
        .then(response => {
            if (typeof response.data === "object") {
                setReview(response.data);
                setForm(prev => {
                    return {
                        ...prev,
                        description: response.data.description,
                        rating: response.data.rating
                    }
                });
            }
        })
        .catch(error => setReview(null));
    }

    useEffect(() => {
        const observer = new IntersectionObserver(entries => {
            const [entry] = entries;
            if (entry.isIntersecting) {
                setIsVisible(true);
                observer.disconnect();
            }
        });

        if (formRef.current) observer.observe(formRef.current);

        return () => {
            if (observer) observer.disconnect();
        }
    }, [formRef]);

    useEffect(handleReview, [isVisible, courseId]);

    return (
        <div className={`relative grid grid-cols-[auto_1fr] gap-x-4 ${className}`}>
            <Avatar username={user?.username} className="rounded-full w-16 h-16" />
            <form ref={formRef} onSubmit={handleSubmit} className="max-w-full">
                <div className="w-full max-w-full grid grid-cols-1 md:grid-cols-[1fr_auto] grid-rows-2 md:grid-rows-1 items-center justify-between gap-x-2">
                    <div className="block overflow-hidden">
                        <h5 title={user?.username} className="text-start font-bold text-lg truncate mb-1">{user?.username}</h5>
                        <Rating 
                            rating={form.rating} 
                            handleClickStar={(value) => setForm({
                                ...form,
                                rating: value
                            })}
                            classNameStar="size-5 text-yellow-400 cursor-pointer"
                        />
                    </div>
                    <div className="flex gap-x-1 items-center">
                        <p title={dayjs(review?.createdAt).format("LL")} className="md:max-w-40 truncate text-sm font-medium text-gray-600">
                            {dayjs(review?.createdAt).format("LL")}
                        </p>
                        {review?.createdAt !== review?.updatedAt && (
                            <span title={`Comentario actualizado`}>
                                <CalendarArrowUp className="size-5 text-sky-600" />
                            </span>
                        )}
                        <AnimatePresence>
                            <motion.button
                                type="button"
                                key={review ? "show" : "hide"}
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0, transition: { type:"spring", stiffness: 250 } }}
                                exit={{ opacity: 0, x: 20 }}
                                title="Eliminar reseña"
                                onClick={handleDelete}
                            >
                                {review && (
                                    <Trash2 className="size-6 text-red-600 cursor-pointer" />
                                )}
                            </motion.button>
                        </AnimatePresence>
                    </div>
                </div>
                <Textarea
                    className={`
                        mt-3 md:mt-4 block w-full resize-none rounded-lg border-none bg-gray-100 py-1.5 px-3 text-gray-700
                        leading-relaxed font-medium focus:ring-0 focus:outline-none data-[focus]:outline-2 data-[focus]:-outline-offset-2 
                        data-[focus]:outline-sky-600`
                    }
                    rows={5}
                    onChange={(e) => setForm({
                        ...form,
                        description: e.target.value
                    })}
                    value={form.description}
                />
                <AnimatePresence mode="wait">
                    <motion.div
                        key={(errors.id || errors.courseId || errors.description || errors.rating) ? "show" : "hide"}
                        initial={{ x: -20, opacity: 0, height: 0 }}
                        animate={{ x: 0, opacity: 1, height: "auto" }}
                        exit={{ x: 20, opacity: 0, height: 0 }}
                    >
                    {(errors.id || errors.courseId || errors.description || errors.rating) &&
                        <p className="flex items-start text-start mt-2 gap-1 text-xs text-red-600 line-clamp-2">
                            <Info className="w-4 h-4" />
                            <span>{errors.id || errors.courseId || errors.description || errors.rating}</span>
                        </p>
                    }
                    </motion.div>               
                </AnimatePresence>
                <div className="block text-end mt-2">
                    <button 
                        type="submit"
                        disabled={loading}
                        className="px-4 cursor-pointer py-2 font-medium rounded-lg inline-flex items-center 
                        bg-sky-600 text-gray-100 hover:bg-sky-700 focus:bg-sky-700 text-sm gap-1
                        hover:text-gray-200 focus:text-gray-200 focus:shadow-outline focus:outline-none transition duration-300"
                    >
                        {review ? <>Actualizar</> : <>Dar mi opinión</>}
                        <AnimatePresence mode="wait">
                            <motion.div
                                key={loading ? "loader" : "forward"}
                                initial={{ opacity: 0, y: -20 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: 20 }}
                            >
                                { loading ? (
                                    <LoaderCircle className="size-5 animate-spin" />
                                ) : (
                                    <Forward className="size-5" />
                                )}
                            </motion.div>
                        </AnimatePresence>
                    </button>
                </div>
            </form>
            <AnimatePresence mode="wait">
                <motion.div
                    key={notification.show ? "show" : "hide"}
                    initial={{ x: -20, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    exit={{ x: 20, opacity: 0 }}
                    className="fixed top-[1.25rem] right-[1.25rem] z-30"
                >
                    { notification.show &&    
                        <Notification 
                            title={notification.title}
                            description={notification.description}
                            icon={notification.icon}
                            className="border border-gray-100" 
                            onClose={() => setNotification(false)} 
                        />
                    }
                </motion.div>
            </AnimatePresence>
        </div>
    );
}

export default Reviews;
export { Rating }