import React from 'react';
import SEOHead from '../components/SEOHead/SEOHead';
import { generateCanonical, getUniversityPageMetadata } from '../utils/seoHelpers';
import Banner from '../components/Banner/Banner';
import UniversityHero from '../components/UniversityDetail/UniversityHero';
import QuickNav from '../components/UniversityDetail/QuickNav';
import OverviewSection from '../components/UniversityDetail/OverviewSection';
import GallerySection from '../components/UniversityDetail/GallerySection';
import ProgramsSection from '../components/UniversityDetail/ProgramsSection';
import WhySection from '../components/UniversityDetail/WhySection';
import '../components/UniversityDetail/UniversityDetailLayout.scss';
const bannerImg = '/storage/images/uniWarsaw2.webp';
import { getUniversityBySlug } from '../data/universitiesData';
import CtaPanel from '../components/UniversityDetail/CtaPanel';

const normalizeDbUniversity = (university) => {
  if (!university) {
    return null;
  }

  const galleryImages = Array.isArray(university.images)
    ? university.images.map((image) => image?.image_url).filter((imageUrl) => typeof imageUrl === 'string' && imageUrl.trim())
    : [];

  const image = university.main_image_url || galleryImages[0] || bannerImg;
  const longDescriptions = [university.short_description, university.description]
    .filter((value) => typeof value === 'string' && value.trim())
    .map((value) => value.trim());

  return {
    id: university.id,
    slug: university.slug,
    name: university.name || 'Üniversite',
    localName: university.short_name || university.name || 'Üniversite',
    city: university.city || '',
    country: university.country || 'Polonya',
    language: university.language || 'İngilizce',
    ranking: university.ranking || '400+',
    founded: university.founded || university.established || '1816',
    students: university.students || '40.000+',
    type: university.type || 'Devlet Üniversitesi',
    website: university.website_url || university.website || '#',
    image,
    bannerImg: image,
    galleryImages: galleryImages.length > 0 ? galleryImages : [image],
    longDescriptions: longDescriptions.length > 0 ? longDescriptions : ['Bu üniversite için detaylı açıklama henüz eklenmedi.'],
    programs: [],
    facts: [],
    benefits: [],
  };
};

export default function UniversityDetail({ slug, dbUniversity = null }) {
  const university = getUniversityBySlug(slug) || normalizeDbUniversity(dbUniversity);

  if (!university) {
    return (
      <div style={{ padding: '60px 20px', textAlign: 'center' }}>
        <h1>Üniversite Bulunamadı</h1>
        <p>Aradığınız üniversite mevcut değil.</p>
      </div>
    );
  }

  const pageSeo = getUniversityPageMetadata(university);

  return (
    <>
      <SEOHead
        title={pageSeo.title}
        description={pageSeo.description}
        url={generateCanonical(`/universiteler/${slug}`)}
        type="article"
        image={pageSeo.image}
        schema={pageSeo.schema}
      />

      <Banner img={university.bannerImg ? university.bannerImg : university.image} location={'Üniversiteler / ' + university.name} text={university.name} responsiveImg={university.image} alt={`${university.name} kampüs görseli`} />

      <div className="university-detail-shell">
        <div className="container">
          <UniversityHero university={university} />
          <QuickNav />

          <main className="content-primary">
            <OverviewSection university={university} />
            <GallerySection university={university} />
            <ProgramsSection university={university} />
            <CtaPanel  />
            {pageSeo.faqs.length ? (
              <section className="service-detail-faq-section" aria-labelledby="university-detail-faq-title">
                <div className="service-detail-faq-header">
                  <p className="service-detail-eyebrow">Sık Sorulan Sorular</p>
                  <h2 id="university-detail-faq-title" className="service-detail-title">Üniversite Hakkında Merak Edilenler</h2>
                </div>

                <div className="service-detail-faq-list">
                  {pageSeo.faqs.map((faq, index) => (
                    <details key={faq.question} className="service-detail-faq-item" open={index === 0}>
                      <summary className="service-detail-faq-question">{faq.question}</summary>
                      <div className="service-detail-faq-answer">
                        <p>{faq.answer}</p>
                      </div>
                    </details>
                  ))}
                </div>
              </section>
            ) : null}
            {/* <WhySection university={university} /> */}
          </main>
        </div>
      </div>
    </>
  );
}
