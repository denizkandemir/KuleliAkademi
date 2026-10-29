import React from 'react';
import SEOHead from '../components/SEOHead/SEOHead';
import ContactPage from '../components/contactPage/contactPage';
import { generateCanonical, getPageMetadata } from '../utils/seoHelpers';

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
      <ContactPage formAction="/iletişim" />
    </>
  );
}
