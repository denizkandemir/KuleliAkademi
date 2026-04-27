import React, { useCallback, useEffect, useRef, useState } from "react";
import "./documentSection.scss";
import { Link, usePage } from "@inertiajs/react";

// import warsawCity from "../../assets/images/warsaw3.png";
import warsawCity from "../../assets/images/polandPicture4.png";
import krakowCity from "../../assets/images/krakow1.png";
import gdanskCity from "../../assets/images/gdansk1.png";
import wroclawCity from "../../assets/images/wroclaw1.png";
import poznanCity from "../../assets/images/poznan1.png";
import lublinCity from "../../assets/images/lublin1.png";
import icon1 from "../../assets/icons/passport-blue.png";
import icon2 from "../../assets/icons/graduation-diploma.png";
import icon3 from "../../assets/icons/completed-task.png";
import icon4 from "../../assets/icons/planning.png";
import icon5 from "../../assets/icons/customer.png";
import icon6 from "../../assets/icons/visa.png";


const requirements = [
  {
    id: "passport",
    title: "Pasaport ve kimlik bilgileri",
    description: "Kimlik ve seyahat belgeleri başvuru için ilk kontrol noktasıdır.",
    icon: icon1,
    className: "document-icon-cover",
  },
  {
    id: "education",
    title: "Diploma, öğrenci belgesi, transkript",
    description: "Akademik geçmişi net ve düzenli biçimde sunan temel evraklar.",
    icon: icon2,
    className: "document-icon-cover",
  },
  {
    id: "application",
    title: "Başvuru formu ve okul evrakları",
    description: "Okulun istediği formlar ve ek belgeler tek dosyada toparlanır.",
    icon: icon3,
    className: "document-icon",   
  },
  {
    id: "language",
    title: "Dil yeterliliği veya hazırlık planı",
    description: "Program diline göre sertifika ya da hazırlık alternatifi belirlenir.",
    icon: icon4,
    className: "document-icon",
  },
  {
    id: "photo",
    title: "Fotoğraf ve resmi ek belgeler",
    description: "Standartlara uygun fotoğraf ve destekleyici dokümanlar hazırlanır.",
    icon: icon5,
    className: "document-icon",
  },
  {
    id: "visa",
    title: "Vize dosyası için ön hazırlık",
    description: "Başvuru sonrası vize aşaması için gerekli dosya omurgası oluşturulur.",
    icon: icon6,
    className: "document-icon-cover",
  },
];

const destinations = [
  {
    id: 1,
    image: warsawCity,
    city: "Warsaw",
    descriptor: "Modern yaşam ile akademik dinamizmi aynı ritimde buluşturur.",
    mood: "Başkent temposu",
    tags: ["Öğrenci dostu", "Canlı şehir hayatı"],
    cta: "Şehri Keşfet",
    slug: "warsaw"
  },
  {
    id: 2,
    image: gdanskCity,
    city: "Gdansk",
    descriptor: "Deniz kıyısı atmosferi ve dingin bir öğrenci temposu sunar.",
    mood: "Deniz kıyısı",
    tags: ["Tarihi doku", "Rahat yaşam"],
    cta: "Yaşamı İncele",
    slug: "gdansk"
  },
  {
    id: 3,
    image: wroclawCity,
    city: "Wroclaw",
    descriptor: "Köprüleri, sosyal yaşamı ve uluslararası havasıyla öne çıkar.",
    mood: "Kültürel şehir",
    tags: ["Sosyal yaşam", "Canlı merkez"],
    cta: "Eğitim Fırsatlarını Gör",
    slug: "wroclaw"
  },
  {
    id: 4,
    image: krakowCity,
    city: "Krakow",
    descriptor: "Tarih, kültür ve öğrenci enerjisini aynı şehirde yaşatır.",
    mood: "Tarihi merkez",
    tags: ["Klasik şehir dokusu", "Akademik prestij"],
    cta: "Şehri Keşfet",
    slug: "krakow"
  },
  {
    id: 5,
    image: poznanCity,
    city: "Poznan",
    descriptor: "Dengeli şehir yapısı ve öğrenci yaşamı ile güçlü bir tercih sunar.",
    mood: "Dengeli atmosfer",
    tags: ["Dengeli tempo", "Genç nüfus"],
    cta: "Şehri Keşfet",
    slug: "poznan"
  },
  {
    id: 6,
    image: lublinCity,
    city: "Lublin",
    descriptor: "Daha sakin ama karakterli, odaklı bir öğrenci deneyimi sunar.",
    mood: "Sakin atmosfer",
    tags: ["Daha ekonomik", "Yerel karakter"],
    cta: "Yaşamı İncele",
    slug: "lublin"
  },
];

const RequirementItem = ({ item }) => (
  <li className="document-requirement-item">
    <span className="document-requirement-icon" aria-hidden="true">
      <img src={item.icon} className={item.className} alt={item.title} />
    </span>
    <div className="document-requirement-copy">
      <h3>{item.title}</h3>
      <p>{item.description}</p>
    </div>
  </li>
);

const CityDestinationCard = ({ destination }) => (
  <article className="document-destination-card">
    <div className="document-destination-media">
      <img src={destination.image} alt={`${destination.city} şehir görünümü`} />
      <span className="document-destination-overlay" aria-hidden="true" />
      {/* <span className="document-destination-badge">{destination.mood}</span> */}
    </div>

    <div className="document-destination-body">
      <div className="document-destination-topline">
        <h3>{destination.city}</h3>
        <span className="document-destination-arrow" aria-hidden="true">
          <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M7 17L17 7M17 7H9.5M17 7V14.5"
              stroke="currentColor"
              strokeWidth="1.7"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </span>
      </div>

      <p className="document-destination-descriptor">{destination.descriptor}</p>

      {/* <div className="document-destination-tags" aria-label={`${destination.city} hissiyat etiketleri`}>
        {destination.tags.slice(0, 1).map((tag) => (
          <span key={tag} className="document-destination-tag">
            {tag}
          </span>
        ))}
      </div> */}

      <div className="document-destination-link" aria-label={destination.cta}>
        <Link className="document-destination-link" href={`/şehirler/${destination.slug}`}>
                <span>{destination.cta}</span>
        </Link>
        {/* <span className="document-destination-link-icon" aria-hidden="true">
          <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M7 12H17M17 12L13 8M17 12L13 16"
              stroke="currentColor"
              strokeWidth="1.7"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </span> */}
      </div>
    </div>
  </article>
);

const DocumentSection = () => {
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

    const firstCard = track.querySelector(".document-destination-card");
    const computed = window.getComputedStyle(track);
    const gap = parseFloat(computed.columnGap || computed.gap || "18") || 18;

    if (!firstCard) {
      return track.clientWidth * 0.85;
    }

    const cardWidth = firstCard.getBoundingClientRect().width;
    const viewportWidth = window.innerWidth;
    const cardsPerStep = viewportWidth < 720 ? 1 : viewportWidth < 1080 ? 2 : 1.15;

    return (cardWidth + gap) * cardsPerStep;
  }, []);

  const handleNavigate = useCallback(
    (direction) => {
      const track = trackRef.current;

      if (!track) {
        return;
      }

      const amount = getScrollAmount();

      track.scrollBy({
        left: direction === "next" ? amount : -amount,
        behavior: "smooth",
      });
    },
    [getScrollAmount]
  );

  useEffect(() => {
    const track = trackRef.current;

    if (!track) {
      return undefined;
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
    <section className="document-section" aria-labelledby="document-section-title">
      <div className="document-section-shell">
        <div className="document-section-surface">
          <div className="document-section-glow document-section-glow-left" aria-hidden="true" />
          <div className="document-section-glow document-section-glow-right" aria-hidden="true" />
          <div className="document-section-pattern" aria-hidden="true" />
          <div className="document-section-orbit document-section-orbit-large" aria-hidden="true" />
          <div className="document-section-orbit document-section-orbit-arc" aria-hidden="true" />
          <div className="document-section-orbit document-section-orbit-ring" aria-hidden="true" />
          <div className="document-section-orbit document-section-orbit-small" aria-hidden="true" />
          <div className="document-section-particles" aria-hidden="true" />
          <div className="document-section-particles document-section-particles-soft" aria-hidden="true" />
          <div className="document-section-rail document-section-rail-top" aria-hidden="true" />
          <div className="document-section-rail document-section-rail-mid" aria-hidden="true" />

          <header className="document-section-header">
            <p className="document-section-eyebrow">Başvuru ve Üniversite Rehberi</p>
            <h2 id="document-section-title" className="document-section-title">
              Başvurunu Planla, Sana Uygun Şehri Keşfet
            </h2>
            <p className="document-section-description">
            
            </p>
          </header>

          <div className="document-section-grid">
            <div className="document-section-left">
              <ul className="document-requirements-list" aria-label="Başvuru hazırlık başlıkları">
                {requirements.map((item) => (
                  <RequirementItem key={item.id} item={item} />
                ))}
              </ul>
            </div>

            <div className="document-section-right">
              <div className="document-section-slider-head">
                <div>
                  <div className="document-section-panel-label is-compact">Şehirleri Keşfet</div>
                  <p className="document-section-slider-kicker">
                    Polonya&apos;daki öne çıkan öğrenci şehirlerini atmosferi ve yaşam hissiyle birlikte incele.
                  </p>
                </div>

                <div className="document-section-controls" aria-label="Şehir kartlarını kaydır">
                  <button
                    type="button"
                    className="document-section-control-btn"
                    onClick={() => handleNavigate("prev")}
                    disabled={!canScrollLeft}
                    aria-label="Şehir kartlarını sola kaydır"
                  >
                    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                      <path
                        d="M15 18L9 12L15 6"
                        stroke="currentColor"
                        strokeWidth="1.7"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </button>
                  <button
                    type="button"
                    className="document-section-control-btn"
                    onClick={() => handleNavigate("next")}
                    disabled={!canScrollRight}
                    aria-label="Şehir kartlarını sağa kaydır"
                  >
                    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                      <path
                        d="M9 18L15 12L9 6"
                        stroke="currentColor"
                        strokeWidth="1.7"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </button>
                </div>
              </div>

              <div className="document-university-track-wrap">
                <div ref={trackRef} className="document-university-track" role="list">
                  {destinations.map((destination) => (
                    <div key={destination.id} className="document-university-track-item" role="listitem">
                      <CityDestinationCard destination={destination} />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default DocumentSection;