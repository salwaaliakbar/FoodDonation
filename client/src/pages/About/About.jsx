import React from "react";
import Navbar from "../../components/Navbar/NavBar";
import AboutHero from "./AboutHero";
import Staticics from "../../components/Staticsics";
import JoinMission from "../../components/JoinMission";
import Journey from "./Journey";
import OurValue from "./OurValue";
import Footer from "../../components/Footer/Footer";

const About = () => {
    return (
        <div className="bg-cream-50">
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