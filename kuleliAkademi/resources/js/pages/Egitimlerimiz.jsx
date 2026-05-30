import React from "react";
import SEOHead from '../components/SEOHead/SEOHead';
import { generateCanonical, getPageMetadata } from '../utils/seoHelpers';
const bannerImg = "/storage/images/coursesBannerImg2.webp";
import Banner from "../components/Banner/Banner";
import SummerSchoolPromoSection from "../components/summerSchoolPromoSection/SummerSchoolPromoSection";
import OurCoursesCollage from "../components/ourCoursesCollage/ourCoursesCollage";
import EducationProcessTimeline from "../components/educationProcessTimeline/EducationProcessTimeline";
import EventsGallerySection from "../components/eventsGallerySection/EventsGallerySection";
import HomepageContact from "../components/homepageContact/HomepageContact";

export default function Egitimlerimiz() {
    const pageSeo = getPageMetadata('/egitimlerimiz');

    return (
        <>
            <SEOHead
                title={pageSeo.title}
                description={pageSeo.description}
                url={generateCanonical('/egitimlerimiz')}
                type={pageSeo.type}
            />
            
            <Banner img={bannerImg} location={"Eğitimlerimiz"} text={"Eğitimlerimiz"} responsiveImg={bannerImg} role="img" aria-label="Eğitimlerimiz banner" />
            <OurCoursesCollage />
            <EducationProcessTimeline />
            <SummerSchoolPromoSection />
            <EventsGallerySection />
            <HomepageContact />
        </>
    );
}
