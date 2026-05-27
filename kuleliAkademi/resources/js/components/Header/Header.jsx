import React from "react";
import "./Header.scss";
import Slide from "../Slide/Slide";
import slideImg1 from "../../assets/images/headerImg7.webp"; //Kesin kalsın aşırı iyi
import slideImg2 from "../../assets/images/headerImg18.webp"; //Bunu aliağadaki eğitimler için kullan veya 12 numara
import slideImg3 from "../../assets/images/polandPicture2.webp"; //Polonya ile alakalı bir şeyde kullan
import slideImg4 from "../../assets/images/uniWarsaw2.webp";
import floatingIcon1 from "../../assets/icons/conversation.png";
import floatingIcon2 from "../../assets/icons/boarding-pass.png";
import floatingIcon3 from "../../assets/icons/green-card.png";
import floatingIcon4 from "../../assets/icons/job-interview.png";
import floatingIcon5 from "../../assets/icons/science.png";
import floatingIcon6 from "../../assets/icons/education.png";
import floatingIcon7 from "../../assets/icons/eng.png";
import floatingIcon8 from "../../assets/icons/globe.png";
import floatingIcon9 from "../../assets/icons/online-test.png";
import {contactConfig} from "../../config/contactConfig";

const slideImgs = [
    {
        id: 1,
        slug: "polonyada-universite-egitimi",
        url: slideImg1,
        littleTitle: "Yurt Dışı Eğitim Danışmanlığı",
        mainTitle: "Polonya’da Üniversite Eğitimi",
        description: "Başvuru, kabul ve yerleşim sürecinde profesyonel danışmanlıkla Polonya’da üniversite eğitimine güvenle adım atın.",
        iconArray: [
            {
                id: 1,
                title: "Birebir Danışmanlık",
            },
            {
                id: 2,
                title: "Vize ve Başvuru Desteği",
            },
            {
                id: 3,
                title: "Yerleşim ve Adaptasyon",
            },
        ],
        floatingIcons: [
            {
                id: 1,
                icon: floatingIcon1,
                title: "Birebir Danışmanlık",
                size: "primary",
                accent: "soft-gold",
                glowSize: "122px",
                position: { top: "10%", right: "24%" },
            },
            {
                id: 2,
                icon: floatingIcon2,
                title: "Vize ve Başvuru Desteği",
                size: "secondary",
                accent: "soft-white",
                position: { top: "38%", right: "46%" },
            },
            {
                id: 3,
                icon: floatingIcon3,
                title: "Yerleşim ve Adaptasyon",
                size: "secondary",
                accent: "soft-blue",
                glowSize: "88px",
                position: { top: "63%", right: "26%" },
            },
        ],
    },
    {
        id: 2,
        slug: "egitimde-birebir-ve-yakin-takip",
        url: slideImg2,
        littleTitle: "Yüz Yüze Eğitim Programlarımız",
        mainTitle: "Eğitimde Birebir ve Yakın Takip",
        description: "Aliağa’daki eğitim kurumumuzda öğrencilerimizin yüz yüze gelişim süreçlerini birebir takip ediyor, akademik hedeflerine uygun destek programları sunuyoruz.",
        iconArray: [
            {
                id: 1,
                title: "Öğrenci Odaklı Programlar",
            },
            {
                id: 2,
                title: "Deneyimli Eğitmen Kadrosu",
            },
            {
                id: 3,
                title: "Sınavlara Hazırlık ve Takip",
            },
        ],
        floatingIcons: [
            {
                id: 1,
                icon: floatingIcon4,
                title: "Yüz Yüze Program",
                size: "primary",
                accent: "soft-white",
                position: { top: "11%", right: "24%" },
            },
            {
                id: 2,
                icon: floatingIcon5,
                title: "Küresel Eğitim Perspektifi",
                size: "secondary",
                accent: "soft-blue",
                glowSize: "96px",
                position: { top: "39%", right: "45%" },
            },
            {
                id: 3,
                icon: floatingIcon6,
                title: "Akademik Takip",
                size: "secondary",
                accent: "soft-gold",
                position: { top: "63%", right: "25%" },
            },
        ],
    },
    {
        id: 3,
        slug: "polonya-egitim-firsatlari",
        url: slideImg3,
        littleTitle: "Polonya’da Eğitim Fırsatları",
        mainTitle: "Tanınan Diploma ve Sınavsız Geçiş İmkânı",
        description: "Avrupa’da geçerli diploma, sınavsız başvuru fırsatları ve öğrenci odaklı danışmanlık desteğiyle Polonya’da eğitim sürecinizi planlayın.",
        iconArray: [
            {
                id: 1,
                title: "Avrupa’da Geçerli Diploma",
            },
            {
                id: 2,
                title: "Sınavsız Başvuru İmkânı",
            },
            {
                id: 3,
                title: "Hazırlık Sınıfı ve Dil Desteği",
            },
        ],
        floatingIcons: [
            {
                id: 1,
                icon: floatingIcon9,
                title: "Sınavsız Geçiş Rehberi",
                size: "primary",
                accent: "soft-blue",
                glowSize: "86px",
                position: { top: "10%", right: "25%" },
            },
            {
                id: 2,
                icon: floatingIcon8,
                title: "Hızlı Başvuru Akışı",
                size: "secondary",
                accent: "soft-white",
                position: { top: "38%", right: "48%" },
            },
            {
                id: 3,
                icon: floatingIcon7,
                title: "IELTS Şartı Olmadan Başvuru",
                size: "secondary",
                accent: "soft-gold",
                position: { top: "63%", right: "25%" },
            },
        ],
    },
];

const buttonUrl = contactConfig.form.consultation.url;
const buttonText = contactConfig.form.consultation.title;

const Header = () => {

    return (
        <header className="header-container">
            <Slide
                SlideImgs={slideImgs}
                container={"header-slide-container"}
                id={1}
                imgClass={"header-slide-img"}
                buttonUrl={buttonUrl}
                buttonText={buttonText}
                openSlide={() => { }}
            />
        </header>
    )
}

export default Header;