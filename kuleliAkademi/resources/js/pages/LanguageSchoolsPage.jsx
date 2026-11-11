import React from 'react';
import { Link } from '@inertiajs/react';
import SEOHead from '../components/SEOHead/SEOHead';
import { generateBreadcrumbSchema, generateCanonical, getPageMetadata } from '../utils/seoHelpers';
import LanguageSchoolsBanner from '../components/LanguageSchoolsBanner/LanguageSchoolsBanner';
import LanguageSchoolsWithCountry from '../components/LanguageSchoolsWithCountry/LanguageSchoolsWithCountry';
import LanguageSchoolCard from '../components/LanguageSchoolCard/LanguageSchoolCard';
import { CtaBand, NoteBox } from '../components/AbroadSections/AbroadSections';
import { contactConfig } from '../config/contactConfig';
import './LanguageSchoolsPage.scss';

const PAGE_PATH = '/dil-okullari';

// Ülke slug'ına göre başvuru formunda önceden seçilecek program
const programForCountry = (countrySlug) => (countrySlug === 'malta' ? 'malta_language' : 'spain_language');

// Props come from LanguageSchoolController@index via Inertia::render('LanguageSchoolsPage', [...]).
const LanguageSchoolsPage = ({ languageSchools = [], countryOptions = [], cityOptions = [], filters = {} }) => {
    const pageSeo = getPageMetadata(PAGE_PATH);
    const selectedCountry = filters.country ?? null;
    const selectedCity = filters.city ?? null;
    const isFiltered = Boolean(selectedCountry || selectedCity);
    const showMaltaSoon = !selectedCity && (!selectedCountry || selectedCountry === 'malta')
        && !countryOptions.some((option) => option.value === 'malta');
    const whatsappHref = `${contactConfig.whatsapp.poland.url}?text=${encodeURIComponent(contactConfig.whatsappMessages.languageSchools)}`;

    return (
        <>
            <SEOHead
                title={pageSeo.title}
                description={pageSeo.description}
                url={generateCanonical(PAGE_PATH)}
                type={pageSeo.type}
                // Filtered variants are thin duplicates of the main list.
                noindex={isFiltered}
                schema={generateBreadcrumbSchema([
                    { label: 'Ana Sayfa', url: '/' },
                    { label: 'Yurt Dışında Eğitim', url: '/yurtdışıeğitim' },
                    { label: 'Dil Okulları', url: PAGE_PATH },
                ])}
            />

            <LanguageSchoolsBanner />

            <div className="language-schools-page">
                <div className="language-schools-page-shell">
                    <div className="language-schools-page-filters">
                        <LanguageSchoolsWithCountry
                            countryOptions={countryOptions}
                            selectedCountry={selectedCountry}
                            cityOptions={cityOptions}
                            selectedCity={selectedCity}
                        />
                    </div>

                    <section className="language-schools-page-results" aria-labelledby="language-schools-results-title">
                        <div className="language-schools-page-results-header">
                            <h2 id="language-schools-results-title" className="language-schools-page-title">
                                Partner Dil Okullarımız
                            </h2>
                            <p className="language-schools-page-count">
                                <strong>{languageSchools.length} okul</strong> listeleniyor
                            </p>
                        </div>

                        {languageSchools.length === 0 && !showMaltaSoon ? (
                            <p className="language-schools-page-empty">
                                Bu filtrelere uygun okul bulunamadı. <Link href={PAGE_PATH}>Tüm okulları göster</Link>
                            </p>
                        ) : (
                            <ul className="language-schools-page-grid">
                                {languageSchools.map((school) => (
                                    <li key={school.id}>
                                        <LanguageSchoolCard school={school} programKey={programForCountry(school.country_slug)} />
                                    </li>
                                ))}

                                {showMaltaSoon ? (
                                    <li>
                                        <article className="language-school-card is-soon">
                                            <div className="language-school-card-media">
                                                <img src="/storage/images/studentsPicture3.webp" alt="Çimlerde ders çalışan öğrenciler" loading="lazy" />
                                                <span className="language-school-card-language">İngilizce</span>
                                                <span className="language-school-card-campus">Yakında</span>
                                            </div>
                                            <div className="language-school-card-body">
                                                <h3 className="language-school-card-title">Malta</h3>
                                                <p className="language-school-card-text">
                                                    Malta&apos;daki İngilizce dil okullarıyla anlaşmalarımız sürüyor. Programlar açıldığında
                                                    ilk sizi bilgilendirelim.
                                                </p>
                                                <div className="language-school-card-footer">
                                                    <span className="language-school-card-price">Çok yakında</span>
                                                    <Link href="/iletişim?program=malta_language" className="language-school-card-link">
                                                        Ön Kayıt Bırak
                                                    </Link>
                                                </div>
                                            </div>
                                        </article>
                                    </li>
                                ) : null}
                            </ul>
                        )}

                        <NoteBox title="Fiyatlar hakkında">
                            <p>
                                Kartlardaki fiyatlar, haftada 20 ders (ya da saat) olan yoğun kursun 1 haftalık başlangıç fiyatıdır ve okulların
                                resmi fiyat listelerinden alınmıştır (Linguaschools 2027, Hispania 2026–27). Uzun kurslarda haftalık
                                fiyat düşer; fiyatlar okul tarafından değiştirilebilir. Size özel teklif şehir,
                                süre, başlangıç tarihi ve konaklama tercihine göre hazırlanır. İspanya&apos;daki dil okulu
                                programlarında Kuleli International ayrıca hizmet bedeli almaz.
                            </p>
                        </NoteBox>

                        <p className="language-schools-page-more">
                            Kurs türleri, üniversiteye hazırlık ve vize bilgileri için{' '}
                            <Link href="/ispanyada-egitim">İspanya&apos;da Eğitim</Link> sayfasına göz atın.
                        </p>

                        <CtaBand
                            title="Hangi okulun size uygun olduğunu birlikte bulalım"
                            text="Şehir, tarih, süre ve dil seviyenizi paylaşın; size özel karşılaştırma ve teklif hazırlayalım."
                            primary={{ href: `/basvuru?program=${programForCountry(selectedCountry)}`, label: 'Danışmanlık Başvurusu' }}
                            secondary={{ href: whatsappHref, label: 'WhatsApp' }}
                        />
                    </section>
                </div>
            </div>
        </>
    );
};

export default LanguageSchoolsPage;
