import React from 'react';
import './WhySection.scss';

export default function WhySection({ university = {} }){
  const bullets = university.benefits || ['Uluslararası Tanınırlık','Erasmus ve Değişim','Modern Kampüs','Geniş Kariyer Olanakları','Uygun Yaşam Maliyeti'];
  
  return (
    <section className="ud-why">
      <div className="ud-why-shell">
        <div className="ud-why-list card">
          <p className="section-label">Karar Aşaması</p>
          <h3>Neden {university.name || 'Bu Üniversite'}?</h3>
          <ul>
            {bullets.map(b=> <li key={b}><span className="tick">✓</span><span>{b}</span></li>)}
          </ul>
        </div>
        <div className="ud-why-cta card">
          <h4>Ücretsiz Danışmanlık Alın</h4>
          <p>Uzman danışmanlarımız başvuru sürecinizde yanınızda olacak. Hemen ulaşın.</p>
          <a className="btn btn-primary" href="#">Bize Ulaşın</a>
          <a className="btn btn-soft" href="#">WhatsApp</a>
        </div>
      </div>
    </section>
  )
}
