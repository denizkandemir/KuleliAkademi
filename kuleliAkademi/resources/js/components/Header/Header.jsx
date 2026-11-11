import React from "react";
import "./Header.scss";
import Slide from "../Slide/Slide";
const slideImg1 = "/storage/images/headerImg7.webp"; //Kesin kalsın aşırı iyi
const slideImg2 = "/storage/images/headerImg18.webp"; //Bunu aliağadaki eğitimler için kullan veya 12 numara
const slideImg3 = "/storage/images/polandPicture2.webp"; //Polonya ile alakalı bir şeyde kullan
const slideImg4 = "/storage/images/studentsPicture8.webp";
const slideImg5 = "/storage/images/spainImg1.webp";
import floatingIcon1 from "../../assets/icons/conversation.png";
import floatingIcon2 from "../../assets/icons/boarding-pass.png";
import floatingIcon3 from "../../assets/icons/green-card.png";
import floatingIcon4 from "../../assets/icons/job-interview.png";
import floatingIcon5 from "../../assets/icons/science.png";
import floatingIcon6 from "../../assets/icons/education.png";
import floatingIcon7 from "../../assets/icons/eng.png";
import floatingIcon8 from "../../assets/icons/globe.png";
import floatingIcon9 from "../../assets/icons/online-test.png";
import floatingIcon10 from "../../assets/icons/language-learning.png";
import floatingIcon11 from "../../assets/icons/work-plan.png";
import floatingIcon12 from "../../assets/icons/sign.png";
import { contactConfig } from "../../config/contactConfig";
import { imageAltTexts } from "../../utils/imageAltTexts";

const slideImgs = [
    {
        id: 1,
        slug: "yurt-disinda-egitim",
        url: slideImg1,
        littleTitle: "Yurt Dışı Eğitim Danışmanlığı",
        mainTitle: "Yurt Dışında Eğitim, Adım Adım Planlı",
        description:
            "Polonya’da üniversite, İspanya’da dil okulu ve üniversiteye hazırlık. Program seçiminden başvuruya, vizeden yerleşime kadar süreci birlikte planlıyoruz.",
        ctaUrl: "/yurtdışıeğitim",
        ctaText: "Ülke ve Programları İncele",
        iconArray: [
            {
                id: 1,
                title: "Polonya · Üniversite",
            },
            {
                id: 2,
                title: "İspanya · Dil Okulu",
            },
            {
                id: 3,
                title: "Malta · Yakında",
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
        slug: "polonyada-universite-egitimi",
        url: slideImg3,
        littleTitle: "Polonya’da Üniversite",
        mainTitle: "Avrupa’da Geçerli Diploma, İngilizce Programlar",
        description:
            "YKS şartı olmadan başvuru seçenekleri, hazırlık sınıfı imkânı ve Varşova’da yaşayan danışmanla birebir takip. Lisans, yüksek lisans ve hazırlık programları.",
        ctaUrl: "/polonyada-universite",
        ctaText: "Polonya’da Üniversite",
        iconArray: [
            {
                id: 1,
                title: "Avrupa’da Geçerli Diploma",
            },
            {
                id: 2,
                title: "YKS Şartı Olmadan Başvuru",
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
                title: "Okul ve Bölüm Seçimi",
                size: "primary",
                accent: "soft-blue",
                glowSize: "86px",
                position: { top: "10%", right: "25%" },
            },
            {
                id: 2,
                icon: floatingIcon8,
                title: "Vize ve Oturum İzni",
                size: "secondary",
                accent: "soft-white",
                position: { top: "38%", right: "48%" },
            },
            {
                id: 3,
                icon: floatingIcon7,
                title: "IELTS Şartı Olmadan Hazırlık",
                size: "secondary",
                accent: "soft-gold",
                position: { top: "63%", right: "25%" },
            },
        ],
    },
    {
        id: 3,
        slug: "ispanya-dil-okulu",
        url: slideImg5,
        alt: imageAltTexts.spain.spainImg1,
        littleTitle: "İspanya'da Eğitim Fırsatları",
        mainTitle: "İspanya’da Dil Eğitimi ve Hazırlık Yılı",
        description:
            "İspanyolca dil okulları ve üniversiteye hazırlık programlarıyla İspanya’daki eğitim yolculuğunu güvenle planla.",
        ctaUrl: "/yurtdışıeğitim",
        ctaText: "Danışmanlık Talep Formu",
        iconArray: [
            {
                id: 1,
                title: "Seviyene Uygun Programlar",
            },
            {
                id: 2,
                title: "Farklı Şehirlerde Eğitim",
            },
            {
                id: 3,
                title: "Kişiye Özel Danışmanlık",
            },
        ],
        floatingIcons: [
            {
                id: 1,
                icon: floatingIcon10,
                title: "İspanyolca Dil Okulları",
                size: "primary",
                accent: "soft-gold",
                glowSize: "122px",
                position: {
                    top: "15%",
                    right: "22%",
                },
            },
            {
                id: 2,
                icon: floatingIcon11,
                title: "Üniversiteye Hazırlık Yılı",
                size: "secondary",
                accent: "soft-white",
                glowSize: "100px",
                position: {
                    top: "40%",
                    right: "24%",
                },
            },
            {
                id: 3,
                icon: floatingIcon12,
                title: "Başvuru ve Vize Rehberliği",
                size: "secondary",
                accent: "soft-blue",
                glowSize: "88px",
                position: {
                    top: "65%",
                    right: "22%",
                },
            },
        ],
    },
    {
        id: 4,
        slug: "egitimde-birebir-ve-yakin-takip",
        url: slideImg2,
        littleTitle: "Aliağa’da Yüz Yüze Dersler",
        mainTitle: "Eğitimde Birebir ve Yakın Takip",
        description:
            "Aliağa’daki eğitim kurumumuzda LGS hazırlık, ortaokul ve akademik destek programlarıyla öğrencilerimizin gelişimini birebir takip ediyoruz.",
        ctaUrl: "/egitimlerimiz",
        ctaText: "Aliağa Derslerini İncele",
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
                title: "LGS Hazırlık",
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
                openSlide={() => {}}
            />
        </header>
    );
};

export default Header;
