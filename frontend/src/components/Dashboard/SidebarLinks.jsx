import { Link, useLocation } from "react-router-dom";

const SidebarLinks = ({ routes = [] }) => {
    let location = useLocation();

    const activeRoute = (name) => {
        return location.pathname.includes(name);
    }

    return (
        routes.map((route, i) => (
            <Link key={i} to={route.layout}>
                <div className="relative mb-3 flex hover:cursor-pointer">
                    <li 
                        key={i}
                        className="my-[3px] flex cursor-pointer items-center px-8"
                    >
                        <span 
                            className={`${ activeRoute(route.layout) === true
                                ? "font-bold text-sky-600 dark:text-white"
                                : "font-medium text-gray-600"
                            }`}
                        >
                            { route.icon }{" "}
                        </span>
                        <p 
                            className={`leading-[.25rem] ml-4 flex ${activeRoute(route.layout) === true
                            ? "font-bold dark:text-white text-[#1B254B]"
                            : "font-normal text-gray-400"
                            }`}
                        >
                            {route.name}
                        </p>
                    </li>
                    { activeRoute(route.layout) &&
                        <div className="absolute right-0 top-[1px] h-[2.25rem] w-[.3rem] rounded-lg bg-sky-700 dark:bg-sky-800" />
                    }
                </div>
            </Link>  
        ))
    )    
}

export default SidebarLinks;