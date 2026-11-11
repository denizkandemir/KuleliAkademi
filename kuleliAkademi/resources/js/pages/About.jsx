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
        <p>Kuleli Akademi, Aliağa&apos;da yüz yüze dersler veren ve Kuleli International adıyla yurt dışı eğitim danışmanlığı sunan bir eğitim kurumudur.</p>
        <p>Polonya&apos;da üniversite, İspanya&apos;da dil okulu ve üniversiteye hazırlık programlarında; program seçiminden başvuruya, vize dosyasından yerleşime kadar öğrencilerimize rehberlik ediyoruz.</p>
      </div>
    </>
  );
}
