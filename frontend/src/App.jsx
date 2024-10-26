import './App.css';
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
