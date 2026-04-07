import React from "react";
import Navbar from "./components/Navbar/Navbar";
import Footer from "./components/Footer/Footer";
import ScrollToTop from "./hooks/ScrollToTop";

export default function Layout({ children }) {
    return (
        <>
            <ScrollToTop />
            <Navbar />
            <main>{children}</main>
            <Footer />
        </>
    );
}