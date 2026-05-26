import React from 'react';
import { MdCalendarToday, MdLocationOn, MdLanguage, MdVerified, MdMonetizationOn, MdWorkOutline, MdArrowForward } from 'react-icons/md';
import './OverviewSection.scss';
import erasmusIcon from '../../assets/icons/europe.png';
import accreditationIcon from '../../assets/icons/regulatory-compliance.png';
import costIcon from '../../assets/icons/asset-allocation.png';
import jobsIcon from '../../assets/icons/job-description.png';
import { contactConfig } from '../../config/contactConfig';

export default function OverviewSection({ university = {} }) {
  
  const highlights = [
    {
      label: 'Kuruluş',
      value: university.founded || '1816',
      icon: MdCalendarToday,
    },
    {
      label: 'Şehir',
      value: `${university.city || 'Warsaw'}, ${university.country || 'Poland'}`,
      icon: MdLocationOn,
    },
    {
      label: 'Dil',
      value: university.language || 'İngilizce',
      icon: MdLanguage,
    },
  ];

  const facts = [
    {
      label: 'Erasmus+',
      value: university.facts?.find((fact) => /erasmus/i.test(fact.label))?.value || 'Var',
      icon: erasmusIcon,
    },
    {
      label: 'Akreditasyon',
      value: university.facts?.find((fact) => /akredit/i.test(fact.label))?.value || 'Avrupa Standartları',
      icon: accreditationIcon,
    },
    {
      label: 'Yaşam Maliyeti',
      value: university.facts?.find((fact) => /yaşam/i.test(fact.label))?.value || 'Orta',
      icon: costIcon,
    },
    {
      label: 'İş İmkanları',
      value: university.facts?.find((fact) => /iş/i.test(fact.label))?.value || 'Staj ve part-time',
      icon: jobsIcon,
    },
  ];

  return (
    <section className="ud-overview">
      <div className="ud-overview-shell">
        <div className="ud-overview-grid">
          <article className="ud-overview-card ">
            <div className="ud-section-kicker">
              <span className="section-label">Üniversite Profili</span>
              <span className="section-kicker-line" aria-hidden="true" />
            </div>

            <h3>Genel Bakış</h3>
            <div className="section-divider" aria-hidden="true" />

            <div className="ud-copy">
              {
                university.longDescriptions.map((paragraph, index) => (
                  <p className="lead" key={`${university.name}-desc-${index}`}>
                    {paragraph}
                  </p>
                ))
              }
              

              {/* <div className="ud-highlight-quote">
                <span className="line"></span>

                <p>
                  İngilizce eğitim seçenekleri, Erasmus bağlantıları ve
                  Avrupa merkezli kariyer fırsatları sayesinde öğrenciler
                  mezuniyet sonrası global iş piyasasına daha güçlü hazırlanır.
                </p>
              </div> */}
            </div>

            <div className="ud-highlight-grid">
              {highlights.map((item) => {
                const Icon = item.icon;

                return (
                  <div className="ud-highlight-card" key={item.label}>
                    <div className="ud-highlight-icon">
                      <Icon />
                    </div>
                    <span>{item.label}</span>
                    <strong>{item.value}</strong>
                  </div>
                );
              })}
            </div>
          </article>

          <aside className="ud-facts-card card">
            <div className="ud-facts-head">
              <div className="ud-section-kicker">
                <span className="section-label">Hızlı Bakış</span>
                <span className="section-kicker-line" aria-hidden="true" />
              </div>
              <h4>Hızlı Bilgiler</h4>
              <div className="section-divider" aria-hidden="true" />
            </div>

            <ul className="ud-facts-list">
              {facts.map((fact) => {


                return (
                  <li key={fact.label}>
                    <span className="fact-icon">
                      <img src={fact.icon} alt="" className="fact-card-ic" />
                    </span>
                    <div className="fact-body">
                      <span className="fact-label">{fact.label}</span>
                      <strong>{fact.value}</strong>
                    </div>
                  </li>
                );
              })}
            </ul>

            <div className="ud-consultation-card">
              <div className="ud-consultation-icon" aria-hidden="true">
                <MdArrowForward />
              </div>
              <div className="ud-consultation-copy">
                <span>Ücretsiz Danışmanlık Alın</span>
                <p>Uzman danışmanlarımız sürecin her adımında yanınızda.</p>
              </div>
              <a className="ud-consultation-btn" href={contactConfig.form.consultation.url} target="_blank" rel="noopener noreferrer">
                Danışmanlık Al
              </a>
            </div>
          </aside>
        </div>
      </div>
    </section>
  );
}
