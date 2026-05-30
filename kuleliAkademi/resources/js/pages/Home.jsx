import React from 'react';
import SEOHead from '../components/SEOHead/SEOHead';
import { OrganizationSchema, WebPageSchema } from '../components/SchemaMarkup/SchemaMarkup';
import { generateCanonical, getPageMetadata, siteConfig } from '../utils/seoHelpers';
import Header from '../components/Header/Header';
import Selection from '../components/Selection/Selection';
import VideoSectionHomepage from '../components/videoSectionHomepage/videoSectionHomepage';
import UniversityCards from '../components/universityCards/UniversityCards';
import DocumentSection from '../components/documentSection/documentSection';
import WhyPoland from '../components/WhyPoland/WhyPoland';
import ServicesHomepage from '../components/ServicesHomepage/ServicesHomepage';
import HomepageContact from '../components/homepageContact/HomepageContact';

export default function Home({ message }) {
  const pageSeo = getPageMetadata('/');
  const pageUrl = generateCanonical('/');

  return (
    <>
      <SEOHead
        title={pageSeo.title}
        description={pageSeo.description}
        url={pageUrl}
        type={pageSeo.type}
        image={siteConfig.ogImage}
      />
      
      <OrganizationSchema
        name={siteConfig.organizationName}
        url={siteConfig.siteUrl}
        logo={siteConfig.logo}
        description={siteConfig.siteDescription}
        contactEmail={siteConfig.organizationEmail}
      />
      
      <WebPageSchema
        name={pageSeo.title}
        description={pageSeo.description}
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