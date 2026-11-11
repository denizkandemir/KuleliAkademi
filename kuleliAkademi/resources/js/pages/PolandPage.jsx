import React from "react";
import SEOHead from '../components/SEOHead/SEOHead';
import { generateBreadcrumbSchema, generateCanonical, getPageMetadata } from '../utils/seoHelpers';
import Banner from "../components/Banner/Banner";
import WhyPoland from "../components/WhyPoland/WhyPoland";
import StudyAbroadPlan from "../components/studyAbroadPlan/StudyAbroadPlan";
import DocumentSection from "../components/documentSection/documentSection";
import StudyAbroadTimeline from "../components/studyAbroadTimeline/StudyAbroadTimeline";
import UniversityCards from "../components/universityCards/UniversityCards";
import FaqSection from "../components/faqSection/faqSection";
import HomepageContact from "../components/homepageContact/HomepageContact";
import ServicesHomepage from "../components/ServicesHomepage/ServicesHomepage";
import { AbroadSection, NoteBox } from "../components/AbroadSections/AbroadSections";

const bannerImg = "/storage/images/uniWarsaw2.webp";
const PAGE_PATH = '/polonyada-universite';

// Polonya'da üniversite sayfası: eski /yurtdışıeğitim içeriği + WhyPoland (ana sayfadan taşındı).
// `dbServices` prop'u routes/web.php içindeki /polonyada-universite route'undan gelir (aktif Polonya hizmetleri).
const PolandPage = ({ dbServices = [] }) => {
    const pageSeo = getPageMetadata(PAGE_PATH);
    const breadcrumb = generateBreadcrumbSchema([
        { label: 'Ana Sayfa', url: '/' },
        { label: 'Yurt Dışında Eğitim', url: '/yurtdışıeğitim' },
        { label: "Polonya'da Üniversite", url: PAGE_PATH },
    ]);

    return <>
        <SEOHead
            title={pageSeo.title}
            description={pageSeo.description}
            url={generateCanonical(PAGE_PATH)}
            type={pageSeo.type}
            schema={breadcrumb}
        />

        <Banner
            text="Polonya'da Üniversite"
            subtitle="Lisans, yüksek lisans ve hazırlık programları"
            img={bannerImg}
            responsiveImg={bannerImg}
            location="Polonya'da Üniversite"
            alt="Varşova Üniversitesi kampüsü"
        />
        <WhyPoland />
        <StudyAbroadPlan />
        <UniversityCards />
        <StudyAbroadTimeline />
        <DocumentSection />
        <ServicesHomepage services={dbServices} />
        <FaqSection />

        <AbroadSection tone="light">
            <NoteBox title="Bilmeniz gerekenler">
                <p>
                    Kabul kararını üniversite, vize kararını konsolosluk verir. Başvuru şartları, ücretler ve belge listesi
                    okula, bölüme ve döneme göre değişir; güncel bilgileri başvuru öncesinde birlikte kontrol ediyoruz.
                </p>
            </NoteBox>
        </AbroadSection>

        <HomepageContact />
    </>;
}

export default PolandPage;
