import React from "react";
import "./HomepageContact.scss";
const contactImg = "/storage/images/studentTransparentImg.webp";
import { contactConfig } from "../../config/contactConfig";
import { Link, usePage } from "@inertiajs/react";

const HomepageContact = () => {
    const highlights = [
        {
            id:1,
            text:  "Üniversite başvurusu ve vize sürecinde planlı danışmanlık",
        },
        {
            id:2,
            text: "Yüz yüze eğitim süreçlerinde birebir takip ve akademik destek",

        },
        {
            id:3,
            text: "Başvurudan yerleşime kadar güvenli süreç yönetimi",
        },
        {
            id:4,
            text: "Öğrenciye özel rota ve sürdürülebilir gelişim planı",
        }
    ];

    return (
        <section className="homepage-contact-section" aria-labelledby="homepage-contact-title">
            <div className="homepage-contact-shell">
                <div className="homepage-contact-panel">
                    <div className="homepage-contact-content">
                        <p className="homepage-contact-eyebrow">Güvenilir Eğitim Rehberliği</p>

                        <h2 id="homepage-contact-title" className="homepage-contact-title">
                            Güvenilir Danışmanlık ve Kaliteli Eğitim Desteği İçin Doğru Yerdesin
                        </h2>

                        <p className="homepage-contact-description">
                            Yurt dışı eğitim danışmanlığından yüz yüze eğitim süreçlerindeki birebir takibe kadar,
                            öğrencinin her adımını planlı, şeffaf ve profesyonel bir yaklaşımla yönetiyoruz.
                            Hedefin ne olursa olsun, süreci birlikte netleştirip güvenle ilerliyoruz.
                        </p>

                        <ul className="homepage-contact-highlights" aria-label="Hizmet güvenceleri">
                            {highlights.map((item) => (
                                <li key={item.id} className="homepage-contact-highlight-item">
                                    <span className="homepage-contact-highlight-icon" aria-hidden="true">
                                        <svg viewBox="0 0 16 16" focusable="false" aria-hidden="true">
                                            <path d="M6.5 11.2 3.6 8.3l1.1-1.1 1.8 1.8 4.7-4.7 1.1 1.1-5.8 5.8Z" />
                                        </svg>
                                    </span>
                                    <span>{item.text}</span>
                                </li>
                            ))}
                        </ul>

                        <div className="homepage-contact-cta-wrap">
                            <Link href={"/iletişim"} className="homepage-contact-cta-button">
                                Bizimle İletişime Geçin
                            </Link>
                        </div>
                    </div>

                    <div className="homepage-contact-visual" aria-hidden="true">
                        <span className="homepage-contact-visual-glow" />
                        <span className="homepage-contact-visual-ring" />
                        <img src={contactImg} alt="Kuleli Akademi iletişim ve danışmanlık görseli" className="homepage-contact-image" />
                    </div>
                </div>
            </div>
        </section>
    );
};

export default HomepageContact;