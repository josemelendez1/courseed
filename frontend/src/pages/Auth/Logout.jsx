import { useNavigate } from "react-router-dom";
import { useAuth } from "../../provider/AuthProvider";

const Logout = () => {
    const { handleToken, setUser } = useAuth();
    const navigate = useNavigate();

    const handleLogout = () => {
        navigate("/", { replace: true });
        handleToken(null);
        setUser(null);
    };

    setTimeout(() => {
        handleLogout();
    });

    return null;
};

export default Logout;