import React, { useEffect } from "react";
import { Link } from "@inertiajs/react";
import SEOHead from "../SEOHead/SEOHead";
import { ServiceSchema, BreadcrumbSchema } from "../SchemaMarkup/SchemaMarkup";
import { keywordMap, siteConfig, generateCanonical } from "../../utils/seoHelpers";
import Banner from "../Banner/Banner";
import { getServiceBySlug, getServiceContact, servicesData } from "../../data/servicesData";
import "./ServiceDetail.scss";
import serviceOneProcessIcon from "../../assets/icons/completed-task.png";
import infoIcon from "../../assets/icons/processing.png";
import applyImg from "../../assets/images/apply-section-img.png";
import applyIcon1 from "../../assets/icons/professional-success.png";
import applyIcon2 from "../../assets/icons/folder.png";
import applyIcon3 from "../../assets/icons/iteration.png";
import { contactConfig } from "../../config/contactConfig";


const normalizeStep = (step, index) =>
    typeof step === "string"
        ? { title: `Adım ${index + 1}`, shortDescription: step, icon: "" }
        : {
            title: step?.title || `Adım ${index + 1}`,
            shortDescription: step?.shortDescription || "",
            icon: step?.icon || serviceOneProcessIcon,
        };

const normalizeDoc = (doc, index) =>
    typeof doc === "string"
        ? { title: doc || `Belge ${index + 1}`, shortDescription: "", icon: "" }
        : {
            title: doc?.title || `Belge ${index + 1}`,
            shortDescription: doc?.shortDescription || "",
            icon: doc?.icon || "",
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
 ]   

const ServiceSidebar = ({ service }) => {
    const whatsappContact = getServiceContact(service);
    const whatsappMessage = service.whatsappMessage || whatsappContact.message;
    const whatsappHref = contactConfig.whatsapp.poland.url;

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
                    backgroundImage: `linear-gradient(135deg, rgba(10,18,38,0.68), rgba(10,18,38,0.38)), url(${service.ctaImage || service.detailImage})`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                }}
            >
                <div className="service-detail-sidebar-cta-inner">
                    <p className="service-detail-sidebar-eyebrow">BU HİZMET HAKKINDA BİLGİ ALIN</p>
                    <h3 className="service-detail-sidebar-cta-title">{service.ctaTitle}</h3>
                    <p className="service-detail-sidebar-copy">{service.ctaText}</p>
                    <a href={whatsappHref} className="service-detail-sidebar-button" target="_blank" rel="noopener noreferrer">
                        WhatsApp’tan Yaz
                    </a>
                    <p className="service-detail-sidebar-whatsapp-number">{whatsappContact.number}</p>
                </div>
            </div>

            <div className="service-detail-sidebar-card service-detail-sidebar-info">
                <h3 className="service-detail-sidebar-title">Kısa bilgi</h3>
                <p className="service-detail-sidebar-info-copy">{service.sidebarShortInfo}</p>
            </div>
        </aside>
    );
};

const ServiceDetail = ({ serviceSlug }) => {
    const service = getServiceBySlug(serviceSlug);

    // Get SEO metadata from keyword map
    const seoData = keywordMap[serviceSlug] || {
        title: `${serviceSlug} | Kuleli Akademi`,
        description: service?.shortDescription || 'Polonya üniversite danışmanlığı hizmeti',
    };

    const canonicalUrl = generateCanonical(`/hizmetler/${serviceSlug}`);

    // Breadcrumb items for schema
    const breadcrumbs = [
        { name: 'Ana Sayfa', url: siteConfig.siteUrl },
        { name: 'Hizmetler', url: `${siteConfig.siteUrl}/egitimlerimiz` },
        { name: service?.title || 'Hizmet', url: canonicalUrl },
    ];

    const processSteps = Array.isArray(service?.processSteps) ? service.processSteps : [];
    const documentsOrRequirements = Array.isArray(service?.documentsOrRequirements) ? service.documentsOrRequirements : [];

    useEffect(() => {
        if (!service) {
            document.title = "Hizmet bulunamadı | Kuleli Akademi";
            return;
        }

        document.title = `${service.title} | Kuleli Akademi`;
    }, [service]);

    if (!service) return <ServiceNotFound slug={serviceSlug} />;

    return (
        <>
            <SEOHead
                title={seoData.title}
                description={seoData.description}
                url={canonicalUrl}
                type="article"
                image={service.bannerImage}
            />

            <ServiceSchema
                name={service.title}
                description={service.shortDescription}
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

                            <section className="service-process-section">
                                <div className="service-process-header">
                                    <p className="service-detail-eyebrow">Süreç nasıl ilerliyor?</p>
                                    <h2 className="service-process-title">Başvuru Süreci</h2>
                                </div>

                                <ol className="service-process-timeline">
                                    {processSteps.map((step, index) => {
                                        const normalizedStep = normalizeStep(step, index);

                                        return (
                                            <li key={normalizedStep.title || index} className="service-process-item">
                                                <div className="service-process-rail">
                                                    <span className="service-process-badge">
                                                        {String(index + 1).padStart(2, "0")}
                                                    </span>
                                                </div>

                                                <div className="service-process-card">
                                                    <div className="service-process-icon" aria-hidden="true">
                                                        <img src={normalizedStep.icon} alt="" className="process-icon-img" />
                                                    </div>

                                                    <div className="service-process-content">
                                                        <h3 className="service-process-card-title">{normalizedStep.title}</h3>
                                                        <p className="service-process-description">{normalizedStep.shortDescription}</p>
                                                    </div>
                                                </div>
                                            </li>
                                        );
                                    })}
                                </ol>
                            </section>

                            <section className="service-documents-section">
                                <div className="service-documents-header">
                                    <p className="service-documents-eyebrow">Bu hizmet kapsamında neler var?</p>
                                    <h2 className="service-documents-title">Gerekli Evrak ve Belgeler</h2>
                                    <p className="service-documents-description">
                                        Başvuru sürecinin sorunsuz ilerlemesi için aşağıdaki belgelerin hazırlanması gerekebilir.
                                    </p>
                                </div>

                                <div className="service-documents-grid">
                                    {documentsOrRequirements.map((doc, index) => {
                                        const normalizedDoc = normalizeDoc(doc, index);

                                        return (
                                            <article key={normalizedDoc.title || index} className="service-document-card">
                                                <span className="service-document-check" aria-hidden="true">
                                                    ✓
                                                </span>
                                                {/* 
                                            <div className="service-document-icon" aria-hidden="true">
                                                <img src={normalizedDoc.icon} alt="" className="document-icon" />
                                            </div> */}

                                                <div className="service-document-content">
                                                    <h3 className="service-document-title">{normalizedDoc.title}</h3>
                                                    <p className="service-document-description">{normalizedDoc.shortDescription}</p>
                                                </div>
                                            </article>
                                        );
                                    })}
                                </div>

                                <div className="service-documents-info">
                                    <div className="service-documents-info-icon">
                                        <img src={infoIcon} alt="" className="document-info-img" />
                                    </div>
                                    <div>
                                        <p className="service-documents-info-title">
                                            Belgelerinizin güncel ve eksiksiz olması başvurunuzun daha sağlıklı ilerlemesine yardımcı olur.
                                        </p>
                                        <p className="service-documents-info-text">
                                            Belgeler üniversiteye, başvuru dönemine ve resmi kurum taleplerine göre değişiklik gösterebilir.
                                        </p>
                                    </div>
                                </div>
                            </section>

                            <div className="service-detail-modern-cta">
                                <div className="service-detail-modern-cta-content">
                                    <p className="service-detail-modern-cta-eyebrow">Başvuru desteği</p>

                                    <h3 className="service-detail-modern-cta-title">Polonya Üniversite Başvurusu İçin Desteğimizden Yararlanın</h3>

                                    <p className="service-detail-modern-cta-description">
                                        Okul seçimi, bölüm analizi, belge hazırlığı ve başvuru sürecinizi adım adım planlayarak
                                        Polonya’da eğitim yolculuğunuzu kolaylaştırıyoruz.
                                    </p>

                                    <div className="service-detail-modern-cta-features">                            
                                            {
                                                applyArray.map((item, index) => (
                                                    <div key={index} className="service-detail-modern-cta-feature">
                                                        <div className="service-detail-modern-cta-feature-icon" aria-hidden="true">
                                                            <img src={item.icon} alt="" className="feature-icon-img" />
                                                        </div>
                                                        <div>
                                                            <h4>{item.title}</h4>
                                                            <p>{item.description}</p>
                                                        </div>
                                                    </div>
                                                ))
                                            }                   
                                    </div>

                                    <div className="service-detail-modern-cta-actions">
                                        <a
                                            href={service.ctaHref}
                                            className="service-detail-modern-cta-button"
                                            target="_blank"
                                            rel="noopener noreferrer"
                                        >
                                            {service.ctaButtonText}
                                        </a>

                                        {/* <div className="service-detail-modern-cta-note">Form açılacak ve bilgilerinizi güvenle iletebilirsiniz.</div> */}
                                    </div>
                                </div>

                                <div className="service-detail-modern-cta-visual" aria-hidden="true">

                                    <img src={applyImg} alt="" className="aplly-section-img" />
                                    <div className="service-detail-modern-cta-pencil" />
                                    {/* <div className="service-detail-modern-cta-float service-detail-modern-cta-float--top">✈</div>
                                <div className="service-detail-modern-cta-float service-detail-modern-cta-float--bottom">✓</div> */}
                                </div>
                            </div>
                        </article>

                        <ServiceSidebar service={service} />
                    </div>
                </div>
            </section>
        </>
    );
};

export default ServiceDetail;