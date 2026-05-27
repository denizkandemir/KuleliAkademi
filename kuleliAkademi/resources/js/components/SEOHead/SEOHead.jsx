import React, { useEffect } from 'react';
import {
  generateTitle,
  generateDescription,
  generateCanonical,
  generateOGTags,
  generateTwitterTags,
  generateOrganizationSchema,
  generateServiceSchema,
  generateBreadcrumbSchema,
  generateWebsiteSchema,
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
  // Generate canonical URL from current pathname if not provided
  const canonicalUrl = url || (typeof window !== 'undefined' ? generateCanonical(window.location.pathname) : siteConfig.siteUrl);

  // Generate OpenGraph and Twitter tags
  const ogTags = generateOGTags({
    title,
    description,
    type,
    url: canonicalUrl,
    image,
  });

  const twitterTags = generateTwitterTags({
    title,
    description,
    image,
  });

  useEffect(() => {
    // Set page title
    if (title) {
      document.title = generateTitle(title);
    }

    // Update or create meta tags
    const updateMetaTag = (name, content) => {
      let tag = document.querySelector(`meta[name="${name}"]`) ||
                document.querySelector(`meta[property="${name}"]`);

      if (!tag) {
        tag = document.createElement('meta');
        if (name.startsWith('og:') || name.startsWith('twitter:')) {
          tag.setAttribute('property', name);
        } else {
          tag.setAttribute('name', name);
        }
        document.head.appendChild(tag);
      }
      tag.content = content;
    };

    // Update standard meta tags
    updateMetaTag('description', generateDescription(description || siteConfig.siteDescription));
    updateMetaTag('keywords', 'Polonya üniversite, yurtdışı eğitim, eğitim danışmanlığı');

    // Update OpenGraph tags
    Object.entries(ogTags).forEach(([key, value]) => {
      updateMetaTag(key, value);
    });

    // Update Twitter tags
    Object.entries(twitterTags).forEach(([key, value]) => {
      updateMetaTag(key, value);
    });

    // Handle canonical link
    let canonicalLink = document.querySelector('link[rel="canonical"]');
    if (!canonicalLink) {
      canonicalLink = document.createElement('link');
      canonicalLink.rel = 'canonical';
      document.head.appendChild(canonicalLink);
    }
    canonicalLink.href = canonicalUrl;

    // Handle robots meta tag
    let robotsMeta = document.querySelector('meta[name="robots"]');
    if (noindex) {
      if (!robotsMeta) {
        robotsMeta = document.createElement('meta');
        robotsMeta.name = 'robots';
        document.head.appendChild(robotsMeta);
      }
      robotsMeta.content = 'noindex, follow';
    } else if (robotsMeta) {
      robotsMeta.remove();
    }

    // Add structured data if provided
    if (schema) {
      let schemaScript = document.querySelector('script[type="application/ld+json"]');
      if (!schemaScript) {
        schemaScript = document.createElement('script');
        schemaScript.type = 'application/ld+json';
        document.head.appendChild(schemaScript);
      }
      schemaScript.textContent = JSON.stringify(schema);
    }

    // Cleanup
    return () => {
      // Keep the canonical and meta tags as they help with SEO
    };
  }, [title, description, image, canonicalUrl, type, schema, noindex]);

  // This component only manages meta tags, doesn't render anything
  return null;
}
