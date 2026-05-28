import React from 'react';
import { Link, router, usePage } from '@inertiajs/react';
import './AdminLayout.scss';

const menuItems = [
  { label: 'Dashboard', href: '/admin/dashboard' },
  { label: 'Hizmetler', href: '/admin/services' },
  { label: 'Üniversiteler', href: '/admin/universities' },
  { label: 'Yurt Dışı Eğitim', href: '/admin/education-options' },
  { label: 'Konaklamalar', href: '/admin/accommodations' },
  { label: 'SSS', href: '/admin/faqs' },
  { label: 'Eğitim Videoları', href: '/admin/education-videos' },
  { label: 'Formlar', href: '/admin/forms' },
  { label: 'Form Başvuruları', href: '/admin/form-submissions' },
  { label: 'Başvurular', href: '/admin/applications' },
  { label: 'Mesajlar', href: '/admin/contact-messages' },
  { label: 'Bildirimler', href: '/admin/notifications' },
  { label: 'Site Ayarları', href: '/admin/settings' },
];

export default function AdminLayout({ children }) {
  const { url, props } = usePage();
  const user = props.auth?.user;

  const handleLogout = (event) => {
    event.preventDefault();
    router.post('/logout');
  };

  return (
    <div className="admin-shell">
      <aside className="admin-sidebar">
        <div className="admin-brand">
          <div className="admin-brand-mark">KA</div>
          <div>
            <p className="admin-brand-title">Kuleli Akademi</p>
            <p className="admin-brand-subtitle">Admin Panel</p>
          </div>
        </div>

        <nav className="admin-nav" aria-label="Admin menü">
          {menuItems.map((item) => {
            const isActive = url === item.href || url.startsWith(`${item.href}/`);

            return (
              <Link key={item.href} href={item.href} className={`admin-nav-item${isActive ? ' is-active' : ''}`}>
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div className="admin-sidebar-footer">
          <Link href="/" className="admin-site-link">
            Siteye Dön
          </Link>
          <button type="button" className="admin-logout-button" onClick={handleLogout}>
            Logout
          </button>
        </div>
      </aside>

      <div className="admin-main">
        <header className="admin-topbar">
          <div>
            <p className="admin-topbar-kicker">Yönetim Merkezi</p>
            <h1>Kuleli Akademi</h1>
          </div>
          <div className="admin-user-pill">
            <span className="admin-user-dot" />
            <div>
              <strong>{user?.name || 'Admin'}</strong>
              <small>{user?.email || 'admin@kuleliakademi.com'}</small>
            </div>
          </div>
        </header>

        <main className="admin-content">{children}</main>
      </div>
    </div>
  );
}
