import React from 'react';
import SEOHead from '../components/SEOHead/SEOHead';
import { OrganizationSchema } from '../components/SchemaMarkup/SchemaMarkup';
import { generateCanonical, getPageMetadata, siteConfig } from '../utils/seoHelpers';

export default function About() {
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

      <div style={{ padding: '40px', fontFamily: 'Arial' }}>
        <h1>Hakkımızda</h1>
        <p>Kuleli Akademi, Polonya üniversite danışmanlığı ve yurtdışı eğitim hizmetleri sunan uzman danışmanlık platformudur.</p>
        <p>Öğrencilerin Polonya üniversitelerine başarılı bir şekilde başvurmasından, vize almana kadar tüm adımlar boyunca profesyonel rehberlik ve destek sağlıyoruz.</p>
      </div>
    </>
  );
}
