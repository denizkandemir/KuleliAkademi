import React from "react";
import { motion } from "framer-motion";
import { Swiper, SwiperSlide } from "swiper/react";
import {
    Pagination,
    Autoplay,
    EffectCreative
} from "swiper/modules";
import { useState, useEffect } from "react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/effect-creative";
import "./Slide.scss";

const EASE_OUT_EXPO = [0.22, 1, 0.36, 1];

const fadeUp = (delay = 0, duration = 0.62, distance = 18) => ({
    hidden: {
        opacity: 0,
        y: distance,
    },
    visible: {
        opacity: 1,
        y: 0,
        transition: {
            duration,
            delay,
            ease: EASE_OUT_EXPO,
        },
    },
});

const featureRowVariants = {
    hidden: {
        opacity: 0,
        y: 16,
    },
    visible: {
        opacity: 1,
        y: 0,
        transition: {
            delay: 0.5,
            duration: 0.54,
            ease: EASE_OUT_EXPO,
            when: "beforeChildren",
            staggerChildren: 0.08,
        },
    },
};

const featureItemVariants = {
    hidden: {
        opacity: 0,
        y: 10,
    },
    visible: {
        opacity: 1,
        y: 0,
        transition: {
            duration: 0.44,
            ease: EASE_OUT_EXPO,
        },
    },
};

const floatingLayerVariants = {
    hidden: {
        opacity: 0,
    },
    visible: {
        opacity: 1,
        transition: {
            delay: 0.96,
            duration: 0.42,
            ease: EASE_OUT_EXPO,
            when: "beforeChildren",
            staggerChildren: 0.1,
        },
    },
};

const floatingNodeVariants = {
    hidden: {
        opacity: 0,
        filter: "blur(2px)",
    },
    visible: {
        opacity: 1,
        filter: "blur(0px)",
        transition: {
            duration: 0.5,
            ease: EASE_OUT_EXPO,
        },
    },
};

const floatingLabelVariants = {
    hidden: {
        opacity: 0,
    },
    visible: {
        opacity: 1,
        transition: {
            duration: 0.42,
            ease: EASE_OUT_EXPO,
            delay: 0.08,
        },
    },
};


const Slide = ({ SlideImgs,imgClass,buttonUrl, buttonText, container, id, isSlideOpen, containerRef, openSlide, shouldOpen }) => {
   
    const [isMobile, setIsMobile] = useState(typeof window !== 'undefined' && window.innerWidth <= 768);

    useEffect(() => {
        if (typeof window === 'undefined') return;

        const handleResize = () => {
            setIsMobile(window.innerWidth <= 768);
        };

        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    const swiperClassName = container === "header-slide-container" ? "hero-swiper" : "";
    const validSlides = SlideImgs.filter((slide) => slide && slide.url);
    const shouldRewind = validSlides.length > 1;
    const floatingNodeDefaults = [
        { top: "10%", right: "24%" },
        { top: "34%", right: "46%" },
        { top: "61%", right: "24%" },
        { top: "76%", right: "42%" },
        { top: "46%", right: "12%" },
        { top: "82%", right: "32%" },
    ];

    const getFeatureItems = (img) => {
        const source = Array.isArray(img?.iconArray) && img.iconArray.length > 0
            ? img.iconArray
            : [];

        return source
            .filter((item) => item && (item.title || item.label || item.icon))
            .slice(0, 3);
    };

    const getFloatingItems = (img) => {
        if (!Array.isArray(img?.floatingIcons)) {
            return [];
        }

        return img.floatingIcons
            .filter((item) => item && item.icon)
            .slice(0, 6);
    };

    const getFloatingNodeStyle = (icon, index) => {
        const fallback = floatingNodeDefaults[index % floatingNodeDefaults.length];
        const position = icon?.position || {};
        const iconScale = typeof icon?.iconScale === "number"
            ? Math.min(Math.max(icon.iconScale, 0.34), 0.62)
            : undefined;

        return {
            top: position.top ?? fallback.top,
            right: position.right ?? fallback.right,
            bottom: position.bottom,
            left: position.left,
            "--float-duration": `${9.5 + index * 0.9}s`,
            "--float-delay": `${index * -0.8}s`,
            "--pulse-duration": `${6.8 + index * 0.7}s`,
            "--halo-size": icon?.glowSize || (index % 3 === 0 ? "110px" : "90px"),
            "--icon-scale": iconScale,
        };
    };

    const swiperKey = `${container || "slide"}-${validSlides.map((slide) => slide.id ?? slide.slug ?? slide.url).join("-")}`;

    return (
        <>
            <div className={"slide-page-container"}>
                <div className={container}>
                    <div ref={containerRef} className="slide-content-container">
                        {validSlides.length > 0 && (
                            <Swiper
                                modules={[Pagination, Autoplay, EffectCreative]}
                                key={swiperKey}
                                className={swiperClassName}
                                loop={false}
                                rewind={shouldRewind}
                                slidesPerView={1}
                                slidesPerGroup={1}
                                centeredSlides={false}
                                spaceBetween={0}
                                roundLengths={true}
                                observer={true}
                                observeParents={true}
                                watchOverflow={true}
                                watchSlidesProgress={true}
                                effect="creative"
                                creativeEffect={{
                                    perspective: false,
                                    limitProgress: 1,
                                    prev: {
                                        translate: ["-100%", 0, 0],
                                    },
                                    next: {
                                        translate: ["100%", 0, 0],
                                    },
                                }}
                                autoplay={shouldRewind ? {
                                    delay: 5000,
                                    disableOnInteraction: false,
                                    pauseOnMouseEnter: false,
                                    stopOnLastSlide: false,
                                } : false}
                                speed={800}
                                pagination={{
                                    clickable: true,
                                    dynamicBullets: false,
                                }}

                            >
                                {validSlides.map((img, index) => (
                                    <SwiperSlide key={img.id ?? img.slug ?? `slide-${index}`}>
                                    {({ isActive }) => (
                                            <div className="slide-container">
                                                <img onClick={() => openSlide?.()} className={imgClass} src={img.url} alt={img.littleTitle || img.mainTitle || "Slide Image"} />

                                            <div className="slide-overlay" />

                                            <div className="slide-texts-container">
                                                <div className="slide-content-shell">
                                                    <motion.div
                                                        className="slide-left-content"
                                                        initial="hidden"
                                                        animate={isActive ? "visible" : "hidden"}
                                                    >
                                                        <div className="slide-title-description-container">
                                                            {img.littleTitle && (
                                                                <motion.h3 className="slide-little-title" variants={fadeUp(0.06, 0.5, 12)}>
                                                                    {img.littleTitle}
                                                                </motion.h3>
                                                            )}

                                                            {img.mainTitle && (
                                                                <motion.h2 className="slide-main-title" initial="hidden" animate={isActive ? "visible" : "hidden"}>
                                                                    {(() => {
                                                                        const titleWords = img.mainTitle.split(" ");

                                                                        return titleWords.map((word, wordIndex) => (
                                                                        <motion.span
                                                                            key={`${word}-${wordIndex}`}
                                                                            className="slide-main-title-word"
                                                                            variants={fadeUp(0.16 + (wordIndex * 0.045), 0.56, 18)}
                                                                        >
                                                                            {word}
                                                                            {wordIndex < titleWords.length - 1 ? "\u00A0" : ""}
                                                                        </motion.span>
                                                                        ));
                                                                    })()}
                                                                </motion.h2>
                                                            )}

                                                            {img.description && (
                                                                <motion.p className="slide-description" variants={fadeUp(0.38, 0.56, 14)}>
                                                                    {img.description}
                                                                </motion.p>
                                                            )}
                                                        </div>

                                                        {!isMobile && getFeatureItems(img).length > 0 && (
                                                            <motion.div className="slide-features-row" variants={featureRowVariants}>
                                                                {getFeatureItems(img).map((icon, itemIndex) => (
                                                                    <motion.div
                                                                        key={icon.id ?? `feature-${itemIndex}`}
                                                                        className="slide-icon-container"
                                                                        variants={featureItemVariants}
                                                                    >
                                                                        {icon.icon
                                                                            ? <img src={icon.icon} alt={icon.title || icon.label || "feature"} className="header-icon-img" />
                                                                            : <span className="slide-feature-dot" aria-hidden="true" />}
                                                                        <span className="slide-feature-label">{icon.title || icon.label}</span>
                                                                    </motion.div>
                                                                ))}
                                                            </motion.div>
                                                        )}

                                                        <motion.div className="slide-cta-row" variants={fadeUp(0.82, 0.54, 12)}>
                                                            <a href={buttonUrl} className="slide-primary-cta" target="_blank" rel="noopener noreferrer">
                                                                {buttonText}
                                                            </a>
                                                            {/* <button type="button" className="slide-primary-cta">Bilgi Al</button> */}
                                                        </motion.div>
                                                    </motion.div>

                                                    <motion.div
                                                        className="slide-right-visual"
                                                        aria-hidden="true"
                                                        initial="hidden"
                                                        animate={isActive ? "visible" : "hidden"}
                                                        variants={fadeUp(0.92, 0.58, 10)}
                                                    >
                                                        <span className="hero-orb hero-orb-1" />
                                                        <span className="hero-orb hero-orb-2" />
                                                        <span className="hero-orb hero-orb-3" />
                                                        <span className="hero-trail" />

                                                        {getFloatingItems(img).length > 0 && (
                                                            <motion.div className="slide-floating-icons-layer" variants={floatingLayerVariants}>
                                                                {getFloatingItems(img).map((icon, iconIndex) => {
                                                                    const label = icon.label || icon.title;
                                                                    const nodeSizeClass = icon.size ? `is-${icon.size}` : (iconIndex === 0 ? "is-primary" : "is-secondary");
                                                                    const accentClass = icon.accent ? `is-${icon.accent}` : "is-soft-white";
                                                                    const nodeClassName = `floating-icon-node ${nodeSizeClass} ${accentClass} ${icon.positionClass || ""}`.trim();

                                                                    return (
                                                                        <motion.div
                                                                            key={icon.id ?? `floating-${iconIndex}`}
                                                                            className={nodeClassName}
                                                                            style={getFloatingNodeStyle(icon, iconIndex)}
                                                                            variants={floatingNodeVariants}
                                                                        >
                                                                            <span className="floating-node-halo" />
                                                                            <span className="floating-node-ambient" />
                                                                            <span className="floating-node-orb">
                                                                                <span className="floating-node-core" />
                                                                                <span className="floating-node-ring" />
                                                                                <img
                                                                                    src={icon.icon}
                                                                                    alt={label || "floating icon"}
                                                                                    className="floating-node-icon"
                                                                                />
                                                                            </span>
                                                                            {label && (
                                                                                <motion.span className="floating-node-label" variants={floatingLabelVariants}>
                                                                                    {label}
                                                                                </motion.span>
                                                                            )}
                                                                        </motion.div>
                                                                    );
                                                                })}
                                                            </motion.div>
                                                        )}
                                                    </motion.div>
                                                </div>
                                            </div>
                                        </div>
                                        )}
                                    </SwiperSlide>
                                ))}

                            </Swiper>
                        )}
                    </div>
                </div>
            </div>
        </>
    );
}

export default Slide;
