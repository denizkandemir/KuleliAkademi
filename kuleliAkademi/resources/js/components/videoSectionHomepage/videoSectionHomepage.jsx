import "./videoSectionHomepage.scss";
import video1 from "../../assets/videos/kuleliVideo1.mp4";
import video2 from "../../assets/videos/kuleliVideo5.mp4";
import icon1 from "../../assets/icons/training.png";
import icon2 from "../../assets/icons/graduation2.png";
import React, { useEffect, useRef, useState } from "react";

const VideoSectionHomepage = () => {
    const [activeVideo, setActiveVideo] = useState(null);
    const [mutedStates, setMutedStates] = useState({});
    const [playingStates, setPlayingStates] = useState({});
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
        // Pause all other videos
        refs.forEach((ref, refIndex) => {
            if (ref.current && refIndex !== index) {
                ref.current.pause();
                setPlayingStates(prev => ({ ...prev, [refIndex]: false }));
            }
        });

        // Set active video and play
        setActiveVideo(index);
        setPlayingStates(prev => ({ ...prev, [index]: true }));
    };

    const togglePause = (index, e) => {
        e.stopPropagation();
        const video = refs[index].current;
        if (!video) return;

        if (video.paused) {
            // Pause all other videos first
            refs.forEach((ref, refIndex) => {
                if (ref.current && refIndex !== index) {
                    ref.current.pause();
                    setPlayingStates(prev => ({ ...prev, [refIndex]: false }));
                }
            });
            video.play();
            setActiveVideo(index);
            setPlayingStates(prev => ({ ...prev, [index]: true }));
        } else {
            video.pause();
            setPlayingStates(prev => ({ ...prev, [index]: false }));
        }
    };

    const toggleMute = (index, e) => {
        e.stopPropagation();
        const video = refs[index].current;
        if (!video) return;

        video.muted = !video.muted;
        setMutedStates(prev => ({ ...prev, [index]: video.muted }));
    };

    const handleVideoPlay = (index) => {
        // Pause all other videos
        refs.forEach((ref, refIndex) => {
            if (ref.current && refIndex !== index) {
                ref.current.pause();
                setPlayingStates(prev => ({ ...prev, [refIndex]: false }));
            }
        });

        setActiveVideo(index);
        setPlayingStates(prev => ({ ...prev, [index]: true }));
    };

    const handleVideoPause = (index) => {
        setPlayingStates(prev => ({ ...prev, [index]: false }));
    };

    useEffect(() => {
        if (activeVideo === null) {
            refs.forEach((ref) => {
                if (ref.current) {
                    ref.current.pause();
                }
            });
        } else {
            refs.forEach((ref, index) => {
                if (ref.current && index === activeVideo) {
                    const playPromise = ref.current.play();
                    if (playPromise && typeof playPromise.catch === "function") {
                        playPromise.catch(() => { });
                    }
                }
            });
        }
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
                            const isPlaying = playingStates[index] || false;
                            const isMuted = mutedStates[index] !== undefined ? mutedStates[index] : true; // Default muted

                            return (
                                <figure key={item.id} className={`video-card ${item.cardClass} ${isActive ? "is-active" : "is-inactive"}`.trim()}>
                                    <video
                                        ref={refs[index]}
                                        loop
                                        playsInline
                                        preload="metadata"
                                        muted={isMuted}
                                        className="video-card-media"
                                        onPlay={() => handleVideoPlay(index)}
                                        onPause={() => handleVideoPause(index)}
                                    >
                                        <source src={item.src} type="video/mp4" />
                                    </video>

                                    <span className="video-home-support-chip" aria-hidden="true">
                                        <span className="video-home-support-icon" />
                                        {item.supportLabel}
                                    </span>

                                    {/* Center play button when video is inactive */}
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

                                    {/* Control buttons - visible when video is playing */}
                                    {isActive && (
                                        <div className="video-card-controls">
                                            <button
                                                type="button"
                                                className={`video-control-button ${isPlaying ? "is-playing" : ""}`}
                                                onClick={(e) => togglePause(index, e)}
                                                aria-label={isPlaying ? "Videoyu duraklat" : "Videoyu oynat"}
                                                aria-pressed={isPlaying}
                                            >
                                                {isPlaying ? (
                                                    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                                                        <path d="M6 4h4v16H6V4zm8 0h4v16h-4V4z" />
                                                    </svg>
                                                ) : (
                                                    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                                                        <path d="M8 5v14l11-7z" />
                                                    </svg>
                                                )}
                                            </button>

                                            <button
                                                type="button"
                                                className={`video-control-button ${isMuted ? "is-muted" : ""}`}
                                                onClick={(e) => toggleMute(index, e)}
                                                aria-label={isMuted ? "Sesi aç" : "Sesi kapat"}
                                                aria-pressed={isMuted}
                                            >
                                                {isMuted ? (
                                                    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                                                        <path d="M16.6915026,16.4744748 L14.5908163,14.3773735 C15.1183579,13.5944663 15.5,12.6563168 15.5,11.6428571 C15.5,9.10187869 13.4788797,7 11.4285714,7 C10.4466938,7 9.54563167,7.33126984 8.83119239,7.83722393 L6.68840231,5.70207556 C7.70615135,4.70187077 9.06903485,4 10.5,4 C13.5898514,4 16,6.4101486 16,9.5 C16,11.3054855 15.2127039,12.9274044 13.9949071,13.9995655 L16.6915026,16.4744748 Z M19.4644661,19.1272231 L3.50779099,3.40279571 C3.19218622,3.10115034 2.71111254,3.10115034 2.40272727,3.40279571 C2.09712252,3.70444108 2.09712252,4.17928105 2.40272727,4.48092642 L5.40298155,7.44769931 C4.45064497,8.51779139 3.5,10.0152284 3.5,11.6428571 C3.5,14.1938657 5.52112136,16 7.57142857,16 C8.53932235,16 9.45200705,15.6787622 10.1660979,15.1727952 L13.1585981,18.1272231 C13.4641989,18.4288684 13.9452715,18.4288684 14.2508724,18.1272231 C14.5564732,17.8255778 14.5564732,17.3507378 14.2508724,17.0490925 L19.4644661,11.9997101 L19.4644661,19.1272231 Z M11.4285714,14 C12.804602,14 14,12.8915034 14,11.5 C14,11.245643 13.9780305,10.9970037 13.9361628,10.7526951 L12.3007721,12.3670857 C12.1906503,12.4768806 12.0466246,12.5379005 11.893399,12.5379005 C11.7068744,12.5379005 11.5560848,12.4515625 11.4344144,12.3298908 C11.1927038,12.0905739 11.1927038,11.7101661 11.4344144,11.4708492 L13.0787224,9.84126842 C13.0258634,9.71523995 13,9.581718 13,9.4417339 C13,8.56060335 12.3062477,7.85714286 11.4285714,7.85714286 C10.550895,7.85714286 9.85714286,8.56060335 9.85714286,9.4417339 C9.85714286,10.3229644 10.550895,11.0264249 11.4285714,11.0264249 C11.5738657,11.0264249 11.7159021,11.0091008 11.8543803,10.9762139 L11.8543803,10.9762139 L14.1147541,13.2158446 C14.0152905,13.5779215 13.8565503,13.9137856 13.6460263,14.2152045 L11.6134077,12.2044106 C11.4344144,12.0254115 11.1927038,12.0254115 11.0137106,12.2044106 C10.834718,12.3834096 10.834718,12.6230127 11.0137106,12.8020118 L13.046236,14.8253095 C12.5219233,14.9368085 11.9865026,14.8253095 11.4285714,14 Z" />
                                                    </svg>
                                                ) : (
                                                    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                                                        <path d="M7 9v6h4l5 5V4l-5 5H7z" />
                                                    </svg>
                                                )}
                                            </button>
                                        </div>
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

