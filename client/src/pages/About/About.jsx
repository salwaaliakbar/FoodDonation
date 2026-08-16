import React from "react";
import Navbar from "../../components/Navbar/NavBar";
import AboutHero from "./AboutHero";
import Staticics from "../../components/Staticsics";
import JoinMission from "../../components/JoinMission";
import Journey from "./Journey";
import OurValue from "./OurValue";
import Footer from "../../components/Footer/Footer";
import AnimatedSection from "../../components/AnimatedSection";

const About = () => {
    return (
        <div className="bg-cream-50">
        <Navbar/>
        <AnimatedSection><AboutHero/></AnimatedSection>
        <AnimatedSection><Journey/></AnimatedSection>
        <AnimatedSection><Staticics/></AnimatedSection>
        <AnimatedSection><JoinMission/></AnimatedSection>
        <AnimatedSection><OurValue/></AnimatedSection>
        <Footer />
        </div>
    );
};

export default About;