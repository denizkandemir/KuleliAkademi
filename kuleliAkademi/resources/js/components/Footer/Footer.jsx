import React from "react";
import { Link } from "@inertiajs/react";
import "./Footer.scss";
import kuleliLogoGold from "../../assets/images/kuleliLogoGold.png";

const Footer = () => {
    const menuItems = [
        { label: "Hakkımızda", href: "/hakkımızda" },
        { label: "Eğitimlerimiz", href: "/egitimlerimiz" },
        { label: "Yurt Dışında Eğitim", href: "/yurtdışıeğitim" },
        { label: "İletişim", href: "/iletişim" },
    ];

    const socialItems = [
        {
            label: "Instagram",
            account: "kuleli",
            href: "#",
            icon: (
                <svg viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.585-.069 4.85-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.058 1.645-.07 4.849-.07Zm0-2.163c-3.259 0-3.667.014-4.947.072C2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947C23.732 2.699 21.311.273 16.949.073 15.668.014 15.259 0 12 0Zm0 5.838A6.162 6.162 0 0 0 5.838 12 6.162 6.162 0 0 0 12 18.163 6.162 6.162 0 0 0 18.162 12 6.162 6.162 0 0 0 12 5.838Zm0 10.162A4 4 0 0 1 8 12a4 4 0 1 1 8 0 4 4 0 0 1-4 4Zm6.406-11.845a1.44 1.44 0 1 0 0 2.88 1.44 1.44 0 0 0 0-2.88Z" />
                </svg>
            ),
        },
        {
            label: "LinkedIn",
            account: "kuleli",
            href: "#",
            icon: (
                <svg viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286ZM5.337 7.433a2.062 2.062 0 1 1 0-4.128 2.062 2.062 0 0 1 0 4.128ZM7.119 20.452H3.555V9h3.564v11.452ZM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003Z" />
                </svg>
            ),
        },
        {
            label: "Facebook",
            account: "kuleli",
            href: "#",
            icon: (
                <svg viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M24 12.073C24 5.405 18.627 0 12 0S0 5.405 0 12.073c0 6.027 4.388 11.021 10.125 11.927v-8.436H7.078v-3.491h3.047V9.405c0-3.057 1.792-4.717 4.533-4.717 1.312 0 2.686.234 2.686.234v2.953H15.83c-1.49 0-1.955.925-1.955 1.875v2.323h3.328l-.532 3.491h-2.796V24C19.612 23.094 24 18.1 24 12.073Z" />
                </svg>
            ),
        },
    ];

    return (
        <footer className="site-footer" aria-label="Site alt bilgisi">
            <div className="site-footer-shell">
                <div className="site-footer-grid">
                    <section className="site-footer-brand" aria-label="Marka bilgisi">
                        <Link href="/" className="site-footer-brand-link" aria-label="Kuleli Akademi ana sayfa">
                            <img src={kuleliLogoGold} alt="Kuleli Akademi logosu" className="site-footer-logo" />
                            <div className="site-footer-brand-copy">
                                <p className="site-footer-brand-name">Kuleli Akademi</p>
                                <p className="site-footer-brand-tag">Yurt Dışı Eğitim Danışmanlığı</p>
                            </div>
                        </Link>
                        <p className="site-footer-brand-note">
                            Yurt dışı eğitim ve öğrenci odaklı akademik rehberlik için güvenilir yol arkadaşı.
                        </p>
                    </section>

                    <nav className="site-footer-column" aria-label="Footer menü">
                        <h3 className="site-footer-title">Menü</h3>
                        <ul className="site-footer-links">
                            {menuItems.map((item) => (
                                <li key={item.href}>
                                    <Link href={item.href} className="site-footer-link">
                                        {item.label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </nav>

                    <section className="site-footer-column" aria-label="Sosyal medya">
                        <h3 className="site-footer-title">Sosyal Medya</h3>
                        <ul className="site-footer-social-list">
                            {socialItems.map((item) => (
                                <li key={item.label}>
                                    <a href={item.href} className="site-footer-social-link" aria-label={item.label}>
                                        <span className="site-footer-social-icon">{item.icon}</span>
                                        <span className="site-footer-social-text">
                                            <strong>{item.label}</strong>
                                            <small>@{item.account}</small>
                                        </span>
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </section>

                    <section className="site-footer-column site-footer-contact" aria-label="Hızlı iletişim">
                        <h3 className="site-footer-title">Hızlı İletişim</h3>
                        <p className="site-footer-contact-copy">
                            Sürecinle ilgili sorularını hızlıca iletin, danışmanlarımız en kısa sürede size dönüş yapsın.
                        </p>
                        <a href="#" className="site-footer-whatsapp-button" aria-label="WhatsApp ile iletişime geç">
                            <span className="site-footer-whatsapp-icon" aria-hidden="true">
                                <svg viewBox="0 0 24 24">
                                    <path d="M20.52 3.477A11.81 11.81 0 0 0 12.113 0C5.61 0 .315 5.294.315 11.797c0 2.079.544 4.106 1.578 5.896L0 24l6.472-1.858a11.78 11.78 0 0 0 5.642 1.438h.005c6.502 0 11.798-5.294 11.798-11.798 0-3.151-1.23-6.113-3.397-8.305Zm-8.406 18.11h-.004a9.82 9.82 0 0 1-5.005-1.372l-.359-.213-3.84 1.102 1.117-3.744-.234-.383A9.83 9.83 0 0 1 2.29 11.8c0-5.418 4.407-9.826 9.825-9.826 2.625 0 5.093 1.022 6.95 2.878a9.77 9.77 0 0 1 2.88 6.949c-.002 5.419-4.41 9.826-9.83 9.826Zm5.39-7.354c-.294-.147-1.737-.857-2.006-.955-.268-.098-.463-.147-.659.147-.196.294-.758.955-.929 1.151-.17.196-.342.221-.636.074-.294-.147-1.239-.457-2.36-1.458-.872-.777-1.461-1.737-1.633-2.03-.171-.294-.018-.452.129-.598.132-.132.294-.343.441-.514.147-.171.196-.294.294-.49.098-.196.05-.368-.025-.515-.073-.147-.659-1.59-.904-2.177-.238-.57-.48-.492-.659-.502l-.56-.01c-.196 0-.514.074-.782.368-.269.294-1.027 1.003-1.027 2.447 0 1.444 1.052 2.839 1.198 3.035.147.196 2.072 3.165 5.018 4.437.701.302 1.248.483 1.674.618.703.224 1.342.193 1.848.117.563-.084 1.737-.71 1.982-1.396.244-.686.244-1.274.171-1.396-.073-.122-.268-.196-.562-.343Z" />
                                </svg>
                            </span>
                            WhatsApp ile İletişime Geç
                        </a>
                    </section>
                </div>
            </div>

            <div className="site-footer-bottom">
                <p>© 2026 Kuleli Akademi. Tüm hakları saklıdır.</p>
            </div>
        </footer>
    );
};

export default Footer;