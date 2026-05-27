import React from "react";
import "./SummerSchoolPromoSection.scss";
const studentImage = "/storage/images/summerSchoolImg.webp";

const ribbonItems = [
    "AKADEMİK BAŞARI",
    "YAZ OKULU İLE GELİŞİM",
    "LGS'DE ERKEN HAZIRLIK",
    "PLANLI ÖĞRENİM MODELİ",
];

const featureList = [
    {
        id: 1,
        text: "Akademik tekrar ve konu pekiştirme",
    },
    {
        id: 2,
        text: "Dikkat, odak ve öğrenme alışkanlığı desteği",
    },
];

const statHighlights = [
    {
        id: 1,
        value: "30+",
        label: "Kayıtlı Öğrenci",
    },
    {
        id: 2,
        value: "%95",
        label: "Akademik Gelişim Oranı",
    },
];

export default function SummerSchoolPromoSection() {
    return (
        <section className="summer-school-promo-section">
            <div className="summer-school-promo-shell">


                <div className="summer-school-promo-grid">
                    <div className="summer-school-promo-left">
                        <div className="summer-school-promo-visual">
                            <div className="summer-school-promo-orbits" aria-hidden="true">
                                <span className="summer-school-promo-orbit summer-school-promo-orbit-1"></span>
                                <span className="summer-school-promo-orbit summer-school-promo-orbit-2"></span>
                                <span className="summer-school-promo-dot-cluster"></span>
                                <span className="summer-school-promo-abstract summer-school-promo-abstract-1"></span>
                                <span className="summer-school-promo-abstract summer-school-promo-abstract-2"></span>
                            </div>

                            <div className="summer-school-promo-student">
                                <img
                                    src={studentImage}
                                    alt="Yaz okulu için öğrenci görseli"
                                    className="summer-school-promo-student-image"
                                />
                            </div>
                        </div>
                    </div>

                    <div className="summer-school-promo-right">
                        <div className="summer-school-promo-content">
                            <p className="summer-school-promo-eyebrow">YAZ OKULU PROGRAMI</p>

                            <h2 className="summer-school-promo-title">Yaz Dönemini Planlı Gelişimle Değerlendirin</h2>

                            <p className="summer-school-promo-description">
                                Kuleli Akademi Yaz Okulu, yalnızca tekrar odaklı bir dönem değil;
                                öğrencinin dikkatini, öğrenme alışkanlıklarını ve akademik özgüvenini
                                destekleyen kontrollü bir gelişim sürecidir.
                            </p>

                            <p className="summer-school-promo-description">
                                Program, öğrencinin yaşına ve mevcut seviyesine uygun şekilde planlanır;
                                akademik tekrarın yanında düzenli takip, bireysel yönlendirme ve verimli
                                çalışma alışkanlıklarıyla yeni döneme daha hazır bir başlangıç hedeflenir.
                            </p>


                            <div className="summer-school-promo-feature-list">
                                {featureList.map((item) => (
                                    <div key={item.id} className="summer-school-promo-feature-item">
                                        <span className="summer-school-promo-feature-icon"></span>
                                        <span className="summer-school-promo-feature-text">{item.text}</span>
                                    </div>
                                ))}
                            </div>

                            <div className="summer-school-promo-stat-grid">
                                {statHighlights.map((card) => (
                                    <div key={card.id} className="summer-school-promo-stat-card">
                                        <span className="summer-school-promo-stat-value">{card.value}</span>
                                        <span className="summer-school-promo-stat-label">{card.label}</span>
                                    </div>
                                ))}
                            </div>

                            <a href="#" className="summer-school-promo-button">
                                Bize Mesaj Atın
                                <svg
                                    width="16"
                                    height="16"
                                    viewBox="0 0 16 16"
                                    fill="none"
                                    aria-hidden="true"
                                >
                                    <path
                                        d="M3 8H13M10 5L13 8L10 11"
                                        stroke="currentColor"
                                        strokeWidth="1.5"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                    />
                                </svg>
                            </a>

                            <div className="summer-school-promo-decoration" aria-hidden="true">
                                <span className="summer-school-promo-decoration-book summer-school-promo-decoration-book-1"></span>
                                <span className="summer-school-promo-decoration-book summer-school-promo-decoration-book-2"></span>
                                <span className="summer-school-promo-decoration-book summer-school-promo-decoration-book-3"></span>
                                <span className="summer-school-promo-decoration-orb"></span>
                            </div>
                        </div>
                    </div>
                </div>


            </div>

            <div className="summer-school-promo-ribbon" aria-hidden="true">
                <div className="summer-school-promo-ribbon-track">
                    {[1, 2].map((groupNum) => {
                        const groupContent = Array.from({ length: 4 }, () => ribbonItems).flat();
                        return (
                            <div 
                                key={`group-${groupNum}`}
                                className="summer-school-promo-ribbon-group"
                                aria-hidden={groupNum === 2}
                            >
                                {groupContent.map((item, index) => (
                                    <div key={`${groupNum}-${index}`} className="summer-school-promo-ribbon-item">
                                        <span className="summer-school-promo-ribbon-text">{item}</span>
                                        {(index % ribbonItems.length) < ribbonItems.length - 1 && (
                                            <span className="summer-school-promo-ribbon-separator"></span>
                                        )}
                                    </div>
                                ))}
                            </div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}