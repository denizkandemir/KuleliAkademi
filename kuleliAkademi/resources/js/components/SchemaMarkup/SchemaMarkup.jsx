import React from 'react';
import { useEffect } from 'react';

/**
 * Schema Markup Component - Adds JSON-LD structured data to page
 * Handles different schema types: Organization, Service, BreadcrumbList, WebSite, etc.
 */
export function SchemaMarkup({ schema, id = 'schema-markup' }) {
  useEffect(() => {
    if (!schema) return;

    let script = document.querySelector(`script[id="${id}"]`);
    if (!script) {
      script = document.createElement('script');
      script.id = id;
      script.type = 'application/ld+json';
      document.head.appendChild(script);
    }

    script.textContent = JSON.stringify(schema);

    return () => {
      // Keep schema markup
    };
  }, [schema, id]);

  return null;
}

/**
 * Breadcrumb Schema Component
 */
export function BreadcrumbSchema({ items }) {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  };

  return <SchemaMarkup schema={schema} id="breadcrumb-schema" />;
}

/**
 * Organization Schema Component
 */
export function OrganizationSchema({
  name,
  url,
  logo,
  description,
  contactEmail,
  sameAs = [],
}) {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'EducationalOrganization',
    name,
    url,
    logo,
    description,
    contactPoint: {
      '@type': 'ContactPoint',
      contactType: 'Customer Support',
      email: contactEmail,
    },
    sameAs,
  };

  return <SchemaMarkup schema={schema} id="organization-schema" />;
}

/**
 * Service Schema Component - For service detail pages
 */
export function ServiceSchema({
  name,
  description,
  provider,
  areaServed = ['TR', 'PL'],
}) {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name,
    description,
    provider: {
      '@type': 'EducationalOrganization',
      ...provider,
    },
    areaServed,
    serviceType: 'Education Consulting',
  };

  return <SchemaMarkup schema={schema} id="service-schema" />;
}

/**
 * WebPage Schema Component - Represents the current page
 */
export function WebPageSchema({
  name,
  description,
  url,
  datePublished,
  dateModified,
}) {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name,
    description,
    url,
  };

  if (datePublished) {
    schema.datePublished = datePublished;
  }

  if (dateModified) {
    schema.dateModified = dateModified;
  }

  return <SchemaMarkup schema={schema} id="webpage-schema" />;
}

/**
 * FAQPage Schema Component - For FAQ sections
 */
export function FAQSchema({ faqs }) {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map(item => ({
      '@type': 'Question',
      name: item.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: item.answer,
      },
    })),
  };

  return <SchemaMarkup schema={schema} id="faq-schema" />;
}

/**
 * ImageObject Schema - For images (SEO)
 */
export function ImageSchema({
  url,
  caption,
  description,
  width,
  height,
}) {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'ImageObject',
    url,
    caption,
    description,
    width,
    height,
  };

  return <SchemaMarkup schema={schema} id="image-schema" />;
}
