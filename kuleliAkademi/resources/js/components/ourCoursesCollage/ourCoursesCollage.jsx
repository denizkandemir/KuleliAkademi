import React, { useRef, useEffect, useState, useCallback } from "react";
import "./ourCoursesCollage.scss";
const courseVideo = "/storage/videos/kuleliVideo6.mp4";
const courseVideo2 = "/storage/videos/kuleliVideo5.mp4";
const ourCoursesImg1 = "/storage/images/ourCoursesImg1.webp";
import { Link, usePage } from "@inertiajs/react";

export default function OurCoursesCollage() {
    const highlights = [
        {
            id: 1,
            icon: "✓",
            title: "Akademik Eğitim Programı",
            description: "Öğrencinin seviyesine göre yapılandırılmış konu hazırlığı"
        },
        {
            id: 2,
            icon: "✓",
            title: "Bireysel Koçluk Desteği",
            description: "Hedef belirleme, zaman yönetimi ve performans takibi"
        },
        {
            id: 3,
            icon: "✓",
            title: "Haftalık Çalışma Planı",
            description: "Her öğrenciye özel program ve düzenli ilerleme kontrolü"
        },
        {
            id: 4,
            icon: "✓",
            title: "Deneme Analizi ve Rehberlik",
            description: "Veriye dayalı gelişim değerlendirmesi ve danışmanlık hizmetleri"
        }
    ];

    // Video refs and state for interactive controls
    const sectionRef = useRef(null);
    const leftRef = useRef(null);
    const rightRef = useRef(null);
    const [activeVideo, setActiveVideo] = useState(null); // 'left' | 'right' | null
    const [muted, setMuted] = useState({ left: true, right: true });
    const [userPaused, setUserPaused] = useState({ left: false, right: false });

    // Play helper that enforces single active video rule
    const playSide = useCallback(async (side) => {
        const left = leftRef.current;
        const right = rightRef.current;
        try {
            if (side === "left") {
                if (right && !right.paused) {
                    right.pause();
                }
                if (left) {
                    await left.play();
                    setActiveVideo("left");
                    setUserPaused((s) => ({ ...s, left: false }));
                }
            } else if (side === "right") {
                if (left && !left.paused) {
                    left.pause();
                }
                if (right) {
                    await right.play();
                    setActiveVideo("right");
                    setUserPaused((s) => ({ ...s, right: false }));
                }
            }
        } catch (e) {
            // play might be blocked
        }
    }, []);

    const pauseSide = useCallback((side, isUser = true) => {
        const left = leftRef.current;
        const right = rightRef.current;
        if (side === "left" && left) {
            left.pause();
            if (isUser) setUserPaused((s) => ({ ...s, left: true }));
            setActiveVideo((curr) => (curr === "left" ? null : curr));
        }
        if (side === "right" && right) {
            right.pause();
            if (isUser) setUserPaused((s) => ({ ...s, right: true }));
            setActiveVideo((curr) => (curr === "right" ? null : curr));
        }
    }, []);

    // Toggle mute
    const toggleMute = (side) => {
        const left = leftRef.current;
        const right = rightRef.current;
        setMuted((m) => {
            const next = { ...m, [side]: !m[side] };
            if (side === "left" && left) left.muted = next.left;
            if (side === "right" && right) right.muted = next.right;
            return next;
        });
    };

    // IntersectionObserver: autoplay left when section is visible
    useEffect(() => {
        const el = sectionRef.current;
        if (!el) return;
        let hasAutoStartedLeft = false;
        const io = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting && entry.intersectionRatio > 0.4) {
                        // auto play left only if not paused by user
                        if (!hasAutoStartedLeft && !userPaused.left) {
                            playSide("left");
                            hasAutoStartedLeft = true;
                        }
                    } else if (!entry.isIntersecting || entry.intersectionRatio < 0.15) {
                        // when section leaves, pause playing videos (don't auto-start others)
                        const l = leftRef.current;
                        const r = rightRef.current;
                        if (l && !l.paused) { l.pause(); }
                        if (r && !r.paused) { r.pause(); }
                        setActiveVideo(null);
                    }
                });
            },
            { threshold: [0, 0.15, 0.4, 0.75] }
        );
        io.observe(el);
        return () => io.disconnect();
    }, [playSide, userPaused.left]);

    // Keep muted state in sync with elements on mount
    useEffect(() => {
        if (leftRef.current) leftRef.current.muted = true;
        if (rightRef.current) rightRef.current.muted = true;
    }, []);

    // Handlers for control clicks
    const handlePlayPause = (side) => {
        const left = leftRef.current;
        const right = rightRef.current;
        if (side === "left") {
            if (left && !left.paused) {
                pauseSide("left", true);
            } else {
                playSide("left");
            }
        } else {
            if (right && !right.paused) {
                pauseSide("right", true);
            } else {
                playSide("right");
            }
        }
    };

    // keyboard accessibility: Space toggles play on focused control
    const handleKey = (e, side) => {
        if (e.key === " " || e.key === "Enter") {
            e.preventDefault();
            handlePlayPause(side);
        }
    };

    return (
        <section className="our-courses-collage">
            <div className="our-courses-collage-shell" ref={sectionRef}>
                <div className="our-courses-collage-container">
                    {/* Left Content Section - Compact */}
                    <div className="our-courses-collage-content">
                        <p className="our-courses-collage-eyebrow">EĞİTİM YAKLAŞIMIMIZ</p>

                        <h2 className="our-courses-collage-title">
                            Öğrencinin Gelişimini Planlı ve Bütüncül bir Sistemle Yönetiyoruz
                        </h2>

                        <p className="our-courses-collage-description">
                            Kuleli Akademi'de eğitim, sadece ders anlatımı değildir. Öğrencinin akademik gereksinimleri belirlenir, konu eksiklikleri sistematik biçimde giderilir, ilerleme takip edilir ve sonuçlar analiz edilir.
                        </p>

                        <p className="our-courses-collage-description-secondary">
                            Bireysel koçluk, gelişim raporlaması, deneme sınavı analizleri ve rehberlik hizmetleri ile akademik başarı, öğrenme alışkanlıkları ve motivasyon desteklenir.
                        </p>

                        {/* Highlights Section */}
                        <div className="our-courses-collage-highlights">
                            {highlights.map((highlight) => (
                                <div key={highlight.id} className="highlight-item">
                                    <div className="highlight-icon">{highlight.icon}</div>
                                    <div className="highlight-content">
                                        <h4 className="highlight-title">{highlight.title}</h4>
                                        <p className="highlight-description">{highlight.description}</p>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* CTA Button */}
                        <Link href="/iletişim" className="our-courses-collage-cta">
                            İletişime Geçin
                            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                                <path d="M3 8H13M10 5L13 8L10 11" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                        </Link>
                    </div>

                    {/* Right Visual Section - Editorial Collage */}
                    <div className="our-courses-collage-visual">
                        <div className="visual-wrapper">
                            {/* Decorative Background Elements */}
                            <div className="visual-orbit-decoration"></div>
                            <div className="visual-glow-accent"></div>

                            {/* Editorial Collage Composition */}
                            <div className="collage-grid">
                                {/* Main Large Image - Left/Center */}
                                <div className="collage-item collage-main-image">
                                    <div className="image-placeholder image-main">
                                        <video ref={leftRef} loop playsInline muted={muted.left} className="collage-video">
                                            <source src={courseVideo} type="video/mp4" />
                                            Tarayıcınız video etiketini desteklemiyor.
                                        </video>
                                        <div className="video-controls" data-side="left">
                                            <button
                                                className={`vc-btn vc-play ${activeVideo === 'left' ? 'active' : ''}`}
                                                aria-label="Play/Pause left video"
                                                onClick={() => handlePlayPause('left')}
                                                onKeyDown={(e) => handleKey(e, 'left')}
                                            >
                                                {activeVideo === 'left' ? '❚❚' : '▶'}
                                            </button>
                                            <button
                                                className="vc-btn vc-mute"
                                                aria-label="Mute/Unmute left video"
                                                onClick={() => toggleMute('left')}
                                            >
                                                {muted.left ? '🔇' : '🔊'}
                                            </button>
                                        </div>
                                    </div>
                                </div>

                                {/* Top Right - Info Card Badge */}
                                <div className="collage-item collage-info-card">
                                    <div className="info-card-content">
                                        <div className="info-card-icon">
                                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                                                <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="1.5" />
                                                <path d="M12 8V12M12 16H12.01" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                                            </svg>
                                        </div>
                                        <h4 className="info-card-title">Planlı Akademik Takip</h4>
                                    </div>
                                </div>

                                {/* Secondary Large Image - Right/Bottom */}
                                <div className="collage-item collage-secondary-image">
                                    <div className="image-placeholder image-secondary">
                                        <video ref={rightRef} loop playsInline muted={muted.right} className="collage-video">
                                            <source src={courseVideo2} type="video/mp4" />
                                            Tarayıcınız video etiketini desteklemiyor.
                                        </video>
                                        <div className="video-controls" data-side="right">
                                            <button
                                                className={`vc-btn vc-play ${activeVideo === 'right' ? 'active' : ''}`}
                                                aria-label="Play/Pause right video"
                                                onClick={() => handlePlayPause('right')}
                                                onKeyDown={(e) => handleKey(e, 'right')}
                                            >
                                                {activeVideo === 'right' ? '❚❚' : '▶'}
                                            </button>
                                            <button
                                                className="vc-btn vc-mute"
                                                aria-label="Mute/Unmute right video"
                                                onClick={() => toggleMute('right')}
                                            >
                                                {muted.right ? '🔇' : '🔊'}
                                            </button>
                                        </div>
                                    </div>
                                </div>

                                {/* Bottom Left - Experience Stat */}
                                <div className="collage-item collage-experience-stat">
                                    {/* Curved Connector Line */}

                                    <div className="experience-stat-content">
                                        <div className="experience-stat-number">10+</div>
                                        <div className="experience-stat-label">Yıllık Eğitim Deneyimi</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
