import { useEffect, useState } from "react";
import Sidebar from "../../../components/Dashboard/Sidebar";
import { HeadProvider } from "../../../provider/HeadProvider";
import { AnimatePresence, motion } from "framer-motion";
import Footer from "../../../components/Dashboard/Footer";
import Navbar from "../../../components/Dashboard/Navbar";
import { useAuth } from "../../../provider/AuthProvider";
import axios from "axios";
import { APIS } from "../../../configs/apis";
import { BannerProfile } from "../../../components/Dashboard/Banner";
import General from "../../../components/Dashboard/General";
import FormNewPassword from "../../../components/Dashboard/FormNewPassword";
import Notification from "../../../components/Landing/Notification";

const container = {
    hidden: { x: -20, opacity: 0 },
    visible: { x: 0, opacity: 1, transition: { duration: 0.2, type: "keyframes" } }
}

const notification = {
    hidden: { x: 50, opacity: 0 },
    visible: { x: 0, opacity: 1 }
}

const Profile = () => {

    const coursePageSize = 12;
    const currentRoute = "Perfil";
    const { user } = useAuth();
    const [pageNo, setPageNo] = useState(0);
    const [search, setSearch] = useState("");
    const [courses, setCourses] = useState([]);
    const [isFocus, setIsFocus] = useState(false);
    const [updatedPassword, setUpdatedPassword] = useState(false); 
    const [open, setOpen] = useState(window.innerWidth >= 1280);
    const [loadingNewPassword, setLoadingNewPassword] = useState(false);

    const [formNewPassword, setFormNewPassword] = useState({
        currentPassword: "",
        newPassword: "",
        confirmNewPassword: ""
    });

    const [formErrorsNewPassword, setFormErrorsNewPassword] = useState({
        currentPassword: null,
        newPassword: null,
        confirmNewPassword: null
    });

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

    const handleSubmitNewPassword = (e) => {
        e.preventDefault();
        setLoadingNewPassword(true);
        axios.put(APIS.UPDATE_PASSWORD, formNewPassword)
        .then(response => {
            if (typeof response.data === "object") {
                setFormErrorsNewPassword({
                    currentPassword: null,
                    newPassword: null,
                    confirmNewPassword: null
                });
                setFormNewPassword({
                    currentPassword: "",
                    newPassword: "",
                    confirmNewPassword: ""
                });
                setUpdatedPassword(true);
            }
        })
        .catch(error => {
            const data = error?.response?.data;
            if (typeof data === "object") {
                setFormErrorsNewPassword({
                    currentPassword: data.currentPassword,
                    newPassword: data.newPassword,
                    confirmNewPassword: data.confirmNewPassword
                });

                if (data.matchUpdatePassword) {
                    setFormErrorsNewPassword({
                        ...formErrorsNewPassword,
                        newPassword: data.matchUpdatePassword
                    });
                    setFormNewPassword({
                        ...formNewPassword,
                        confirmNewPassword: "",
                    });
                }
            }
        })
        .finally(() => {
            setTimeout(() => setLoadingNewPassword(false), 1000);
        });
    }

    useEffect(handleCourses, [pageNo, search]);
    useEffect(() => { window.scrollTo(0, 0) }, []);

    return(
        <div className="flex w-full h-full font-inter">
            <HeadProvider title="CourSeed - Perfil" />
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
                            onOpenSidenav={() => setOpen(true)}
                            brandText={currentRoute}
                            username={user?.username}
                            courses={courses}
                            search={search}
                            setSearch={(value) => {
                                setSearch(value);
                                setPageNo(0);
                            }}
                            isFocus={isFocus}
                            setIsFocus={(value) => setIsFocus(value)}
                            handleScroll={(e) => handleScroll(e)}
                        ></Navbar>
                        <div className="pt-5 mx-auto mb-auto h-full min-h-[84vh] p-2 md:pr-2">
                            <div className="relative flex w-full flex-col gap-5">
                                <div className="w-full mt-3 flex h-[fit-content] flex-col gap-5 lg:grid lg:grid-cols-12">
                                    <div className="col-span-4 lg:!mb-0">
                                        <BannerProfile user={user} />
                                    </div>
                                    <div className="col-span-8 lg:!mb-0">
                                        <General user={user} />
                                    </div>
                                </div>
                                <div className="grid h-full grid-cols-1 gap-5 lg:!grid-cols-12">
                                    <div className="col-span-5 lg:col-span-6 lg:mb-0 3xl:col-span-4">
                                        <FormNewPassword 
                                            form={formNewPassword} 
                                            loading={loadingNewPassword}
                                            errors={formErrorsNewPassword}
                                            setForm={(newForm) => setFormNewPassword(newForm)} 
                                            onSubmit={(e) => handleSubmitNewPassword(e)}
                                        />
                                    </div>
                                </div>
                                <AnimatePresence mode="wait">
                                    <motion.div
                                        key={updatedPassword ? "show" : "hide"}
                                        variants={notification}
                                        initial="hidden"
                                        animate="visible"
                                        exit="hidden"
                                        className="fixed top-[11rem] sm:top-[7.5rem] right-[1.25rem] z-30"
                                    >
                                        { updatedPassword && (
                                            <Notification 
                                                title="Contraseña actualizada" 
                                                description="Actualización de contraseña completada, acceso asegurado."
                                                onClose={(e) => setUpdatedPassword(false)} 
                                            />
                                        )}
                                    </motion.div>
                                </AnimatePresence>
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

export default Profile;