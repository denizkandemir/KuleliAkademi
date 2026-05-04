import React from "react";
import "./EducationProcessTimeline.scss";
import timelineImg1 from "../../assets/images/timelineImg1.png";
import timelineImg3 from "../../assets/images/timelineImg3.png";
import timelineImg4 from "../../assets/images/timelineImg4.png";
import timelineImg5 from "../../assets/images/timelineImg5.png";
import timelineImg6 from "../../assets/images/timelineImg6.png";
import timelineImg7 from "../../assets/images/timelineImg7.png";

const steps = [
    {
        id: 1,
        badge: "01",
        title: "Mevcut Düzey ve Hedef Analizi",
        description: "Öğrencinin akademik durumu, ihtiyaçları ve hedefleri birlikte değerlendirilir.",
        image: timelineImg1
    },
    {
        id: 2,
        badge: "02",
        title: "Kişiye Özel Akademik Plan",
        description: "Seviye ve ihtiyaçlara göre yapılandırılmış çalışma sistemi oluşturulur.",
        image: timelineImg3
    },
    {
        id: 3,
        badge: "03",
        title: "Haftalık Çalışma ve Ödev Takibi",
        description: "Düzenli planlar ve takip sistemiyle istikrarlı ilerleme desteklenir.",
        image: timelineImg4
    },
    {
        id: 4,
        badge: "04",
        title: "Koçluk ve Rehberlik Desteği",
        description: "Motivasyon, zaman yönetimi ve bireysel yönlendirme sürece eşlik eder.",
        image: timelineImg5
    },
    {
        id: 5,
        badge: "05",
        title: "Deneme ve Performans Analizi",
        description: "Sonuçlar detaylı biçimde analiz edilerek gelişim alanları belirlenir.",
        image: timelineImg6
    },
    {
        id: 6,
        badge: "06",
        title: "Gelişim Raporlama ve Güncelleme",
        description: "Süreç veriye dayalı olarak güncellenir, öğrenci ve veli ile paylaşılır.",
        image: timelineImg7
    }
];

export default function EducationProcessTimeline() {
    return (
        <section className="education-process-timeline">
            <div className="education-process-timeline-shell">
                <div className="education-process-timeline-intro">
                    <p className="education-process-timeline-eyebrow">SÜREÇ MODELİMİZ</p>
                    <h2 className="education-process-timeline-title">
                        Kuleli Akademi’de süreç planlı ve aşamalı ilerler
                    </h2>
                    <p className="education-process-timeline-description">
                        Her öğrencinin ihtiyaçları doğrultusunda şekillenen eğitim modeli; analiz, planlama, takip, ölçme ve gelişim raporlaması adımlarıyla sistemli biçimde yürütülür.
                    </p>
                </div>

                <div className="education-process-list">
                    {steps.map((step, index) => {
                        const isReversed = index % 2 === 1;

                        return (
                            <article
                                key={step.id}
                                className={`education-process-row ${isReversed ? "is-reversed" : ""}`}
                            >
                                <div className="education-process-row-copy">
                                    <div className="education-process-row-meta">
                                        <span className="education-process-row-badge">{step.badge}</span>
                                        <span className="education-process-row-kicker">Adım {step.badge}</span>
                                    </div>
                                    <h3 className="education-process-row-title">{step.title}</h3>
                                    <p className="education-process-row-description">{step.description}</p>
                                </div>

                                <div className="education-process-row-visual">
                                    <div
                                        className="education-process-number"
                                        style={{
                                            backgroundImage: `url(${step.image})`
                                        }}
                                    >
                                        <span className="education-process-number-shadow">{step.badge}</span>
                                        <span className="education-process-number-fill">{step.badge}</span>
                                    </div>
                                </div>
                            </article>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}
