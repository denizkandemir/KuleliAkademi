import React from 'react';
import SEOHead from '../components/SEOHead/SEOHead';
import { siteConfig } from '../utils/seoHelpers';
import Banner from '../components/Banner/Banner';
import UniversityHero from '../components/UniversityDetail/UniversityHero';
import QuickNav from '../components/UniversityDetail/QuickNav';
import OverviewSection from '../components/UniversityDetail/OverviewSection';
import GallerySection from '../components/UniversityDetail/GallerySection';
import ProgramsSection from '../components/UniversityDetail/ProgramsSection';
import WhySection from '../components/UniversityDetail/WhySection';
import '../components/UniversityDetail/UniversityDetailLayout.scss';
import bannerImg from '../assets/images/uniWarsaw2.png';
import { getUniversityBySlug } from '../data/universitiesData';

export default function UniversityDetail({ slug }) {
  const university = getUniversityBySlug(slug);

  if (!university) {
    return (
      <div style={{ padding: '60px 20px', textAlign: 'center' }}>
        <h1>Üniversite Bulunamadı</h1>
        <p>Aradığınız üniversite mevcut değil.</p>
      </div>
    );
  }

  const pageTitle = `${university.name} | Kuleli Akademi`;
  const pageDescription = university.description;

  return (
    <>
      <SEOHead title={pageTitle} description={pageDescription} url={`${siteConfig.siteUrl}/universiteler/${slug}`} type="article" />

      <Banner img={university.image} location={'Üniversiteler / ' + university.name} text={university.name} responsiveImg={university.image} />

      <div className="university-detail-shell">
        <div className="container">
          <UniversityHero university={university} />
          <QuickNav />

          <main className="content-primary">
            <OverviewSection university={university} />
            <GallerySection university={university} />
            <ProgramsSection university={university} />
            <WhySection university={university} />
          </main>
        </div>
      </div>
    </>
  );
}
