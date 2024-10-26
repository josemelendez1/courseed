const StatsCard = ({ icon, title, subtitle }) => {
    return (
        <div 
            className="z-[5] relative flex rounded-[20px] bg-white bg-clip-border 
            shadow-[14px_17px_40px_4px] shadow-[rgba(112,144,176,0.08)] dark:!bg-[#111c44] 
            dark:text-white dark:shadow-none !flex-row flex-grow items-center"
        >
            <div className="ml-[18px] flex h-[90px] w-auto flex-row items-center">
                <div className="rounded-full bg-[#F4F7FE] p-3 dark:bg-[#1B254B]">
                    <span className="flex items-center text-sky-600 dark:text-white">
                        {icon}
                    </span>
                </div>
            </div>
            <div className="h-[50%] ml-4 flex w-auto flex-col justify-center">
                <p className="text-base font-medium text-gray-400">{title}</p>
                <h4 className="text-2xl font-bold text-[#1B254B] dark:text-white">{subtitle}</h4>
            </div>
        </div>
    );
}

export default StatsCard;