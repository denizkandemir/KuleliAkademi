import React from 'react';
import { Link, router } from '@inertiajs/react';
import SEOHead from '../components/SEOHead/SEOHead';
import { siteConfig } from '../utils/seoHelpers';
import '../components/universityCards/UniversityCards.scss';
import './Universities.scss';
import Banner from '../components/Banner/Banner';

const bannerImg = '/storage/images/universitiesBanner.webp';

const getFirstSentence = (value) => {
    if (typeof value !== 'string') {
        return '';
    }

    const normalized = value.trim().replace(/\s+/g, ' ');

    if (!normalized) {
        return '';
    }

    const sentenceMatch = normalized.match(/^.*?[.!?](?:["')\]]+)?(?=\s|$)/u);

    return (sentenceMatch ? sentenceMatch[0] : normalized).trim();
};

const normalizeUniversityCard = (university) => {
    const image = university?.main_image_url || university?.coverImage?.image_url || bannerImg;
    const description = university?.short_description || getFirstSentence(university?.description) || 'Bu üniversite için detaylı bilgi henüz eklenmedi.';

    return {
        id: university?.id,
        name: university?.name || 'Üniversite',
        slug: university?.slug || String(university?.id ?? ''),
        city: university?.city || '',
        country: university?.country || 'Polonya',
        image,
        description,
    };
};

const Universities = ({ dbUniversities = [], countryOptions = [], selectedCountry = 'polonya', selectedCountryLabel = 'Polonya' }) => {
    const universities = dbUniversities.map(normalizeUniversityCard);
    const pageTitle = `${selectedCountryLabel} Üniversiteleri | Kuleli Akademi`;
    const pageDescription = `${selectedCountryLabel} üniversitelerini keşfedin, program seçeneklerini karşılaştırın ve size en uygun üniversiteyi bulun.`;

    const handleCountryChange = (country) => {
        router.get(
            '/üniversiteler',
            country ? { country } : {},
            {
                preserveScroll: true,
                replace: true,
            }
        );
    };

    return (
        <>
            <SEOHead
                title={pageTitle}
                description={pageDescription}
                url={`${siteConfig.siteUrl}/üniversiteler`}
                type="website"
            />

            <div className="universities-page">
                <Banner img={bannerImg} location={`Üniversiteler / ${selectedCountryLabel}`} text={`${selectedCountryLabel} Üniversiteleri`} responsiveImg={bannerImg} />

                <section className="universities-list-section">
                    <div className="universities-page__container universities-shell">
                        <div className="universities-list-header">
                            <div className="universities-list-intro">
                                <div>
                                    <h2>{selectedCountryLabel} üniversiteleri</h2>
                                    <p>Toplam {universities.length} üniversite listeleniyor.</p>
                                </div>
                            </div>

                            <div className="universities-country-filter" role="tablist" aria-label="Ülke filtresi">
                                {countryOptions.map((option) => {
                                    const isActive = option.value === selectedCountry;

                                    return (
                                        <button
                                            key={option.value}
                                            type="button"
                                            className={`universities-country-filter__button${isActive ? ' is-active' : ''}`}
                                            onClick={() => handleCountryChange(option.value)}
                                            aria-pressed={isActive}
                                        >
                                            <span>{option.label}</span>
                                            <small>{option.count}</small>
                                        </button>
                                    );
                                })}
                            </div>
                        </div>

                        <div className="universities-page__grid universities-grid" role="list">
                            {universities.length > 0 ? universities.map((university) => (
                                <article key={university.id} className="university-card universities-page__card" role="listitem">
                                    <div className="university-card-image-wrap">
                                        <img
                                            src={university.image}
                                            alt={university.name ? `${university.name} kampus gorunumu` : 'Üniversite görseli'}
                                            className="university-card-image"
                                            loading="lazy"
                                        />
                                        <span className="university-card-overlay" aria-hidden="true" />
                                        <p className="university-card-image-badge">{university.country}</p>
                                    </div>

                                    <div className="university-card-content">
                                        <div className="university-name-labels-container">
                                            <h3 className="university-card-title" title={university.name}>{university.name}</h3>

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
                                                {university.city}
                                                {university.country ? ` · ${university.country}` : ''}
                                            </p>
                                        </div>

                                        <p className="uni-card-description">{university.description}</p>

                                        <Link href={`/universiteler/${university.slug}`} className="university-card-cta">
                                            Detayları İncele
                                        </Link>
                                    </div>
                                </article>
                            )) : (
                                <div className="universities-empty-state">
                                    <strong>Bu ülke için henüz üniversite eklenmemiş.</strong>
                                    <p>Farklı bir ülke seçebilir veya daha sonra tekrar kontrol edebilirsiniz.</p>
                                </div>
                            )}
                        </div>
                    </div>
                </section>
            </div>
        </>
    );
};

export default Universities;

