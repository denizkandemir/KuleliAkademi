import React from "react";
import "./HowWeWork.scss";

const defaultSteps = [
    {
        id: 1,
        title: "İlk Görüşme",
        text: "Hedefinizi, bütçenizi, tarih planınızı ve dil seviyenizi konuşuruz. Size uygun ülke ve programı birlikte netleştiririz.",
    },
    {
        id: 2,
        title: "Program ve Okul Seçimi",
        text: "Profilinize uygun üniversite, bölüm ya da dil okulunu; şehir, süre ve konaklama seçenekleriyle karşılaştırırız.",
    },
    {
        id: 3,
        title: "Başvuru ve Vize Dosyası",
        text: "Başvuru evrakını hazırlar, başvuruları takip eder, vize dosyanız ve randevu sürecinizde yanınızda oluruz.",
    },
    {
        id: 4,
        title: "Varış ve Yerleşim",
        text: "Konaklama, ulaşım ve ilk günler için planlama yaparız. Polonya'da oturum izni ve yerleşim desteği de veriyoruz.",
    },
];

// Genel süreç adımları (ana sayfa ve yurt dışı merkez sayfası)
const HowWeWork = ({
    eyebrow = "Nasıl Çalışıyoruz",
    title = "Başvurudan Yerleşime Dört Adım",
    note = "Kabul kararını üniversite ya da okul, vize kararını konsolosluk verir. Biz bu süreçte dosyanızın eksiksiz ve zamanında hazırlanmasına yardımcı oluyoruz.",
    steps = defaultSteps,
    titleId = "how-we-work-title",
}) => {
    return (
        <section className="how-we-work" aria-labelledby={titleId}>
            <div className="how-we-work-shell">
                <header className="how-we-work-header">
                    <p className="how-we-work-eyebrow">{eyebrow}</p>
                    <h2 id={titleId} className="how-we-work-title">{title}</h2>
                </header>

                <ol className="how-we-work-steps">
                    {steps.map((step, index) => (
                        <li key={step.id} className="how-we-work-step">
                            <span className="how-we-work-step-number" aria-hidden="true">
                                {String(index + 1).padStart(2, "0")}
                            </span>
                            <h3 className="how-we-work-step-title">{step.title}</h3>
                            <p className="how-we-work-step-text">{step.text}</p>
                        </li>
                    ))}
                </ol>

                {note ? <p className="how-we-work-note">{note}</p> : null}
            </div>
        </section>
    );
};

export default HowWeWork;
