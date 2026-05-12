import React, { useState, useEffect, useRef } from "react";
import "./StickyWhatsappWidget.scss";
import { contactConfig } from "../../config/contactConfig";

// WhatsApp Icon Component
const WhatsAppIcon = () => (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M20.52 3.477A11.81 11.81 0 0 0 12.113 0C5.61 0 .315 5.294.315 11.797c0 2.079.544 4.106 1.578 5.896L0 24l6.472-1.858a11.78 11.78 0 0 0 5.642 1.438h.005c6.502 0 11.798-5.294 11.798-11.798 0-3.151-1.23-6.113-3.397-8.305Zm-8.406 18.11h-.004a9.82 9.82 0 0 1-5.005-1.372l-.359-.213-3.84 1.102 1.117-3.744-.234-.383A9.83 9.83 0 0 1 2.29 11.8c0-5.418 4.407-9.826 9.825-9.826 2.625 0 5.093 1.022 6.95 2.878a9.77 9.77 0 0 1 2.88 6.949c-.002 5.419-4.41 9.826-9.83 9.826Zm5.39-7.354c-.294-.147-1.737-.857-2.006-.955-.268-.098-.463-.147-.659.147-.196.294-.758.955-.929 1.151-.17.196-.342.221-.636.074-.294-.147-1.239-.457-2.36-1.458-.872-.777-1.461-1.737-1.633-2.03-.171-.294-.018-.452.129-.598.132-.132.294-.343.441-.514.147-.171.196-.294.294-.49.098-.196.05-.368-.025-.515-.073-.147-.659-1.59-.904-2.177-.238-.57-.48-.492-.659-.502l-.56-.01c-.196 0-.514.074-.782.368-.269.294-1.027 1.003-1.027 2.447 0 1.444 1.052 2.839 1.198 3.035.147.196 2.072 3.165 5.018 4.437.701.302 1.248.483 1.674.618.703.224 1.342.193 1.848.117.563-.084 1.737-.71 1.982-1.396.244-.686.244-1.274.171-1.396-.073-.122-.268-.196-.562-.343Z" fill="#25D366" />
    </svg>
);

// Contacts Data
const whatsappContacts = [
    {
        id: 1,
        title: contactConfig.whatsapp.poland.context,
        phone: contactConfig.whatsapp.poland.number,
        phoneRaw: contactConfig.whatsapp.poland.number.replace(/\D/g, ""),
        message: contactConfig.whatsapp.poland.message
    },
    {
        id: 2,
        title: contactConfig.whatsapp.aliaga.context,
        phone: contactConfig.whatsapp.aliaga.number,
        phoneRaw: contactConfig.whatsapp.aliaga.number.replace(/\D/g, ""),
        message: contactConfig.whatsapp.aliaga.message
    }
];

const StickyWhatsappWidget = () => {
    const [isOpen, setIsOpen] = useState(false);
    const widgetRef = useRef(null);

    // Toggle widget open/close
    const toggleWidget = () => {
        setIsOpen(!isOpen);
    };

    // Handle click on contact item
    const handleContactClick = (phoneRaw, message) => {
        const encodedMessage = encodeURIComponent(message);
        const waUrl = `https://wa.me/${phoneRaw}?text=${encodedMessage}`;
        window.open(waUrl, "_blank", "noopener,noreferrer");
        setIsOpen(false);
    };

    // Handle click outside to close
    useEffect(() => {
        const handleClickOutside = (e) => {
            if (widgetRef.current && !widgetRef.current.contains(e.target)) {
                setIsOpen(false);
            }
        };

        if (isOpen) {
            document.addEventListener("mousedown", handleClickOutside);
            document.addEventListener("touchstart", handleClickOutside);
        }

        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
            document.removeEventListener("touchstart", handleClickOutside);
        };
    }, [isOpen]);

    return (
        <div className="sticky-whatsapp-widget" ref={widgetRef}>
            {/* Main WhatsApp Button */}
            <button
                className={`whatsapp-main-button ${isOpen ? "is-active" : ""}`}
                onClick={toggleWidget}
                aria-label="WhatsApp iletişim menüsü"
                aria-expanded={isOpen}
            >
                <WhatsAppIcon />
            </button>

            {/* Contacts Container */}
            {isOpen && (
                <div className="whatsapp-contacts-container">
                    {whatsappContacts.map((contact, index) => (
                        <button
                            key={contact.id}
                            className="whatsapp-contact-item"
                            style={{
                                animationDelay: `${index * 0.08}s`,
                            }}
                            onClick={() => handleContactClick(contact.phoneRaw, contact.message)}
                            aria-label={`${contact.title} - ${contact.phone}`}
                        >
                            <div className="contact-info">
                                <span className="contact-title">{contact.title}</span>
                                <span className="contact-phone">{contact.phone}</span>
                            </div>
                        </button>
                    ))}
                </div>
            )}
        </div>
    );
};

export default StickyWhatsappWidget;
