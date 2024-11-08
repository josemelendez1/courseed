import { AnimatePresence } from "framer-motion";
import { ChartColumnDecreasing, LoaderCircle } from "lucide-react";
import { motion } from "framer-motion";

import { BarChart as BarChartTremor } from '@tremor/react';

const container = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1 },
    exit: { y: -20, opacity: 0 }
}

const BarChart = ({
    title = "Weekly Revenue",
    data = [],
    categories = [],
    index = "",
    className
}) => {
    return (
        <div
            className={`!z-[5] relative flex flex-col bg-white bg-clip-border 
            shadow-[14px_17px_40px_4px] shadow-[rgba(112,_144,_176,_0.08)] 
            dark:!bg-[#111c44] dark:text-white dark:shadow-none 
            w-full rounded-3xl py-6 px-2 text-center ${className}`}
        >
            <div className="mb-auto flex items-center justify-between px-6">
                <h2 className="text-xl font-semibold text-[#1B254B] dark:text-white">
                    {title}
                </h2>
                <button
                    className="z-[1] flex items-center justify-center cursor-default
                    rounded-lg bg-[#F4F7FE] p-2 text-sky-600 hover:bg-gray-100 active:bg-gray-200 dark:bg-[#1B254B] 
                    dark:text-white dark:hover:bg-white/[0.2] dark:active:bg-white/10"
                >
                    <ChartColumnDecreasing className="size-6" />
                </button>
            </div>
            <div className="md:mt-16 lg:mt-6 overflow-hidden">
                <AnimatePresence mode="wait">
                    <motion.div
                        key={data.length > 0 ? "show" : "hide"}
                        variants={container}
                        initial="hidden"
                        animate="visible"
                        exit="exit"
                        className="w-full"
                    >
                        { data.length > 0 ? (
                            <BarChartTremor
                                data={data}
                                index={index}
                                categories={categories}
                                colors={["sky-600", "sky-800"]}
                                onValueChange={(v) => {}}
                                allowDecimals={false}
                                noDataText="Sin información"
                                className="h-80"
                            />
                        ) : (
                            <div className="w-full flex items-center justify-center h-80">
                                <LoaderCircle className="size-8 animate-spin text-gray-400" />
                            </div>
                        )}
                    </motion.div>
                </AnimatePresence>
            </div>
        </div>
    );
}

export default BarChart;