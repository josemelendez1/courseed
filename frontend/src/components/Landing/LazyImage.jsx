import { motion } from "framer-motion";
import { useState, useEffect, useRef } from "react";

const LazyImage = ({ src, className, width = 300, heigth = 190 }) => {
    const [loadedImage, setLoadedImage] = useState();
    const [isVisible, setIsVisible] = useState(false);
    const divRef = useRef();

    useEffect(() => {
        const observer = new IntersectionObserver(entries => {
            const [entry] = entries;
            if (entry.isIntersecting) {
                setIsVisible(true);
                observer.disconnect();
            }
        });

        if (divRef.current) observer.observe(divRef.current);

        return () => {
            if (observer) observer.disconnect();
        }  
    }, [divRef]);

    useEffect(() => {
        if (!src || !isVisible) return;

        const image = new Image();
        image.onload = () => {
            const canvas = document.createElement("canvas");
            const ctx = canvas.getContext("2d");
            canvas.width = width;
            canvas.height = heigth;
            ctx.drawImage(image, 0, 0, width, heigth);
            const resizedImageURL = canvas.toDataURL("image/jpeg");
            setLoadedImage(resizedImageURL);
        }
        image.src = src;

    }, [src, width, heigth, isVisible]);

    return (
        <div ref={divRef} className="relative w-full h-full overflow-hidden">
            <motion.div
                initial={{
                    opacity: 0,
                    scale: 1.1,
                    filter: 'blur(10px)',
                  }}
                animate={{
                    opacity: loadedImage ? 1 : 0,
                    scale: loadedImage ? 1 : 1.1,
                    filter: loadedImage ? 'blur(0px)' : 'blur(10px)',
                }}
                transition={{
                    opacity: { duration: .5 },
                    scale: { type: 'spring', stiffness: 100, damping: 25 },
                    filter: { duration: .5 },
                }}
                className="h-full w-full"
            >
                { loadedImage &&
                    <img 
                        src={loadedImage} 
                        alt={loadedImage}  
                        className={className}
                    />
                }
            </motion.div>
        </div>
    );
}

export default LazyImage