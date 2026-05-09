import React from "react";
import bannerImg from "../assets/images/coursesBannerImg2.png";
import Banner from "../components/Banner/Banner";
import SummerSchoolPromoSection from "../components/summerSchoolPromoSection/SummerSchoolPromoSection";
import OurCoursesCollage from "../components/ourCoursesCollage/ourCoursesCollage";
import EducationProcessTimeline from "../components/educationProcessTimeline/EducationProcessTimeline";
import EventsGallerySection from "../components/eventsGallerySection/EventsGallerySection";
import HomepageContact from "../components/homepageContact/HomepageContact";

export default function Egitimlerimiz() {
    return (
        <>
            <Banner img={bannerImg} location={"Eğitimlerimiz"} text={"Eğitimlerimiz"} responsiveImg={bannerImg}  />
            <OurCoursesCollage />
            <EducationProcessTimeline />
            <SummerSchoolPromoSection />
            <EventsGallerySection />
            <HomepageContact />
        </>
    );
}
