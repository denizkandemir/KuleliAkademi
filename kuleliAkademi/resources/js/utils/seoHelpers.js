/**
 * SEO Helper Functions for generating metadata, canonical URLs, and structured data
 */

export const siteConfig = {
    siteName: 'Kuleli Akademi',
    siteUrl: 'https://akademikuleli.com',
    siteDescription: 'Polonya üniversite başvurusu, öğrenci vizesi ve yurtdışı eğitim danışmanlığı hizmeti sunan uzman danışmanlık platformu.',
    siteLocale: 'tr_TR',
    logo: 'https://akademikuleli.com/logo.png',
    organizationName: 'Kuleli Akademi',
    organizationEmail: 'info@akademikuleli.com',
    organizationPhone: '+90XXX-XXX-XXXX', // Update with actual phone
};

// Keyword mapping for education consultancy
export const keywordMap = {
    'okul-basvurusu': {
        title: 'Polonya Üniversite Başvurusu | Kuleli Akademi',
        description: 'Polonya üniversite başvurusu için okul seçimi, evrak hazırlığı ve başvuru takibi hizmetleri. Öğrencilerinizin başvuru dosyasını eksiksiz hazırlamada yardımcı oluyoruz.',
        keywords: ['Polonya üniversite başvurusu', 'Polonya okul seçimi', 'yurtdışı eğitim danışmanlığı', 'üniversite başvuru süreci'],
    },
    'vize-basvurusu': {
        title: 'Polonya Öğrenci Vizesi Danışmanlığı | Kuleli Akademi',
        description: 'Polonya D tipi öğrenci vizesi için belge hazırlığı, finansal evrak kontrolü ve başvuru rehberliği. Vize sürecini başarılı bir şekilde tamamlamada yardımcı oluyoruz.',
        keywords: ['Polonya öğrenci vizesi', 'vize başvurusu', 'vize belgeleri', 'Polonya vizesi'],
    },
    'karsilama-ve-yerlesim': {
        title: 'Polonya Karşılama ve Yerleşim Hizmeti | Kuleli Akademi',
        description: 'Polonya\'ya varışı sonrası karşılama, yurt/ev bulma, kayıt işlemleri ve ilk hafta rehberliği. Öğrencilerin ülkeye adaptasyonunda tam destek sağlıyoruz.',
        keywords: ['Polonya karşılama hizmeti', 'konaklama bulma', 'yer seçimi', 'öğrenci oryantasyonu'],
    },
    'konaklama-destegi': {
        title: 'Polonya Konaklama Desteği | Kuleli Akademi',
        description: 'Polonya\'da üniversite öğrencileri için konaklama sağlama, yurt başvurusu, ev kira anlaşması ve konaklama danışmanlığı.',
        keywords: ['Polonya konaklama', 'yurt bulma', 'ev kira', 'öğrenci konaklama'],
    },
    'oturum-izni': {
        title: 'Polonya Oturum İzni (Residence Card) | Kuleli Akademi',
        description: 'Polonya eğitim vizesinden sonra kart başvurusu, süresi uzatma ve yasal ikamet belgesi işlemleri. Öğrencilerin yasal statüsünü düzenlemede danışmanlık sağlıyoruz.',
        keywords: ['Polonya oturum izni', 'residence card', 'ikamet belgesi', 'uzun süreli oturum'],
    },
    'sehir-ve-uyum-destegi': {
        title: 'Polonya Şehir Rehberliği ve Uyum Desteği | Kuleli Akademi',
        description: 'Polonya\'nın farklı şehirlerinde yaşayan öğrenciler için yerleşim danışmanlığı, şehir bilgileri ve sosyal uyum desteği.',
        keywords: ['Polonya şehirler', 'uyum desteği', 'sosyal rehberlik', 'kültür adaptasyonu'],
    },
};

/**
 * Generate SEO title with character limit recommendation
 */
export const generateTitle = (pageTitle, includeSiteName = true) => {
    const title = includeSiteName ? `${pageTitle} | ${siteConfig.siteName}` : pageTitle;
    return title.length > 60 ? title.substring(0, 57) + '...' : title;
};

/**
 * Generate SEO description (140-160 chars optimal)
 */
export const generateDescription = (description) => {
    if (description.length > 160) {
        return description.substring(0, 157) + '...';
    }
    return description;
};

/**
 * Generate canonical URL
 */
export const generateCanonical = (pathname) => {
    return `${siteConfig.siteUrl}${pathname}`.replace(/\/$/, '') || siteConfig.siteUrl;
};

/**
 * Generate OpenGraph tags object
 */
export const generateOGTags = (data) => {
    return {
        'og:title': data.title || siteConfig.siteName,
        'og:description': data.description || siteConfig.siteDescription,
        'og:type': data.type || 'website',
        'og:url': data.url || siteConfig.siteUrl,
        'og:image': data.image || `${siteConfig.siteUrl}/og-image.png`,
        'og:site_name': siteConfig.siteName,
        'og:locale': siteConfig.siteLocale,
    };
};

/**
 * Generate Twitter Card tags object
 */
export const generateTwitterTags = (data) => {
    return {
        'twitter:card': data.card || 'summary_large_image',
        'twitter:title': data.title || siteConfig.siteName,
        'twitter:description': data.description || siteConfig.siteDescription,
        'twitter:image': data.image || `${siteConfig.siteUrl}/og-image.png`,
        'twitter:site': data.site || '@KuleliAkademi', // Update with actual Twitter handle
    };
};

/**
 * Generate Organization schema markup
 */
export const generateOrganizationSchema = () => {
    return {
        '@context': 'https://schema.org',
        '@type': 'EducationalOrganization',
        name: siteConfig.organizationName,
        description: siteConfig.siteDescription,
        url: siteConfig.siteUrl,
        logo: siteConfig.logo,
        sameAs: [
            'https://www.facebook.com/kuleliakademi', // Update with actual social URLs
            'https://www.instagram.com/kuleliakademi',
            'https://www.linkedin.com/company/kuleliakademi',
        ],
        contactPoint: {
            '@type': 'ContactPoint',
            contactType: 'Customer Support',
            email: siteConfig.organizationEmail,
            telephone: siteConfig.organizationPhone,
        },
        address: {
            '@type': 'PostalAddress',
            addressCountry: 'TR',
            // Add actual address details
        },
    };
};

/**
 * Generate Service schema markup
 */
export const generateServiceSchema = (service) => {
    return {
        '@context': 'https://schema.org',
        '@type': 'Service',
        name: service.title,
        description: service.shortDescription,
        provider: {
            '@type': 'EducationalOrganization',
            name: siteConfig.organizationName,
            url: siteConfig.siteUrl,
        },
        areaServed: ['TR', 'PL'],
        serviceType: 'Education Consulting',
    };
};

/**
 * Generate breadcrumb schema
 */
export const generateBreadcrumbSchema = (items) => {
    return {
        '@context': 'https://schema.org',
        '@type': 'BreadcrumbList',
        itemListElement: items.map((item, index) => ({
            '@type': 'ListItem',
            position: index + 1,
            name: item.label,
            item: item.url,
        })),
    };
};

/**
 * Generate Website schema
 */
export const generateWebsiteSchema = () => {
    return {
        '@context': 'https://schema.org',
        '@type': 'WebSite',
        name: siteConfig.siteName,
        url: siteConfig.siteUrl,
        description: siteConfig.siteDescription,
        potentialAction: {
            '@type': 'SearchAction',
            target: {
                '@type': 'EntryPoint',
                urlTemplate: `${siteConfig.siteUrl}/search?q={search_term_string}`,
            },
            'query-input': 'required name=search_term_string',
        },
    };
};

/**
 * Get page metadata by path
 */
export const getPageMetadata = (pathname) => {
    const pathMap = {
        '/': {
            title: 'Polonya Üniversite Danışmanlığı | Kuleli Akademi',
            description: 'Polonya üniversite başvurusu, öğrenci vizesi ve yurtdışı eğitim danışmanlığı hizmeti. Öğrencilerinizin Polonya\'daki üniversitelere başvuru sürecini yönetiyoruz.',
            type: 'website',
        },
        '/about': {
            title: 'Hakkımızda | Kuleli Akademi',
            description: 'Kuleli Akademi, Polonya üniversite danışmanlığı ve yurtdışı eğitim sürecinde öğrencilere uzman rehberlik sağlayan bir platformdur.',
            type: 'about',
        },
        '/contact': {
            title: 'İletişim | Kuleli Akademi',
            description: 'Polonya üniversite başvurusu ve yurtdışı eğitim hakkında sorularınızı bize iletişim formu aracılığıyla gönderebilirsiniz.',
            type: 'contact',
        },
        '/hakkımızda': {
            title: 'Hakkımızda | Kuleli Akademi',
            description: 'Kuleli Akademi, Polonya üniversite danışmanlığı ve yurtdışı eğitim sürecinde öğrencilere uzman rehberlik sağlayan bir platformdur.',
            type: 'about',
        },
        '/iletişim': {
            title: 'İletişim | Kuleli Akademi',
            description: 'Polonya üniversite başvurusu ve yurtdışı eğitim hakkında sorularınızı bize iletişim formu aracılığıyla gönderebilirsiniz.',
            type: 'contact',
        },
        '/egitimlerimiz': {
            title: 'Hizmetlerimiz | Kuleli Akademi - Polonya Eğitim Danışmanlığı',
            description: 'Polonya üniversite başvurusu, vizesi, konaklama ve uyum desteği gibi tüm yurtdışı eğitim hizmetlerini bir arada sağlıyoruz.',
            type: 'services',
        },
        '/yurtdışıeğitim': {
            title: 'Yurtdışında Eğitim | Kuleli Akademi',
            description: 'Polonya ve Avrupa üniversitelerinde eğitim almak isteyen öğrenciler için tam danışmanlık hizmetleri sunuyoruz.',
            type: 'services',
        },
        '/linkler': {
            title: 'Linkler | Kuleli Akademi',
            description: 'Kuleli Akademi sosyal medya, iletişim ve hizmetler hakkında tüm bağlantıları. Instagram biyografisinden hızlı erişim.',
            type: 'navigation',
        },
    };

    return pathMap[pathname] || {
        title: siteConfig.siteName,
        description: siteConfig.siteDescription,
        type: 'website',
    };
};

/**
 * Generate all routes for sitemap
 */
export const getAllRoutes = () => {
    const staticRoutes = [
        { path: '/', priority: 1.0, changefreq: 'weekly' },
        { path: '/hakkımızda', priority: 0.8, changefreq: 'monthly' },
        { path: '/egitimlerimiz', priority: 0.9, changefreq: 'weekly' },
        { path: '/yurtdışıeğitim', priority: 0.8, changefreq: 'monthly' },
        { path: '/iletişim', priority: 0.7, changefreq: 'monthly' },
        { path: '/linkler', priority: 0.6, changefreq: 'monthly' },
    ];

    const serviceRoutes = [
        { slug: 'okul-basvurusu', priority: 0.9, changefreq: 'weekly' },
        { slug: 'vize-basvurusu', priority: 0.9, changefreq: 'weekly' },
        { slug: 'karsilama-ve-yerlesim', priority: 0.8, changefreq: 'weekly' },
        { slug: 'konaklama-destegi', priority: 0.8, changefreq: 'weekly' },
        { slug: 'oturum-izni', priority: 0.8, changefreq: 'weekly' },
        { slug: 'sehir-ve-uyum-destegi', priority: 0.8, changefreq: 'weekly' },
    ].map(service => ({
        path: `/hizmetler/${service.slug}`,
        priority: service.priority,
        changefreq: service.changefreq,
    }));

    return [...staticRoutes, ...serviceRoutes];
};