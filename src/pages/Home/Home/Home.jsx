import { Helmet } from "react-helmet-async";
import Banner from "../Banner/Banner";
import Course from "../Course/Course";
import Instructor from "../Instructor/Instructor";
import Blog from "../Blog";



const Home = () => {
    return (
        <div>
            <Helmet>
                <title>Mastar Coocking School</title>
            </Helmet>
           <Banner></Banner>
           <Course></Course>
           <Instructor />
           <Blog />
        </div>
    );
};

export default Home;