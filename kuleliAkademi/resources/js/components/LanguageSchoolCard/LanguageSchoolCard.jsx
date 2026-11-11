import React from "react";
import { Link } from "@inertiajs/react";
import "./LanguageSchoolCard.scss";

const formatFee = (value, currency) => {
    const amount = Number(value);

    if (!Number.isFinite(amount) || amount <= 0) {
        return null;
    }

    const formatted = new Intl.NumberFormat("tr-TR", { maximumFractionDigits: 0 }).format(amount);
    const symbol = !currency || currency === "EUR" ? "€" : currency;

    return `${formatted} ${symbol}`;
};

// Lowest `weekly` fee across the school's campuses (campus fees already fall back to the school fee).
// Convention (see LanguageSchoolSeeder): the weekly fee is the price of ONE week of the standard
// intensive course, so it is shown as a one-week price, not as a per-week rate.
const lowestWeeklyFee = (school) => {
    const fees = [
        school.fees?.weekly,
        ...(school.campuses || []).map((campus) => campus.fees?.weekly),
    ]
        .map(Number)
        .filter((fee) => Number.isFinite(fee) && fee > 0);

    return fees.length ? Math.min(...fees) : null;
};

const uniqueAccommodationLabels = (school) => [
    ...new Set((school.accommodations || []).map((item) => item.type_label).filter(Boolean)),
];

// Dil okulu kartı (/dil-okullari listesi). Veri LanguageSchoolResource'tan gelir.
const LanguageSchoolCard = ({ school, programKey = "spain_language" }) => {
    const campuses = school.campuses || [];
    const cities = campuses.map((campus) => campus.city).filter(Boolean);
    const weeklyFee = formatFee(lowestWeeklyFee(school), school.currency);
    const tags = uniqueAccommodationLabels(school).slice(0, 3);

    return (
        <article className="language-school-card">
            <div className="language-school-card-media">
                {school.main_image_url ? (
                    <img src={school.main_image_url} alt={`${school.name} okulu`} loading="lazy" />
                ) : (
                    <svg aria-hidden="true" width="34" height="34" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                        <rect x="3" y="5" width="18" height="14" rx="2" />
                        <circle cx="9" cy="10" r="2" />
                        <path d="M21 16l-5-5-8 8" />
                    </svg>
                )}
                {school.language ? <span className="language-school-card-language">{school.language}</span> : null}
                {campuses.length > 1 ? <span className="language-school-card-campus">{campuses.length} şehir</span> : null}
            </div>

            <div className="language-school-card-body">
                <h3 className="language-school-card-title">{school.name}</h3>

                <p className="language-school-card-place">
                    <svg aria-hidden="true" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#8A6A1F" strokeWidth="2">
                        <path d="M12 21s-7-6.2-7-11.5A7 7 0 0 1 19 9.5C19 14.8 12 21 12 21z" />
                        <circle cx="12" cy="9.5" r="2.5" />
                    </svg>
                    <span>{[school.country, cities.join(", ")].filter(Boolean).join(" · ")}</span>
                </p>

                {school.short_description ? <p className="language-school-card-text">{school.short_description}</p> : null}

                {tags.length ? (
                    <ul className="language-school-card-tags" aria-label="Konaklama seçenekleri">
                        {tags.map((tag) => (
                            <li key={tag}>{tag}</li>
                        ))}
                    </ul>
                ) : null}

                <div className="language-school-card-footer">
                    <span className="language-school-card-price">
                        {weeklyFee ? (
                            <>
                                1 haftalık yoğun kurs <strong>{weeklyFee}</strong>&apos;dan başlayan
                            </>
                        ) : (
                            "Fiyat teklif üzerine"
                        )}
                    </span>
                    <Link href={`/basvuru?program=${programKey}`} className="language-school-card-link">
                        Teklif Al
                    </Link>
                </div>
            </div>
        </article>
    );
};

export default LanguageSchoolCard;
