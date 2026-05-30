import React from 'react';
import SEOHead from '../components/SEOHead/SEOHead';
import { generateCanonical, getPageMetadata } from '../utils/seoHelpers';
import { contactConfig } from '../config/contactConfig';

export default function Contact() {
  const pageSeo = getPageMetadata('/iletişim');

  return (
    <>
      <SEOHead
        title={pageSeo.title}
        description={pageSeo.description}
        url={generateCanonical('/iletişim')}
        type={pageSeo.type}
      />

      <div style={{ padding: '40px', fontFamily: 'Arial' }}>
        <h1>İletişim</h1>
        <p>Polonya üniversite başvurusu ve yurtdışı eğitim hakkında sorularınız veya önerileriniz varsa, lütfen bize ulaşın.</p>
        <p>Uzman danışmanlarımız en kısa sürede yanıtlamak ve size yardımcı olmak için hazırdır.</p>
        <p>Email: {contactConfig.email}</p>
        <p>WhatsApp: {contactConfig.whatsapp.poland.number}</p>
        <p>WhatsApp: {contactConfig.whatsapp.aliaga.number}</p>
      </div>
    </>
  );
}
