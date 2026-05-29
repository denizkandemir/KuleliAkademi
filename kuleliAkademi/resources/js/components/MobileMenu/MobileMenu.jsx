import React, { useEffect, useState } from "react";
import { Link, usePage } from "@inertiajs/react";
import "./MobileMenu.scss";
import { contactConfig } from "../../config/contactConfig";
import { servicesData } from "../../data/servicesData";

const MobileMenu = ({ isOpen, onClose }) => {
    const { url } = usePage();
    const navItems = [
        { label: "Hakkımızda", href: "/hakkımızda" },
        { label: "Eğitimlerimiz", href: "/egitimlerimiz" },
        { label: "Yurt Dışında Eğitim", href: "/yurtdışıeğitim" },
        { label: "Üniversiteler", href: "/üniversiteler" },
        { label: "İletişim", href: "/iletişim" },
    ];

    const [servicesOpen, setServicesOpen] = useState(false);

    // Prevent body scroll when mobile menu is open
    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "unset";
        }

        return () => {
            document.body.style.overflow = "unset";
        };
    }, [isOpen]);

    // Close menu on ESC key
    useEffect(() => {
        const handleEsc = (e) => {
            if (e.key === "Escape" && isOpen) {
                onClose();
            }
        };

        if (isOpen) {
            document.addEventListener("keydown", handleEsc);
        }

        return () => {
            document.removeEventListener("keydown", handleEsc);
        };
    }, [isOpen, onClose]);

    const handleLinkClick = () => {
        onClose();
    };

    return (
        <>
            {/* Overlay */}
            <div
                className={`mobile-menu-overlay ${isOpen ? "is-open" : ""}`}
                onClick={onClose}
                aria-hidden="true"
            />

            {/* Sidebar Panel */}
            <aside className={`mobile-menu-panel ${isOpen ? "is-open" : ""}`} role="navigation" aria-label="Mobil menü">
                {/* Close Button */}
                <div className="mobile-menu-header">
                    <button
                        className="mobile-menu-close"
                        onClick={onClose}
                        aria-label="Menüyü kapat"
                        type="button"
                    >
                        <svg
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                d="M18 6L6 18M6 6L18 18"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            />
                        </svg>
                    </button>
                </div>

                {/* Navigation Links */}
                <nav className="mobile-menu-content">
                    <ul className="mobile-menu-links">
                        {navItems.map((item) => (
                            <li key={item.href} className="mobile-menu-item">
                                <Link
                                    href={item.href}
                                    className={`mobile-menu-link${url.startsWith(item.href) ? " is-active" : ""}`}
                                    onClick={handleLinkClick}
                                >
                                    {item.label}
                                </Link>
                            </li>
                        ))}

                        {/* Mobile services collapsible */}
                        <li className={`mobile-menu-item mobile-services ${servicesOpen ? "is-open" : ""}`}>
                            <button
                                type="button"
                                className="mobile-menu-link mobile-services-toggle"
                                onClick={() => setServicesOpen((s) => !s)}
                                aria-expanded={servicesOpen}
                            >
                                Hizmetlerimiz
                            </button>

                            <ul className="mobile-services-list" aria-hidden={!servicesOpen}>
                                {servicesData.map((service) => (
                                    <li key={service.slug} className="mobile-services-item">
                                        <Link
                                            href={`/hizmetler/${service.slug}`}
                                            className="mobile-menu-link"
                                            onClick={handleLinkClick}
                                        >
                                            {service.title}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </li>
                    </ul>
                </nav>

                {/* Footer CTA */}
                <div className="mobile-menu-footer">
                    <a href={contactConfig.whatsapp.aliaga.url} className="mobile-menu-cta" {...contactConfig.linkAttrs.external} onClick={handleLinkClick}>
                        Bizimle İletişime Geçin
                    </a>
                </div>
            </aside>
        </>
    );
};

export default MobileMenu;
