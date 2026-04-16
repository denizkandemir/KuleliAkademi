import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import {
    Pagination,
    Autoplay
} from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "./Slide.scss";


const Slide = ({ SlideImgs, slideImgs, imgClass, container, id, isSlideOpen, containerRef, openSlide, iconArray, floatingIcons }) => {
    const slides = SlideImgs ?? slideImgs ?? [];
    const shouldLoop = slides.length > 1;
    const swiperClassName = container === "header-slide-container" ? "hero-swiper" : "";

    const getFeatureItems = (img) => {
        const source = Array.isArray(img?.iconArray) && img.iconArray.length > 0
            ? img.iconArray
            : (Array.isArray(iconArray) ? iconArray : []);

        return source
            .filter((item) => item && (item.title || item.label || item.icon))
            .slice(0, 3);
    };

    return (
        <>
            <div className={"slide-page-container"}>
                <div className={container}>
                    <div ref={containerRef} className="slide-content-container">
                        {slides.length > 0 && (
                            <Swiper
                                modules={[Pagination, Autoplay]}
                                key={id + isSlideOpen}
                                className={swiperClassName}
                                loop={shouldLoop}
                                slidesPerView={1}
                                centeredSlides={false}
                                spaceBetween={0}
                                roundLengths={true}
                                observer={true}
                                observeParents={true}
                                watchOverflow={true}
                                loopAdditionalSlides={shouldLoop ? slides.length : 0}
                                autoplay={shouldLoop ? {
                                    delay: 10000,
                                    disableOnInteraction: false,
                                    pauseOnMouseEnter: true,
                                } : false}
                                speed={1100}
                                pagination={{
                                    clickable: true,
                                }}

                            >
                                {slides.map((img, index) => (
                                    <SwiperSlide key={`${img.id ?? "slide"}-${index}`}>
                                        <div className="slide-container">
                                            <img onClick={() => openSlide?.()} className={imgClass} src={img.url} alt="" />

                                            <div className="slide-overlay" />

                                            <div className="slide-texts-container">
                                                <div className="slide-content-shell">
                                                    <div className="slide-left-content">
                                                        <div className="slide-title-description-container">
                                                            {img.littleTitle && <h3 className="slide-little-title">{img.littleTitle}</h3>}
                                                            {img.mainTitle && <h2 className="slide-main-title">{img.mainTitle}</h2>}
                                                            {img.description && <p className="slide-description">{img.description}</p>}
                                                        </div>

                                                        {getFeatureItems(img).length > 0 && (
                                                            <div className="slide-features-row">
                                                                {getFeatureItems(img).map((icon, itemIndex) => (
                                                                    <div key={icon.id ?? `feature-${itemIndex}`} className="slide-icon-container">
                                                                        {icon.icon
                                                                            ? <img src={icon.icon} alt={icon.title || icon.label || "feature"} className="header-icon-img" />
                                                                            : <span className="slide-feature-dot" aria-hidden="true" />}
                                                                        <span className="slide-feature-label">{icon.title || icon.label}</span>
                                                                    </div>
                                                                ))}
                                                            </div>
                                                        )}

                                                        <div className="slide-cta-row">
                                                            <button type="button" className="slide-primary-cta">Bilgi Al</button>
                                                        </div>
                                                    </div>

                                                    <div className="slide-right-visual" aria-hidden="true">
                                                        <span className="hero-orb hero-orb-1" />
                                                        <span className="hero-orb hero-orb-2" />
                                                        <span className="hero-orb hero-orb-3" />
                                                        <span className="hero-trail" />

                                                        {floatingIcons && floatingIcons.length > 0 && floatingIcons.slice(0, 2).map((icon) => (
                                                            <div key={icon.id} className="slide-floating-icon-container">
                                                                <img src={icon.icon} alt={icon.title} className="header-icon-img header-floating-icon" />
                                                            </div>
                                                        ))}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
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
