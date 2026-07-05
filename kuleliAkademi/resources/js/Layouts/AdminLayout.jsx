import React, { useEffect, useMemo, useState } from 'react';
import { Link, router, usePage } from '@inertiajs/react';
import {
  FiBell,
  FiBookOpen,
  FiChevronRight,
  FiClipboard,
  FiClipboard as FiForms,
  FiDollarSign,
  FiEdit3,
  FiFileText,
  FiFolder,
  FiGlobe,
  FiHelpCircle,
  FiMail,
  FiMenu,
  FiMoon,
  FiHome,
  FiSettings,
  FiSun,
  FiUser,
  FiUsers,
  FiVideo,
  FiX,
} from 'react-icons/fi';
import './AdminLayout.scss';
const logo = "/storage/images/kuleliLogoGold.webp";

const menuItems = [
  { label: 'Dashboard', href: '/admin/dashboard', icon: FiHome },
  { label: 'Hizmetlerimiz', href: '/admin/services', icon: FiClipboard },
  { label: 'Üniversiteler', href: '/admin/universities', icon: FiGlobe },
  { label: 'Yurt Dışı Eğitim', href: '/admin/education-options', icon: FiBookOpen },
  { label: 'Konaklamalar', href: '/admin/accommodations', icon: FiHome },
  { label: 'Adaylar', href: '/admin/applications', icon: FiUsers, badgeKey: 'newApplications' },
  { label: 'Başvurular', href: '/admin/applications', icon: FiFileText },
  { label: 'Belgeler', href: '/admin/documents', icon: FiFolder, badgeKey: 'documentsCount' },
  { label: 'Form Başvuruları', href: '/admin/form-submissions', icon: FiForms, badgeKey: 'newFormSubmissions' },
  { label: 'Mesajlar', href: '/admin/contact-messages', icon: FiMail, badgeKey: 'unreadMessages' },
  { label: 'Bildirimler', href: '/admin/notifications', icon: FiBell, badgeKey: 'unreadNotifications' },
  { label: 'Eğitim Videoları', href: '/admin/education-videos', icon: FiVideo },
  { label: 'Blog Yazıları', href: null, icon: FiEdit3, disabled: true },
  { label: 'Ayarlar', href: '/admin/settings', icon: FiSettings },
];

export default function AdminLayout({ children }) {
  const { url, props } = usePage();
  const user = props.auth?.user;
  const stats = props.stats || {};
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [theme, setTheme] = useState(() => {
    if (typeof window === 'undefined') {
      return 'light';
    }

    return window.localStorage.getItem('kuleli-admin-theme') || (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
  });

  useEffect(() => {
    if (typeof document === 'undefined') {
      return;
    }

    document.documentElement.dataset.adminTheme = theme;
    window.localStorage.setItem('kuleli-admin-theme', theme);
  }, [theme]);

  const handleLogout = (event) => {
    event.preventDefault();
    router.post('/logout');
  };

  const activePath = useMemo(() => url.split('?')[0], [url]);

  const getBadgeValue = (item) => {
    if (!item.badgeKey) {
      return null;
    }

    return stats[item.badgeKey] !== undefined ? stats[item.badgeKey] : null;
  };

  const renderNavItem = (item) => {
    const isActive = item.href && (activePath === item.href || activePath.startsWith(`${item.href}/`));
    const badgeValue = getBadgeValue(item);
    const classes = [`admin-nav-item`, isActive ? 'is-active' : '', item.disabled ? 'is-disabled' : ''].filter(Boolean).join(' ');

    if (!item.href || item.disabled) {
      return (
        <button key={item.label} type="button" className={classes} disabled>
          <span className="admin-nav-icon" aria-hidden="true">
            <item.icon />
          </span>
          <span className="admin-nav-copy">
            <span>{item.label}</span>
            {item.disabled ? <small>Yakında</small> : null}
          </span>
        </button>
      );
    }

    return (
      <Link key={item.label} href={item.href} className={classes} onClick={() => setIsSidebarOpen(false)}>
        <span className="admin-nav-icon" aria-hidden="true">
          <item.icon />
        </span>
        <span className="admin-nav-copy">
          <span>{item.label}</span>
          {badgeValue !== null && badgeValue !== undefined ? <small>{badgeValue}</small> : null}
        </span>
      </Link>
    );
  };

  const userInitials = (user?.name || 'KA')
    .split(' ')
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0])
    .join('')
    .toUpperCase();

  return (
    <div className="admin-shell" data-theme={theme}>
      <div className={`admin-sidebar-backdrop${isSidebarOpen ? ' is-open' : ''}`} onClick={() => setIsSidebarOpen(false)} aria-hidden="true" />

      <aside className={`admin-sidebar${isSidebarOpen ? ' is-open' : ''}`}>
        <div className="admin-brand">
          <Link href="/admin/dashboard" className="admin-brand-link" onClick={() => setIsSidebarOpen(false)}>
            <img src={logo} alt="Kuleli Akademi logosu" className="admin-brand-logo" />
            <div>
              <p className="admin-brand-title">Kuleli Akademi</p>
              <p className="admin-brand-subtitle">Admin Panel</p>
            </div>
          </Link>

          <button type="button" className="admin-sidebar-close" onClick={() => setIsSidebarOpen(false)} aria-label="Menüyü kapat">
            <FiX aria-hidden="true" />
          </button>
        </div>

        <nav className="admin-nav custom-sidebar-scrollbar" aria-label="Admin menü">
          {menuItems.map((item) => renderNavItem(item))}
        </nav>

        <div className="admin-sidebar-footer">
         
          <div className="admin-footer-actions">
            <Link href="/" className="admin-site-link" onClick={() => setIsSidebarOpen(false)}>
              Siteye Dön
            </Link>
            <button type="button" className="admin-logout-button" onClick={handleLogout}>
              Çıkış Yap
            </button>
          </div>
        </div>
      </aside>

      <div className="admin-main">
        <header className="admin-topbar">
          <button type="button" className="admin-sidebar-toggle" onClick={() => setIsSidebarOpen(true)} aria-label="Menüyü aç">
            <FiMenu aria-hidden="true" />
          </button>

          <div className="admin-topbar-brand">
            <p>Kuleli Akademi</p>
            <small>Premium operasyon paneli</small>
          </div>

          <div className="admin-topbar-actions">
            <button type="button" className="admin-theme-button" onClick={() => setTheme((currentTheme) => (currentTheme === 'dark' ? 'light' : 'dark'))} aria-label="Temayı değiştir">
              {theme === 'dark' ? <FiSun aria-hidden="true" /> : <FiMoon aria-hidden="true" />}
            </button>

            <div className="admin-user-pill">
              {/* <div className="admin-user-avatar">{userInitials}</div> */}

               <div className="admin-user-avatar">
                    <img src={user?.avatar_url || logo} alt={user?.name || 'Admin'} className="admin-user-avatar-image" />
                </div>
              <div>
                <strong>{user?.name || 'Admin'}</strong>
                <small>{user?.email || 'admin@kuleliakademi.com'}</small>
              </div>
            </div>
          </div>
        </header>

        <main className="admin-content">{children}</main>
      </div>
    </div>
  );
}
