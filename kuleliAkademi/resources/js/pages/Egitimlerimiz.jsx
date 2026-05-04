import React from "react";
import bannerImg from "../assets/images/coursesBannerImg2.png";
import Banner from "../components/Banner/Banner";
import OurCoursesCollage from "../components/ourCoursesCollage/ourCoursesCollage";
import EducationProcessTimeline from "../components/educationProcessTimeline/EducationProcessTimeline";
import EventsGallerySection from "../components/eventsGallerySection/EventsGallerySection";

export default function Egitimlerimiz() {
    return (
        <>
            <Banner img={bannerImg} location={"Eğitimlerimiz"} text={"Eğitimlerimiz"}  />
            <OurCoursesCollage />
            <EducationProcessTimeline />
            <EventsGallerySection />
        </>
    );
}
