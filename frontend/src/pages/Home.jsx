import { Link } from "react-router-dom";
import { HeadProvider } from "../provider/HeadProvider";

const Home = () => {
    return (
        <>
            <HeadProvider title="CourSeed" />
            <p>home</p>
            <Link to="/registro">
            registro
            </Link> 
        </>
    );
}

export { Home };