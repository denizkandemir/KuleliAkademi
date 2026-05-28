import React from 'react';
import SEOHead from '../components/SEOHead/SEOHead';
import ContactPage from '../components/contactPage/contactPage';
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
      <ContactPage formAction="/contact" />
    </>
  );
}
