import { Link } from "react-router-dom";

const Footer = () => {

    const links = [
        {
            heading: "Principal",
            items: [
                {name:"Blog" , href: "/"},
                {name:"Preguntas frecuentes" , href: "/"},
                {name:"Soporte" , href: "/"},
                {name:"Acerca de" , href: "/"},
            ]
        },
        {
            heading: "Producto",
            items: [
                {name:"Acceso" , href: "/acceso"},
                {name:"Personal" , href: "/"},
                {name:"Negocio" , href: "/"},
                {name:"Equipo" , href: "/"},
            ]
        },
        {
            heading: "Prensa",
            items: [
                {name:"Logotipos" , href: "/"},
                {name:"Eventos" , href: "/"},
                {name:"Historias" , href: "/"},
                {name:"Oficina" , href: "/"},
            ]
        },
        {
            heading: "Legal",
            items: [
                {name:"RGPD" , href: "/"},
                {name:"Política de privacidad" , href: "/"},
                {name:"Condiciones de servicio" , href: "/"},
                {name:"Descargo de responsabilidad" , href: "/"},
            ]
        }
    ];

    const socials = [
        {
            href: "https://facebook.com",
            src: "/facebook-app-symbol.png",
        },
        {
            href: "https://x.com/",
            src: "/twitter.png",
        },
        {
            href: "https://youtube.com",
            src: "/youtube.png",
        }
    ]

    const date = new Date();

    return (
        <footer className="relative bg-[#edf2f7] text-gray-700 -mb-8 -mx-8 px-8 py-20 lg:py-24">
            <div className="max-w-screen-xl mx-auto relative z-10">
                <div className="flex flex-wrap text-left justify-start md:justify-between -mt-12">
                    { links.map((link, i) => (
                        <div key={i} className="px-4 sm:px-0 sm:w-1/4 md:w-auto mt-12">
                            <h5 className="uppercase font-bold">
                                {link.heading}
                            </h5>
                            <ul className="mt-6 text-sm font-medium">
                                { link.items.map((item, x) => (
                                    <li key={x} className="mt-3">
                                        <Link 
                                            to={item.href}
                                            className="border-b-2 border-transparent hover:border-gray-700 focus:border-gray-700 pb-1 transition duration-300"
                                        >
                                            {item.name}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                    <div className="px-4 text-center lg:text-left w-full lg:w-auto mt-20 lg:mt-12">
                        <div className="max-w-sm mx-auto lg:mx-0">
                            <h5 className="uppercase font-bold">
                                Suscríbete a nuestro boletín
                            </h5>
                            <p className="mt-2 lg:mt-6 text-sm font-medium text-gray-600">
                                Entregamos publicaciones de blog de alta calidad escritas por 
                                profesionales todas las semanas. Y prometemos no enviar spam.
                            </p>
                            <form 
                                method="get" 
                                action="#"
                                className="mt-4 lg:mt-6 text-sm sm:flex max-w-xs sm:max-w-none mx-auto sm:mx-0"
                            >
                                <input 
                                    type="email" 
                                    placeholder="Tu dirección de correo electronico" 
                                    className="bg-[#e2e8f0] px-6 py-3 rounded sm:rounded-r-none border sm:border-r-0 
                                    border-gray-400 hover:border-sky-600 focus:outline-none transition duration-300 w-full" />
                                <button 
                                    className="px-8 py-3 font-bold rounded bg-sky-600 text-gray-100 hover:bg-sky-800 focus:bg-sky-800 
                                    hover:text-gray-200 focus:text-gray-200 focus:shadow-outline focus:outline-none transition duration-300 
                                    mt-4 sm:mt-0 w-full sm:w-auto sm:rounded-l-none" 
                                    type="submit"
                                >
                                    Suscribirse
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
                <div className="my-16 border-b-2 border-gray-300 w-full" />
                <div className="flex flex-col md:flex-row items-center justify-between">
                    <div className="flex items-center justify-center md:justify-start">
                        <img src="/logo.png" alt="logo" className="w-auto h-8" />
                        <h5 className="ml-2 text-xl font-bold tracking-wider text-gray-800">
                            CourSeed
                        </h5>
                    </div>
                    <p className="text-center text-sm sm:text-base mt-8 md:mt-0 font-medium text-gray-500">
                        &copy; {date.getFullYear()} CourSeed Inc. Todos los derechos reservados.
                    </p>
                    <div className="mt-8 md:mt-0 flex">
                        { socials.map((social, i) => (
                            <a key={i} href={social.href} className="cursor-pointer p-2 rounded-full bg-gray-900 text-gray-100 hover:bg-gray-700 transition duration-300 mr-4 last:mr-0">
                                <img src={social.src} alt="Social" className="w-4 h-4" />
                            </a>
                        ))}
                    </div>
                </div>
            </div>
        </footer>
    );
}

export default Footer;