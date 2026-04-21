import React, { useCallback, useEffect, useRef, useState } from "react";
import "./UniversityCards.scss";
import uniWarsaw from "../../assets/images/uniWarsaw3.jpg";
import uniGdansk from "../../assets/images/uniGdansk1.jpg";
import uniWroclaw from "../../assets/images/uniWroclaw1.webp";
import uniKrakow from "../../assets/images/uniKrakow1.png";
import uniPolitechnic from "../../assets/images/uniPolitechnic1.jpg";
import uniPoznan from "../../assets/images/uniPoznan1.png";

const sampleUniversities = [
    {
        id: 1,
        image: uniWarsaw,
        name: "University of Warsaw",
        city: "Varşova",
        badge: "Devlet Üniversitesi",
        description:
            "Geniş akademik programları, güçlü araştırma altyapısı ve uluslararası öğrenci topluluğuyla Polonya'nın en önde gelen üniversitelerinden biridir.",
        tags: ["İngilizce Program", "Güçlü Akademik Ağ", "Merkezi Konum"],
        cta: "Detayları İncele",
    },
    {
        id: 2,
        image: uniPolitechnic,
        name: "Warsaw University of Technology",
        city: "Varşova",
        badge: "Mühendislik Güçlü",
        description:
            "Mühendislik ve teknoloji alanlarında uygulama odaklı eğitim modeliyle öne çıkar; sektörel bağlantıları güçlü bir üniversite seçeneğidir.",
        tags: ["Teknoloji Odağı", "Yüksek İstihdam", "Staj İmkanları"],
        cta: "Programları Gör",
    },
    {
        id: 3,
        image: uniWroclaw,
        name: "University of Wroclaw",
        city: "Wroclaw",
        badge: "Köklü Üniversite",
        description:
            "Köklü tarihi, sosyal bilimlerden fen bilimlerine uzanan güçlü fakülte yapısı ve canlı öğrenci yaşamıyla dikkat çeker.",
        tags: ["Köklü Üniversite", "Kültürel Şehir", "Uluslararası Ortam"],
        cta: "Detaylara Git",
    },
    {
        id: 4,
        image: uniGdansk,
        name: "Gdansk University of Technology",
        city: "Gdansk",
        badge: "Öğrenci Dostu Şehir",
        description:
            "Deniz kenti atmosferi, modern kampüs olanakları ve disiplinler arası eğitim yaklaşımıyla dengeli bir üniversite deneyimi sunar.",
        tags: ["Modern Kampüs", "Uygun Yaşam Maliyeti", "Sosyal Yaşam"],
        cta: "Kampüsü Keşfet",
    },
    {
        id: 5,
        image: uniKrakow,
        name: "Jagiellonian University",
        city: "Krakow",
        badge: "Akademik Prestij",
        description:
            "Avrupa'nın en eski üniversiteleri arasında yer alan kurum, akademik prestij ve zengin şehir kültürünü bir araya getirir.",
        tags: ["Yüksek Prestij", "Tarihi Merkez", "Akademik Derinlik"],
        cta: "Üniversiteyi İncele",
    },
    {
        id: 6,
        image: uniPoznan,
        name: "Adam Mickiewicz University",
        city: "Poznan",
        badge: "Araştırma Odaklı",
        description:
            "Araştırma odaklı yaklaşımı, uluslararası iş birlikleri ve öğrenci dostu şehir yapısıyla güven veren bir tercih sunar.",
        tags: ["Araştırma Odağı", "Öğrenci Dostu", "Çok Disiplinli"],
        cta: "Bölümleri Gör",
    },
];

const deriveBadgeLabel = (university) => {
    if (!university || typeof university !== "object") {
        return "Universite Profili";
    }

    const candidate = university.badge || university.category || university.type || university.label;

    if (typeof candidate === "string" && candidate.trim()) {
        return candidate.trim();
    }

    if (Array.isArray(university.tags) && typeof university.tags[0] === "string" && university.tags[0].trim()) {
        return university.tags[0].trim();
    }

    return "Universite Profili";
};

const UniversityCards = ({ universities = sampleUniversities }) => {
    const trackRef = useRef(null);
    const [canScrollLeft, setCanScrollLeft] = useState(false);
    const [canScrollRight, setCanScrollRight] = useState(true);

    const updateNavigationState = useCallback(() => {
        const track = trackRef.current;

        if (!track) {
            return;
        }

        const threshold = 4;
        const { scrollLeft, scrollWidth, clientWidth } = track;
        const maxLeft = scrollWidth - clientWidth;

        setCanScrollLeft(scrollLeft > threshold);
        setCanScrollRight(scrollLeft < maxLeft - threshold);
    }, []);

    const getScrollAmount = useCallback(() => {
        const track = trackRef.current;

        if (!track) {
            return 0;
        }

        const firstCard = track.querySelector(".university-card");
        const styles = window.getComputedStyle(track);
        const gap = parseFloat(styles.columnGap || styles.gap || "24") || 24;

        if (!firstCard) {
            return track.clientWidth * 0.9;
        }

        const cardWidth = firstCard.getBoundingClientRect().width;
        const viewportWidth = window.innerWidth;
        const cardsPerStep = viewportWidth < 740 ? 1 : viewportWidth < 1100 ? 2 : 3;

        return (cardWidth + gap) * cardsPerStep;
    }, []);

    const handleNavigate = (direction) => {
        const track = trackRef.current;

        if (!track) {
            return;
        }

        const amount = getScrollAmount();

        track.scrollBy({
            left: direction === "next" ? amount : -amount,
            behavior: "smooth",
        });
    };

    useEffect(() => {
        const track = trackRef.current;

        if (!track) {
            return;
        }

        updateNavigationState();

        const handleScroll = () => updateNavigationState();

        track.addEventListener("scroll", handleScroll, { passive: true });
        window.addEventListener("resize", updateNavigationState);

        return () => {
            track.removeEventListener("scroll", handleScroll);
            window.removeEventListener("resize", updateNavigationState);
        };
    }, [updateNavigationState]);

    return (
        <section className="university-section" aria-labelledby="university-section-title">
            <div className="university-shell">
                <header className="university-header">
                    <div className="university-header-content">
                        <p className="university-eyebrow">Polonya'da Üniversite Seçenekleri</p>
                        <h2 id="university-section-title" className="university-title">
                            Size Uygun Üniversiteleri Keşfedin
                        </h2>
                        <p className="university-description">
                            Program dili, şehir yaşamı ve akademik hedeflerine göre en uygun seçenekleri
                            karşılaştırarak karar sürecini güvenle yönet.
                        </p>
                    </div>

                    <div className="university-navigation" aria-label="Universite kartlarini kaydir">
                        <button
                            type="button"
                            className="university-nav-btn"
                            onClick={() => handleNavigate("prev")}
                            disabled={!canScrollLeft}
                            aria-label="Universite kartlarini sola kaydir"
                        >
                            <span aria-hidden="true">&larr;</span>
                        </button>
                        <button
                            type="button"
                            className="university-nav-btn"
                            onClick={() => handleNavigate("next")}
                            disabled={!canScrollRight}
                            aria-label="Universite kartlarini saga kaydir"
                        >
                            <span aria-hidden="true">&rarr;</span>
                        </button>
                    </div>
                </header>

                <div className="university-track-wrap">
                    <div ref={trackRef} className="university-track" role="list">
                        {universities.map((university) => {
                            const badgeLabel = deriveBadgeLabel(university);

                            return (
                                <article key={university.id} className="university-card" role="listitem">
                                    <div className="university-card-image-wrap">
                                        <img
                                            src={university.image}
                                            alt={`${university.name} kampus gorunumu`}
                                            className="university-card-image"
                                        />
                                        <span className="university-card-overlay" aria-hidden="true" />
                                        <p className="university-card-image-badge">{badgeLabel}</p>
                                    </div>

                                    <div className="university-card-content">
                                        <div className="university-name-labels-container">
                                            <h3 className="university-card-title">{university.name}</h3>

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
                                            </p>
                                        </div>
                                        <p className="university-card-text">{university.description}</p>

                                        <button type="button" className="university-card-cta">
                                            {university.cta || "Detayları İncele"}
                                        </button>
                                    </div>
                                </article>
                            );
                        })}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default UniversityCards;