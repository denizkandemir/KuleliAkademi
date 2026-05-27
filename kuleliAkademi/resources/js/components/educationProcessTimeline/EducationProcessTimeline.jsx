import React from "react";
import "./EducationProcessTimeline.scss";
import timelineImg1 from "../../assets/images/numberPicture1.webp";
import timelineImg3 from "../../assets/images/numberPicture2.webp";
import timelineImg4 from "../../assets/images/numberPicture3.webp";
import timelineImg5 from "../../assets/images/numberPicture7.webp";
import timelineImg6 from "../../assets/images/numberPicture5.webp";
import timelineImg7 from "../../assets/images/numberPicture6.webp";

const steps = [
    {
        id: 1,
        badge: "01",
        title: "Mevcut Düzey ve Hedef Analizi",
        description: "Öğrencinin akademik durumu, öğrenme alışkanlıkları, güçlü yönleri ve gelişim alanları birlikte değerlendirilir. Bu ilk adımda hedefler netleştirilir, yol haritasının temeli veriye dayalı biçimde oluşturulur.",
        image: timelineImg1,
        imagePosition: "center 28%"
    },
    {
        id: 2,
        badge: "02",
        title: "Kişiye Özel Akademik Plan",
        description: "Değerlendirme sonucuna göre ders, konu ve tekrar dengesi kurulur. Öğrencinin seviyesine ve hedefine uygun bir akademik plan oluşturularak sürecin ritmi kişiselleştirilir.",
        image: timelineImg3,
        imagePosition: "center 42%"
    },
    {
        id: 3,
        badge: "03",
        title: "Haftalık Çalışma ve Ödev Takibi",
        description: "Haftalık programlar, ödev akışı ve tekrar düzeni yakından izlenir. Bu sayede öğrencinin istikrarlı ilerlemesi korunur ve planın dışına çıkmadan sürekli gelişim sağlanır.",
        image: timelineImg4,
        imagePosition: "center 34%"
    },
    {
        id: 4,
        badge: "04",
        title: "Koçluk ve Rehberlik Desteği",
        description: "Motivasyon, zaman yönetimi, çalışma alışkanlığı ve kişisel yönlendirme süreç boyunca desteklenir. Öğrencinin sürece bağlı kalmasını sağlayan rehberlik, düzenli temasla sürdürülür.",
        image: timelineImg5,
        imagePosition: "center 44%"
    },
    {
        id: 5,
        badge: "05",
        title: "Deneme ve Performans Analizi",
        description: "Türkiye geneli denemeler ve konu bazlı ölçümler detaylı şekilde incelenir. Sonuçlar yalnızca puan olarak değil, gelişim alanlarını görünür kılan bir analiz diliyle değerlendirilir.",
        image: timelineImg6,
        imagePosition: "center 38%"
    },
    {
        id: 6,
        badge: "06",
        title: "Gelişim Raporlama ve Güncelleme",
        description: "Tüm süreç düzenli raporlanır, veli ve öğrenciyle şeffaf biçimde paylaşılır. Elde edilen veriler doğrultusunda plan güncellenir ve bir sonraki aşama netleştirilir.",
        image: timelineImg7,
        imagePosition: "center 36%"
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
                                            backgroundImage: `url(${step.image})`,
                                            backgroundPosition: step.imagePosition || "center center"
                                        }}
                                    >
                                        <span className="education-process-number-outline">{step.badge}</span>
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
