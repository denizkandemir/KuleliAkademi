import React, { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { Link } from "@inertiajs/react";
import "./ServicesHomepage.scss";

const ServicesHomepage = ({ services = [] }) => {
  const sliderRef = useRef(null);
  const trackRef = useRef(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [maxStartIndex, setMaxStartIndex] = useState(Math.max(services.length - 1, 0));

  const totalSlides = services.length;

  const measureTrack = useCallback(() => {
    const slider = sliderRef.current;
    const track = trackRef.current;
    if (!slider || !track) {
      return;
    }

    const firstCard = track.querySelector(".services-homepage-card");
    if (!firstCard) {
      return;
    }

    const styles = window.getComputedStyle(track);
    const gap = parseFloat(styles.columnGap || styles.gap || "0") || 0;
    const cardWidth = firstCard.getBoundingClientRect().width;
    const cardSpan = cardWidth + gap;

    if (!cardSpan) {
      return;
    }

    const visibleCards = Math.max(1, Math.floor((slider.clientWidth + gap) / cardSpan));
    const nextMaxStart = Math.max(totalSlides - visibleCards, 0);

    setMaxStartIndex(nextMaxStart);
    setActiveIndex((current) => Math.min(current, nextMaxStart));
  }, [totalSlides]);

  const scrollToIndex = useCallback(
    (index) => {
      const slider = sliderRef.current;
      const track = trackRef.current;
      if (!slider || !track) {
        return;
      }

      const firstCard = track.querySelector(".services-homepage-card");
      if (!firstCard) {
        return;
      }

      const styles = window.getComputedStyle(track);
      const gap = parseFloat(styles.columnGap || styles.gap || "0") || 0;
      const cardWidth = firstCard.getBoundingClientRect().width;
      const cardSpan = cardWidth + gap;
      const boundedIndex = Math.max(0, Math.min(index, maxStartIndex));

      slider.scrollTo({
        left: cardSpan * boundedIndex,
        behavior: "smooth",
      });

      setActiveIndex(boundedIndex);
    },
    [maxStartIndex]
  );

  useEffect(() => {
    measureTrack();

    const slider = sliderRef.current;
    if (!slider) {
      return undefined;
    }

    let frameId;
    const onScroll = () => {
      cancelAnimationFrame(frameId);

      frameId = requestAnimationFrame(() => {
        const track = trackRef.current;
        if (!track) {
          return;
        }

        const firstCard = track.querySelector(".services-homepage-card");
        if (!firstCard) {
          return;
        }

        const styles = window.getComputedStyle(track);
        const gap = parseFloat(styles.columnGap || styles.gap || "0") || 0;
        const cardSpan = firstCard.getBoundingClientRect().width + gap;
        const rawIndex = cardSpan ? Math.round(slider.scrollLeft / cardSpan) : 0;
        const boundedIndex = Math.max(0, Math.min(rawIndex, maxStartIndex));

        setActiveIndex(boundedIndex);
      });
    };

    const onResize = () => {
      measureTrack();
    };

    slider.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onResize);

    return () => {
      cancelAnimationFrame(frameId);
      slider.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onResize);
    };
  }, [maxStartIndex, measureTrack]);

  const canGoPrev = activeIndex > 0;
  const canGoNext = activeIndex < maxStartIndex;

  const progressRatio = useMemo(() => {
    if (!maxStartIndex) {
      return 1;
    }

    return activeIndex / maxStartIndex;
  }, [activeIndex, maxStartIndex]);

  if (services.length === 0) {
    return null;
  }

  return (
    <section className="services-homepage-section" aria-labelledby="services-homepage-title">
      <div className="services-homepage-shell">
        <header className="services-homepage-header">
          <div className="services-homepage-heading-block">
            <p className="services-homepage-eyebrow">Hizmetlerimiz</p>
            <h2 id="services-homepage-title" className="services-homepage-title">
              Başvurudan Yerleşime Kadar Tüm Süreçte Yanındayız
            </h2>
          </div>

          <p className="services-homepage-description">
            Üniversite başvurusu, vize ve yerleşim adımlarını tek bir stratejik planla yöneterek
            süreci daha güvenli, daha takip edilebilir ve öğrenci odaklı hale getiriyoruz.
          </p>
        </header>

        <div className="services-homepage-slider" ref={sliderRef}>
          <div className="services-homepage-slider-track" ref={trackRef}>
            {services.map((service, index) => (
              <Link key={service.slug} href={service.href} className="services-homepage-card">
                <div className="services-homepage-card-content">
                  <p className="services-homepage-card-number" aria-label={`Hizmet sırası ${String(index + 1).padStart(2, "0")}`}>
                    <span>{String(index + 1).padStart(2, "0")}</span>
                    <small>/{String(totalSlides).padStart(2, "0")}</small>
                  </p>
                  <div className="services-title-text-container">
                    <h3 className="services-homepage-card-title">{service.title}</h3>
                    <p className="services-homepage-card-description">{service.description}</p>
                    <span className="services-homepage-card-cta">{service.buttonText}</span>
                  </div>
                
                </div>

                <div className="services-homepage-card-media">
                  <img
                    src={service.image}
                    alt={service.title}
                    className="services-homepage-card-image"
                    style={{ objectPosition: service.objectPosition || 'center' }}
                  />
                  <span className="services-homepage-card-image-overlay" aria-hidden="true" />
                </div>
              </Link>
            ))}
          </div>
        </div>

        <div className="services-homepage-controls" aria-label="Hizmet kaydırma kontrolleri">
          <button
            type="button"
            className="services-homepage-control-button"
            onClick={() => scrollToIndex(activeIndex - 1)}
            disabled={!canGoPrev}
            aria-label="Önceki hizmet"
          >
            <span aria-hidden="true">&#8592;</span>
          </button>

          <div className="services-homepage-progress" aria-hidden="true">
            <span className="services-homepage-progress-track">
              <span
                className="services-homepage-progress-fill"
                style={{ transform: `scaleX(${Math.max(progressRatio, 0.09)})` }}
              />
            </span>
            {/* <span className="services-homepage-progress-label">
              {String(activeIndex + 1).padStart(2, "0")}
            </span> */}
          </div>

          <button
            type="button"
            className="services-homepage-control-button"
            onClick={() => scrollToIndex(activeIndex + 1)}
            disabled={!canGoNext}
            aria-label="Sonraki hizmet"
          >
            <span aria-hidden="true">&#8594;</span>
          </button>
        </div>
      </div>
    </section>
  );
};

export default ServicesHomepage; 