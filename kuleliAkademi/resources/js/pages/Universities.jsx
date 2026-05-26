import React from 'react';
import { Link } from '@inertiajs/react';
import SEOHead from '../components/SEOHead/SEOHead';
import { siteConfig } from '../utils/seoHelpers';
import { getUniversitiesForCards } from '../data/universitiesData';
import '../components/universityCards/UniversityCards.scss';
import './Universities.scss';
import Banner from '../components/Banner/Banner';
import bannerImg from '../assets/images/universitiesBanner.png';

const universities = getUniversitiesForCards();

const Universities = () => {
    const pageTitle = 'Polonya’daki Üniversiteler | Kuleli Akademi';
    const pageDescription = 'Polonya’da İngilizce eğitim veren devlet ve özel üniversiteleri keşfedin, program seçeneklerini karşılaştırın ve size en uygun üniversiteyi bulun.';

    return (
        <>
            <SEOHead
                title={pageTitle}
                description={pageDescription}
                url={`${siteConfig.siteUrl}/universities`}
                type="website"
            />

            <div className="universities-page">
                <Banner img={bannerImg} location={'Üniversiteler'} text={'Polonya’daki Üniversiteler'} responsiveImg={bannerImg} />
               

                <section className="universities-list-section">
                    <div className="universities-page__container universities-shell">
                        <div className="universities-list-intro">
                            <div>
                                <h2>Üniversite Listesi</h2>
                                <p>Toplam {universities.length} üniversite listeleniyor.</p>
                            </div>
                        </div>
                        <div className="universities-page__grid universities-grid" role="list">
                            {universities.map((university) => {
                                const id = university?.id ?? university?.slug ?? '';
                                const slugOrId = university?.slug ?? id;
                                const img = university?.banner_image ?? university?.image ?? '';
                                const title = university?.name ?? '';
                                const city = university?.city ?? '';
                                const region = university?.region ?? '';
                                const description = university?.short_description ?? university?.longDescriptions?.[0] ?? university?.description ?? '';

                                return (
                                    <article key={id} className="university-card universities-page__card" role="listitem">
                                        <div className="university-card-image-wrap">
                                            <img
                                                src={img}
                                                alt={title ? `${title} kampus gorunumu` : 'Üniversite görseli'}
                                                className="university-card-image"
                                                loading="lazy"
                                            />
                                            <span className="university-card-overlay" aria-hidden="true" />
                                        </div>

                                        <div className="university-card-content">
                                            <div className="university-name-labels-container">
                                                <h3 className="university-card-title" title={title}>{title}</h3>

                                                <p className="university-card-city">
                                                    <svg
                                                        className="university-location-icon"
                                                        viewBox="0 0 24 24"
                                                        fill="none"
                                                        xmlns="http://www.w3.org/2000/svg"
                                                        aria-hidden="true"
                                                    >
                                                        <path
                                                            d="M12 22C12 22 19 15.75 19 10.5C19 6.35786 15.866 3 12 3C8.13401 3 5 6.35786 5 10.5C5 15.75 12 22 12 22Z"
                                                            stroke="currentColor"
                                                            strokeWidth="1.4"
                                                            strokeLinecap="round"
                                                            strokeLinejoin="round"
                                                        />
                                                        <path
                                                            d="M12 13.5C13.6569 13.5 15 12.1569 15 10.5C15 8.84315 13.6569 7.5 12 7.5C10.3431 7.5 9 8.84315 9 10.5C9 12.1569 10.3431 13.5 12 13.5Z"
                                                            stroke="currentColor"
                                                            strokeWidth="1.4"
                                                            strokeLinecap="round"
                                                            strokeLinejoin="round"
                                                        />
                                                    </svg>
                                                    {city}
                                                    {region ? ` · ${region}` : ''}
                                                </p>
                                            </div>

                                            <p className="uni-card-description">{description}</p>

                                            <Link href={`/universiteler/${slugOrId}`} className="university-card-cta">
                                                Detayları İncele
                                            </Link>
                                        </div>
                                    </article>
                                );
                            })}
                        </div>
                    </div>
                </section>
            </div>
        </>
    );
};

export default Universities;

