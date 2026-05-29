import React from "react";
import SEOHead from '../components/SEOHead/SEOHead';
import { OrganizationSchema } from '../components/SchemaMarkup/SchemaMarkup';
import { generateCanonical, siteConfig } from '../utils/seoHelpers';

export default function Hakkimizda() {
    const pageTitle = 'Hakkımızda | Kuleli Akademi';
    const pageDescription = 'Kuleli Akademi, Polonya üniversite danışmanlığı ve yurtdışı eğitim sürecinde öğrencilere uzman rehberlik sağlayan bir platformdur.';

    return (
        <>
            <SEOHead
                title={pageTitle}
                description={pageDescription}
                url={generateCanonical('/hakkımızda')}
                type="about"
            />
            
            <OrganizationSchema
                name={siteConfig.organizationName}
                url={siteConfig.siteUrl}
                logo={siteConfig.logo}
                description={siteConfig.siteDescription}
                contactEmail={siteConfig.organizationEmail}
            />
        </>
    );
}
