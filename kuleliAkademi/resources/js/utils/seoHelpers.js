/**
 * SEO Helper Functions for generating metadata, canonical URLs, and structured data
 */

import { contactConfig } from '../config/contactConfig';
import { servicesData } from '../data/servicesData';
import { getUniversitiesForCards } from '../data/universitiesData';

export const siteConfig = {
    siteName: 'Kuleli Akademi',
    siteUrl: 'https://akademikuleli.com',
    siteDescription: 'Polonya üniversite başvurusu, öğrenci vizesi ve yurtdışı eğitim danışmanlığı hizmeti sunan uzman danışmanlık platformu.',
    siteLocale: 'tr_TR',
    logo: 'https://akademikuleli.com/logo.webp',
    ogImage: 'https://akademikuleli.com/og-image.webp',

    organizationName: 'Kuleli Akademi',
    organizationEmail: contactConfig.email,

    whatsapp: {
        poland: {
            number: '+48 571 578 693',
            url: contactConfig.whatsapp.poland.url,
            context: 'Polonya Danışmanlık Hattı',
        },
        aliaga: {
            number: '+90 547 616 35 05',
            url: contactConfig.whatsapp.aliaga.url,
            context: 'Aliağa Danışmanlık Hattı',
        },
    },

    social: {
        instagram: contactConfig.social.instagram.url,
        facebook: contactConfig.social.facebook.url,
    },

    form: {
        consultation: contactConfig.form.consultation.url,
    },
};

// Helper: detect forbidden hosts or dev domains in URLs
const isForbiddenHost = (url) => {
    if (typeof url !== 'string') return false;
    return /(localhost|127\.0\.0\.1|railway\.app|\b(staging|dev)\b|\.dev\b|-dev)/i.test(url);
};

// Helper: sanitize schema objects by removing null/undefined/empty strings and
// removing URL values that include forbidden hosts. Works recursively.
const sanitize = (value) => {
    if (value === null || value === undefined) return null;

    if (Array.isArray(value)) {
        const cleaned = value
            .map(sanitize)
            .filter((v) => v !== null && !(typeof v === 'string' && v.trim() === '') && !(typeof v === 'object' && Object.keys(v).length === 0));
        return cleaned.length ? cleaned : null;
    }

    if (typeof value === 'object') {
        const out = {};
        for (const [k, v] of Object.entries(value)) {
            const cleaned = sanitize(v);
            if (cleaned === null) continue;
            out[k] = cleaned;
        }
        return Object.keys(out).length ? out : null;
    }

    if (typeof value === 'string') {
        const s = value.trim();
        if (!s) return null;
        if (/^https?:\/\//i.test(s) && isForbiddenHost(s)) return null;
        return s;
    }

    return value;
};

export const keywordMap = {
    'okul-basvurusu': {
        title: 'Polonya Üniversite Başvurusu | Kuleli Akademi',
        description: 'Polonya üniversite başvurusu için okul seçimi, evrak hazırlığı ve başvuru takibi desteği alın. Başvuru dosyanızı birlikte planlayalım.',
        keywords: [
            'Polonya üniversite başvurusu',
            'Polonya okul seçimi',
            'yurtdışı eğitim danışmanlığı',
            'üniversite başvuru süreci',
        ],
    },
    'vize-basvurusu': {
        title: 'Polonya Öğrenci Vizesi Danışmanlığı | Kuleli Akademi',
        description: 'Polonya D tipi öğrenci vizesi için belge hazırlığı, finansal evrak kontrolü ve başvuru rehberliği alın. Dosyanızı birlikte düzenleyelim.',
        keywords: [
            'Polonya öğrenci vizesi',
            'vize başvurusu',
            'vize belgeleri',
            'Polonya vizesi',
        ],
    },
    'karsilama-ve-yerlesim': {
        title: 'Polonya Karşılama ve Yerleşim Hizmeti | Kuleli Akademi',
        description: 'Polonya’ya varış sonrası karşılama, konaklama ve ilk hafta yerleşim desteği alın. Yeni hayatınıza planlı bir başlangıç yapın.',
        keywords: [
            'Polonya karşılama hizmeti',
            'konaklama bulma',
            'yerleşim desteği',
            'öğrenci oryantasyonu',
        ],
    },
    'konaklama-danismanligi': {
        title: 'Polonya Konaklama Danışmanlığı | Kuleli Akademi',
        description: 'Polonya’da öğrenciler için yurt, ev ve konaklama seçenekleri konusunda danışmanlık alın. Bütçenize uygun çözümü birlikte seçelim.',
        keywords: [
            'Polonya konaklama',
            'Polonya yurt bulma',
            'Polonya ev kiralama',
            'öğrenci konaklama',
        ],
    },
    'oturum-izni': {
        title: 'Polonya Oturum İzni Danışmanlığı | Kuleli Akademi',
        description: 'Polonya oturum izni ve residence card başvurusu için belge hazırlığı, süreç takibi ve danışmanlık desteği alın.',
        keywords: [
            'Polonya oturum izni',
            'residence card',
            'ikamet belgesi',
            'Polonya residence card',
        ],
    },
    'sehir-ve-ogrenci-hayati-rehberligi': {
        title: 'Polonya Şehir ve Öğrenci Hayatı Rehberliği | Kuleli Akademi',
        description: 'Polonya’da eğitim alacak öğrenciler için şehir rehberliği, sosyal uyum ve günlük yaşam desteği alın. İlk dönemi kolaylaştırın.',
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
        const input = typeof pathname === 'string' ? pathname.trim() : '/';

        if (!input || input === '/') {
            return `${siteConfig.siteUrl}/`;
        }

        let cleanPath = input;

        try {
            if (/^https?:\/\//i.test(input)) {
                cleanPath = new URL(input).pathname;
            }
        } catch (error) {
            cleanPath = input;
        }

        cleanPath = cleanPath.split('?')[0].split('#')[0].replace(/\/+$/, '');

        if (!cleanPath || cleanPath === '/') {
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

export const generateFaqSchema = (faqs = []) => {
    if (!Array.isArray(faqs) || !faqs.length) {
        return null;
    }

    const schema = {
        '@context': 'https://schema.org',
        '@type': 'FAQPage',
        mainEntity: faqs.map((item) => ({
            '@type': 'Question',
            name: item.question,
            acceptedAnswer: {
                '@type': 'Answer',
                text: item.answer,
            },
        })),
    };

    return sanitize(schema);
};

export const generateOrganizationSchema = () => {
    const schema = {
        '@context': 'https://schema.org',
        '@type': 'EducationalOrganization',
        name: siteConfig.organizationName,
        alternateName: 'Akademi Kuleli',
        description: siteConfig.siteDescription,
        url: siteConfig.siteUrl,
        logo: siteConfig.logo,
        image: siteConfig.ogImage,
        email: siteConfig.organizationEmail,
        sameAs: [siteConfig.social.instagram, siteConfig.social.facebook],
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

    // sanitize before returning
    return sanitize(schema);
};

export const generateServiceSchema = (service) => {
    if (!service) {
        return null;
    }

    const schema = {
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

    return sanitize(schema);
};

export const generateCollegeOrUniversitySchema = (university, canonicalUrl) => {
    if (!university) {
        return null;
    }

    const url = canonicalUrl || generateCanonical(`/universiteler/${university.slug || university.id}`);

    const schema = {
        '@context': 'https://schema.org',
        '@type': 'CollegeOrUniversity',
        name: university.name,
        url,
    };

    // image: prefer explicit image, fallback to gallery first item
    let image = null;
    if (typeof university.image === 'string' && university.image.trim()) {
        image = university.image.trim();
    } else if (Array.isArray(university.gallery) && university.gallery[0]) {
        image = university.gallery[0];
    }

    if (image) {
        if (image.startsWith('/')) {
            image = `${siteConfig.siteUrl}${image}`;
        }
        if (!isForbiddenHost(image)) {
            schema.image = image;
        }
    }

    // sameAs: only when a valid external website exists
    const website = university.website || university.officialWebsite || university.url || university.homepage || null;
    if (website && typeof website === 'string' && website.trim() && !isForbiddenHost(website)) {
        schema.sameAs = [website.trim()];
    }

    // address
    if (university.city || university.country) {
        schema.address = {
            '@type': 'PostalAddress',
            addressCountry: university.country || 'PL',
        };

        if (university.city && typeof university.city === 'string' && university.city.trim()) {
            schema.address.addressLocality = university.city.trim();
        }
    }

    return sanitize(schema);
};

export const buildServiceFaqs = (service) => {
    if (!service) {
        return [];
    }

    return [
        {
            question: `${service.title} için hangi belgeler gerekir?`,
            answer: service.documentsOrRequirements?.[0]?.shortDescription || 'İhtiyaç duyulan belgeler hizmet kapsamına ve öğrencinin profiline göre değişebilir.',
        },
        {
            question: `${service.title} süreci ne kadar sürer?`,
            answer: 'Süre, öğrencinin mevcut evrak durumu, başvuru yoğunluğu ve seçilen hizmet kapsamına göre değişir. Süreci birlikte planlıyoruz.',
        },
        {
            question: 'Kuleli Akademi başvuru sürecinde nasıl destek sağlar?',
            answer: 'Okul ve bölüm seçimi, evrak listesi, başvuru takibi ve sonraki adımlar için size planlı danışmanlık desteği sunar.',
        },
    ];
};

export const buildUniversityFaqs = (university) => {
    if (!university) {
        return [];
    }

    const faqs = [
        {
            question: `${university.name} başvuru şartları nelerdir?`,
            answer: `${university.name} için başvuru şartları programa göre değişebilir. Güncel şartlar, bölüm ve dil gereksinimleri birlikte kontrol edilmelidir.`,
        },
        {
            question: `${university.name} eğitim ücretleri ne kadardır?`,
            answer: university.tuition_undergrad_eur || university.tuition_postgrad_eur
                ? `${university.name} için eğitim ücretleri programa ve seviyeye göre değişir. Mevcut ücret bilgilerini başvuru öncesinde doğruluyoruz.`
                : 'Eğitim ücretleri program ve seviyeye göre değişir. En güncel ücret bilgisi başvuru öncesinde doğrulanmalıdır.',
        },
    ];

    if (university.city) {
        faqs.push({
            question: `${university.name} hangi şehirde bulunur?`,
            answer: `${university.name}, ${university.city} şehrinde yer alır. Şehir bilgisi, konaklama ve yaşam planlamasında önemli bir kriterdir.`,
        });
    }

    return faqs;
};

export const getServicePageMetadata = (serviceSlug, service) => {
    const match = keywordMap[serviceSlug];
    const title = match?.title || (service?.title ? `${service.title} | Kuleli Akademi` : 'Hizmetler | Kuleli Akademi');
    const description = match?.description || service?.shortDescription || siteConfig.siteDescription;
    const canonicalUrl = generateCanonical(`/hizmetler/${serviceSlug}`);
    const schema = generateServiceSchema(service);
    const faqs = buildServiceFaqs(service);

    return {
        title,
        description,
        canonicalUrl,
        image: service?.bannerImage || siteConfig.ogImage,
        schema: schema ? [schema, generateFaqSchema(faqs)].filter(Boolean) : generateFaqSchema(faqs),
        faqs,
    };
};

export const getUniversityPageMetadata = (university) => {
    if (!university) {
        return {
            title: 'Üniversite Bulunamadı | Kuleli Akademi',
            description: 'Aradığınız üniversite sayfası bulunamadı. Polonya üniversiteleri için diğer sayfaları inceleyin.',
            canonicalUrl: generateCanonical('/üniversiteler'),
            image: siteConfig.ogImage,
            schema: null,
            faqs: [],
        };
    }

    const titleBase = `${university.name} Başvuru ve Eğitim Ücretleri`;
    const title = titleBase.length > 60
        ? `${university.name} | Polonya Üniversite Rehberi`
        : `${titleBase} | Kuleli Akademi`;

    const description = `${university.name} başvuru şartları, eğitim ücretleri, bölümler, konaklama ve öğrenci yaşamı hakkında bilgi alın. Kuleli Akademi danışmanlık desteği sunar.`;
    const canonicalUrl = generateCanonical(`/universiteler/${university.slug || university.id}`);
    const faqs = buildUniversityFaqs(university);
    const schema = generateCollegeOrUniversitySchema(university, canonicalUrl);

    return {
        title,
        description,
        canonicalUrl,
        image: university.image || siteConfig.ogImage,
        schema: schema ? [schema, generateFaqSchema(faqs)].filter(Boolean) : generateFaqSchema(faqs),
        faqs,
    };
};

export const generateBreadcrumbSchema = (items = []) => {
    const list = {
        '@context': 'https://schema.org',
        '@type': 'BreadcrumbList',
        itemListElement: items.map((item, index) => {
            const itm = {
                '@type': 'ListItem',
                position: index + 1,
                name: item.label,
            };

            if (item.url) {
                try {
                    if (item.url.startsWith('/')) {
                        itm.item = generateCanonical(item.url);
                    } else if (/^https?:\/\//i.test(item.url) && !isForbiddenHost(item.url)) {
                        itm.item = item.url;
                    }
                } catch (e) {
                    // ignore malformed URLs
                }
            }

            return itm;
        }),
    };

    return sanitize(list);
};

export const generateWebsiteSchema = () => {
    const schema = {
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

    return sanitize(schema);
};

export const getPageMetadata = (pathname) => {
    const pathMap = {
        '/': {
            title: 'Polonya Üniversite Danışmanlığı | Kuleli Akademi',
            description: 'Polonya üniversite başvurusu, öğrenci vizesi ve yurtdışı eğitim danışmanlığı için Kuleli Akademi ile iletişime geçin, sürecinizi birlikte planlayalım.',
            type: 'website',
        },
        '/hakkımızda': {
            title: 'Hakkımızda | Kuleli Akademi',
            description: 'Kuleli Akademi’nin Polonya üniversite danışmanlığı yaklaşımını, öğrenci odaklı çalışma biçimini ve süreç yönetimi desteğini yakından inceleyin.',
            type: 'website',
        },
        '/iletişim': {
            title: 'İletişim | Kuleli Akademi',
            description: 'Polonya üniversite başvurusu ve yurtdışı eğitim için sorularınızı Kuleli Akademi’ye iletin, uzman ekibimiz size en kısa sürede dönüş yapsın.',
            type: 'website',
        },
        '/egitimlerimiz': {
            title: 'Polonya Eğitim Danışmanlığı Hizmetleri | Kuleli Akademi',
            description: 'Polonya üniversite başvurusu, öğrenci vizesi, konaklama ve yerleşim hizmetlerimizi inceleyin; size uygun danışmanlığı hemen planlayın.',
            type: 'website',
        },
        '/üniversiteler': {
            title: 'Polonya Üniversiteleri | Kuleli Akademi',
            description: 'Polonya’daki üniversiteleri şehir, bölüm ve eğitim dili açısından karşılaştırın; size uygun okulu Kuleli Akademi ile bulun.',
            type: 'website',
        },
        '/yurtdışıeğitim': {
            title: 'Yurtdışı Eğitim Danışmanlığı | Kuleli Akademi',
            description: 'Polonya ve Avrupa’da eğitim hedefleyen öğrenciler için başvuru, vize ve yerleşim süreçlerinde kapsamlı danışmanlık alın.',
            type: 'website',
        },
        '/linkler': {
            title: 'Hızlı Bağlantılar | Kuleli Akademi',
            description: 'Kuleli Akademi’nin danışmanlık formu, sosyal medya ve üniversite bağlantılarına tek sayfadan hızlıca ulaşın.',
            type: 'website',
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

    const serviceRoutes = servicesData.map((service) => ({
        path: `/hizmetler/${service.slug}`,
        priority: 0.8,
        changefreq: 'weekly',
    }));

    const universityRoutes = getUniversitiesForCards().map((university) => ({
        path: `/universiteler/${university.slug || university.id}`,
        priority: 0.75,
        changefreq: 'monthly',
    }));

    return [...staticRoutes, ...serviceRoutes, ...universityRoutes];
};