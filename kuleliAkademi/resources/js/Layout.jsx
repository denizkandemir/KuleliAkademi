import React from "react";
import Navbar from "./components/Navbar/Navbar";
import Footer from "./components/Footer/Footer";
import StickyWhatsappWidget from "./components/StickyWhatsappWidget/StickyWhatsappWidget";
import ScrollToTop from "./hooks/ScrollToTop";

export default function Layout({ children }) {
    return (
        <>
            <ScrollToTop />
            <Navbar />
            <main role="main" className="main-content">
                {children}
            </main>
            <Footer />
            <StickyWhatsappWidget />
        </>
    );
}