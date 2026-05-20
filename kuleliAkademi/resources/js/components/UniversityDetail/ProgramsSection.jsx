import React from 'react';
import './ProgramsSection.scss';

export default function ProgramsSection({ university = {} }){
  const programs = university.programs || [];
  
  return (
    <section className="ud-programs">
      <div className="ud-shell">
        <div className="ud-programs-card card">
          <div className="ud-programs-header">
            <h3>Popüler Fakülteler ve Programlar</h3>
            <a className="btn btn-soft" href="#">Tüm Programları Gör</a>
          </div>

          <div className="program-grid">
            {programs.length > 0 ? programs.map((p, index) => (
              <article className="program-card" key={`${p.title}-${index}`}>
                <div className="icon" aria-hidden>🎓</div>
                <h4>{p.title}</h4>
                <p className="meta">{p.level}</p>
                <p className="desc">{p.desc}</p>
                <a className="link" href="#">Detayları İncele</a>
              </article>
            )) : (
              <p className="program-empty">Bu üniversite için program bilgisi şu anda hazırlanıyor.</p>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
