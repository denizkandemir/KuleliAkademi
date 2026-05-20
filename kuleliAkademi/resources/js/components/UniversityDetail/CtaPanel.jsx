import React from "react";
import "./CtaPanel.scss";
import applyImg from "../../assets/images/servicesDetailImg3.png";


import { FaWhatsapp } from "react-icons/fa";


const CtaPanel = ({ service, serviceContact }) => {
    const whatsappHref = `https://wa.me/${serviceContact?.whatsapp || "905555555555"}`;

    return (
        <section className="service-detail-modern-cta-uni" aria-label="Hizmet desteği">
            <div className="service-detail-modern-cta-media" aria-hidden="true">
                <img
                    src={applyImg}
                    // alt={service.title}
                    className="service-detail-modern-cta-image"
                    
                />
                <div className="service-detail-modern-cta-media-overlay" />
            </div>


            <div className="service-detail-modern-cta-panel">
                <div className="service-detail-modern-cta-panel-inner">
                    <p className="service-detail-modern-cta-badge">
                        {/* <MdInfoOutline aria-hidden="true" /> */}
                        <span>BU HİZMET HAKKINDA BİLGİ ALIN</span>
                    </p>

                    <h3 className="service-detail-modern-cta-title">
                        {service?.ctaTitle || "Uzman Ekibimizle İletişime Geçin"}
                    </h3>

                    <div
                        className="service-detail-modern-cta-divider"
                        aria-hidden="true"
                    />

                    <div className="service-detail-modern-cta-copy">
                        <p>
                            Başvuru formunu doldurarak okul seçimi, bölüm analizi,
                            belge hazırlığı ve tüm süreç planlamasında size yardımcı
                            olabiliriz.
                        </p>
                    </div>

                    <div className="service-detail-modern-cta-button-wrap">
                        <a
                            href={whatsappHref}
                            className="service-detail-modern-cta-button"
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            {/* <FaWhatsapp
                            aria-hidden="true"
                            className="service-detail-modern-cta-button-icon"
                        /> */}

                            <span>WhatsApp’tan Yaz</span>

                            {/* <MdArrowForward
                            aria-hidden="true"
                            className="service-detail-modern-cta-button-arrow"
                        /> */}
                        </a>
                    </div>

                    <div className="service-detail-modern-cta-contact">
                        <div
                            className="service-detail-modern-cta-contact-icon"
                            aria-hidden="true"
                        >
                            {/* <MdCall /> */}
                        </div>

                        <div className="service-detail-modern-cta-contact-copy">
                            <strong>
                                {serviceContact?.number || "+90 555 555 55 55"}
                            </strong>

                            <span>Hafta içi 09:00 - 18:00</span>
                        </div>
                    </div>

                    <div className="service-detail-modern-cta-security">
                        {/* <MdShieldOutlined
                        aria-hidden="true"
                        className="service-detail-modern-cta-security-icon"
                    /> */}

                        <p>
                            Bilgileriniz gizlidir. Sadece sizinle iletişime geçmek
                            için kullanılır.
                        </p>
                    </div>
                </div>
            </div>
        </section>

    );
};

export default CtaPanel;