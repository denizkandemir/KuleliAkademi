import React from "react";
import bannerImg from "../assets/images/coursesBannerImg2.png";
import Banner from "../components/Banner/Banner";
import OurCoursesCollage from "../components/ourCoursesCollage/ourCoursesCollage";

export default function Egitimlerimiz() {
    return (
        <>
            <Banner img={bannerImg} location={"Eğitimlerimiz"} text={"Eğitimlerimiz"}  />
            <OurCoursesCollage />
        </>
    );
}
