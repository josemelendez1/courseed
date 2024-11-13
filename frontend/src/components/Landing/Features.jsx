import { ExternalLink, Info } from "lucide-react";

const MainFeature = ({
    subTitle = "Our Expertise",
    title = <>Designed & Developed by <span className="text-sky-600">Professionals.</span></>,
    description = "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
    link = "/"
}) => {
    return (
        <div className="relative">
            <div className="flex flex-col md:flex-row justify-between max-w-screen-xl mx-auto py-20 md:py-24 items-center">
                <div className="w-full max-w-md mx-auto md:max-w-none md:mx-0 md:w-6/12 flex-shrink-0 relative">
                    <img src="/undraw_learning_sketching_nd4f.svg" alt="imagen de aprendizaje" className="md:max-w-[90%]" />
                </div>
                <div className="w-full max-w-md mx-auto md:max-w-none md:mx-0 md:w-6/12 mt-16 md:mt-0 md:ml-12 lg:ml-16 md:order-last">
                    <div className="lg:py-8 text-center md:text-left">
                        <h5 className="font-bold text-primary-500 mb-4 uppercase tracking-widest text-sky-600">
                            {subTitle}
                        </h5>
                        <h2 className="text-4xl sm:text-5xl font-bold tracking-wide text-center mt-4 lg:text-5xl md:text-left leading-tight">
                            {title}
                        </h2>
                        <p className="mt-4 text-center md:text-left text-sm md:text-base lg:text-lg font-medium leading-relaxed text-gray-500 line-clamp-[8]">
                            {description}
                        </p>
                        <a
                            href={link}
                            target="_blank"
                            rel="noreferrer"
                            className="px-8 cursor-pointer py-3 font-medium rounded-full inline-flex items-center gap-2 bg-sky-600 text-gray-100 hover:bg-sky-700 focus:bg-sky-700 
                            hover:text-gray-200 focus:text-gray-200 focus:shadow-outline focus:outline-none transition duration-300 mt-8"
                        >
                            <span>Mas información</span>
                            <ExternalLink className="size-5" />
                        </a>
                    </div>
                </div>
            </div>
            <img src="/svg-decorator-blob-7.svg" alt="blob" className="pointer-events-none -z-20 absolute right-0 top-0 h-56 w-56 opacity-15 transform translate-x-2/3 -translate-y-12" />
            <img src="/svg-decorator-blob-6.svg" alt="blob" className="pointer-events-none -z-20 absolute left-0 bottom-0 h-64 w-64 opacity-25 transform -translate-x-1/2 translate-y-1/2" />
        </div>
    );
}

const Features = ({
    subTitle = "Features",
    title = "We have Amazing Service.",
    description = "We strictly only deal with vendors that provide top notch security.",
    cards
}) => {

    const defaultCards = [
        {
            icon: <Info className="size-6" />,
            title: "Secure",
            description: "We strictly only deal with vendors that provide top notch security."
        },
        { icon: <Info className="size-6" />, title: "24/7 Support" },
        { icon: <Info className="size-6" />, title: "Customizable" },
        { icon: <Info className="size-6" />, title: "Reliable" },
        { icon: <Info className="size-6" />, title: "Fast" },
        { icon: <Info className="size-6" />, title: "Easy" }
    ];

    if (!cards) cards = defaultCards;

    return (
        <div className="relative">
            <div className="flex flex-col items-center md:items-stretch md:flex-row flex-wrap md:justify-center max-w-screen-lg mx-auto py-20 md:py-24">
                <h5 className="font-bold text-primary-500 mb-4 uppercase tracking-widest text-sky-600">
                    {subTitle}
                </h5>
                <h2 className="w-full text-4xl sm:text-5xl font-bold tracking-wide text-center">
                    {title}
                </h2>
                <p className="mt-4 text-sm md:text-base lg:text-lg font-medium leading-relaxed text-gray-600 max-w-xl w-full text-center">
                    {description}
                </p>
                <div className="mt-10 w-full" />
                {cards.map((card, i) => (
                    <div key={i} className="md:w-1/2 lg:w-1/3 max-w-sm">
                        <div className="flex flex-col sm:flex-row items-center sm:items-start text-center sm:text-left h-full mx-4 px-2 py-8">
                            <span className="border text-center rounded-full p-5 flex-shrink-0 text-sky-700">
                                {card.icon}
                            </span>
                            <span className="sm:ml-4 mt-4 sm:mt-2">
                                <span className="mt-4 tracking-wide font-bold text-2xl leading-none">{card.title || "Fully Secure"}</span>
                                <p className="mt-1 sm:mt-4 font-medium text-gray-600 leading-loose">
                                    {card.description || "Lorem ipsum donor amet siti ceali ut enim ad minim veniam, quis nostrud."}
                                </p>
                            </span>
                        </div>
                    </div>
                ))}
            </div>
            <img src="/svg-decorator-blob-3.svg" alt="blob" className="pointer-events-none absolute right-0 bottom-0 w-64 opacity-25 transform translate-x-32 translate-y-48" />
        </div>
    );
}

const StepsFeature = ({
    subTitle = "Our Expertise",
    title = <>Designed & Developed by <span className="text-sky-600">Professionals.</span></>,
    contents = [{name: "Create an account with us using Google or Facebook."},
        {name: "Browse and Download the template that you like from the marketplace."},
        {name: "Follow the instructions to setup and customize the template to your needs."},
    ]
}) => {
    return (
        <div className="relative">
            <div className="flex flex-col md:flex-row justify-between max-w-screen-xl mx-auto py-20 md:py-24 items-center">
                <div className="w-full max-w-md mx-auto md:max-w-none md:mx-0 md:w-6/12 mt-16 md:mt-0 md:ml-12 lg:ml-16 order-last">
                    <div className="lg:py-8 text-center md:text-left">
                        <h5 className="font-bold text-primary-500 mb-4 uppercase tracking-widest text-sky-600">
                            {subTitle}
                        </h5>
                        <h2 className="text-4xl sm:text-5xl font-bold tracking-wide text-center mt-4 lg:text-5xl md:text-left leading-tight">
                            {title}
                        </h2>
                        <ul className="mt-12">
                            {contents.map((content, i) => (
                                <li key={i} className="mt-8 flex flex-col md:flex-row items-center md:items-start">
                                    <div className="font-semibold text-4xl leading-none text-gray-400">
                                        {( i + 1).toString().padStart(2,'0')}
                                    </div>
                                    <div className="mt-3 md:mt-0 md:ml-6">
                                        <p className="max-w-xs sm:max-w-sm leading-loose text-sm sm:text-base text-gray-900 font-medium line-clamp-4">
                                            {content.name}
                                        </p>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
                <div className="w-full max-w-md mx-auto md:max-w-none md:mx-0 md:w-6/12 flex-shrink-0 relative">
                    <img src="/undraw_project_completed_re_jr7u.svg" alt="Imagen de pasos" className="md:max-w-[90%]" />
                </div>
            </div>
            <img src="/svg-decorator-blob-7.svg" alt="blob" className="pointer-events-none -z-20 absolute left-0 bottom-0 h-64 w-64 opacity-25 transform -translate-x-1/2 translate-y-1/2" />
        </div>
    );
}

export default Features;
export { MainFeature, StepsFeature };