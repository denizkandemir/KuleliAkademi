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
            {programs.map(p=> (
              <article className="program-card" key={p.title}>
                <div className="icon" aria-hidden>🎓</div>
                <h4>{p.title}</h4>
                <p className="meta">{p.level}</p>
                <p className="desc">{p.desc}</p>
                <a className="link" href="#">Detayları İncele</a>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
