import React from 'react';
import SEOHead from '../components/SEOHead/SEOHead';
import { siteConfig } from '../utils/seoHelpers';

export default function Contact() {
  const pageTitle = 'İletişim | Kuleli Akademi';
  const pageDescription = 'Polonya üniversite başvurusu ve yurtdışı eğitim hakkında sorularınızı Kuleli Akademi iletişim formu aracılığıyla bize iletebilirsiniz. Uzman danışmanlarımız sizinle en kısa sürede iletişime geçecektir.';

  return (
    <>
      <SEOHead
        title={pageTitle}
        description={pageDescription}
        url={`${siteConfig.siteUrl}/contact`}
        type="contact"
      />

      <div style={{ padding: '40px', fontFamily: 'Arial' }}>
        <h1>İletişim</h1>
        <p>Polonya üniversite başvurusu ve yurtdışı eğitim hakkında sorularınız veya önerileriniz varsa, lütfen bize ulaşın.</p>
        <p>Uzman danışmanlarımız en kısa sürede yanıtlamak ve size yardımcı olmak için hazırdır.</p>
        <p>Email: {siteConfig.organizationEmail}</p>
        <p>Telefon: {siteConfig.organizationPhone}</p>
      </div>
    </>
  );
}
