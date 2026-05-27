import React, { useState, useRef, useEffect } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Keyboard } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import './GallerySection.scss';

export default function GallerySection({ university = {} }){
  const images = Array.isArray(university.galleryImages) && university.galleryImages.length
    ? university.galleryImages
    : university.image
      ? [university.image]
      : [];

  const [isOpen, setIsOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);
  const swiperRef = useRef(null);
  const backdropRef = useRef(null);

  const openAt = (index) => {
    setActiveIndex(index || 0);
    setIsOpen(true);
  };

  const close = () => setIsOpen(false);

  useEffect(() => {
    if (typeof document === 'undefined') return;
    document.body.style.overflow = isOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen || !swiperRef.current) return;
    // ensure swiper navigates to the desired slide when opening
    try {
      const swiper = swiperRef.current.swiper || swiperRef.current;
      if (swiper && typeof swiper.slideTo === 'function') {
        swiper.slideTo(activeIndex, 0);
      }
    } catch (e) {
      // swallow
    }
  }, [isOpen, activeIndex]);

  useEffect(() => {
    const handleKey = (e) => {
      if (e.key === 'Escape') close();
    };
    if (isOpen) window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [isOpen]);

  const handleBackdropClick = (e) => {
    if (e.target === backdropRef.current) close();
  };

  return (
    <section className="ud-gallery university-gallery-section">
      <div className="ud-gallery-shell university-gallery-section__container">
        <div className="ud-gallery-card card">
          <div className="ud-gallery-header university-gallery-section__header">
            <h3 className="university-gallery-section__title">Üniversite Galerisi</h3>
            <button type="button" onClick={() => openAt(0)} className="btn btn-soft university-gallery-section__button">Tümünü Gör</button>
          </div>

          <div className="gallery-grid university-gallery-section__grid">
            {images.map((img, index) => (
              <div
                className={`gallery-item university-gallery-section__item ${index === 0 ? 'feature university-gallery-section__item--featured' : ''}`}
                key={`${index}-${img}`}
                onClick={() => openAt(index)}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') openAt(index); }}
              >
                <img
                  src={img}
                  alt={`${university.name || 'Üniversite'} galeri fotoğrafı ${index + 1}`}
                  className="university-gallery-section__image"
                />
              </div>
            ))}
          </div>
        </div>
      </div>

      {isOpen && (
        <div className="university-gallery-lightbox" ref={backdropRef} onClick={handleBackdropClick} role="dialog" aria-modal="true">
          <div className="university-gallery-lightbox__content">
            <button type="button" className="university-gallery-lightbox__close" onClick={close} aria-label="Galeriyi kapat">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                <path d="M18 6L6 18M6 6L18 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>

            <Swiper
              modules={[Navigation, Keyboard]}
              navigation
              keyboard={{ enabled: true }}
              initialSlide={activeIndex}
              slidesPerView={1}
              spaceBetween={20}
              loop={false}
              rewind={images.length > 1}
              onSwiper={(s) => { swiperRef.current = s; }}
            >
              {images.map((img, index) => (
                <SwiperSlide key={img + String(index)}>
                  <div className="university-gallery-lightbox__slide">
                    <img src={img} alt={`${university.name || 'Üniversite'} galeriden fotoğraf ${index + 1}`} />
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        </div>
      )}
    </section>
  )
}
