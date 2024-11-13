import { Check, X } from "lucide-react";

const Notification = ({ 
    onClose = () => {}, 
    title = "Update available",
    description = "A new software version is available for download.",
    className,
    icon = <Check className="size-4" />
}) => {
    return (
        <div 
            className={`w-full max-w-xs p-4 text-gray-500 bg-white rounded-lg 
            shadow-xl dark:bg-gray-800 dark:text-gray-400 ${className}`}
        >
            <div className="flex">
                <div 
                    className="flex items-center justify-center flex-shrink-0 
                    w-8 h-8 text-blue-500 bg-blue-100 rounded-full dark:text-blue-300 
                    dark:bg-blue-900"
                >
                    {icon} 
                </div>
                <div className="ms-3 text-sm font-normal">
                    <span className="mb-1 text-sm font-semibold text-gray-900 dark:text-white">
                        {title}
                    </span>
                    <p className="mb-2 text-sm font-normal">
                        {description}
                    </p>
                </div>
                <button 
                    type="button" 
                    onClick={(e) => onClose(e)}
                    className="ms-auto -mx-1.5 -my-1.5 bg-white items-center 
                    justify-center flex-shrink-0 text-gray-400 hover:text-gray-900 
                    rounded-lg focus:ring-2 focus:ring-gray-300 p-1.5 hover:bg-gray-100 
                    inline-flex h-8 w-8 dark:text-gray-500 dark:hover:text-white 
                    dark:bg-gray-800 dark:hover:bg-gray-700"
                >
                    <X className="size-4" />
                </button>
            </div>
        </div>
    );
}

export default Notification;