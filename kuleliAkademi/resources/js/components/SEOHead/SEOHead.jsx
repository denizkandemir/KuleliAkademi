import React from 'react';
import { Head } from '@inertiajs/react';
import {
  generateTitle,
  generateDescription,
  generateCanonical,
  generateOGTags,
  generateTwitterTags,
  siteConfig,
} from '../../utils/seoHelpers';

/**
 * SEO Head Component - Manages all meta tags, canonical URLs, and structured data
 * Usage: <SEOHead {...pageMetadata} />
 */
export default function SEOHead({
  title,
  description,
  image,
  url,
  type = 'website',
  schema = null,
  noindex = false,
}) {
  const headTitle = generateTitle(title);
  const headDescription = generateDescription(description || siteConfig.siteDescription);
  const canonicalUrl = url || (typeof window !== 'undefined' ? generateCanonical(window.location.pathname) : generateCanonical('/'));

  const ogTags = generateOGTags({
    title: headTitle,
    description: headDescription,
    type,
    url: canonicalUrl,
    image: image || siteConfig.ogImage,
  });

  const twitterTags = generateTwitterTags({
    title: headTitle,
    description: headDescription,
    image: image || siteConfig.ogImage,
  });

  return (
    <Head title={headTitle}>
      <meta name="description" content={headDescription} />
      <meta name="robots" content={noindex ? 'noindex, follow' : 'index, follow'} />
      <link rel="canonical" href={canonicalUrl} />

      {Object.entries(ogTags).map(([key, value]) => (
        <meta key={key} property={key} content={value} />
      ))}

      {Object.entries(twitterTags).map(([key, value]) => (
        <meta key={key} name={key} content={value} />
      ))}

      {schema ? (
        <script
          id="seo-schema"
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
      ) : null}
    </Head>
  );
}
