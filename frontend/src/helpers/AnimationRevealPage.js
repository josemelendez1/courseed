/* eslint-disable import/no-anonymous-default-export */
import React from "react";

import { motion } from "framer-motion";
import useInView from "./useInView";

function AnimationReveal({ disabled, children }) {
    if (disabled) {
        return <>{children}</>;
    }

    if (!Array.isArray(children)) children = [children];

    const directions = ["left", "right"];
    const childrenWithAnimation = children.map((child, i) => {
        return (
            <AnimatedSlideInComponent key={i} direction={directions[i % directions.length]}>
                {child}
            </AnimatedSlideInComponent>
        );
    });
    return <>{childrenWithAnimation}</>;
}

function AnimatedSlideInComponent({ direction = "left", offset = 30, children }) {
    const [ref, inView] = useInView({ margin: `-${offset}px 0px 0px 0px` });

    const x = { target: "0%" };

    if (direction === "left") x.initial = "-150%";
    else x.initial = "150%";

    return (
        <div ref={ref}>
            <motion.section
                initial={{ x: x.initial }}
                animate={{
                    x: inView && x.target,
                    transitionEnd: {
                        x: inView && 0
                    }
                }}
                transition={{ type: "spring", damping: 19 }}
            >
                {children}
            </motion.section>
        </div>
    );
}

export default (props) => (
    <div className={`font-display min-h-screen p-8 overflow-hidden relative`}>
        <AnimationReveal {...props} />
    </div>
);
