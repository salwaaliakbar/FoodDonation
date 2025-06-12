import React from "react";
import Navbar from "../../Components/Navbar/NavBar";
import AboutHero from "./AboutHero";
import Staticics from "../LandingPage/Staticsics";
import JoinMission from "./JoinMission";
import Journey from "./Journey";
import OurValue from "./OurValue";
import Footer from "../../Components/Footer/Footer";

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