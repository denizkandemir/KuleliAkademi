import React from 'react';
import { Link } from '@inertiajs/react';
import './AuthLayout.scss';

export default function AuthLayout({ children, title, subtitle }) {
  return (
    <div className="auth-shell">
      <div className="auth-panel">
        <div className="auth-brand">
          <Link href="/" className="auth-brand-link">
            <span className="auth-brand-mark">KA</span>
            <span>
              <strong>Kuleli Akademi</strong>
              <small>Yurt Dışı Eğitim Danışmanlığı</small>
            </span>
          </Link>
        </div>

        <div className="auth-card">
          <div className="auth-card-header">
            <p className="auth-kicker">Güvenli Erişim</p>
            <h1>{title}</h1>
            {subtitle ? <p className="auth-subtitle">{subtitle}</p> : null}
          </div>
          {children}
        </div>
      </div>
    </div>
  );
}
