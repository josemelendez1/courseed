import { AnimatePresence, motion } from "framer-motion";
import { Link } from "react-router-dom";
import Avatar, { Background as BackgroundGlass } from "../Landing/Avatar";
import { ROLES } from "../../configs/roles";
import { Heart } from "lucide-react";

const Banner = ({
    title = "Discover, collect, and sell extraordinary NFTs",
    loadingTitle = true,
    description = "Enter in this creative world. Discover now the latest NFTs or start creating your own!",
    textLink1 = "Discover now",
    hrefLink1 = "",
    textLink2 = "Watch Video",
    hrefLink2 = ""
}) => {
    return (
        <div
            className="grid grid-cols-1 items-center sm:grid-cols-2 w-full rounded-[20px] bg-sky-600 px-[26px] py-[30px] md:px-[60px] md:py-[52px] gap-x-4 gap-y-6 dark:!bg-[#111c44]">
            <div className="w-full">
                <AnimatePresence mode="wait">
                    <motion.h4
                        key={loadingTitle ? "skeleton" : "data"}
                        initial={{ x: -10, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        exit={{ x: 10, opacity: 0 }}
                        className="mb-[14px] max-w-full text-xl font-semibold text-white md:text-3xl md:leading-[42px]"
                    >
                        {title}
                    </motion.h4>
                </AnimatePresence>
                <p className="mb-[40px] max-w-full text-base font-normal text-[#E3DAFF]">
                    {description}
                </p>
                <div className="mt-[36px] flex items-center justify-between gap-4 sm:justify-start 2xl:gap-10">
                    <Link
                        to={hrefLink1}
                        className="text-black rounded-xl bg-white px-4 py-2 text-center text-base font-medium transition duration-200 hover:bg-white hover:bg-opacity-75 active:bg-white active:bg-opacity-75"
                    >
                        {textLink1}
                    </Link>
                    <Link
                        to={hrefLink2}
                        className="text-base font-medium text-[#F4F7FE] hover:text-[#F4F7FE] 2xl:ml-2"
                    >
                        {textLink2}
                    </Link>
                </div>
            </div>
            <img src="/undraw_welcome_re_h3d9.svg" alt="Imagen de bienvenida" className="w-full" />
        </div>
    );
}

const BannerProfile = ({ user }) => {

    const getRole = () => {
        return user?.roles[0].authority;
    }

    return (
        <div
            className="!z-[5] relative flex flex-col rounded-[20px] bg-white 
            bg-clip-border shadow-[14px_17px_40px_4px] shadow-[rgba(112,144,176,0.08)] dark:!bg-[#111c44]
            dark:text-white dark:shadow-none items-center w-full h-full 
            p-[16px] bg-cover"
        >
            <div
                className="relative mt-1 flex h-32 w-full justify-center rounded-xl bg-cover bg-gray-300"
            >
                <BackgroundGlass username={user?.username} className="w-full object-cover rounded-xl" />   
                <div
                    className="absolute -bottom-[3rem] flex h-[87px] w-[87px] items-center justify-center
                    rounded-full border-[4px] border-white bg-pink-400 dark:!border-[#1B254B]"
                >
                    <Avatar username={user?.username} className="h-full w-full rounded-full" />
                </div>
            </div>

            <div className="mt-16 flex flex-col items-center">
                <h4 className="text-xl font-bold text-[#1B254B] dark:text-white">
                    {user?.username}
                </h4>
                <p className="text-base font-normal text-gray-600">
                    {{
                        [ROLES.USER]: "Usuario Autenticado",
                        [ROLES.ADMIN]: "Administrador"
                    }[getRole()]}
                </p>
            </div>

            <div className="mt-6 mb-3 flex gap-4 md:!gap-[3.5rem]">
                <div className="flex flex-col items-center justify-center">
                    <p className="text-2xl font-bold text-[#1B254B] dark:text-white inline-flex items-center gap-1">
                        <span>
                            {user?.likes ? user.likes.length : 0}
                        </span>
                        <Heart className="size-5 text-sky-600 mt-1" />
                    </p>
                    <p className="text-sm font-normal text-gray-600">Cursos de Interes</p>
                </div>
            </div>
        </div>
    );
}

export default Banner;
export { BannerProfile }