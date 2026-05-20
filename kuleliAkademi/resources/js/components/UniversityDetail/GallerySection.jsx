import React from 'react';
import './GallerySection.scss';

export default function GallerySection({ university = {} }){
  const images = Array.isArray(university.galleryImages) && university.galleryImages.length
    ? university.galleryImages
    : university.image
      ? [university.image]
      : [];

  return (
    <section className="ud-gallery">
      <div className="ud-gallery-shell">
        <div className="ud-gallery-card card">
          <div className="ud-gallery-header">
            <h3>Üniversite Galerisi</h3>
            <a className="btn btn-soft" href="#">Tümünü Gör</a>
          </div>

          <div className="gallery-grid">
            {images.map((img, index) => (
              <div className={`gallery-item ${index === 0 ? 'feature' : ''}`} key={`${index}-${img}`}>
                <img src={img} alt={index === 0 ? `${university.name || 'Üniversite'} kampüs görseli` : 'Kampüs görseli'} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
