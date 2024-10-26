import { AnimatePresence } from "framer-motion";
import { ChartPie, LoaderCircle } from "lucide-react";
import { motion } from "framer-motion";
import { ResponsiveContainer, PieChart as PieChartRE, Pie, Sector } from "recharts";
import { useState } from "react";

const container = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { duration: 0.2, type: "keyframes" } },
    exit: { y: -20, opacity: 0, transition: { duration: 0.2, type: "keyframes" } }
}

const renderActiveShape = (props) => {
    const RADIAN = Math.PI / 180;
    const { cx, cy, midAngle, innerRadius, outerRadius, startAngle, endAngle, fill, payload, percent, value } = props;
    const sin = Math.sin(-RADIAN * midAngle);
    const cos = Math.cos(-RADIAN * midAngle);
    const sx = cx + (outerRadius + 10) * cos;
    const sy = cy + (outerRadius + 10) * sin;
    const mx = cx + (outerRadius + 30) * cos;
    const my = cy + (outerRadius + 30) * sin;
    const ex = mx + (cos >= 0 ? 1 : -1) * 22;
    const ey = my;
    const textAnchor = cos >= 0 ? 'start' : 'end';

    return (
        <g>
            <text x={cx} y={cy} dy={8} textAnchor="middle" fill={fill}>
                {payload.name}
            </text>
            <Sector
                cx={cx}
                cy={cy}
                innerRadius={innerRadius}
                outerRadius={outerRadius}
                startAngle={startAngle}
                endAngle={endAngle}
                fill={fill}
            />
            <Sector
                cx={cx}
                cy={cy}
                startAngle={startAngle}
                endAngle={endAngle}
                innerRadius={outerRadius + 6}
                outerRadius={outerRadius + 10}
                fill={fill}
            />
            <path d={`M${sx},${sy}L${mx},${my}L${ex},${ey}`} stroke={fill} fill="none" />
            <circle cx={ex} cy={ey} r={2} fill={fill} stroke="none" />
            <text x={ex + (cos >= 0 ? 1 : -1) * 12} y={ey} textAnchor={textAnchor} fill="#333">{`${value} cursos.`}</text>
            <text x={ex + (cos >= 0 ? 1 : -1) * 12} y={ey} dy={18} textAnchor={textAnchor} fill="#999">
                {`(${(percent * 100).toFixed(2)}%)`}
            </text>
        </g>
    );
};

const PieChart = ({
    title = "Weekly Revenue",
    data = [
        { name: 'Group A', value: 400 },
        { name: 'Group B', value: 300 },
        { name: 'Group C', value: 300 },
        { name: 'Group D', value: 200 },
    ],
    dataValue = "value"
}) => {

    const [activeIndex, setActiveIndex] = useState(0);

    const getInnerRadius = () => {
        if (window.innerWidth >= 1920) {
            return 120;
        } else if (window.innerWidth >= 1536) {
            return 100;
        } else if (window.innerWidth >= 1280) {
            return 85;
        } else if (window.innerWidth >= 1024) {
            return 80;
        } else if (window.innerWidth >= 640) {
            return 60;
        } else {
            return 40;
        }
    }

    const getOuterRadius = () => {
        if (window.innerWidth >= 1920) {
            return 135;
        } else if (window.innerWidth >= 1536) {
            return 120;
        } else if (window.innerWidth >= 1280) {
            return 115;
        } else if (window.innerWidth >= 1024) {
            return 100;
        } else if (window.innerWidth >= 640) {
            return 80;
        } else {
            return 50;
        }
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
                        className="h-[250px] w-full xl:h-[350px]"
                    >
                        {data.length > 0 ? (
                            <ResponsiveContainer width="100%" height="100%">
                                <PieChartRE width={400} height={400}>
                                    <Pie
                                        activeIndex={activeIndex}
                                        activeShape={renderActiveShape}
                                        data={data}
                                        cx="50%"
                                        cy="45%"
                                        innerRadius={getInnerRadius()}
                                        outerRadius={getOuterRadius()}
                                        fill="#0284c7"
                                        dataKey={dataValue}
                                        onMouseEnter={(_, index) => setActiveIndex(index)}
                                    />
                                </PieChartRE>
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

export default PieChart;