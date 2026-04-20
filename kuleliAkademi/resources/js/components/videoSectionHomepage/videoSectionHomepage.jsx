import "./videoSectionHomepage.scss";
import video1 from "../../assets/videos/kuleliVideo1.mp4";
import video2 from "../../assets/videos/kuleliVideo2.mp4";
import icon1 from "../../assets/icons/training.png";
import icon2 from "../../assets/icons/graduation2.png";
import React, { useEffect, useRef, useState } from "react";

const VideoSectionHomepage = () => {
    const [activeVideo, setActiveVideo] = useState(0);
    const videoRef1 = useRef(null);
    const videoRef2 = useRef(null);
    const refs = [videoRef1, videoRef2];

    const videos = [
        {
            id: 0,
            src: video2,
            label: "YÜz Yüze Ders Ortamı",
            cardClass: "video-card-primary",
            supportLabel: "Yakın Takip",

        },
        {
            id: 1,
            src: video1,
            label: "LGS Hazırlık Rutini",
            cardClass: "video-card-secondary",
            supportLabel: "LGS Odağı",
        },
    ];

    const activateVideo = (index) => {
        if (activeVideo === index) {
            return;
        }

        refs.forEach((ref, refIndex) => {
            if (ref.current && refIndex !== index) {
                ref.current.pause();
            }
        });

        setActiveVideo(index);
    };

    useEffect(() => {
        refs.forEach((ref, index) => {
            const element = ref.current;

            if (!element) {
                return;
            }

            if (index === activeVideo) {
                const playPromise = element.play();

                if (playPromise && typeof playPromise.catch === "function") {
                    playPromise.catch(() => { });
                }
            } else {
                element.pause();
            }
        });
    }, [activeVideo]);

    return (
        <section className="video-home-section" aria-labelledby="video-home-title">
            <div className="video-home-shell">
                <div className="video-home-grid">
                    <article className="video-home-content">
                        <p className="video-home-eyebrow">Ortaokul ve LGS Destegi</p>
                        <h2 id="video-home-title" className="video-home-title">
                            Akademik Gelişimde Öncü Yaklaşım
                        </h2>
                        <p className="video-home-description">
                            Ortaokul oğrencilerimiz icin akademik gelişimi yakından takip eden, sürekli geri bildirim ve
                            öğrenciyeye özel çalışma planıyla ilerleyen disiplinli bir destek modeli sunuyoruz.
                        </p>

                        <div className="video-home-feature-grid" aria-label="Program odak alanlari">
                            <article className="video-home-feature-card">
                                <img src={icon1} alt="" className="video-home-feature-icon" aria-hidden="true" />
                                <div>
                                    <p className="video-home-feature-label">Yüz Yüze Eğitim</p>
                                    <p className="video-home-feature-text">Kişisel rehberlik ve sınıf içi etkin takip</p>
                                </div>
                            </article>

                            <article className="video-home-feature-card">
                                <img src={icon2} alt="" className="video-home-feature-icon" aria-hidden="true" />
                                <div>
                                    <p className="video-home-feature-label">Birebir Takip</p>
                                    <p className="video-home-feature-text">Haftalik durum analizi ve veli bilgilendirme</p>
                                </div>
                            </article>
                        </div>

                        <div className="video-home-progress-list" aria-label="Guven gostergeleri">
                            <div className="video-home-progress-item">
                                <div className="video-home-progress-head">
                                    <span>Öğrenci ve Veli Memnuniyeti</span>
                                    <span>95%</span>
                                </div>
                                <span className="video-home-progress-track">
                                    <span className="video-home-progress-fill" style={{ width: "95%" }} />
                                </span>
                            </div>

                            <div className="video-home-progress-item">
                                <div className="video-home-progress-head">

                                    <span>Sınav Başarısında Artış</span>
                                    <span>90%</span>
                                </div>
                                <span className="video-home-progress-track">
                                    <span className="video-home-progress-fill" style={{ width: "90%" }} />
                                </span>
                            </div>
                        </div>

                        <div className="video-home-actions">
                            <p className="video-home-note">Yüz yüze takip, düzenli bilgilendirme ve güven veren sistemli ilerleme.</p>

                            <button type="button" className="video-home-cta">
                                Programi Kesfet
                            </button>
                        </div>
                    </article>

                    <div className="video-home-visual" aria-label="Yüz yüze egitim videolari">
                        <div className="media-abstract-layer" aria-hidden="true">
                            {/* <span className="abstract-orb abstract-orb-left" />
                            <span className="abstract-orb abstract-orb-left2" /> */}

                            <span className="abstract-orb abstract-orb-right" />
                            {/* <span className="abstract-orb abstract-orb-bottom" />
                            <span className="abstract-orb abstract-orb-bottom-mini" /> */}
                            <span className="abstract-route-path" />

                            {/* <span className="abstract-particle particle-1" />
                            <span className="abstract-particle particle-2" />
                            <span className="abstract-particle particle-3" />
                            <span className="abstract-particle particle-4" /> */}
                            <span className="abstract-particle particle-5" />
                            <span className="abstract-particle particle-6" />
                            <span className="abstract-particle particle-7" />
                            <span className="abstract-particle particle-8" />
                            <span className="abstract-particle particle-9" />
                            <span className="abstract-particle particle-10" />
                            <span className="abstract-particle particle-11" />
                            <span className="abstract-particle particle-12" />
                            <span className="abstract-particle particle-13" />
                            {/* <span className="abstract-particle particle-14" /> */}
                            {/* <span className="abstract-particle particle-15" /> */}
                        </div>

                        {videos.map((item, index) => {
                            const isActive = activeVideo === index;

                            return (
                                <figure key={item.id} className={`video-card ${item.cardClass} ${isActive ? "is-active" : "is-inactive"}`.trim()}>
                                    <video
                                        ref={refs[index]}
                                        loop
                                        playsInline
                                        preload="metadata"
                                        className="video-card-media"
                                        onPlay={() => activateVideo(index)}
                                    >
                                        <source src={item.src} type="video/mp4" />
                                    </video>

                                    <span className="video-home-support-chip" aria-hidden="true">
                                        <span className="video-home-support-icon" />
                                        {item.supportLabel}
                                    </span>

                                    {!isActive && (
                                        <button
                                            type="button"
                                            className="video-card-overlay"
                                            onClick={() => activateVideo(index)}
                                            aria-label={`${item.label} videosunu oynat`}
                                        >
                                            <span className="video-card-overlay-icon" aria-hidden="true" />
                                        </button>
                                    )}

                                    <figcaption className="video-card-caption">{item.label}</figcaption>
                                </figure>
                            );
                        })}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default VideoSectionHomepage;

