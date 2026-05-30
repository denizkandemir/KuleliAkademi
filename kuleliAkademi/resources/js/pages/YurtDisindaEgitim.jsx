import React from "react";
import SEOHead from '../components/SEOHead/SEOHead';
import { generateCanonical, getPageMetadata } from '../utils/seoHelpers';
import Banner from "../components/Banner/Banner";
import StudyAbroadPlan from "../components/studyAbroadPlan/StudyAbroadPlan";
import DocumentSection from "../components/documentSection/documentSection";
import StudyAbroadTimeline from "../components/studyAbroadTimeline/StudyAbroadTimeline";
import UniversityCards from "../components/universityCards/UniversityCards";
import FaqSection from "../components/faqSection/faqSection";
const bannerImg = "/storage/images/uniWarsaw2.webp";
import HomepageContact from "../components/homepageContact/HomepageContact";
import ServicesHomepage from "../components/ServicesHomepage/ServicesHomepage";

const YurtDisindaEgitim = () => {
    const pageSeo = getPageMetadata('/yurtdışıeğitim');

    return <>
        <SEOHead
            title={pageSeo.title}
            description={pageSeo.description}
            url={generateCanonical('/yurtdışıeğitim')}
            type={pageSeo.type}
        />
        
        <Banner text="Yurt Dışında Eğitim" img={bannerImg} responsiveImg={bannerImg} location="Yurt Dışında Eğitim" role="img" aria-label="Yurt dışında eğitim banner" />
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
