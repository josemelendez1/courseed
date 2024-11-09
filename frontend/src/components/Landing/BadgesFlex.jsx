import { AnimatePresence } from "framer-motion";
import { motion } from "framer-motion";
import { BookmarkX, X } from "lucide-react";

const BadgesFlex = ({ title = "Categorias Seleccionadas", badges = [], setBadges, className }) => {
    return (
        <AnimatePresence mode="wait">
            <motion.div
                key={badges.length > 0 ? "show" : "empty"}
                initial={{ scale: 0.9, opacity: 0, height: 0, paddingBottom: 0 }}
                animate={{ scale: 1, opacity: 1, height: "auto", paddingBottom: badges.length > 0 ? 12 : 0 }}
                exit={{ scale: 0.9, opacity: 0, height: 0, paddingBottom: 0 }}
                transition={{ duration: 0.2 }}
                className={className}
            >
                {badges.length > 0 && (
                    <>
                        <h3 className="text-xl flex items-end gap-2 font-semibold text-gray-800">
                            <span>{title}</span>
                            <button
                                onClick={() => setBadges([])}
                            >
                                <BookmarkX className="size-6 cursor-pointer text-sky-600 my-1" />
                            </button>
                        </h3>
                        <div className="flex flex-wrap items-center gap-2 mt-2">
                            {badges.map((category, i) => (
                                <span
                                    key={i}
                                    className="inline-flex items-center gap-1 py-2 px-3 rounded-full text-xs font-medium bg-blue-100 text-sky-700 dark:bg-blue-800/30 dark:text-blue-500"
                                >
                                    <X
                                        onClick={() =>
                                            setBadges(
                                                badges.filter((c) => c !== category)
                                            )
                                        }
                                        className="size-4 cursor-pointer text-sky-600"
                                    />
                                    {category}
                                </span>
                            ))}
                        </div>
                    </>
                )}
            </motion.div>
        </AnimatePresence>
    );
};

export default BadgesFlex;
