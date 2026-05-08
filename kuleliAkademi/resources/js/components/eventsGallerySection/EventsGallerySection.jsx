import React, { useState, useRef, useCallback, useEffect } from "react";
import "./EventsGallerySection.scss";
import video1 from "../../assets/videos/kuleliVideo1.mp4";
import video2 from "../../assets/videos/kuleliVideo2.mp4";
import video3 from "../../assets/videos/kuleliVideo3.mp4";
import video4 from "../../assets/videos/kuleliVideo4.mp4";
import video5 from "../../assets/videos/kuleliVideo5.mp4";
import video6 from "../../assets/videos/kuleliVideo6.mp4";

function VideoCard({ event, onCardClick }) {
    const videoRef = useRef(null);
    const [isPlaying, setIsPlaying] = useState(false);
    const [isMuted, setIsMuted] = useState(true);

    const handlePlayPause = (e) => {
        e.stopPropagation();
        const el = videoRef.current;
        if (!el) return;

        if (el.paused) {
            el.play().then(() => setIsPlaying(true)).catch(() => {});
            return;
        }

        el.pause();
        setIsPlaying(false);
    };

    const handleMuteToggle = (e) => {
        e.stopPropagation();
        const el = videoRef.current;
        if (!el) return;

        el.muted = !el.muted;
        setIsMuted(el.muted);
    };

    const handleCardClick = () => {
        onCardClick(event);
    };

    return (
        <article className="events-gallery-card" onClick={handleCardClick}>
            <div className="events-card-visual" style={{ backgroundColor: event.color }}>
                <video
                    ref={videoRef}
                    className="events-card-video"
                    muted={isMuted}
                    playsInline
                    preload="metadata"
                    loop
                    onPlay={() => setIsPlaying(true)}
                    onPause={() => setIsPlaying(false)}
                >
                    <source src={event.video} type="video/mp4" />
                    Tarayıcınız video etiketini desteklemiyor.
                </video>

                <div className="events-card-expand-icon">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                        <path
                            d="M9 4H4V9M15 4H20V9M4 15V20H9M20 15V20H15"
                            stroke="white"
                            strokeWidth="1.7"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        />
                    </svg>
                </div>

                <div className="events-card-open-chip">Büyük İzle</div>

                <div className="events-card-controls">
                    <button
                        type="button"
                        className="events-card-control-btn"
                        onClick={handlePlayPause}
                        aria-label={isPlaying ? "Durdur" : "Oynat"}
                        title={isPlaying ? "Durdur" : "Oynat"}
                    >
                        {isPlaying ? (
                            <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
                                <rect x="2" y="2" width="4" height="12" rx="0.5" />
                                <rect x="10" y="2" width="4" height="12" rx="0.5" />
                            </svg>
                        ) : (
                            <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
                                <path d="M3 2.5L13 8L3 13.5V2.5Z" />
                            </svg>
                        )}
                    </button>
                    <button
                        type="button"
                        className="events-card-control-btn"
                        onClick={handleMuteToggle}
                        aria-label={isMuted ? "Sesi aç" : "Sesi kapat"}
                        title={isMuted ? "Sesi aç" : "Sesi kapat"}
                    >
                        {isMuted ? (
                            <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
                                <path d="M2.5 5.5V10.5L5.5 7.5H2.5ZM7 3L4 6H2C1.45 6 1 6.45 1 7V9C1 9.55 1.45 10 2 10H4L7 13V3Z" />
                                <path d="M13 8C13 6.5 12.3 5.2 11.2 4.5L10.1 5.6C10.95 6.15 11.5 7.05 11.5 8C11.5 8.95 10.95 9.85 10.1 10.4L11.2 11.5C12.3 10.8 13 9.5 13 8Z" />
                            </svg>
                        ) : (
                            <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
                                <path d="M7 3L4 6H2C1.45 6 1 6.45 1 7V9C1 9.55 1.45 10 2 10H4L7 13V3ZM10.9 5C11.5 5.7 12 6.8 12 8C12 9.2 11.5 10.3 10.9 11L12 12.1C12.8 11.1 13.5 9.7 13.5 8C13.5 6.3 12.8 4.9 12 3.9L10.9 5Z" />
                            </svg>
                        )}
                    </button>
                </div>

                <div className="events-card-play-indicator">
                    <svg width="44" height="44" viewBox="0 0 44 44" fill="none" aria-hidden="true">
                        <circle cx="22" cy="22" r="21" fill="white" fillOpacity="0.88" />
                        <path d="M18 14L31 22L18 30V14Z" fill="#142337" />
                    </svg>
                </div>
            </div>
        </article>
    );
}

function ModalVideoViewer({ event, videoSrc, onClose }) {
    const modalRef = useRef(null);

    useEffect(() => {
        const handleEscape = (e) => {
            if (e.key === "Escape") {
                onClose();
            }
        };

        window.addEventListener("keydown", handleEscape);
        document.body.style.overflow = "hidden";

        return () => {
            window.removeEventListener("keydown", handleEscape);
            document.body.style.overflow = "unset";
        };
    }, [onClose]);

    const handleBackdropClick = (e) => {
        if (e.target === modalRef.current) {
            onClose();
        }
    };

    return (
        <div
            className="events-modal-backdrop"
            ref={modalRef}
            onClick={handleBackdropClick}
            aria-hidden="false"
        >
            <div className="events-modal-content" role="dialog" aria-modal="true" aria-label={event.title}>
                <button
                    type="button"
                    className="events-modal-close"
                    onClick={onClose}
                    aria-label="Kapat"
                >
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                        <path
                            d="M18 6L6 18M6 6L18 18"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        />
                    </svg>
                </button>

                <div className="events-modal-video-container">
                    <video
                        className="events-modal-video"
                        controls
                        autoPlay
                        playsInline
                        preload="metadata"
                    >
                        <source src={videoSrc} type="video/mp4" />
                        Tarayıcınız video etiketini desteklemiyor.
                    </video>
                </div>

                <div className="events-modal-info">
                    <h3 className="events-modal-title">{event.title}</h3>
                </div>
            </div>
        </div>
    );
}

export default function EventsGallerySection() {
    const sliderRef = useRef(null);
    const [scrollPosition, setScrollPosition] = useState(0);
    const [canScrollLeft, setCanScrollLeft] = useState(false);
    const [canScrollRight, setCanScrollRight] = useState(true);
    const [selectedEvent, setSelectedEvent] = useState(null);

    const events = [
        {
            id: 1,
            title: "Motivasyon Buluşması",
            color: "#e8f4f8",
            video: video1
        },
        {
            id: 2,
            title: "Akademik Takip Atölyesi",
            color: "#f0e8f8",
            video: video2
        },
        {
            id: 3,
            title: "Yaz Okulu Etkinliği",
            color: "#f8f0e8",
            video: video3
        },
        {
            id: 4,
            title: "Rehberlik Semineri",
            color: "#e8f8f0",
            video: video4
        },
        {
            id: 5,
            title: "Öğrenci Çalışma Kampı",
            color: "#f8e8e8",
            video: video5
        },
        {
            id: 6,
            title: "Veli Bilgilendirme Günü",
            color: "#f0f8e8",
            video: video6
        },
        {
            id: 7,
            title: "Etüt ve Odak Atölyesi",
            color: "#e8e8f8",
            video: video1
        },
        {
            id: 8,
            title: "Sosyal Gelişim Etkinliği",
            color: "#f8f4e8",
            video: video2
        }
    ];

    const checkScroll = useCallback(() => {
        if (!sliderRef.current) return;

        const { scrollLeft, scrollWidth, clientWidth } = sliderRef.current;
        setScrollPosition(scrollLeft);
        setCanScrollLeft(scrollLeft > 0);
        setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 10);
    }, []);

    useEffect(() => {
        checkScroll();
        window.addEventListener("resize", checkScroll);
        return () => window.removeEventListener("resize", checkScroll);
    }, [checkScroll]);

    const scroll = (direction) => {
        if (!sliderRef.current) return;

        const viewportStep = sliderRef.current.clientWidth * 0.72;
        const newPosition = direction === "left"
            ? scrollPosition - viewportStep
            : scrollPosition + viewportStep;

        sliderRef.current.scrollTo({
            left: newPosition,
            behavior: "smooth"
        });

        setTimeout(checkScroll, 300);
    };

    const handleScroll = () => {
        checkScroll();
    };

    const handleCardClick = (event) => {
        setSelectedEvent(event);
    };

    const closeModal = () => {
        setSelectedEvent(null);
    };

    return (
        <>
            <section className="events-gallery-section">
                <div className="events-gallery-shell">
                    <div className="events-gallery-header">
                        <div className="events-gallery-header-content">
                            <p className="events-gallery-eyebrow">ETKİNLİKLERİMİZ</p>
                            <h2 className="events-gallery-title">
                                Etkinliklerimizden Görüntüler
                            </h2>
                            <p className="events-gallery-description">
                                Akademik sürecin yanında öğrencilerimizin gelişimini destekleyen etkinliklerden kısa görüntüler.
                            </p>
                        </div>

                        <div className="events-gallery-nav">
                            <button
                                type="button"
                                className={`events-nav-btn events-nav-prev ${!canScrollLeft ? "disabled" : ""}`}
                                onClick={() => scroll("left")}
                                aria-label="Önceki etkinlikler"
                                disabled={!canScrollLeft}
                            >
                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                                    <path d="M14.5 6L9.5 12L14.5 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                </svg>
                            </button>
                            <button
                                type="button"
                                className={`events-nav-btn events-nav-next ${!canScrollRight ? "disabled" : ""}`}
                                onClick={() => scroll("right")}
                                aria-label="Sonraki etkinlikler"
                                disabled={!canScrollRight}
                            >
                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                                    <path d="M9.5 6L14.5 12L9.5 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                </svg>
                            </button>
                        </div>
                    </div>

                    <div className="events-gallery-slider-wrapper">
                        <div
                            className="events-gallery-slider"
                            ref={sliderRef}
                            onScroll={handleScroll}
                        >
                            {events.map((event) => (
                                <VideoCard
                                    key={event.id}
                                    event={event}
                                    onCardClick={handleCardClick}
                                />
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {selectedEvent && (
                    <ModalVideoViewer
                        event={selectedEvent}
                        videoSrc={selectedEvent.video}
                        onClose={closeModal}
                    />
                )}
        </>
    );
}
