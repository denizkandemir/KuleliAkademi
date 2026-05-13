import React, { useEffect } from "react";
import { Link } from "@inertiajs/react";
import Banner from "../Banner/Banner";
import { getServiceBySlug, getServiceContact, servicesData } from "../../data/servicesData";
import "./ServiceDetail.scss";

const getDocMeta = (item = "") => {
    const text = item.toLowerCase();

    if (text.includes("pasaport") || text.includes("kimlik")) {
        return { icon: "▣", desc: "Başvuru sürecinde kimlik doğrulama için gerekir." };
    }
    if (text.includes("fotoğraf") || text.includes("biyometrik")) {
        return { icon: "▧", desc: "Güncel ve kurallara uygun görsel gerekir." };
    }
    if (text.includes("kabul")) {
        return { icon: "⌂", desc: "Üniversiteden alınan resmi kabul belgesidir." };
    }
    if (text.includes("vize")) {
        return { icon: "☷", desc: "Resmi başvuru formu eksiksiz hazırlanmalıdır." };
    }
    if (text.includes("sigorta")) {
        return { icon: "◇", desc: "Polonya’da geçerli sağlık sigortası gerekir." };
    }
    if (text.includes("finansal") || text.includes("banka")) {
        return { icon: "▤", desc: "Eğitim ve yaşam giderlerini karşılayabileceğinizi gösterir." };
    }
    if (text.includes("konaklama") || text.includes("adres")) {
        return { icon: "⌂", desc: "Konaklama yerinizi veya adres bilginizi gösterir." };
    }
    if (text.includes("uçuş")) {
        return { icon: "✈", desc: "Gidiş ve planlanan kalış süresini destekler." };
    }
    if (text.includes("diploma") || text.includes("transkript")) {
        return { icon: "□", desc: "Akademik geçmişinizi gösteren belgelerdir." };
    }

    return { icon: "☷", desc: "Başvuru sürecini tamamlayan belge kalemlerinden biridir." };
};

const getStepMeta = (index) => {
    const icons = ["◌", "▦", "□", "✈", "◇", "☏"];
    const titles = [
        "Profil Analizi",
        "Üniversite ve Bölüm Seçimi",
        "Evrak Hazırlığı",
        "Başvuru ve Takip",
        "Kabul Sonrası Planlama",
        "Süreç Boyunca Destek",
    ];

    return {
        icon: icons[index] || "◇",
        title: titles[index] || `Adım ${index + 1}`,
    };
};

const ServiceNotFound = ({ slug }) => {
    useEffect(() => {
        document.title = "Hizmet bulunamadı | Kuleli Akademi";
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
                        <Link href="/" className="service-detail-primary-link">Ana sayfaya dön</Link>
                        <Link href="/egitimlerimiz" className="service-detail-secondary-link">Hizmetler bölümüne dön</Link>
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

    if (!service) return <ServiceNotFound slug={serviceSlug} />;

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

                        <section className="service-process-section">
                            <div className="service-process-header">
                                <p className="service-detail-eyebrow">Süreç nasıl ilerliyor?</p>
                                <h2 className="service-process-title">Başvuru Süreci</h2>
                            </div>

                            <ol className="service-process-timeline">
                                {service.processSteps.map((step, index) => {
                                    const meta = getStepMeta(index);

                                    return (
                                        <li key={step} className="service-process-item">
                                            <div className="service-process-rail">
                                                <span className="service-process-badge">
                                                    {String(index + 1).padStart(2, "0")}
                                                </span>
                                            </div>

                                            <div className="service-process-card">
                                                <div className="service-process-icon">{meta.icon}</div>
                                                <div className="service-process-content">
                                                    <h3 className="service-process-card-title">{meta.title}</h3>
                                                    <p className="service-process-description">{step}</p>
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
                                {service.documentsOrRequirements.map((item) => {
                                    const meta = getDocMeta(item);

                                    return (
                                        <article key={item} className="service-document-card">
                                            <span className="service-document-check">✓</span>
                                            <div className="service-document-icon">{meta.icon}</div>
                                            <div className="service-document-content">
                                                <h3 className="service-document-title">{item}</h3>
                                                <p className="service-document-description">{meta.desc}</p>
                                            </div>
                                        </article>
                                    );
                                })}
                            </div>

                            <div className="service-documents-info">
                                <div className="service-documents-info-icon">◇</div>
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

                        <div className="service-detail-cta-card">
                            <div className="service-detail-cta-copy">
                                <p className="service-detail-eyebrow">Başvuru desteği</p>
                                <h3 className="service-detail-cta-title">{service.ctaTitle}</h3>
                                <p className="service-detail-cta-text">{service.ctaText}</p>
                            </div>
                            <a href={service.ctaHref} className="service-detail-primary-link" target="_blank" rel="noopener noreferrer">
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