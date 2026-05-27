import React from 'react';
import './QuickNav.scss';

const items = ['Genel Bakış','Programlar','Başvuru Şartları','Ücretler','Öğrenci Yaşamı','Galeri','Konaklama','İletişim'];

export default function QuickNav(){
  return (
    <nav className="ud-quicknav" aria-label="Hızlı Gezinti">
      <div className="ud-quicknav-shell">
        {items.map((it)=> (
          <button key={it} className="pill">{it}</button>
        ))}
      </div>
    </nav>
  )
}
