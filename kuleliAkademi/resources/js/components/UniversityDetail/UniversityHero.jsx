import React from 'react';
import './UniversityHero.scss';
import { MdLocationOn, MdEmojiEvents, MdSchool } from 'react-icons/md';
import uniLogo from '../../assets/images/kuleliLogoGold.png';
import foundationIcon from '../../assets/icons/calendar.png';
import studentsIcon from '../../assets/icons/graduated.png';
import rankingIcon from '../../assets/icons/quality.png';
import locationIcon from '../../assets/icons/city.png';
import languageIcon from '../../assets/icons/languages2.png';
import typeIcon from '../../assets/icons/university3.png';
import { Link, usePage } from "@inertiajs/react";
import {contactConfig} from "../../config/contactConfig";

export default function UniversityHero({ university = {} }) {
  const data = {
    founded: university.founded || '1816',
    students: university.students || '40.000+',
    ranking: university.ranking || '400+',
    city: university.city || 'Warsaw',
    language: university.language || 'İngilizce',
    type: university.type || 'Devlet Üniversitesi',
    website: university.website || 'www.uw.edu.pl',
    country: university.country || 'Poland'
  };

  return (
    <section className="ud-hero">
      <div className="ud-hero-container">
        <div className="ud-hero-shell">
          {/* LEFT: IMAGE SECTION */}
          <div className="ud-hero-left">
            <div className="ud-image-wrap">
              <img src={university.image} alt={university.name || 'University image'} className="ud-image" />
              <div className="ud-image-overlay"></div>
              <div className="ud-badges">
                <span className="badge location">
                  <MdLocationOn className="badge-icon" />
                  {data.city}, {data.country}
                </span>
                <span className="badge ranking">
                  <MdEmojiEvents className="badge-icon" />
                  {data.ranking}
                </span>
              </div>
            </div>
          </div>

          {/* RIGHT: INFO CARD SECTION */}
          <div className="ud-hero-right">
            <img src={uniLogo} alt="logo watermark" className="ud-watermark" />
            
            <div className="ud-card-header">
              <p className="ud-eyebrow">Üniversiteler</p>
              <h1 className="ud-title">{university.name || 'University of Warsaw'}</h1>
              <p className="ud-local">{university.localName || 'Uniwersytet Warszawski'}</p>
              <div className="ud-divider"></div>
            </div>

            {/* INFO GRID WITH ICONS */}
            <div className="ud-info-grid">
              <div className="info-card">
                <div className="info-icon">
                  <img src={foundationIcon} alt="Foundation Icon" className="uni-hero-icon" />
                </div>
                <div className="info-content">
                  <span className="info-label">Kuruluş Yılı</span>
                  <strong className="info-value">{data.founded}</strong>
                </div>
              </div>

              <div className="info-card">
                <div className="info-icon">
                  <img src={studentsIcon} alt="Students Icon" className="uni-hero-icon" />
                </div>
                <div className="info-content">
                  <span className="info-label">Öğrenci Sayısı</span>
                  <strong className="info-value">{data.students}</strong>
                </div>
              </div>

              <div className="info-card">
                <div className="info-icon">
                  <img src={rankingIcon} alt="Ranking Icon" className="uni-hero-icon" />
                </div>
                <div className="info-content">
                  <span className="info-label">QS Sıralaması</span>
                  <strong className="info-value">{data.ranking}</strong>
                </div>
              </div>

              <div className="info-card">
                <div className="info-icon">
                  <img src={locationIcon} alt="City Icon" className="uni-hero-icon" />
                </div>
                <div className="info-content">
                  <span className="info-label">Şehir</span>
                  <strong className="info-value">{data.city}</strong>
                </div>
              </div>

              <div className="info-card">
                <div className="info-icon">
                  <img src={languageIcon} alt="Language Icon" className="uni-hero-icon" />
                </div>
                <div className="info-content">
                  <span className="info-label">Dil</span>
                  <strong className="info-value">{data.language}</strong>
                </div>
              </div>

              <div className="info-card">
                <div className="info-icon">
                  <img src={typeIcon} alt="Type Icon" className="uni-hero-icon" />
                </div>
                <div className="info-content">
                  <span className="info-label">Tür</span>
                  <strong className="info-value">{data.type}</strong>
                </div>
              </div>
            </div>

            {/* CTA BUTTONS */}
            <div className="ud-cta-row">
              <Link className="btn btn-primary" href="/iletişim">
                <span>İletişim</span>
              </Link>
              <a target="_blank" rel="noopener noreferrer" className="btn btn-secondary" href={contactConfig.form.consultation.url}>
                <span>Danışmanlık Al</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
