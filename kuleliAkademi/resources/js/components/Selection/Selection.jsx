import "./Selection.scss";
import React from "react";
import abroadImg from "../../assets/images/headerImg6.png";
import educationImg from "../../assets/images/headerImg14.png";
import kuleliLogoGold from "../../assets/images/kuleliLogoGold.png";
import { useState } from "react";

const Selection = ({ onLocalSelect, onGlobalSelect }) => {
    const [activePanel, setActivePanel] = useState("none");

    return (
        <section className="selection-section" aria-labelledby="selection-title">
            <div className="selection-shell">
                <header className="selection-intro">
                    <div className="selection-titles-container">
                        <p className="selection-eyebrow">Eğitim ve Danismanlik</p>
                        <h2 id="selection-title" className="selection-title">
                            Kuleli Akademi
                        </h2>
                    </div>

                    <p className="selection-lead">
                        Kuleli Akademi, hem Turkiye&apos;de yuz yuze akademik destek hem de yurt disi egitim surecinde
                        rehberlik sunan butunlesik bir danismanlik deneyimi sunar.
                    </p>
                </header>

                <div
                    className={`selection-split ${activePanel !== "none" ? "is-panel-active" : ""} ${activePanel === "left" ? "is-left-active" : ""} ${activePanel === "right" ? "is-right-active" : ""}`.trim()}
                    onMouseLeave={() => setActivePanel("none")}
                >


                    <article
                        className="selection-panel selection-panel-right"
                        onMouseEnter={() => setActivePanel("right")}
                        onFocus={() => setActivePanel("right")}
                        onBlur={() => setActivePanel("none")}
                    >
                        <img src={abroadImg} alt="Yurt disi egitim danismanligi" className="selection-panel-media" />
                        <span className="selection-panel-overlay" aria-hidden="true" />

                        <div className="selection-panel-content">
                            <p className="selection-panel-label">Yurt Disi Egitim Danismanligi</p>
                            <h3 className="selection-panel-title">Yurt Disi Egitim Danismanligi</h3>
                            <p className="selection-panel-text">Basvuru, kabul ve yerlesim surecinde profesyonel yonlendirme.</p>
                            <button type="button" className="selection-panel-link" onClick={onGlobalSelect}>
                                Danismanligi Kesfet
                            </button>
                        </div>
                    </article>

                    <article
                        className="selection-panel selection-panel-left"
                        onMouseEnter={() => setActivePanel("left")}
                        onFocus={() => setActivePanel("left")}
                        onBlur={() => setActivePanel("none")}
                    >
                        <img src={educationImg} alt="Turkiye'de yuz yuze egitim destegi" className="selection-panel-media" />
                        <span className="selection-panel-overlay" aria-hidden="true" />

                        <div className="selection-panel-content">
                            <p className="selection-panel-label">Turkiye&apos;de Egitim Destegi</p>
                            <h3 className="selection-panel-title">Turkiye&apos;de Yuz Yuze Egitim</h3>
                            <p className="selection-panel-text">Kisiye ozel akademik planlama ve surekli birebir takip.</p>
                            <button type="button" className="selection-panel-link" onClick={onLocalSelect}>
                                Programlari Incele
                            </button>
                        </div>
                    </article>

                    <div className="selection-center-badge" aria-hidden="true">
                        <span className="selection-center-pulse" />
                        <span className="selection-center-pulse is-secondary" />
                        <span className="selection-center-core">
                            <img src={kuleliLogoGold} alt="" className="selection-center-logo" />
                        </span>
                    </div>
                </div>
            </div>
        </section>

    );
};

export default Selection;