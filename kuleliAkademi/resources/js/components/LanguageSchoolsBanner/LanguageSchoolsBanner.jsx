import React from "react";
import "./LanguageSchoolsBanner.scss";
import Banner from "../Banner/Banner";

// [DOLDURULACAK] Dil okullarına özel görsel / kısa video eklenince değiştirilecek (şu an genel öğrenci görseli)
const bannerImg = "/storage/images/studentsPicture8.webp";

// Dil okulları sayfasının hero alanı: sitedeki alt sayfa banner'ı ile aynı görsel dil.
const LanguageSchoolsBanner = () => {
    return (
        <section className="language-schools-banner" aria-label="Dil okulları">
            <Banner
                text="Dil Okulları"
                subtitle="İspanya'daki partner okullarımız; Malta yakında"
                img={bannerImg}
                responsiveImg={bannerImg}
                location="Dil Okulları"
                alt="Birlikte ders çalışan dil okulu öğrencileri"
            />
        </section>
    );
}

export default LanguageSchoolsBanner;
