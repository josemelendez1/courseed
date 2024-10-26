import { HeadProvider } from "../../provider/HeadProvider";
import Navbar from "../../components/Landing/Navbar";
import Hero from "../../components/Landing/Hero";
import Footer from "../../components/Landing/Footer";
import AnimationRevealPage from "../../helpers/AnimationRevealPage";
import CourseByCategorySingle from "../../components/Landing/CourseByCategorySingle";
import CourseByInstitutionSingle from "../../components/Landing/CourseByInstitutionSingle";
import Testimonial from "../../components/Landing/Testimonial";
import ShortFaq from "../../components/Landing/ShortFaq";
import Cta from "../../components/Landing/Cta";

const Home = () => {
    return (
        <AnimationRevealPage>
            <HeadProvider title="CourSeed" />
            <Navbar />
            <Hero />
            <CourseByCategorySingle />
            <CourseByInstitutionSingle />
            <Testimonial />
            <ShortFaq />
            <Cta />
            <Footer />
        </AnimationRevealPage>
    );
}

export { Home };