import './App.css';
import './axios.js';
import './helpers/theme.js';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import AuthProvider from "./provider/AuthProvider";
import Routes from "./routes/index";

function App() {
    return (
        <AuthProvider>
            <Routes />
        </AuthProvider>
    );
}

export default App;
