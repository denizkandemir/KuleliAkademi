import "./Selection.scss";
import React from "react";
const abroadImg = "/storage/images/headerImg6.webp";
const educationImg = "/storage/images/studentsPicture6.webp";
const kuleliLogoGold = "/storage/images/kuleliLogoGold.webp";
import { useState } from "react";
import { Link, usePage } from "@inertiajs/react";

const Selection = ({ onLocalSelect, onGlobalSelect }) => {
    const [activePanel, setActivePanel] = useState("none");

    return (
        <section className="selection-section" aria-labelledby="selection-title">
            <div className="selection-shell">
                <header className="selection-intro">
                    <div className="selection-titles-container">
                        <p className="selection-eyebrow">Eğitim ve Danışmanlık</p>
                        <h2 id="selection-title" className="selection-title">
                            Kuleli Akademi
                        </h2>
                    </div>

                    <p className="selection-lead">
                        Kuleli Akademi, hem Türkiye&apos;de yüz yüze akademik destek hem de yurt dışı eğitim sürecinde
                        rehberlik sunan bütünleşik bir danışmanlık deneyimi sunar.
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
                        <img src={abroadImg} alt="Yurt dışı eğitim danışmanlığı" className="selection-panel-media selection-panel-media-right" />
                        <span className="selection-panel-overlay" aria-hidden="true" />

                        <div className="selection-panel-content">
                            <p className="selection-panel-label"> Eğitim ve Danışmanlık </p>
                            <h3 className="selection-panel-title">Yurt Dışı Eğitim Danışmanlığı</h3>
                            <p className="selection-panel-text">Polonya’da üniversite, İspanya’da dil okulu ve üniversiteye hazırlık; yakında Malta.</p>
                            <Link href={"/yurtdışıeğitim"} className="selection-panel-link" onClick={onGlobalSelect}>
                                Danışmanlığı Keşfet
                            </Link>
                        </div>
                    </article>

                    <article
                        className="selection-panel selection-panel-left"
                        onMouseEnter={() => setActivePanel("left")}
                        onFocus={() => setActivePanel("left")}
                        onBlur={() => setActivePanel("none")}
                    >
                        <img src={educationImg} alt="Aliağa'da yüz yüze eğitim desteği" className="selection-panel-media selection-panel-media-left" />
                        <span className="selection-panel-overlay" aria-hidden="true" />

                        <div className="selection-panel-content">
                            <p className="selection-panel-label">Aliağa&apos;da Eğitim Desteği</p>
                            <h3 className="selection-panel-title">Türkiye&apos;de Yüz Yüze Eğitim</h3>
                            <p className="selection-panel-text">LGS hazırlık, ortaokul ve akademik destek; birebir takip.</p>
                            <Link href={"/egitimlerimiz"} className="selection-panel-link" onClick={onLocalSelect}>
                                Programları İncele
                            </Link>
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
            </div >
        </section >

    );
};

export default Selection;