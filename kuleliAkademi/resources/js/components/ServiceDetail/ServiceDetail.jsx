import React, { useEffect } from "react";
import { Link } from "@inertiajs/react";
import SEOHead from "../SEOHead/SEOHead";
import { ServiceSchema, BreadcrumbSchema } from "../SchemaMarkup/SchemaMarkup";
import { keywordMap, siteConfig, generateCanonical } from "../../utils/seoHelpers";
import Banner from "../Banner/Banner";
import "./ServiceDetail.scss";
import defaultProcessIcon from "../../assets/icons/completed-task.png";
import infoIcon from "../../assets/icons/processing.png";
const applyImg = "/storage/images/apply-section-img.webp";
import applyIcon1 from "../../assets/icons/professional-success.png";
import applyIcon2 from "../../assets/icons/folder.png";
import applyIcon3 from "../../assets/icons/iteration.png";
import { contactConfig } from "../../config/contactConfig";

const resolveWhatsappContact = (whatsappKey) => {
    const key = whatsappKey && contactConfig.whatsapp[whatsappKey] ? whatsappKey : "poland";

    return contactConfig.whatsapp[key];
};

const ServiceNotFound = ({ slug }) => {
    useEffect(() => {
        document.title = "Hizmet bulunamadı | Kuleli Akademi";
    }, []);

    return (
        <>
            <SEOHead
                title="Hizmet bulunamadı"
                description="Aradığınız hizmet sayfası mevcut değil. Kuleli Akademi'nin diğer hizmetlerine göz atın."
                noindex={true}
            />

            <section className="service-detail-page service-detail-page--not-found">
                <div className="service-detail-shell">
                    <div className="service-detail-not-found-card">
                        <p className="service-detail-eyebrow">404</p>
                        <h1 className="service-detail-not-found-title">Hizmet bulunamadı</h1>
                        <p className="service-detail-not-found-text">
                            Aradığınız hizmet sayfası mevcut değil ya da adresi değişmiş olabilir.
                        </p>
                        <div className="service-detail-not-found-actions">
                            <Link href="/" className="service-detail-primary-link">Ana sayfaya dön</Link>
                            <Link href="/egitimlerimiz" className="service-detail-secondary-link">Hizmetler bölümüne dön</Link>
                        </div>
                        <p className="service-detail-not-found-slug">Aranan slug: {slug}</p>
                    </div>
                </div>
            </section>
        </>
    );
};

const applyArray = [
    { title: "Uzman Danışmanlık", description: "Kişisel profilinize uygun yönlendirme", icon: applyIcon1 },
    { title: "Güvenli Süreç", description: "Belgelerinizin doğru hazırlanması", icon: applyIcon2 },
    { title: "Süreç Takibi", description: "Başvurunuzun her adımında bilgilendirme", icon: applyIcon3 },
];

const ServiceSidebar = ({ service, services }) => {
    const whatsappContact = resolveWhatsappContact(service.whatsapp_key);
    const whatsappHref = contactConfig.whatsapp.poland.url;
    const sidebarImage = service.images?.sidebar_widget?.url || service.images?.detail?.url;

    return (
        <aside className="service-detail-sidebar" aria-label="Hizmet yan menüsü">
            <div className="service-detail-sidebar-card service-detail-sidebar-services-card">
                <h3 className="service-detail-sidebar-title">Hizmetlerimiz</h3>
                <nav className="service-detail-service-nav" aria-label="Tüm hizmetler">
                    {services.map((item) => {
                        const isActive = item.slug === service.slug;
                        return (
                            <Link
                                key={item.slug}
                                href={`/hizmetler/${item.slug}`}
                                className={`service-detail-service-link${isActive ? " is-active" : ""}`}
                            >
                                <span>{item.title}</span>
                                <span className="service-detail-service-link-arrow">›</span>
                            </Link>
                        );
                    })}
                </nav>
            </div>

            <div
                className="service-detail-sidebar-card service-detail-sidebar-cta"
                style={{
                    backgroundImage: `linear-gradient(135deg, rgba(10,18,38,0.68), rgba(10,18,38,0.38)), url(${sidebarImage || ""})`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                }}
            >
                <div className="service-detail-sidebar-cta-inner">
                    <p className="service-detail-sidebar-eyebrow">{service.cta.eyebrow}</p>
                    <h3 className="service-detail-sidebar-cta-title">{service.cta.title}</h3>
                    <p className="service-detail-sidebar-copy">{service.cta.text}</p>
                    <a href={whatsappHref} className="service-detail-sidebar-button" target="_blank" rel="noopener noreferrer">
                        WhatsApp’tan Yaz
                    </a>
                    <p className="service-detail-sidebar-whatsapp-number">{whatsappContact.number}</p>
                </div>
            </div>

            {service.sidebar_short_info ? (
                <div className="service-detail-sidebar-card service-detail-sidebar-info">
                    <h3 className="service-detail-sidebar-title">Kısa bilgi</h3>
                    <p className="service-detail-sidebar-info-copy">{service.sidebar_short_info}</p>
                </div>
            ) : null}
        </aside>
    );
};

const ServiceDetail = ({ service, services = [], serviceSlug }) => {
    useEffect(() => {
        document.title = service ? `${service.title} | Kuleli Akademi` : "Hizmet bulunamadı | Kuleli Akademi";
    }, [service]);

    if (!service) return <ServiceNotFound slug={serviceSlug} />;

    const seoData = keywordMap[service.slug] || {
        title: `${service.title} | Kuleli Akademi`,
        description: service.short_description || "Polonya üniversite danışmanlığı hizmeti",
    };

    const canonicalUrl = generateCanonical(`/hizmetler/${service.slug}`);

    const breadcrumbs = [
        { name: "Ana Sayfa", url: siteConfig.siteUrl },
        { name: "Hizmetler", url: `${siteConfig.siteUrl}/egitimlerimiz` },
        { name: service.title, url: canonicalUrl },
    ];

    const detailImage = service.images?.detail;
    const bannerImage = service.images?.banner;
    const detailObjectPosition = detailImage?.object_position || service.detail_object_position || "center";
    const hasIntro = Boolean(service.intro_title) || service.intro_paragraphs.length > 0;

    return (
        <>
            <SEOHead
                title={seoData.title}
                description={seoData.description}
                url={canonicalUrl}
                type="article"
                image={bannerImage?.url}
            />

            <ServiceSchema
                name={service.title}
                description={service.short_description}
                provider={{
                    name: siteConfig.organizationName,
                    url: siteConfig.siteUrl,
                }}
            />

            <BreadcrumbSchema items={breadcrumbs} />

            <section className="service-detail-page" aria-labelledby="service-detail-title">
                <Banner
                    wrapperClassName="service-detail-banner"
                    text={service.title}
                    subtitle={service.subtitle}
                    img={bannerImage?.url}
                    responsiveImg={bannerImage?.url}
                    location={service.title}
                />

                <div className="service-detail-shell">
                    <div className="service-detail-layout">
                        <article className="service-detail-main">
                            {detailImage?.url ? (
                                <div className="service-detail-image-card">
                                    <img
                                        src={detailImage.url}
                                        alt={service.title}
                                        className="service-detail-image"
                                        style={{ objectPosition: detailObjectPosition }}
                                    />
                                </div>
                            ) : null}

                            {service.highlights.length > 0 ? (
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
                            ) : null}

                            {hasIntro ? (
                                <div className="service-detail-section">
                                    <p className="service-detail-eyebrow">{service.intro_eyebrow}</p>
                                    {service.intro_title ? (
                                        <h2 id="service-detail-title" className="service-detail-title">
                                            {service.intro_title}
                                        </h2>
                                    ) : null}
                                    <div className="service-detail-copy-block">
                                        {service.intro_paragraphs.map((paragraph, index) => (
                                            <p key={index}>{paragraph}</p>
                                        ))}
                                    </div>
                                </div>
                            ) : null}

                            {service.process_steps.length > 0 ? (
                                <section className="service-process-section">
                                    <div className="service-process-header">
                                        <p className="service-detail-eyebrow">{service.process_eyebrow}</p>
                                        <h2 className="service-process-title">{service.process_title}</h2>
                                    </div>

                                    <ol className="service-process-timeline">
                                        {service.process_steps.map((step, index) => (
                                            <li key={step.id} className="service-process-item">
                                                <div className="service-process-rail">
                                                    <span className="service-process-badge">
                                                        {String(index + 1).padStart(2, "0")}
                                                    </span>
                                                </div>

                                                <div className="service-process-card">
                                                    <div className="service-process-icon" aria-hidden="true">
                                                        <img src={step.icon_url || defaultProcessIcon} alt="" className="process-icon-img" />
                                                    </div>

                                                    <div className="service-process-content">
                                                        <h3 className="service-process-card-title">{step.title}</h3>
                                                        <p className="service-process-description">{step.short_description}</p>
                                                    </div>
                                                </div>
                                            </li>
                                        ))}
                                    </ol>
                                </section>
                            ) : null}

                            {service.requirements.length > 0 ? (
                                <section className="service-documents-section">
                                    <div className="service-documents-header">
                                        <p className="service-documents-eyebrow">{service.requirements_eyebrow}</p>
                                        <h2 className="service-documents-title">{service.requirements_title}</h2>
                                        {service.requirements_description ? (
                                            <p className="service-documents-description">{service.requirements_description}</p>
                                        ) : null}
                                    </div>

                                    <div className="service-documents-grid">
                                        {service.requirements.map((item) => (
                                            <article key={item.id} className="service-document-card">
                                                <span className="service-document-check" aria-hidden="true">
                                                    ✓
                                                </span>

                                                {item.icon_url ? (
                                                    <div className="service-document-icon" aria-hidden="true">
                                                        <img src={item.icon_url} alt="" className="document-icon" />
                                                    </div>
                                                ) : null}

                                                <div className="service-document-content">
                                                    <h3 className="service-document-title">{item.title}</h3>
                                                    <p className="service-document-description">{item.short_description}</p>
                                                </div>
                                            </article>
                                        ))}
                                    </div>

                                    <div className="service-documents-info">
                                        <div className="service-documents-info-icon">
                                            <img src={service.requirements_note.icon_url || infoIcon} alt="" className="document-info-img" />
                                        </div>
                                        <div>
                                            <p className="service-documents-info-title">
                                                {service.requirements_note.title}
                                            </p>
                                            <p className="service-documents-info-text">
                                                {service.requirements_note.text}
                                            </p>
                                        </div>
                                    </div>
                                </section>
                            ) : null}

                            <div className="service-detail-modern-cta">
                                <div className="service-detail-modern-cta-content">
                                    <p className="service-detail-modern-cta-eyebrow">Başvuru desteği</p>

                                    <h3 className="service-detail-modern-cta-title">{service.cta.title}</h3>

                                    <p className="service-detail-modern-cta-description">
                                        {service.cta.text}
                                    </p>

                                    <div className="service-detail-modern-cta-features">
                                        {applyArray.map((item, index) => (
                                            <div key={index} className="service-detail-modern-cta-feature">
                                                <div className="service-detail-modern-cta-feature-icon" aria-hidden="true">
                                                    <img src={item.icon} alt="" className="feature-icon-img" />
                                                </div>
                                                <div>
                                                    <h4>{item.title}</h4>
                                                    <p>{item.description}</p>
                                                </div>
                                            </div>
                                        ))}
                                    </div>

                                    <div className="service-detail-modern-cta-actions">
                                        <a
                                            href={service.cta.href}
                                            className="service-detail-modern-cta-button"
                                            target="_blank"
                                            rel="noopener noreferrer"
                                        >
                                            {service.cta.button_text}
                                        </a>
                                    </div>
                                </div>

                                <div className="service-detail-modern-cta-visual" aria-hidden="true">
                                    <img src={applyImg} alt="" className="aplly-section-img" />
                                    <div className="service-detail-modern-cta-pencil" />
                                </div>
                            </div>
                        </article>

                        <ServiceSidebar service={service} services={services} />
                    </div>
                </div>
            </section>
        </>
    );
};

export default ServiceDetail;
