import React from "react";
import SEOHead from '../components/SEOHead/SEOHead';
import { generateCanonical } from '../utils/seoHelpers';
const bannerImg = "/storage/images/coursesBannerImg2.webp";
import Banner from "../components/Banner/Banner";
import SummerSchoolPromoSection from "../components/summerSchoolPromoSection/SummerSchoolPromoSection";
import OurCoursesCollage from "../components/ourCoursesCollage/ourCoursesCollage";
import EducationProcessTimeline from "../components/educationProcessTimeline/EducationProcessTimeline";
import EventsGallerySection from "../components/eventsGallerySection/EventsGallerySection";
import HomepageContact from "../components/homepageContact/HomepageContact";

export default function Egitimlerimiz() {
    const pageTitle = 'Hizmetlerimiz | Kuleli Akademi - Polonya Eğitim Danışmanlığı';
    const pageDescription = 'Polonya üniversite başvurusu, vizesi, konaklama ve uyum desteği gibi tüm yurtdışı eğitim hizmetlerini bir arada sağlıyoruz.';

    return (
        <>
            <SEOHead
                title={pageTitle}
                description={pageDescription}
                url={generateCanonical('/egitimlerimiz')}
                type="services"
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
