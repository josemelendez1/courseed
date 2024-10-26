import { useState } from "react";
import { motion } from 'framer-motion';
import { ChevronDown } from "lucide-react";
import faqs from "../../assets/faqs.json";

const ShortFaq = () => {

    const [activeQuestionIndex, setActiveQuestionIndex] = useState(null);

    const toggleQuestion = questionIndex => {
        if (activeQuestionIndex === questionIndex) setActiveQuestionIndex(null);
        else setActiveQuestionIndex(questionIndex);
    };

    return (
        <div className="relative">
            <div className="max-w-screen-xl mx-auto py-20 lg:py-24">
                <div className="flex flex-col items-center">
                    <div>
                        <h5 className="font-bold text-sky-600 mb-4 text-center">
                            FAQS
                        </h5>
                        <h2 className="text-4xl sm:text-5xl font-bold tracking-wide text-center w-full">
                            ¿Tienes 
                            <span className="text-sky-600"> Preguntas?</span>
                        </h2>
                        <p 
                            className="mt-4 text-sm md:text-base lg:text-lg font-medium leading-relaxed text-gray-400 max-w-xl
                            w-full text-center"
                        >
                            Encuentra respuestas rápidas a las preguntas más comunes. Te ayudamos a resolver tus dudas de manera sencilla y clara.
                        </p>
                    </div>
                    <dl className="mt-12 max-w-4xl relative">
                        { faqs.slice(0, 5).map((faq, i) => (
                            <div
                                key={i}
                                className="cursor-pointer select-none mt-5 px-8 sm:px-10 py-5 sm:py-4 rounded-lg text-gray-800
                                hover:text-gray-900 bg-[#edf2f7] hover:bg-[#e2e8f0] transition duration-300 group"
                                onClick={() => toggleQuestion(i)}
                            >
                                <dt className="flex justify-between items-center">
                                    <span className="text-lg lg:text-xl font-semibold">
                                        {faq.title}
                                    </span>
                                    <motion.span
                                        variants={{
                                            collapsed: { rotate: 0 },
                                            open: { rotate: -180 }
                                        }}
                                        initial="collapsed"
                                        animate={activeQuestionIndex === i ? "open" : "collapsed"}
                                        transition={{ duration: 0.02, ease: [0.04, 0.62, 0.23, 0.98] }}
                                    >
                                        <ChevronDown />
                                    </motion.span>
                                </dt>
                                <motion.dd
                                    variants={{
                                        open: { opacity: 1, height: "auto", marginTop: "16px" },
                                        collapsed: { opacity: 0, height: 0, marginTop: "0px" }
                                    }}
                                    initial="collapsed"
                                    animate={activeQuestionIndex === i ? "open" : "collapsed"}
                                    transition={{ duration: 0.3, ease: [0.04, 0.62, 0.23, 0.98] }}                    
                                    className="pointer-events-none text-sm sm:text-base leading-relaxed"
                                >
                                    {faq.description}
                                </motion.dd>
                            </div>
                        ))}
                    </dl>
                </div>
            </div>
            <span className="pointer-events-none -z-20 absolute right-0 top-0 h-56 w-56 opacity-15 transform translate-x-2/3 -translate-y-12">
                <img src="/svg-decorator-blob-7.svg" alt="blob" />
            </span>
            <span className="pointer-events-none -z-20 absolute left-0 bottom-0 h-64 w-64 opacity-15 transform -translate-x-2/3">
                <img src="/svg-decorator-blob-8.svg" alt="blob" />
            </span>
        </div>
    );
}

export default ShortFaq;