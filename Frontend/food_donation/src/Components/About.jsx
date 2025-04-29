import React from "react";
import Navbar from "./NavBar";
import AboutHero from "./AboutHero";
import Footer from "./Footer";
import Staticics from "./Staticsics";
import JoinMission from "./JoinMission";
import Journey from "./Journey";
import OurValue from "./OurValue";

const About = () => {
    return (
        <>
        <Navbar/>
        <AboutHero/>
        <Journey/>
        <Staticics/>
        <JoinMission/>
        <OurValue/>  
        <Footer/>
        
        </>
    );
};

export default About;