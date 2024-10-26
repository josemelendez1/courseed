import { Dialog, DialogPanel } from "@headlessui/react";
import { X } from "lucide-react";

const DialogForm = ({
    isOpen = true,
    setIsOpen = (value) => {},
    children,
    onSubmit = (e) => { e.preventDefault() },
    title = "Formulario",
    className = "",
}) => {
    return (
        <Dialog open={isOpen} onClose={() => setIsOpen(false)} className="relative z-50">
            <div 
                className="fixed inset-0 flex w-screen items-center 
                justify-center p-4 bg-black bg-opacity-10 
                backdrop-blur-sm"
            >
                <DialogPanel 
                    transition
                    className={`w-full max-w-md lg:max-w-lg rounded-lg bg-white dark:!bg-[#111c44]
                    duration-300 ease-out data-[closed]:transform-[scale(95%)] data-[closed]:opacity-0
                    grid grid-cols-1 grid-rows-[auto_1fr] overflow-hidden shadow-2xl p-4 pb-10 ${className}`}  
                >
                    <div 
                        className="w-full flex items-center justify-between gap-5">
                        <p className="text-xl font-semibold text-[#1B254B] dark:text-white truncate">
                            {title}
                        </p>
                        <button
                            type="button"
                            onClick={() => setIsOpen(false)}
                            className="flex items-center text-xl hover:cursor-pointer bg-[#F4F7FE] 
                            p-2 text-sky-600 hover:bg-gray-100 dark:bg-[#1B254B] dark:text-white 
                            dark:hover:bg-white/[0.2] dark:active:bg-white/10 linear justify-center rounded-lg 
                            font-bold transition duration-200"
                        >
                            <X className="size-6" />
                        </button>
                    </div>
                    
                    <form onSubmit={onSubmit} className="w-full h-full">
                        {children}
                    </form>
                </DialogPanel>
            </div>
        </Dialog>
    );
}

export default DialogForm;