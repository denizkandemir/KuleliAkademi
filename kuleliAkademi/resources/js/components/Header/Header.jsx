import React from "react";
import "./Header.scss";
import Slide from "../Slide/Slide";
import slideImg1 from "../../assets/images/headerImg7.png"; //Kesin kalsın aşırı iyi
import slideImg2 from "../../assets/images/headerImg18.png"; //Bunu aliağadaki eğitimler için kullan veya 12 numara
import slideImg3 from "../../assets/images/polandPicture2.png"; //Polonya ile alakalı bir şeyde kullan
import slideImg4 from "../../assets/images/uniWarsaw2.png";

const Header = () => {

 const slideImgs = [
    {
        id: 1,
        url: slideImg1,
        littleTitle: "Yurt Dışı Eğitim Danışmanlığı",
        mainTitle: "Polonya'da Üniversite Eğitimi",
        description: "Başvuru, kabul ve yerleşim sürecinde profesyonel danışmanlıkla Polonya’da üniversite eğitimine güvenle adım atın.",
    },

    {
        id: 2,
        url: slideImg2,
        littleTitle: "Yüz Yüze Eğitim Programlarımız",
        mainTitle: "Aliağa’daki Kurumumuzda Birebir ve Yakın Takip",
        description: "Aliağa’daki eğitim kurumumuzda öğrencilerimizin yüz yüze gelişim süreçlerini birebir takip ediyor, akademik hedeflerine uygun destek programları sunuyoruz.",
    },

    {
        id: 3,
        url: slideImg3,
        littleTitle: "Polonya’da Eğitim Fırsatları",
        mainTitle: "Tanınan Diploma ve Sınavsız Geçiş İmkânı",
        description: "Avrupa’da geçerli diploma, sınavsız başvuru fırsatları ve öğrenci odaklı danışmanlık desteğiyle Polonya’da eğitim sürecinizi planlayın.",
    },
];

    const iconArray = [
        {
            id:1,
            title:"Birebir Danışmanlık",
        },
        {
            id:2,
            title:"Vize ve Başvuru Desteği",
        },
        {
            id:3,
            title:"Yerleşim ve Adaptasyon",
        },
    ];

    const floatingIcons = [];

    return (
        <header className="header-container">  
            <Slide
             SlideImgs={slideImgs}
             container={"header-slide-container"}
             iconArray={iconArray}
             id={1}
             floatingIcons={floatingIcons}  
             imgClass={"header-slide-img"}
             openSlide={() => {}}
            />
        </header>
    )
}

export default Header;