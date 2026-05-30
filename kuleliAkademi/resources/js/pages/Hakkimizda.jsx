import React from "react";
import SEOHead from '../components/SEOHead/SEOHead';
import { OrganizationSchema } from '../components/SchemaMarkup/SchemaMarkup';
import { generateCanonical, getPageMetadata, siteConfig } from '../utils/seoHelpers';

export default function Hakkimizda() {
    const pageSeo = getPageMetadata('/hakkımızda');

    return (
        <>
            <SEOHead
                title={pageSeo.title}
                description={pageSeo.description}
                url={generateCanonical('/hakkımızda')}
                type={pageSeo.type}
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
