import { useNavigate } from "react-router-dom";
import { useAuth } from "../provider/AuthProvider";

const Logout = () => {
    const { handleToken } = useAuth();
    const navigate = useNavigate();

    const handleLogout = () => {
        navigate("/", { replace: true });
        handleToken(null);
    };

    setTimeout(() => {
        handleLogout();
    });

    return null;
};

export default Logout;