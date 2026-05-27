/**
 * Image Alt Text Guide and Standards
 * Ensures all images have descriptive alt attributes for SEO and accessibility
 */

export const imageAltTexts = {
    // Service Detail Page Images
    services: {
        'okul-basvurusu': {
            banner: 'Polonya üniversite başvurusu, başarılı öğrenciler ve kampüs görüntüsü',
            detail: 'Polonya üniversite başvurusu süreci görseli',
        },
        'vize-basvurusu': {
            banner: 'Polonya öğrenci vizesi belgeleri ve süreci görseli',
            detail: 'Polonya vize başvurusu evrakları',
        },
        'karsilama-ve-yerlesim': {
            banner: 'Polonya\'da öğrenci karşılaması ve yerleşim hizmeti',
            detail: 'Polonya\'da öğrenci oryantasyonu',
        },
        'konaklama-destegi': {
            banner: 'Polonya\'da öğrenci konaklama seçenekleri',
            detail: 'Polonya üniversite yurtları ve konaklama',
        },
        'oturum-izni': {
            banner: 'Polonya oturum izni ve residence card belgesi',
            detail: 'Polonya residence card başvuru süreci',
        },
        'sehir-ve-uyum-destegi': {
            banner: 'Polonya şehirleri ve sosyal uyum desteği',
            detail: 'Polonya şehirlerinde yaşam ve kültür',
        },
    },

    // Homepage Images
    homepage: {
        header: 'Kuleli Akademi - Polonya üniversite danışmanlığı',
        universities: 'Polonya üniversiteleri ve kampüsleri',
        services: 'Polonya eğitim danışmanlığı hizmetleri',
        process: 'Başvuru süreci adımları',
        contact: 'İletişim formu ve danışma hizmeti',
    },

    // General Images
    logo: 'Kuleli Akademi logosu',
    favicon: 'Kuleli Akademi favicon',
    ogImage: 'Polonya üniversite danışmanlığı - Kuleli Akademi',

    // Navigation and UI
    navbar: 'Navigasyon menüsü',
    footer: 'Site altbilgisi',
};

/**
 * Component for Image with proper SEO attributes
 * Usage: <SEOImage src="image.webp" alt="descriptive alt text" />
 */
export const SEOImageProps = {
    /**
     * Generate optimal image props for SEO
     */
    getProps: (src, alt, options = {}) => ({
        src,
        alt, // Required for SEO and accessibility
        loading: options.lazy ? 'lazy' : 'eager', // Lazy load non-critical images
        decoding: 'async',
        width: options.width,
        height: options.height,
        srcSet: options.srcSet,
        title: options.title || alt, // Tooltip on hover
    }),

    /**
     * Preload critical images
     */
    preload: (src, options = {}) => ({
        rel: 'preload',
        as: 'image',
        href: src,
        ...options,
    }),

    /**
     * Generate multiple image sources for responsive loading
     */
    responsive: (imagePath, formats = ['webp', 'jpeg']) => {
        const baseName = imagePath.split('.')[0];
        return formats.map(format => ({
            srcSet: `${baseName}.${format} 1x, ${baseName}@2x.${format} 2x`,
            type: `image/${format}`,
        }));
    },
};

/**
 * Guidelines for adding alt text to images
 */
export const altTextGuidelines = {
    rules: [
        'Be descriptive but concise (2-8 words typically)',
        'Include keywords naturally, but don\'t keyword stuff',
        'Don\'t start with "image of" or "picture of"',
        'Include context that helps understand the image',
        'For logos, use brand name + "logo"',
        'For screenshots, describe what\'s being shown',
        'For icons, describe their purpose/meaning',
        'For decorative images only, use empty alt="" (skip aria-label)',
        'For important images, keep alt under 100 characters',
    ],

    examples: [{
            bad: 'image1.webp',
            good: 'Polonya üniversite kampüsü ve öğrenciler',
        },
        {
            bad: 'Picture of students in Poland',
            good: 'Varsova üniversitesinde İnsan Kaynakları bölümü öğrencileri',
        },
        {
            bad: 'logo',
            good: 'Kuleli Akademi logosu',
        },
        {
            bad: 'document',
            good: 'Polonya öğrenci vizesi başvuru formu',
        },
    ],
};

/**
 * Lighthouse Image SEO Recommendations
 */
export const imagePerformanceOptimization = {
    recommendations: [
        'Use modern image formats (WebP) with fallbacks',
        'Implement lazy loading for below-fold images',
        'Optimize image file sizes (compress before upload)',
        'Use responsive images with srcset',
        'Add aspect-ratio CSS to prevent layout shift',
        'Preload critical images (hero images)',
        'Use <picture> element for art direction',
        'Generate multiple sizes for different screen sizes',
        'Use CDN for image delivery',
        'Add proper image metadata (title, description)',
    ],

    sizes: {
        thumbnail: '200x200px',
        card: '300x300px',
        banner: '1200x400px',
        hero: '1920x1080px',
        social: '1200x630px', // OG image
    },
};