import React from 'react';
import './GallerySection.scss';
import img1 from '../../assets/images/uniWarsaw3.jpg';
import img2 from '../../assets/images/uniGdansk1.jpg';
import img3 from '../../assets/images/uniWroclaw1.webp';
import img4 from '../../assets/images/uniKrakow1.png';
import img5 from '../../assets/images/uniPolitechnic1.jpg';

export default function GallerySection({ university = {} }){
  const images = [university.image || img1, img2, img3, img4, img5];
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
                <img src={img} alt="campus" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
