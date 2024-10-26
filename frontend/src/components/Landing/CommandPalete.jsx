import { Dialog, DialogPanel } from "@headlessui/react";
import { Search } from "lucide-react";
import { Link } from "react-router-dom";

const CommandPalete = ({ search, setSearch, courses, isOpen, setIsOpen, onScroll }) => {
    return (
        <Dialog open={isOpen} onClose={() => setIsOpen(false)} className="relative z-50">
            <div className="fixed inset-0 flex w-screen items-center justify-center p-4 bg-black bg-opacity-10 backdrop-blur-sm">
                <DialogPanel 
                    transition 
                    className="w-full max-w-md lg:max-w-lg xl:max-w-xl 2xl:max-w-2xl rounded-lg bg-white 
                    duration-300 ease-out data-[closed]:transform-[scale(95%)] data-[closed]:opacity-0
                    grid grid-cols-1 grid-rows-[auto_1fr] divide-y-2 overflow-hidden shadow-2xl"
                >
                    <div className="w-full flex items-center">
                        <label htmlFor="simple-search" className="sr-only">Buscar</label>
                        <div className="relative w-full">
                            <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                                <Search className="w-5 h-5 text-gray-500 dark:text-gray-400" aria-hidden="true" />
                            </div>
                            <input 
                                type="text"
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                                id="simple-search" 
                                className="text-gray-900 block w-full ps-10 py-3 dark:placeholder-gray-400 dark:text-white 
                                border-0 focus:ring-0 placeholder:text-gray-400" 
                                placeholder="Buscar por titulo..."
                            />
                        </div>
                        <button 
                            type="button"
                            onClick={() => setIsOpen(false)} 
                            className="p-1 ms-2 mr-2 text-xs font-medium text-gray-900 rounded-lg border hover:bg-gray-100"
                        >
                            <span>ESC</span>
                            <span className="sr-only">Buscar</span>
                        </button>
                    </div>
                    <div className="py-1 max-h-[80vh] overflow-y-auto" onScroll={onScroll}>
                        <h2 className="px-4 py-2 text-gray-900 text-lg font-medium">
                            { courses.length > 0
                                ? "Resultados"
                                : "Sin resultados"
                            }
                        </h2>
                        {courses.map((course, i) => (
                            <Link
                                key={i}
                                to={`/curso/${course.id}`}
                                className={`w-full flex items-center gap-3 text-start px-4 py-2 text-gray-700 hover:bg-gray-100 focus:bg-gray-100 hover:text-gray-900 focus:text-gray-900`}
                            >
                                <img src={`/images/courses/${course.image}`} alt={course.title} className="h-10 w-auto rounded-sm" />
                                <span>{course.title}</span>
                            </Link>
                        ))}
                    </div>
                </DialogPanel>
            </div>
        </Dialog>
    );
}

export default CommandPalete;