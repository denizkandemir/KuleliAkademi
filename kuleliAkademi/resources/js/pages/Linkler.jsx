import React from 'react';
import SEOHead from '../components/SEOHead/SEOHead';
import { generateCanonical } from '../utils/seoHelpers';
import '../components/linkler/Linkler.scss';
const kuleliLogoGold = '/storage/images/kuleliLogoGold.webp';
import { contactConfig } from '../config/contactConfig';
import graduationIcon from '../assets/icons/exam-time.png';
import webIcon from '../assets/icons/ux.png';
import universityIcon from '../assets/icons/graduation-hat.png';

// Facebook SVG Icon (from Navbar)
const FacebookIcon = () => (
    <svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M24 12.073C24 5.405 18.627 0 12 0S0 5.405 0 12.073C0 18.1 4.388 23.094 10.125 24V15.564H7.078V12.073H10.125V9.405C10.125 6.348 11.917 4.688 14.658 4.688C15.97 4.688 17.344 4.922 17.344 4.922V7.875H15.83C14.34 7.875 13.875 8.8 13.875 9.75V12.073H17.203L16.671 15.564H13.875V24C19.612 23.094 24 18.1 24 12.073Z" fill="#1877F2" />
    </svg>
);

// WhatsApp SVG Icon (from Navbar)
const WhatsAppIcon = () => (
    <svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M20.52 3.477A11.81 11.81 0 0 0 12.113 0C5.61 0 .315 5.294.315 11.797c0 2.079.544 4.106 1.578 5.896L0 24l6.472-1.858a11.78 11.78 0 0 0 5.642 1.438h.005c6.502 0 11.798-5.294 11.798-11.798 0-3.151-1.23-6.113-3.397-8.305Zm-8.406 18.11h-.004a9.82 9.82 0 0 1-5.005-1.372l-.359-.213-3.84 1.102 1.117-3.744-.234-.383A9.83 9.83 0 0 1 2.29 11.8c0-5.418 4.407-9.826 9.825-9.826 2.625 0 5.093 1.022 6.95 2.878a9.77 9.77 0 0 1 2.88 6.949c-.002 5.419-4.41 9.826-9.83 9.826Zm5.39-7.354c-.294-.147-1.737-.857-2.006-.955-.268-.098-.463-.147-.659.147-.196.294-.758.955-.929 1.151-.17.196-.342.221-.636.074-.294-.147-1.239-.457-2.36-1.458-.872-.777-1.461-1.737-1.633-2.03-.171-.294-.018-.452.129-.598.132-.132.294-.343.441-.514.147-.171.196-.294.294-.49.098-.196.05-.368-.025-.515-.073-.147-.659-1.59-.904-2.177-.238-.57-.48-.492-.659-.502l-.56-.01c-.196 0-.514.074-.782.368-.269.294-1.027 1.003-1.027 2.447 0 1.444 1.052 2.839 1.198 3.035.147.196 2.072 3.165 5.018 4.437.701.302 1.248.483 1.674.618.703.224 1.342.193 1.848.117.563-.084 1.737-.71 1.982-1.396.244-.686.244-1.274.171-1.396-.073-.122-.268-.196-.562-.343Z" fill="#25D366" />
    </svg>
);

// Chevron Right Icon
const ChevronRightIcon = () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M9 18L15 12L9 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
);

// Links configuration
const LINKS_CONFIG = [
    {
        id: 'website',
        title: 'Web Sitemiz',
        subtitle: 'Ana sayfamızı ziyaret edin',
        href: '/',
        icon: 'web',
        external: false,
    },
    {
        id: 'form-davranis',
        title: 'Danışmanlık Talebi Formu',
        subtitle: 'Uzman ekibimizle görüşmek için formu doldurun',
        href: 'https://docs.google.com/forms/d/e/1FAIpQLSf6EDVF2JpfO0Bzg3qZoMwefMoTFrxWuIsKUxqPZggljQvY_w/viewform?usp=dialog',
        icon: 'graduation',
        external: true,
    },
    {
        id: 'form-polonya',
        title: "Polonya'da Üniversite İçin Başvurun",
        subtitle: 'Polonya üniversite başvuru formu',
        href: 'https://docs.google.com/forms/d/e/1FAIpQLSf6EDVF2JpfO0Bzg3qZoMwefMoTFrxWuIsKUxqPZggljQvY_w/viewform?usp=dialog',
        icon: 'university',
        external: true,
    },
    {
        id: 'facebook',
        title: 'Facebook',
        subtitle: 'Bizi Facebook\'ta takip edin',
        href: contactConfig.social.facebook.url,
        icon: 'facebook',
        external: true,
    },
    {
        id: 'whatsapp-aliaga',
        title: 'WhatsApp: Kuleli Akademi',
        subtitle: contactConfig.whatsapp.aliaga.number,
        href: contactConfig.whatsapp.aliaga.url,
        icon: 'whatsapp',
        external: true,
    },
    {
        id: 'whatsapp-polonya',
        title: 'WhatsApp: Polonya Danışmanlık',
        subtitle: contactConfig.whatsapp.poland.number,
        href: contactConfig.whatsapp.poland.url,
        icon: 'whatsapp',
        external: true,
    },
    {
        id: 'üniversiteler',
        title: 'Üniversiteler',
        subtitle: "Polonya'da yer alan üniversiteleri keşfedin",
        href: '/üniversiteler',
        icon: 'university',
        external: false,
    }
];



const Linkler = ({ title, description }) => {
    const pageTitle = title || 'Linkler | Kuleli Akademi';
    const pageDescription = description || 'Kuleli Akademi eğitim başvuruları, Polonya üniversite danışmanlığı ve iletişim bağlantıları. Instagram biyografisinden hızlı erişim.';

    const renderIcon = (iconType) => {
        switch (iconType) {
            case 'globe':
                return (
                    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="linkler-icon-globe">
                        <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2" />
                        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm3.5-9c.83 0 1.5-.67 1.5-1.5S16.33 8 15.5 8 14 8.67 14 9.5s.67 1.5 1.5 1.5zm-7 0c.83 0 1.5-.67 1.5-1.5S9.33 8 8.5 8 7 8.67 7 9.5 7.67 11 8.5 11zm3.5 6.5c2.33 0 4.31-1.46 5.11-3.5H6.89c.8 2.04 2.78 3.5 5.11 3.5z" fill="currentColor" />
                    </svg>
                );
            case 'graduation':
                return <img src={graduationIcon} alt="başvuru" className="linkler-icon-img" />;
            case 'university':
                return <img src={universityIcon} alt="üniversite" className="linkler-icon-img" />;
            case 'facebook':
                return <FacebookIcon />;
            case 'whatsapp':
                return <WhatsAppIcon />;
            case 'web': 
                 return <img src={webIcon} alt="web" className="linkler-icon-img" />;    
            case 'brain':
                return <span className="linkler-icon-emoji" aria-hidden>{'🧠'}</span>;
            default:
                return null;
        }
    };

    return (
        <>
            <SEOHead
                title={pageTitle}
                description={pageDescription}
                url={generateCanonical('/linkler')}
                type="navigation"
            />

            <div className="linkler-page">
            {/* Background decoration */}
            <div className="linkler-background-decoration">
                <div className="linkler-orb linkler-orb-1"></div>
                <div className="linkler-orb linkler-orb-2"></div>
                <div className="linkler-orb linkler-orb-3"></div>
            </div>

            {/* Main container */}
            <div className="linkler-container">
                {/* Header section */}
                <div className="linkler-header">
                    {/* Logo */}
                    <div className="linkler-logo-wrapper">
                        <img src={kuleliLogoGold} alt="Kuleli Akademi logo" className="linkler-logo" />
                    </div>

                    {/* Title with gold accent */}
                    <h1 className="linkler-main-title">
                        Kuleli <span className="linkler-accent">Akademi</span>
                    </h1>
                    
                    <p className="linkler-subtitle">
                        Eğitimler, başvurular ve danışmanlık için hızlı bağlantılar
                    </p>
                </div>

                {/* Links grid */}
                <div className="linkler-grid">
                    {LINKS_CONFIG.filter((l) => !l.hidden).map((link) => (
                        <a
                            key={link.id}
                            href={link.href}
                            className="linkler-button"
                            target={link.external ? '_blank' : undefined}
                            rel={link.external ? 'noopener noreferrer' : undefined}
                        >
                            <span className="linkler-btn-icon-container">
                                {renderIcon(link.icon)}
                            </span>
                            <span className="linkler-btn-content">
                                <span className="linkler-btn-title">{link.title}</span>
                                <span className="linkler-btn-subtitle">{link.subtitle}</span>
                            </span>
                            <span className="linkler-btn-arrow">
                                <ChevronRightIcon />
                            </span>
                        </a>
                    ))}
                </div>

                {/* Footer text */}
                <div className="linkler-footer">
                    <p className="linkler-footer-text">
                        © 2026 Kuleli Akademi. Tüm hakları saklıdır.
                    </p>
                </div>
            </div>
        </div>
        </>
    );
};

// Custom layout: full page without navbar/footer for Instagram bio link
Linkler.layout = (page) => (
    <main className="linkler-main-layout">
        {page}
    </main>
);

export default Linkler;
