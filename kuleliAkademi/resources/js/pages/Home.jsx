import React from 'react';
import SEOHead from '../components/SEOHead/SEOHead';
import { OrganizationSchema, WebPageSchema } from '../components/SchemaMarkup/SchemaMarkup';
import { siteConfig } from '../utils/seoHelpers';
import Header from '../components/Header/Header';
import Selection from '../components/Selection/Selection';
import VideoSectionHomepage from '../components/videoSectionHomepage/videoSectionHomepage';
import UniversityCards from '../components/universityCards/UniversityCards';
import DocumentSection from '../components/documentSection/documentSection';
import WhyPoland from '../components/WhyPoland/WhyPoland';
import ServicesHomepage from '../components/ServicesHomepage/ServicesHomepage';
import HomepageContact from '../components/homepageContact/HomepageContact';

export default function Home({ message }) {
  const pageTitle = 'Polonya Üniversite Danışmanlığı | Kuleli Akademi';
  const pageDescription = 'Polonya üniversite başvurusu, öğrenci vizesi ve yurtdışı eğitim danışmanlığı hizmeti. Öğrencilerinizin başvuru dosyasını eksiksiz hazırlamada uzman danışmanlık sağlıyoruz.';
  const pageUrl = siteConfig.siteUrl;

  return (
    <>
      <SEOHead
        title={pageTitle}
        description={pageDescription}
        url={pageUrl}
        type="website"
        image={`${siteConfig.siteUrl}/og-image.png`}
      />
      
      <OrganizationSchema
        name={siteConfig.organizationName}
        url={siteConfig.siteUrl}
        logo={siteConfig.logo}
        description={siteConfig.siteDescription}
        contactEmail={siteConfig.organizationEmail}
      />
      
      <WebPageSchema
        name={pageTitle}
        description={pageDescription}
        url={pageUrl}
      />

      <Header />
      <Selection />
      <VideoSectionHomepage />
      <UniversityCards />
      <WhyPoland />
      <ServicesHomepage />
      <HomepageContact />
    </>
  );
}