/**
 * SEO Helper Functions for generating metadata, canonical URLs, and structured data
 */

export const siteConfig = {
    siteName: 'Kuleli Akademi',
    siteUrl: 'https://akademikuleli.com',
    siteDescription: 'Polonya üniversite başvurusu, öğrenci vizesi ve yurtdışı eğitim danışmanlığı hizmeti sunan uzman danışmanlık platformu.',
    siteLocale: 'tr_TR',
    logo: 'https://akademikuleli.com/logo.webp',
    ogImage: 'https://akademikuleli.com/og-image.webp',

    organizationName: 'Kuleli Akademi',
    organizationEmail: 'akademikuleli@gmail.com',

    whatsapp: {
        poland: {
            number: '+48 571 578 693',
            url: 'https://wa.me/48571578693',
            context: 'Polonya Danışmanlık Hattı',
        },
        aliaga: {
            number: '+90 547 616 35 05',
            url: 'https://wa.me/905476163505',
            context: 'Aliağa Danışmanlık Hattı',
        },
    },

    social: {
        instagram: 'https://www.instagram.com/akademi.kuleli/',
        facebook: 'https://www.facebook.com/people/Kuleli-Akademi/61586618973410/',
    },

    form: {
        consultation: 'https://docs.google.com/forms/d/e/1FAIpQLSf6EDVF2JpfO0Bzg3qZoMwefMoTFrxWuIsKUxqPZggljQvY_w/viewform?usp=dialog',
    },
};

export const keywordMap = {
    'okul-basvurusu': {
        title: 'Polonya Üniversite Başvurusu | Kuleli Akademi',
        description: 'Polonya üniversite başvurusu için okul seçimi, evrak hazırlığı ve başvuru takibi hizmetleri. Başvuru dosyanızı eksiksiz hazırlamanıza yardımcı oluyoruz.',
        keywords: [
            'Polonya üniversite başvurusu',
            'Polonya okul seçimi',
            'yurtdışı eğitim danışmanlığı',
            'üniversite başvuru süreci',
        ],
    },
    'vize-basvurusu': {
        title: 'Polonya Öğrenci Vizesi Danışmanlığı | Kuleli Akademi',
        description: 'Polonya D tipi öğrenci vizesi için belge hazırlığı, finansal evrak kontrolü ve başvuru rehberliği sunuyoruz.',
        keywords: [
            'Polonya öğrenci vizesi',
            'vize başvurusu',
            'vize belgeleri',
            'Polonya vizesi',
        ],
    },
    'karsilama-ve-yerlesim': {
        title: 'Polonya Karşılama ve Yerleşim Hizmeti | Kuleli Akademi',
        description: 'Polonya’ya varış sonrası karşılama, yurt veya ev bulma, kayıt işlemleri ve ilk hafta rehberliği sağlıyoruz.',
        keywords: [
            'Polonya karşılama hizmeti',
            'konaklama bulma',
            'yerleşim desteği',
            'öğrenci oryantasyonu',
        ],
    },
    'konaklama-destegi': {
        title: 'Polonya Konaklama Desteği | Kuleli Akademi',
        description: 'Polonya’da öğrenciler için yurt başvurusu, ev arama süreci, kira anlaşması ve konaklama danışmanlığı sunuyoruz.',
        keywords: [
            'Polonya konaklama',
            'Polonya yurt bulma',
            'Polonya ev kiralama',
            'öğrenci konaklama',
        ],
    },
    'oturum-izni': {
        title: 'Polonya Oturum İzni Danışmanlığı | Kuleli Akademi',
        description: 'Polonya oturum izni ve residence card başvurusu için belge hazırlığı, süreç takibi ve danışmanlık desteği sağlıyoruz.',
        keywords: [
            'Polonya oturum izni',
            'residence card',
            'ikamet belgesi',
            'Polonya residence card',
        ],
    },
    'sehir-ve-uyum-destegi': {
        title: 'Polonya Şehir Rehberliği ve Uyum Desteği | Kuleli Akademi',
        description: 'Polonya’da eğitim alacak öğrenciler için şehir rehberliği, sosyal uyum ve günlük yaşam desteği sunuyoruz.',
        keywords: [
            'Polonya şehir rehberi',
            'Polonya uyum desteği',
            'sosyal rehberlik',
            'kültür adaptasyonu',
        ],
    },
};

export const generateTitle = (pageTitle, includeSiteName = true) => {
    const rawTitle = (pageTitle || siteConfig.siteName).trim();
    const hasBrand = rawTitle.includes(siteConfig.siteName);
    const title = includeSiteName && !hasBrand ? `${rawTitle} | ${siteConfig.siteName}` : rawTitle;

    if (title.length <= 60) {
        return title;
    }

    if (includeSiteName && !hasBrand) {
        const suffix = ` | ${siteConfig.siteName}`;
        const maxBaseLength = Math.max(0, 60 - suffix.length);
        const baseTitle = rawTitle.slice(0, maxBaseLength).trimEnd();
        return `${baseTitle}${suffix}`;
    }

    return `${title.substring(0, 57)}...`;
};

export const generateDescription = (description) => {
    if (!description) return siteConfig.siteDescription;
    return description.length > 160 ? `${description.substring(0, 157)}...` : description;
};

export const generateCanonical = (pathname = '/') => {
        const cleanPath = pathname === '/' ? '/' : pathname.split('?')[0].split('#')[0].replace(/\/+$/, '');

        if (cleanPath === '/') {
            return `${siteConfig.siteUrl}/`;
        }

        return `${siteConfig.siteUrl}${cleanPath.startsWith('/') ? cleanPath : `/${cleanPath}`}`;
};

export const generateOGTags = (data = {}) => {
    return {
        'og:title': data.title || siteConfig.siteName,
        'og:description': data.description || siteConfig.siteDescription,
        'og:type': data.type || 'website',
        'og:url': data.url || generateCanonical('/'),
        'og:image': data.image || siteConfig.ogImage,
        'og:site_name': siteConfig.siteName,
        'og:locale': siteConfig.siteLocale,
    };
};

/**
 * Social preview tags remain limited to the minimum required set.
 */
export const generateTwitterTags = (data = {}) => {
    return {
        'twitter:card': data.card || 'summary_large_image',
        'twitter:title': data.title || siteConfig.siteName,
        'twitter:description': data.description || siteConfig.siteDescription,
        'twitter:image': data.image || siteConfig.ogImage,
    };
};

export const generateOrganizationSchema = () => {
    return {
        '@context': 'https://schema.org',
        '@type': 'EducationalOrganization',
        name: siteConfig.organizationName,
        alternateName: 'Akademi Kuleli',
        description: siteConfig.siteDescription,
        url: siteConfig.siteUrl,
        logo: siteConfig.logo,
        image: siteConfig.ogImage,
        email: siteConfig.organizationEmail,
        sameAs: [
            siteConfig.social.instagram,
            siteConfig.social.facebook,
        ],
        contactPoint: [{
                '@type': 'ContactPoint',
                contactType: siteConfig.whatsapp.poland.context,
                telephone: siteConfig.whatsapp.poland.number,
                email: siteConfig.organizationEmail,
                availableLanguage: ['Turkish', 'Polish', 'English'],
            },
            {
                '@type': 'ContactPoint',
                contactType: siteConfig.whatsapp.aliaga.context,
                telephone: siteConfig.whatsapp.aliaga.number,
                email: siteConfig.organizationEmail,
                availableLanguage: ['Turkish'],
            },
        ],
    };
};

export const generateServiceSchema = (service) => {
    return {
        '@context': 'https://schema.org',
        '@type': 'Service',
        name: service.title,
        description: service.shortDescription || service.description,
        provider: {
            '@type': 'EducationalOrganization',
            name: siteConfig.organizationName,
            url: siteConfig.siteUrl,
        },
        areaServed: ['TR', 'PL'],
        serviceType: 'Education Consulting',
    };
};

export const generateBreadcrumbSchema = (items = []) => {
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

export const generateWebsiteSchema = () => {
    return {
        '@context': 'https://schema.org',
        '@type': 'WebSite',
        name: siteConfig.siteName,
        alternateName: 'Akademi Kuleli',
        url: siteConfig.siteUrl,
        description: siteConfig.siteDescription,
        publisher: {
            '@type': 'EducationalOrganization',
            name: siteConfig.organizationName,
        },
    };
};

export const getPageMetadata = (pathname) => {
    const pathMap = {
        '/': {
            title: 'Polonya Üniversite Danışmanlığı | Kuleli Akademi',
            description: 'Polonya üniversite başvurusu, öğrenci vizesi ve yurtdışı eğitim danışmanlığı hizmeti. Polonya’da eğitim süreciniz için rehberlik sağlıyoruz.',
            type: 'website',
        },
        '/hakkımızda': {
            title: 'Hakkımızda | Kuleli Akademi',
            description: 'Kuleli Akademi, Polonya üniversite danışmanlığı ve yurtdışı eğitim sürecinde öğrencilere rehberlik sağlayan bir danışmanlık platformudur.',
            type: 'about',
        },
        '/iletişim': {
            title: 'İletişim | Kuleli Akademi',
            description: 'Polonya üniversite başvurusu, öğrenci vizesi ve yurtdışı eğitim danışmanlığı hakkında bilgi almak için Kuleli Akademi ile iletişime geçin.',
            type: 'contact',
        },
        '/egitimlerimiz': {
            title: 'Hizmetlerimiz | Kuleli Akademi',
            description: 'Polonya üniversite başvurusu, öğrenci vizesi, konaklama, karşılama, oturum izni ve uyum desteği hizmetlerimizi inceleyin.',
            type: 'services',
        },
        '/üniversiteler': {
            title: 'Üniversiteler | Kuleli Akademi',
            description: 'Polonya’daki üniversiteleri inceleyin, program seçeneklerini karşılaştırın ve eğitim hedefinize uygun okulu bulun.',
            type: 'website',
        },
        '/yurtdışıeğitim': {
            title: 'Yurtdışında Eğitim | Kuleli Akademi',
            description: 'Polonya ve Avrupa üniversitelerinde eğitim almak isteyen öğrenciler için yurtdışı eğitim danışmanlığı hizmetleri sunuyoruz.',
            type: 'services',
        },
        '/linkler': {
            title: 'Linkler | Kuleli Akademi',
            description: 'Kuleli Akademi sosyal medya, danışmanlık formu ve iletişim bağlantılarına hızlıca ulaşın.',
            type: 'navigation',
        },
    };

    return pathMap[pathname] || {
        title: siteConfig.siteName,
        description: siteConfig.siteDescription,
        type: 'website',
    };
};

export const getAllRoutes = () => {
    const staticRoutes = [
        { path: '/', priority: 1.0, changefreq: 'weekly' },
        { path: '/hakkımızda', priority: 0.8, changefreq: 'monthly' },
        { path: '/egitimlerimiz', priority: 0.9, changefreq: 'weekly' },
        { path: '/üniversiteler', priority: 0.85, changefreq: 'weekly' },
        { path: '/yurtdışıeğitim', priority: 0.8, changefreq: 'monthly' },
        { path: '/iletişim', priority: 0.7, changefreq: 'monthly' },
        { path: '/linkler', priority: 0.6, changefreq: 'monthly' },
    ];

    const serviceRoutes = Object.keys(keywordMap).map((slug) => ({
        path: `/hizmetler/${slug}`,
        priority: 0.8,
        changefreq: 'weekly',
    }));

    return [...staticRoutes, ...serviceRoutes];
};