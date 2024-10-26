import { AnimatePresence } from "framer-motion";
import { ChartColumnDecreasing, LoaderCircle } from "lucide-react";
import { BarChart as BarChartRE, ResponsiveContainer, Bar, Tooltip, Rectangle, XAxis, YAxis } from "recharts";
import { motion } from "framer-motion";

const container = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { duration: 0.2, type: "keyframes" } },
    exit: { y: -20, opacity: 0, transition: { duration: 0.2, type: "keyframes" } }
}

const BarChart = ({
    title = "Weekly Revenue",
    dataY = "uv",
    dataX = "name",
    data = [
        {
            name: 'Page A',
            uv: 4000,
            pv: 2400,
            amt: 2400,
        },
        {
            name: 'Page B',
            uv: 3000,
            pv: 1398,
            amt: 2210,
        },
        {
            name: 'Page C',
            uv: 2000,
            pv: 9800,
            amt: 2290,
        },
        {
            name: 'Page D',
            uv: 2780,
            pv: 3908,
            amt: 2000,
        },
        {
            name: 'Page E',
            uv: 1890,
            pv: 4800,
            amt: 2181,
        },
        {
            name: 'Page F',
            uv: 2390,
            pv: 3800,
            amt: 2500,
        },
        {
            name: 'Page G',
            uv: 3490,
            pv: 4300,
            amt: 2100,
        },
    ],
}) => {

    const labelMaxLength = window.innerWidth >= 1024 ? 5 : 2;
    const truncate = (value = "", index) => {
        if (value.length < labelMaxLength) return value;
        return `${value.substring(0, labelMaxLength).trim()}...`; 
    }

    return (
        <div
            className="!z-[5] relative flex flex-col 
            bg-white bg-clip-border 
            shadow-[14px_17px_40px_4px] shadow-[rgba(112,_144,_176,_0.08)] 
            dark:!bg-[#111c44] dark:text-white dark:shadow-none 
            w-full rounded-3xl py-6 px-2 text-center"
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
                        className="h-[250px] w-full xl:h-[350px]"
                    >
                        { data.length > 0 ? (
                            <ResponsiveContainer width="100%" height="100%">
                                <BarChartRE width={150} height={40} data={window.innerWidth >= 1024 ? data : data.slice(0, 5)} barCategoryGap={window.innerWidth >= 1024 ? 15 : 5 }>
                                    <Tooltip cursor={false} />
                                    <Bar 
                                        dataKey={dataY}
                                        fill="#0284c7" 
                                        radius={[5, 5, 5, 5]} 
                                        activeBar={<Rectangle fill="#0369a1" />}
                                    />
                                    <XAxis 
                                        dataKey={dataX}
                                        axisLine={false} 
                                        tickLine={false} 
                                        tick={{ fill: "#9ca3af" }}
                                        tickFormatter={truncate}
                                        className="text-sm font-medium" 
                                    />
                                    <YAxis 
                                        width={window.innerWidth >= 1024 ? 50 : 30}
                                        tick={{ fill: "#9ca3af" }}
                                        axisLine={false}
                                        tickLine={false}
                                        tickSize={1}
                                        className="text-sm font-medium"
                                    />
                                </BarChartRE>
                            </ResponsiveContainer>
                        ) : (
                            <div className="w-full h-full flex items-center justify-center">
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