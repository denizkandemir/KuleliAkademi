import React, { useState } from "react";
import "./Navbar.scss";
const kuleliLogoGold = "/storage/images/kuleliLogoGold.webp";
import { Link, usePage } from "@inertiajs/react";
import MobileMenu from "../MobileMenu/MobileMenu";
import { contactConfig } from "../../config/contactConfig";
import { servicesData } from "../../data/servicesData";

const Navbar = () => {
    const { url } = usePage();
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [servicesOpen, setServicesOpen] = useState(false);

    const navItems = [
        // { label: "Hakkımızda", href: "/hakkımızda" },
        { label: "Eğitimlerimiz", href: "/egitimlerimiz" },
        { label: "Yurt Dışında Eğitim", href: "/yurtdışıeğitim" },
        { label: "Üniversiteler", href: "/üniversiteler" },
        { label: "İletişim", href: "/iletişim" },
    ];

    return (
        <header className="navbar-container">
            <div className="navbar-shell">
                <Link href="/" className="brand-block" aria-label="Kuleli Akademi ana sayfa">
                    <img src={kuleliLogoGold} className="kuleli-logo" alt="Kuleli Akademi logosu" />
                    <div className="brand-copy">
                        <p className="brand-title">Kuleli Akademi</p>
                        <p className="brand-subtitle">Yurt Dışı Eğitim Danışmanlığı</p>
                    </div>
                </Link>

                <nav className="navbar-center-container" aria-label="Ana menü">
                    <ul className="navbar-links-container">
                        {navItems.map((item) => {
                            const isActive = item.href === "/" ? url === "/" : url.startsWith(item.href);

                            return (
                                <li key={item.href}>
                                    <Link className={`navbar-link${isActive ? " is-active" : ""}`} href={item.href}>
                                        {item.label}
                                    </Link>
                                </li>
                            );
                        })}

                        {/* Hizmetlerimiz dropdown */}
                        <li
                            className={`navbar-dropdown ${servicesOpen ? " is-open" : ""}`}
                            onMouseEnter={() => setServicesOpen(true)}
                            onMouseLeave={() => setServicesOpen(false)}
                        >
                            <button
                                type="button"
                                className={`navbar-link dropdown-trigger`}
                                onClick={(e) => {
                                    e.preventDefault();
                                    setServicesOpen((s) => !s);
                                }}
                                aria-haspopup="true"
                                aria-expanded={servicesOpen}
                            >
                                Hizmetlerimiz
                            </button>

                            <div className="dropdown-menu navbar-service-dropdown" role="menu">
                                <ul className="dropdown-list">
                                    {servicesData.map((service) => (
                                        <li key={service.slug} className="dropdown-list-item">
                                            <Link
                                                href={`/hizmetler/${service.slug}`}
                                                className="navbar-service-dropdown-item"
                                            >
                                                <span className="navbar-service-dropdown-title">{service.title || service.name}</span>
                                                <span className="navbar-service-dropdown-line" aria-hidden="true" />
                                            </Link>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </li>
                    </ul>
                </nav>

                <div className="navbar-right-container" aria-label="Sosyal medya baglantilari">
                    <a href={contactConfig.social.instagram.url} className="social-icon" aria-label="Instagram" {...contactConfig.linkAttrs.external}>
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M12 2.163C15.204 2.163 15.584 2.175 16.85 2.233C20.102 2.381 21.621 3.924 21.769 7.152C21.827 8.417 21.838 8.797 21.838 12.001C21.838 15.206 21.826 15.585 21.769 16.85C21.62 20.075 20.105 21.621 16.85 21.769C15.584 21.827 15.206 21.839 12 21.839C8.796 21.839 8.416 21.827 7.151 21.769C3.891 21.62 2.38 20.07 2.232 16.849C2.174 15.584 2.162 15.205 2.162 12C2.162 8.796 2.175 8.417 2.232 7.151C2.381 3.924 3.896 2.38 7.151 2.232C8.417 2.175 8.796 2.163 12 2.163ZM12 0C8.741 0 8.333 0.014 7.053 0.072C2.695 0.272 0.273 2.69 0.073 7.052C0.014 8.333 0 8.741 0 12C0 15.259 0.014 15.668 0.072 16.948C0.272 21.306 2.69 23.728 7.052 23.928C8.333 23.986 8.741 24 12 24C15.259 24 15.668 23.986 16.948 23.928C21.302 23.728 23.73 21.31 23.927 16.948C23.986 15.668 24 15.259 24 12C24 8.741 23.986 8.333 23.928 7.053C23.732 2.699 21.311 0.273 16.949 0.073C15.668 0.014 15.259 0 12 0ZM12 5.838C8.597 5.838 5.838 8.597 5.838 12C5.838 15.403 8.597 18.163 12 18.163C15.403 18.163 18.162 15.404 18.162 12C18.162 8.597 15.403 5.838 12 5.838ZM12 16C9.791 16 8 14.21 8 12C8 9.791 9.791 8 12 8C14.209 8 16 9.791 16 12C16 14.21 14.209 16 12 16ZM18.406 4.155C17.61 4.155 16.965 4.8 16.965 5.595C16.965 6.39 17.61 7.035 18.406 7.035C19.201 7.035 19.845 6.39 19.845 5.595C19.845 4.8 19.201 4.155 18.406 4.155Z" fill="#24364d" />
                        </svg>
                    </a>

                    <a href={contactConfig.whatsapp.aliaga.url} className="social-icon" aria-label="WhatsApp" {...contactConfig.linkAttrs.external}>
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M20.52 3.477A11.81 11.81 0 0 0 12.113 0C5.61 0 .315 5.294.315 11.797c0 2.079.544 4.106 1.578 5.896L0 24l6.472-1.858a11.78 11.78 0 0 0 5.642 1.438h.005c6.502 0 11.798-5.294 11.798-11.798 0-3.151-1.23-6.113-3.397-8.305Zm-8.406 18.11h-.004a9.82 9.82 0 0 1-5.005-1.372l-.359-.213-3.84 1.102 1.117-3.744-.234-.383A9.83 9.83 0 0 1 2.29 11.8c0-5.418 4.407-9.826 9.825-9.826 2.625 0 5.093 1.022 6.95 2.878a9.77 9.77 0 0 1 2.88 6.949c-.002 5.419-4.41 9.826-9.83 9.826Zm5.39-7.354c-.294-.147-1.737-.857-2.006-.955-.268-.098-.463-.147-.659.147-.196.294-.758.955-.929 1.151-.17.196-.342.221-.636.074-.294-.147-1.239-.457-2.36-1.458-.872-.777-1.461-1.737-1.633-2.03-.171-.294-.018-.452.129-.598.132-.132.294-.343.441-.514.147-.171.196-.294.294-.49.098-.196.05-.368-.025-.515-.073-.147-.659-1.59-.904-2.177-.238-.57-.48-.492-.659-.502l-.56-.01c-.196 0-.514.074-.782.368-.269.294-1.027 1.003-1.027 2.447 0 1.444 1.052 2.839 1.198 3.035.147.196 2.072 3.165 5.018 4.437.701.302 1.248.483 1.674.618.703.224 1.342.193 1.848.117.563-.084 1.737-.71 1.982-1.396.244-.686.244-1.274.171-1.396-.073-.122-.268-.196-.562-.343Z" fill="#24364d" />
                        </svg>
                    </a>

                    <a href={contactConfig.social.facebook.url} className="social-icon" aria-label="Facebook" {...contactConfig.linkAttrs.external}>
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M24 12.073C24 5.405 18.627 0 12 0S0 5.405 0 12.073C0 18.1 4.388 23.094 10.125 24V15.564H7.078V12.073H10.125V9.405C10.125 6.348 11.917 4.688 14.658 4.688C15.97 4.688 17.344 4.922 17.344 4.922V7.875H15.83C14.34 7.875 13.875 8.8 13.875 9.75V12.073H17.203L16.671 15.564H13.875V24C19.612 23.094 24 18.1 24 12.073Z" fill="#24364d" />
                        </svg>
                    </a>

                    <button
                        className="navbar-hamburger"
                        onClick={() => setMobileMenuOpen(true)}
                        aria-label="Menüyü aç"
                        type="button"
                    >
                        <svg width="26" height="26" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M3 12H21M3 6H21M3 18H21" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                    </button>
                </div>

                <MobileMenu isOpen={mobileMenuOpen} onClose={() => setMobileMenuOpen(false)} />
            </div>
        </header>
    );
};

export default Navbar;