import { useEffect, useRef, useState } from "react";

const Dropdown = ({ button, children, classNames, animation }) => {
    const wrapperRef = useRef(null);
    const [openWrapper, setOpenWrapper] = useState(false);
    useEffect(() => {
        function handleClickOutside(event) {
            if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
                setOpenWrapper(false);
            }
        }

        document.addEventListener("mousedown", handleClickOutside);

        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        }

    }, [wrapperRef, setOpenWrapper]);

    return (
        <div ref={wrapperRef} className="relative flex">
            <div className="flex items-center" onMouseDown={() => setOpenWrapper(!openWrapper)}>
                {button}
            </div>
            <div
                className={`${classNames} absolute z-10 ${
                    animation
                        ? animation
                        : "origin-top-right transition-all duration-300 ease-in-out"
                } ${openWrapper ? "scale-100": "scale-0"}`}
            >
                {children}
            </div>
        </div>
    );
}

export default Dropdown;