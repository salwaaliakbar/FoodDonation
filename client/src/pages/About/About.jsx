import React from "react";
import Navbar from "../../Components/Navbar/NavBar";
import AboutHero from "./AboutHero";
import Staticics from "../../Components/Staticsics";
import JoinMission from "../../components/JoinMission";
import Journey from "./Journey";
import OurValue from "./OurValue";
import Footer from "../../Components/Footer/Footer";

const About = () => {
    return (
        <div className="font-[Montserrat]">
        <Navbar/>
        <AboutHero/>
        <Journey/>
        <Staticics/>
        <JoinMission/>
        <OurValue/> 
        <Footer />  
        </div>
    );
};

export default About;