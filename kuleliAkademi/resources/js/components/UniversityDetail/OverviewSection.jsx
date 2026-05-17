import React from 'react';
import './OverviewSection.scss';

export default function OverviewSection({ university = {} }){
  const text = university.longDescription || university.description || `University of Warsaw is one of the leading higher education institutions with a strong academic tradition and international profile. The university offers a wide range of undergraduate and graduate programs across faculties.`;
  const facts = university.facts || [
    { label: 'Erasmus', value: 'Var' },
    { label: 'Akreditasyon', value: 'Avrupa Standartları' },
    { label: 'Yaşam Maliyeti', value: 'Orta' },
    { label: 'İş İmkanları', value: 'Staj ve part-time' }
  ];
  const highlights = [
    { label: 'Kuruluş', value: university.founded || '1816' },
    { label: 'Şehir', value: `${university.city || 'Warsaw'}, ${university.country || 'Poland'}` },
    { label: 'Dil', value: university.language || 'İngilizce' }
  ];

  return (
    <section className="ud-overview">
      <div className="ud-overview-shell">
        <div className="ud-overview-grid">
          <article className="ud-overview-card card">
            <p className="section-label">Üniversite Profili</p>
            <h3>Genel Bakış</h3>
            <p className="lead">{text}</p>
            <p>Geniş akademik programları, güçlü araştırma altyapısı ve uluslararası öğrenci topluluğuyla tanınır. Öğrenciler için güçlü kariyer hizmetleri, Erasmus fırsatları ve modern kampüs olanakları mevcuttur.</p>

            <div className="ud-highlight-grid">
              {highlights.map((item) => (
                <div className="ud-highlight-card" key={item.label}>
                  <span>{item.label}</span>
                  <strong>{item.value}</strong>
                </div>
              ))}
            </div>
          </article>

          <aside className="ud-facts-card card">
            <div className="ud-facts-head">
              <p className="section-label">Hızlı Bakış</p>
              <h4>Hızlı Bilgiler</h4>
            </div>

            <ul className="ud-facts-list">
              {facts.map((fact) => (
                <li key={fact.label}>
                  <span className="fact-label">{fact.label}</span>
                  <strong>{fact.value}</strong>
                </li>
              ))}
            </ul>
          </aside>
        </div>
      </div>
    </section>
  )
}
