import React from "react";
import SEOHead from '../components/SEOHead/SEOHead';
import { generateCanonical, getPageMetadata } from '../utils/seoHelpers';
import ContactPage from "../components/contactPage/contactPage";

export default function Iletisim() {
    const pageSeo = getPageMetadata('/iletişim');

    return (
        <>
            <SEOHead
                title={pageSeo.title}
                description={pageSeo.description}
                url={generateCanonical('/iletişim')}
                type={pageSeo.type}
            />
            <ContactPage />
        </>
    );
}
