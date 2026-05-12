import React, { useEffect } from "react";
import { Link } from "@inertiajs/react";
import Banner from "../Banner/Banner";
import { getServiceBySlug, getServiceContact, servicesData } from "../../data/servicesData";
import "./ServiceDetail.scss";

const ServiceNotFound = ({ slug }) => {
    useEffect(() => {
        document.title = "Hizmet bulunamadı | Kuleli Akademi";

        let metaDescription = document.querySelector('meta[name="description"]');
        if (!metaDescription) {
            metaDescription = document.createElement("meta");
            metaDescription.name = "description";
            document.head.appendChild(metaDescription);
        }
        metaDescription.content = "Aradığınız hizmet sayfası bulunamadı.";
    }, []);

    return (
        <section className="service-detail-page service-detail-page--not-found">
            <div className="service-detail-shell">
                <div className="service-detail-not-found-card">
                    <p className="service-detail-eyebrow">404</p>
                    <h1 className="service-detail-not-found-title">Hizmet bulunamadı</h1>
                    <p className="service-detail-not-found-text">
                        Aradığınız hizmet sayfası mevcut değil ya da adresi değişmiş olabilir.
                    </p>
                    <div className="service-detail-not-found-actions">
                        <Link href="/" className="service-detail-primary-link">
                            Ana sayfaya dön
                        </Link>
                        <Link href="/egitimlerimiz" className="service-detail-secondary-link">
                            Hizmetler bölümüne dön
                        </Link>
                    </div>
                    <p className="service-detail-not-found-slug">Aranan slug: {slug}</p>
                </div>
            </div>
        </section>
    );
};

const ServiceSidebar = ({ service }) => {
    const whatsappContact = getServiceContact(service);
    const whatsappMessage = service.whatsappMessage || whatsappContact.message;
    const whatsappHref = `${whatsappContact.url}?text=${encodeURIComponent(whatsappMessage)}`;

    return (
        <aside className="service-detail-sidebar" aria-label="Hizmet yan menüsü">
            <div className="service-detail-sidebar-card service-detail-sidebar-services-card">
                <h3 className="service-detail-sidebar-title">Hizmetlerimiz</h3>
                <nav className="service-detail-service-nav" aria-label="Tüm hizmetler">
                    {servicesData.map((item) => {
                        const isActive = item.slug === service.slug;
                        return (
                            <Link
                                key={item.slug}
                                href={`/hizmetler/${item.slug}`}
                                className={`service-detail-service-link${isActive ? " is-active" : ""}`}
                                aria-current={isActive ? "page" : undefined}
                            >
                                <span>{item.title}</span>
                                <span className="service-detail-service-link-arrow" aria-hidden="true">
                                    &rsaquo;
                                </span>
                            </Link>
                        );
                    })}
                </nav>
            </div>

            <div
                className="service-detail-sidebar-card service-detail-sidebar-cta"
                style={{
                    backgroundImage: `linear-gradient(135deg, rgba(20,35,55,0.42), rgba(255,255,255,0.06)), url(${service.ctaImage || service.detailImage})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                }}
            >
                <div className="service-detail-sidebar-cta-inner">
                    <p className="service-detail-sidebar-eyebrow">BU HİZMET HAKKINDA BİLGİ ALIN</p>
                    <h3 className="service-detail-sidebar-cta-title">{service.ctaTitle}</h3>
                    <p className="service-detail-sidebar-copy">{service.ctaText}</p>
                    <a
                        href={whatsappHref}
                        className="service-detail-sidebar-button"
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        WhatsApp’tan Yaz
                    </a>
                    <p className="service-detail-sidebar-whatsapp-number">{whatsappContact.number}</p>
                </div>
            </div>

            <div className="service-detail-sidebar-card service-detail-sidebar-info">
                <h3 className="service-detail-sidebar-title">Kısa bilgi</h3>
                <p className="service-detail-sidebar-copy">{service.sidebarShortInfo}</p>
            </div>
        </aside>
    );
};

const ServiceDetail = ({ serviceSlug }) => {
    const service = getServiceBySlug(serviceSlug);

    useEffect(() => {
        if (!service) {
            document.title = "Hizmet bulunamadı | Kuleli Akademi";
            return;
        }

        document.title = `${service.title} | Kuleli Akademi`;

        let metaDescription = document.querySelector('meta[name="description"]');
        if (!metaDescription) {
            metaDescription = document.createElement("meta");
            metaDescription.name = "description";
            document.head.appendChild(metaDescription);
        }
        metaDescription.content = `${service.title} süreci için Kuleli Akademi ile evrak, randevu, başvuru ve takip adımlarını planlı şekilde yönetin.`;
    }, [service]);

    if (!service) {
        return <ServiceNotFound slug={serviceSlug} />;
    }

    return (
        <section className="service-detail-page" aria-labelledby="service-detail-title">
            <Banner
                wrapperClassName="service-detail-banner"
                text={service.title}
                subtitle={service.subtitle}
                img={service.bannerImage}
                responsiveImg={service.bannerImage}
                location={service.title}
            />

            <div className="service-detail-shell">
                <div className="service-detail-layout">
                    <article className="service-detail-main">
                        <div className="service-detail-image-card">
                            <img
                                src={service.detailImage}
                                alt={service.title}
                                className="service-detail-image"
                                style={{ objectPosition: service.detailObjectPosition || "center" }}
                            />
                        </div>

                        <div className="service-detail-summary-grid">
                            {service.highlights.map((highlight, index) => (
                                <div key={highlight} className="service-detail-summary-item">
                                    <span className="service-detail-summary-kicker">
                                        {String(index + 1).padStart(2, "0")}
                                    </span>
                                    <p>{highlight}</p>
                                </div>
                            ))}
                        </div>

                        <div className="service-detail-section">
                            <p className="service-detail-eyebrow">Bu hizmet nedir?</p>
                            <h2 id="service-detail-title" className="service-detail-title">
                                {service.introTitle}
                            </h2>
                            <div className="service-detail-copy-block">
                                {service.introParagraphs.map((paragraph) => (
                                    <p key={paragraph}>{paragraph}</p>
                                ))}
                            </div>
                        </div>

                        <div className="service-detail-section">
                            <p className="service-detail-eyebrow">Süreç nasıl ilerliyor?</p>
                            <ol className="service-detail-step-list">
                                {service.processSteps.map((step, index) => (
                                    <li key={step} className="service-detail-step-item">
                                        <span className="service-detail-step-index">
                                            {String(index + 1).padStart(2, "0")}
                                        </span>
                                        <p>{step}</p>
                                    </li>
                                ))}
                            </ol>
                        </div>

                        <div className="service-detail-section">
                            <p className="service-detail-eyebrow">Bu hizmet kapsamında neler var?</p>
                            <ul className="service-detail-checklist">
                                {service.documentsOrRequirements.map((item) => (
                                    <li key={item} className="service-detail-checklist-item">
                                        <span className="service-detail-checkmark" aria-hidden="true">
                                            ✓
                                        </span>
                                        <span>{item}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        <div className="service-detail-cta-card">
                            <div className="service-detail-cta-copy">
                                <p className="service-detail-eyebrow">Başvuru desteği</p>
                                <h3 className="service-detail-cta-title">{service.ctaTitle}</h3>
                                <p className="service-detail-cta-text">{service.ctaText}</p>
                            </div>
                            <a
                                href={service.ctaHref}
                                className="service-detail-primary-link"
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                {service.ctaButtonText}
                            </a>
                        </div>
                    </article>

                    <ServiceSidebar service={service} />
                </div>
            </div>
        </section>
    );
};

export default ServiceDetail;
