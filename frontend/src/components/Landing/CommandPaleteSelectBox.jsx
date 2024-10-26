import { Dialog, DialogPanel } from "@headlessui/react";

const CommandPaleteSelectBox = ({title = "Items", isOpen, setIsOpen, items, selectedItems = [], setSelectedItems}) => {

    return (
        <Dialog open={isOpen} onClose={() => setIsOpen(false)} className="relative z-50">
            <div className="fixed inset-0 flex w-screen items-center justify-center p-4 bg-black bg-opacity-10 backdrop-blur-sm">
                <DialogPanel
                    transition 
                    className="w-full max-w-md lg:max-w-lg xl:max-w-xl 2xl:max-w-2xl rounded-lg bg-white 
                    duration-300 ease-out data-[closed]:transform-[scale(95%)] data-[closed]:opacity-0
                    grid grid-cols-1 grid-rows-[auto_1fr] divide-y-2 overflow-hidden shadow-2xl"
                >
                    <div className="w-full flex items-center my-1">
                        <h2 className="w-full px-4 py-2 text-gray-900 text-lg font-medium">
                            { items.length > 0
                                ? title
                                : `Sin ${title.toLowerCase()}`
                            }
                        </h2>
                        <button 
                            type="button"
                            onClick={() => setIsOpen(false)} 
                            className="p-1 ms-2 mr-2 text-xs font-medium text-gray-900 rounded-lg border hover:bg-gray-100"
                        >
                            <span>ESC</span>
                        </button>
                    </div>
                    <div className="py-1 min-h-56 max-h-[80vh] overflow-y-auto">
                        {items.map((item, i) => (
                            <label
                                key={i}
                                htmlFor={`command-palete-${item.name}`}
                                className="w-full flex items-center gap-3 text-start px-4 py-2 text-gray-700 hover:bg-gray-100 focus:bg-gray-100 hover:text-gray-900 focus:text-gray-900"
                            >
                                <input
                                    id={`command-palete-${item.name}`}
                                    type="checkbox" 
                                    checked={selectedItems.includes(item.name)}
                                    onChange={(e) => {
                                        setSelectedItems(item.name, e.target.checked)
                                    }}
                                    className="size-4 rounded border-gray-300 text-sky-600 focus:ring-sky-500"
                                />
                                <span>{item.name}</span>
                            </label>
                        ))}
                    </div>
                </DialogPanel>
            </div>
        </Dialog>
    );
}

export default CommandPaleteSelectBox;