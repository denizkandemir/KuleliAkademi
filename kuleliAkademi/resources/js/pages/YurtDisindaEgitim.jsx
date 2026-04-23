import React from "react";
import Banner from "../components/Banner/Banner";
import StudyAbroadPlan from "../components/studyAbroadPlan/StudyAbroadPlan";
import bannerImg from "../assets/images/uniWarsaw2.png";

const YurtDisindaEgitim = () => {
    return <>
        <Banner text="Yurt Dışı Eğitim" img={bannerImg} responsiveImg={bannerImg} location="Yurt Dışı Eğitim" />
        <StudyAbroadPlan />
    </>;
}

export default YurtDisindaEgitim;
