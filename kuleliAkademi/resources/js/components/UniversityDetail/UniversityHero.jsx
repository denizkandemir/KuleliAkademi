import React from 'react';
import './UniversityHero.scss';
import uniLogo from '../../assets/images/kuleliLogoGold.png';

export default function UniversityHero({ university = {} }) {
  const data = {
    founded: university.founded || '1816',
    students: university.students || '40.000+',
    ranking: university.ranking || 'QS 400+',
    city: university.city || 'Warsaw',
    language: university.language || 'İngilizce',
    type: university.type || 'Devlet Üniversitesi',
    website: university.website || 'www.uw.edu.pl',
  };

  return (
    <section className="ud-hero">
      <div className="ud-hero-shell">
        <div className="ud-hero-left">
          <div className="ud-image-wrap">
            <img src={university.image} alt={university.name || 'University image'} className="ud-image" />
            <div className="ud-badges">
              <span className="badge location">{university.city}, {university.country}</span>
              <span className="badge ranking">{data.ranking}</span>
            </div>
          </div>
        </div>

        <div className="ud-hero-right">
          <div className="ud-title-row">
            <div>
              <p className="ud-eyebrow">Üniversiteler</p>
              <h1 className="ud-title">{university.name || 'University of Warsaw'}</h1>
              <p className="ud-local">{university.localName || 'Uniwersytet Warszawski'}</p>
            </div>
            <img src={uniLogo} alt="logo watermark" className="ud-watermark" />
          </div>

          <div className="ud-quick-grid">
            <div className="info">
              <span className="label">Kuruluş</span>
              <strong>{data.founded}</strong>
            </div>
            <div className="info">
              <span className="label">Öğrenci</span>
              <strong>{data.students}</strong>
            </div>
            <div className="info">
              <span className="label">Sıralama</span>
              <strong>{data.ranking}</strong>
            </div>
            <div className="info">
              <span className="label">Şehir</span>
              <strong>{data.city}</strong>
            </div>
            <div className="info">
              <span className="label">Dil</span>
              <strong>{data.language}</strong>
            </div>
            <div className="info">
              <span className="label">Tür</span>
              <strong>{data.type}</strong>
            </div>
            <div className="info full">
              <span className="label">Web</span>
              <a href={`https://${data.website}`} className="link" target="_blank" rel="noreferrer">{data.website}</a>
            </div>
          </div>

          <div className="ud-cta-row">
            <a className="btn btn-primary" href="#">Programa Başvur</a>
            <a className="btn btn-outline" href="#">Danışmanlık Al</a>
          </div>
        </div>
      </div>
    </section>
  );
}
