import React from "react";
import { Link } from "@inertiajs/react";
import "./AbroadSections.scss";

// Yurt dışı sayfalarında (merkez, Polonya, İspanya, dil okulları) ortak kullanılan içerik blokları.

export const AbroadSection = ({ id, eyebrow, title, description, children, tone = "light", titleId }) => {
    const headingId = titleId || (id ? `${id}-title` : undefined);

    return (
        <section id={id} className={`abroad-section abroad-section--${tone}`} aria-labelledby={headingId}>
            <div className="abroad-section-shell">
                {(eyebrow || title || description) && (
                    <header className="abroad-section-header">
                        {eyebrow ? <p className="abroad-section-eyebrow">{eyebrow}</p> : null}
                        {title ? <h2 id={headingId} className="abroad-section-title">{title}</h2> : null}
                        {description ? <p className="abroad-section-description">{description}</p> : null}
                    </header>
                )}
                {children}
            </div>
        </section>
    );
};

export const InfoCardGrid = ({ cards = [], columns = "auto" }) => (
    <ul className={`abroad-card-grid abroad-card-grid--${columns}`}>
        {cards.map((card) => (
            <li key={card.id || card.title} className="abroad-card">
                {card.meta ? <p className="abroad-card-meta">{card.meta}</p> : null}
                <h3 className="abroad-card-title">{card.title}</h3>
                {card.text ? <p className="abroad-card-text">{card.text}</p> : null}
                {card.items?.length ? (
                    <ul className="abroad-card-list">
                        {card.items.map((item) => (
                            <li key={item}>{item}</li>
                        ))}
                    </ul>
                ) : null}
                {card.footnote ? <p className="abroad-card-footnote">{card.footnote}</p> : null}
                {card.href ? (
                    <Link href={card.href} className="abroad-card-link">
                        {card.linkLabel || "Detaylar"} <span aria-hidden="true">→</span>
                    </Link>
                ) : null}
            </li>
        ))}
    </ul>
);

export const ComparisonTable = ({ caption, columns = [], rows = [] }) => (
    <div className="abroad-table-wrap" role="region" aria-label={caption} tabIndex={0}>
        <table className="abroad-table">
            {caption ? <caption>{caption}</caption> : null}
            <thead>
                <tr>
                    {columns.map((column) => (
                        <th key={column} scope="col">{column}</th>
                    ))}
                </tr>
            </thead>
            <tbody>
                {rows.map((row) => (
                    <tr key={row[0]}>
                        {row.map((cell, index) =>
                            index === 0 ? (
                                <th key={index} scope="row">{cell}</th>
                            ) : (
                                <td key={index}>{cell}</td>
                            )
                        )}
                    </tr>
                ))}
            </tbody>
        </table>
    </div>
);

export const NoteBox = ({ title, children }) => (
    <div className="abroad-note" role="note">
        {title ? <p className="abroad-note-title">{title}</p> : null}
        <div className="abroad-note-body">{children}</div>
    </div>
);

export const CtaBand = ({ title, text, primary, secondary }) => (
    <div className="abroad-cta">
        <div className="abroad-cta-copy">
            <p className="abroad-cta-title">{title}</p>
            {text ? <p className="abroad-cta-text">{text}</p> : null}
        </div>
        <div className="abroad-cta-actions">
            {primary ? (
                <Link href={primary.href} className="abroad-cta-button abroad-cta-button--primary">
                    {primary.label}
                </Link>
            ) : null}
            {secondary ? (
                <a href={secondary.href} className="abroad-cta-button" target="_blank" rel="noopener noreferrer">
                    {secondary.label}
                </a>
            ) : null}
        </div>
    </div>
);
