import { Lock, User } from "lucide-react";

const General = ({ user }) => {
    return(
        <div 
            className="!z-[5] relative flex flex-col rounded-[20px] 
            bg-white bg-clip-border shadow-[14px_17px_40px_4px] 
            shadow-[rgba(112,_144,_176,_0.08)] dark:!bg-[#111c44] 
            dark:text-white dark:shadow-none w-full h-full p-3"
        >
            <div className="mt-2 mb-8 w-full">
                <h4 className="px-2 text-xl font-semibold text-[#1B254B] dark:text-white">
                    Información General
                </h4>
                <p className="mt-2 px-2 text-base text-gray-500 text-justify sm:text-start">
                    A continuación, se detalla la información de la cuenta del usuario. 
                    El nombre de usuario asignado es <span className="text-gray-950 font-semibold dark:text-white">{user?.username}</span>
                    , el cual se utiliza para identificar su perfil en nuestra plataforma. 
                    La contraseña es un elemento vital para la seguridad de la cuenta; por 
                    ello, se muestra como <span className="text-gray-950 font-semibold dark:text-white">{(user?.username ? user?.username : "").replace(/./g, '*')}</span>, 
                    asegurando que no se exponga públicamente. Este perfil ofrece un entorno 
                    seguro y personalizado, permitiendo al usuario acceder a todas las 
                    características y servicios disponibles en la plataforma.
                </p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 px-2">
                <div 
                    className="flex flex-col items-start justify-center rounded-2xl 
                    bg-white bg-clip-border px-3 py-4 shadow-[14px_17px_40px_4px] 
                    shadow-[rgba(112,_144,_176,_0.08)] dark:!bg-[#1B254B] dark:shadow-none
                    "
                >
                    <p className="text-sm text-gray-400 inline-flex items-center gap-1">
                        Nombre de usuario o email
                        <User className="size-5 text-sky-600" />
                    </p>
                    <p className="w-full text-base font-medium text-[#1B254B] dark:text-white py-0 sm:py-1">
                        {user?.username}
                    </p>
                </div>
                <div 
                    className="flex flex-col items-start justify-center rounded-2xl 
                    bg-white bg-clip-border px-3 py-4 shadow-[14px_17px_40px_4px] 
                    shadow-[rgba(112,_144,_176,_0.08)] dark:!bg-[#1B254B] dark:shadow-none
                    "
                >
                    <p className="text-sm text-gray-400 inline-flex items-center gap-1">
                        Contraseña
                        <Lock className="size-5 text-sky-600" />
                    </p>
                    <p className="w-full text-base font-medium text-[#1B254B] dark:text-white py-0 sm:py-1">
                        {(user?.username ? user?.username : "").replace(/./g, '*')}
                    </p>
                </div>
            </div>
        </div>
    );
}

export default General;