import React from "react";
import Banner from "../components/Banner/Banner";
import StudyAbroadPlan from "../components/studyAbroadPlan/StudyAbroadPlan";
import DocumentSection from "../components/documentSection/documentSection";
import StudyAbroadTimeline from "../components/studyAbroadTimeline/StudyAbroadTimeline";
import UniversityCards from "../components/universityCards/UniversityCards";
import FaqSection from "../components/faqSection/faqSection";
import bannerImg from "../assets/images/uniWarsaw2.png";
import HomepageContact from "../components/homepageContact/HomepageContact";
import ServicesHomepage from "../components/ServicesHomepage/ServicesHomepage";

const YurtDisindaEgitim = () => {
    return <>
        <Banner text="Yurt Dışında Eğitim" img={bannerImg} responsiveImg={bannerImg} location="Yurt Dışında Eğitim" />
        <StudyAbroadPlan />   
        <UniversityCards />
        <StudyAbroadTimeline />
        <DocumentSection />
        <ServicesHomepage />
        <FaqSection />
        <HomepageContact />
    </>;
}

export default YurtDisindaEgitim;
