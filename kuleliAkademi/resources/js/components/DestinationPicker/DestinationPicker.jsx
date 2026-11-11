import React from "react";
import { Link } from "@inertiajs/react";
import "./DestinationPicker.scss";
import { destinationCards } from "../../data/destinationsData";

// Ülke / program seçimi kartları. Ana sayfada ve /yurtdışıeğitim merkez sayfasında kullanılır.
const DestinationPicker = ({
    eyebrow = "Ülke ve Program Seçimi",
    title = "Hangi Yolu Düşünüyorsunuz?",
    description = "Polonya’da üniversite, İspanya’da dil okulu ya da üniversiteye hazırlık. Hedefinize uygun programı seçin, süreci birlikte planlayalım.",
    titleId = "destination-picker-title",
}) => {
    return (
        <section className="destination-picker" aria-labelledby={titleId}>
            <div className="destination-picker-shell">
                <header className="destination-picker-header">
                    <p className="destination-picker-eyebrow">{eyebrow}</p>
                    <h2 id={titleId} className="destination-picker-title">{title}</h2>
                    {description ? <p className="destination-picker-description">{description}</p> : null}
                </header>

                <ul className="destination-picker-grid">
                    {destinationCards.map((card) => {
                        const isSoon = card.status === "soon";

                        return (
                            <li key={card.id} className={`destination-card${isSoon ? " is-soon" : ""}`}>
                                <div className="destination-card-media">
                                    <img src={card.image} alt={card.imageAlt} loading="lazy" />
                                    <span className="destination-card-country">{card.country}</span>
                                    {isSoon ? <span className="destination-card-badge">Yakında</span> : null}
                                </div>

                                <div className="destination-card-body">
                                    <p className="destination-card-program">{card.program}</p>
                                    <h3 className="destination-card-title">{card.title}</h3>
                                    <p className="destination-card-text">{card.description}</p>

                                    {!isSoon && card.highlights?.length ? (
                                        <ul className="destination-card-highlights">
                                            {card.highlights.map((item) => (
                                                <li key={item}>{item}</li>
                                            ))}
                                        </ul>
                                    ) : null}

                                    <Link href={card.href} className="destination-card-link">
                                        {card.cta}
                                        <span aria-hidden="true">→</span>
                                    </Link>
                                </div>
                            </li>
                        );
                    })}
                </ul>
            </div>
        </section>
    );
};

export default DestinationPicker;
