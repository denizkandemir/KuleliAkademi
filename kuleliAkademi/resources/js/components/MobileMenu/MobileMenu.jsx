import React, { useEffect, useState } from "react";
import { Link, usePage } from "@inertiajs/react";
import "./MobileMenu.scss";
import { contactConfig, getPrimaryWhatsappLineForPath } from "../../config/contactConfig";
import { studyAbroadMenu } from "../../data/destinationsData";

const MobileMenu = ({ isOpen, onClose }) => {
    const { url, props } = usePage();
    const navServices = props.navServices || [];
    const navItems = [
        { label: "Hakkımızda", href: "/hakkımızda" },
        { label: "Aliağa Dersleri", href: "/egitimlerimiz" },
        { label: "Başvuru", href: "/basvuru" },
        { label: "İletişim", href: "/iletişim" },
    ];
    const whatsappLine = getPrimaryWhatsappLineForPath(url);

    const [servicesOpen, setServicesOpen] = useState(false);
    const [abroadOpen, setAbroadOpen] = useState(false);

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
                        {/* Yurt Dışında Eğitim collapsible */}
                        <li className={`mobile-menu-item mobile-services ${abroadOpen ? "is-open" : ""}`}>
                            <button
                                type="button"
                                className="mobile-menu-link mobile-services-toggle"
                                onClick={() => setAbroadOpen((s) => !s)}
                                aria-expanded={abroadOpen}
                            >
                                Yurt Dışında Eğitim
                            </button>

                            <ul className="mobile-services-list" aria-hidden={!abroadOpen}>
                                {studyAbroadMenu.map((item) => (
                                    <li key={item.label} className="mobile-services-item">
                                        {item.href ? (
                                            <Link href={item.href} className="mobile-menu-link" onClick={handleLinkClick}>
                                                {item.label}
                                            </Link>
                                        ) : (
                                            <span className="mobile-menu-link is-disabled" aria-disabled="true">
                                                {item.label} · {item.tag}
                                            </span>
                                        )}
                                    </li>
                                ))}
                            </ul>
                        </li>

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
                                Polonya Hizmetleri
                            </button>

                            <ul className="mobile-services-list" aria-hidden={!servicesOpen}>
                                {navServices.map((service) => (
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
                    <a href={whatsappLine.href} className="mobile-menu-cta" {...contactConfig.linkAttrs.external} onClick={handleLinkClick}>
                        WhatsApp: {whatsappLine.title}
                    </a>
                </div>
            </aside>
        </>
    );
};

export default MobileMenu;
