import React from "react";
import SEOHead from '../components/SEOHead/SEOHead';
import { siteConfig } from '../utils/seoHelpers';
import ContactPage from "../components/contactPage/contactPage";

export default function Iletisim() {
    const pageTitle = 'İletişim | Kuleli Akademi';
    const pageDescription = 'Polonya üniversite başvurusu ve yurtdışı eğitim hakkında sorularınızı Kuleli Akademi iletişim formu aracılığıyla bize iletebilirsiniz.';

    return (
        <>
            <SEOHead
                title={pageTitle}
                description={pageDescription}
                url={`${siteConfig.siteUrl}/iletişim`}
                type="contact"
            />
            <ContactPage formAction="/iletişim" />
        </>
    );
}
