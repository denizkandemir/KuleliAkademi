import React from "react";
import "./CtaPanel.scss";
import applyImg from "../../assets/images/uniDetailCtaImg5.webp";
import { FaWhatsapp } from "react-icons/fa";
import { contactConfig } from "../../config/contactConfig";


const CtaPanel = ({ service, serviceContact }) => {

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
                            href={contactConfig.whatsapp.poland.url}
                            className="service-detail-modern-cta-button"
                            target="_blank"
                            rel="noopener noreferrer"
                        >




                            <span>WhatsApp’tan Yaz</span>

                            {/* <MdArrowForward
                            aria-hidden="true"
                            className="service-detail-modern-cta-button-arrow"
                        /> */}
                        </a>
                    </div>

                    <div className="service-detail-modern-cta-contact">


                        <div className="service-detail-modern-cta-contact-copy">

                            <strong className="service-detail-modern-cta-contact-phone">


                                <div className="site-footer-social-icon"  aria-hidden="true">
                                    <svg className="site-footer-social-icon" viewBox="0 0 24 24" aria-hidden="true">
                                        <path d="M20.52 3.477A11.81 11.81 0 0 0 12.113 0C5.61 0 .315 5.294.315 11.797c0 2.079.544 4.106 1.578 5.896L0 24l6.472-1.858a11.78 11.78 0 0 0 5.642 1.438h.005c6.502 0 11.798-5.294 11.798-11.798 0-3.151-1.23-6.113-3.397-8.305Zm-8.406 18.11h-.004a9.82 9.82 0 0 1-5.005-1.372l-.359-.213-3.84 1.102 1.117-3.744-.234-.383A9.83 9.83 0 0 1 2.29 11.8c0-5.418 4.407-9.826 9.825-9.826 2.625 0 5.093 1.022 6.95 2.878a9.77 9.77 0 0 1 2.88 6.949c-.002 5.419-4.41 9.826-9.83 9.826Zm5.39-7.354c-.294-.147-1.737-.857-2.006-.955-.268-.098-.463-.147-.659.147-.196.294-.758.955-.929 1.151-.17.196-.342.221-.636.074-.294-.147-1.239-.457-2.36-1.458-.872-.777-1.461-1.737-1.633-2.03-.171-.294-.018-.452.129-.598.132-.132.294-.343.441-.514.147-.171.196-.294.294-.49.098-.196.05-.368-.025-.515-.073-.147-.659-1.59-.904-2.177-.238-.57-.48-.492-.659-.502l-.56-.01c-.196 0-.514.074-.782.368-.269.294-1.027 1.003-1.027 2.447 0 1.444 1.052 2.839 1.198 3.035.147.196 2.072 3.165 5.018 4.437.701.302 1.248.483 1.674.618.703.224 1.342.193 1.848.117.563-.084 1.737-.71 1.982-1.396.244-.686.244-1.274.171-1.396-.073-.122-.268-.196-.562-.343Z" />
                                    </svg>
                                </div>

                                {contactConfig.whatsapp.poland.number || "+48 571 578 693"}
                            </strong>

                            <span>Her gün 09:00 - 18:00</span>
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