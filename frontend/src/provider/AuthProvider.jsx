import axios from "axios";
import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { APIS } from "../configs/apis";
import { ROLES } from "../configs/roles";

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
    const [token, setToken] = useState(localStorage.getItem("token"));
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    const handleToken = (newToken) => {
        localStorage.setItem("token", newToken);
        setToken(newToken);
    }

    const handleUser = async () => {
        try {
            const res = await axios.get(APIS.USER_AUTHENTICATED);
            setUser(typeof res.data === "object" ? res.data : null);
            return res.data;
        } catch (error) {
            return null;
        }
    }

    useEffect(() => {
        if (token) {
            axios.defaults.headers.common["Authorization"] = "Bearer " + token;
            localStorage.setItem("token", token);
            handleUser();
            setTimeout(() => setLoading(false), 500);
        } else {
            delete axios.defaults.headers.common["Authorization"];
            localStorage.removeItem("token");
        }
    }, [token]);

    const contextValue = useMemo(
        () => ({
          token,
          handleToken,
          user,
          handleUser,
          loading,
          setLoading
        }),
        [token, user, loading]
    );

    return (
        <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
    );
}

export const useAuth = () => {
    return useContext(AuthContext);
}

export const useIsAuth = () => {
    const [isAuth, setIsAuth] = useState(null);
    const {user} = useAuth();

    const handleAuth = () => {
        if (user) {
            setIsAuth(true);
        } else {
            axios.get(APIS.USER_AUTHENTICATED, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                }
            })
            .then(response => {
                if (typeof response.data === "object") {
                    setIsAuth(true);   
                } else {
                    setIsAuth(false);
                }
            })
            .catch(error => {
                setIsAuth(false);
            });
        }
    }

    useEffect(handleAuth, []);
    return isAuth;
}

export const useIsAdmin = () => {
    const [isAdmin, setIsAdmin] = useState(null);
    const {user} = useAuth();

    const handleAdmin = () => {
        if (user) {
            setIsAdmin(
                typeof user === "object" && 
                Array.isArray(user.roles) &&
                user.roles.some(c => c.authority === ROLES.ADMIN)
            );
        } else {
            axios.get(APIS.USER_AUTHENTICATED, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                }
            })
            .then(response => {
                setIsAdmin(
                    typeof response.data === "object" && 
                    Array.isArray(response.data.roles) &&
                    response.data.roles.some(c => c.authority === ROLES.ADMIN)
                )
            })
            .catch(error => {
                setIsAdmin(false);
            });
        }
    }

    useEffect(handleAdmin, []);
    return isAdmin;
}

export const useIsUser = () => {
    const [isUser, setIsUser] = useState(null);
    const {user} = useAuth();

    const handleUser = () => {
        if (user) {
            setIsUser(
                typeof user === "object" && 
                Array.isArray(user.roles) &&
                user.roles.some(c => c.authority === ROLES.USER)
            );
        } else {
            axios.get(APIS.USER_AUTHENTICATED, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                }
            })
            .then(response => {
                setIsUser(
                    typeof response.data === "object" && 
                    Array.isArray(response.data.roles) &&
                    response.data.roles.some(c => c.authority === ROLES.USER)
                )
            })
            .catch(error => {
                setIsUser(false);
            });
        }
    }

    useEffect(handleUser, [user]);
    return isUser;
}

export default AuthProvider;