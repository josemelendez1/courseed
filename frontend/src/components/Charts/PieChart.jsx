import { AnimatePresence } from "framer-motion";
import { ChartPie, LoaderCircle } from "lucide-react";
import { motion } from "framer-motion";
import { DonutChart, Legend } from "@tremor/react"

const container = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1 },
    exit: { y: -20, opacity: 0 }
}  

const PieChart = ({
    title = "Weekly Revenue",
    categories = [],
    index = "", 
    category = "",
    data = [],
    className
}) => {
    
    const valueFormatter = (number) => `${number} cursos`;

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
                    className="z-[1] flex items-center justify-center 
                    rounded-lg bg-[#F4F7FE] p-2 text-sky-600 hover:bg-gray-100 active:bg-gray-200 dark:bg-[#1B254B] 
                    dark:text-white dark:hover:bg-white/[0.2] dark:active:bg-white/10"
                >
                    <ChartPie className="size-6" />
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
                        {data.length > 0 ? (
                            <div className="flex items-center justify-center flex-col gap-y-6 h-80">
                                <DonutChart
                                    data={data}
                                    category={category}
                                    index={index}
                                    variant="pie"
                                    colors={[
                                        'sky-800',
                                        'sky-700',
                                        'sky-600',
                                        'sky-500',
                                        'sky-400',
                                        'sky-300',
                                    ]}
                                    valueFormatter={valueFormatter}
                                    onValueChange={value => {}}
                                    noDataText="Sin información"
                                    className="h-48"
                                />
                                <Legend
                                    categories={categories}
                                    colors={[
                                        'sky-800',
                                        'sky-700',
                                        'sky-600',
                                        'sky-500',
                                        'sky-400',
                                        'sky-300',
                                      ]}
                                    className="max-w-xs"
                                />
                            </div>
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

export default PieChart;