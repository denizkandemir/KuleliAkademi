/**
 * Centralized Contact and Social Media Configuration
 * Single source of truth for all contact/social links across the application
 * Update this file to maintain consistency across all components
 */

export const contactConfig = {
    // Email address
    email: 'akademikuleli@gmail.com',

    // Social Media Links
    social: {
        instagram: {
            url: 'https://www.instagram.com/akademi.kuleli/',
            label: 'Instagram',
            account: 'akademi.kuleli',
        },
        // Yurt dışı (Kuleli International) hesabı
        instagramInternational: {
            url: 'https://www.instagram.com/kuleli.international/',
            label: 'Instagram',
            account: 'kuleli.international',
        },
        facebook: {
            url: 'https://www.facebook.com/people/Kuleli-Akademi/61586618973410/',
            label: 'Facebook',
            account: 'Akademi Kuleli',
        },
    },

    form: {
        consultation: {
            title: 'Danışmanlık Talebi Formu',
            description: 'Eğitim ihtiyaçlarınızı bize iletin, uzman ekibimiz sizinle iletişime geçsin.',
            url: 'https://docs.google.com/forms/d/e/1FAIpQLSf6EDVF2JpfO0Bzg3qZoMwefMoTFrxWuIsKUxqPZggljQvY_w/viewform?usp=dialog',
        },
    },

    // WhatsApp Contacts with Context-Specific Numbers.
    // Keep only real lines here: the admin service form lists every key as a selectable line.
    // The "poland" key is kept for existing DB records; the line now serves every study-abroad program.
    whatsapp: {
        poland: {
            number: '+48 571 578 693',
            url: 'https://wa.me/48571578693',
            context: 'Yurt Dışı Danışmanlık Hattı',
            message: 'Merhaba, yurt dışı eğitim hakkında bilgi almak istiyorum.',
        },
        aliaga: {
            number: '+90 547 616 35 05',
            url: 'https://wa.me/905476163505',
            context: 'Aliağa Danışmanlık Hattı',
            message: 'Merhaba, Aliağa\'daki dersleriniz hakkında bilgi almak istiyorum.',
        },
    },

    // Page-specific opening messages for the study-abroad line
    whatsappMessages: {
        poland: 'Merhaba, Polonya\'da üniversite eğitimi hakkında bilgi almak istiyorum.',
        spain: 'Merhaba, İspanya\'da dil okulu ve üniversiteye hazırlık hakkında bilgi almak istiyorum.',
        languageSchools: 'Merhaba, dil okulları hakkında bilgi almak istiyorum.',
        malta: 'Merhaba, Malta dil okulu programları açıldığında bilgi almak istiyorum.',
    },

    // Link Security Attributes (for external links)
    linkAttrs: {
        external: {
            target: '_blank',
            rel: 'noopener noreferrer',
        },
    },
};

const normalizePath = (url = '/') => {
    let path = String(url || '/').split('?')[0].split('#')[0];

    try {
        path = decodeURIComponent(path);
    } catch (error) {
        // keep the raw path when it is not valid URI encoding
    }

    return path.replace(/\/+$/, '') || '/';
};

// Aliağa (Kuleli Akademi) yüz yüze ders sayfaları
const ALIAGA_PATHS = ['/egitimlerimiz'];

// Hem yurt dışı hem Aliağa hattının birlikte gösterildiği genel sayfalar
const SHARED_PATHS = ['/', '/iletişim', '/linkler', '/hakkımızda', '/basvuru'];

const pathStartsWith = (path, prefix) => path === prefix || path.startsWith(`${prefix}/`);

const messageForPath = (path) => {
    if (pathStartsWith(path, '/ispanyada-egitim')) return contactConfig.whatsappMessages.spain;
    if (pathStartsWith(path, '/dil-okullari')) return contactConfig.whatsappMessages.languageSchools;
    if (
        pathStartsWith(path, '/polonyada-universite')
        || pathStartsWith(path, '/üniversiteler')
        || pathStartsWith(path, '/universiteler')
        || pathStartsWith(path, '/hizmetler')
    ) {
        return contactConfig.whatsappMessages.poland;
    }

    return contactConfig.whatsapp.poland.message;
};

const buildLine = (key, message) => {
    const line = contactConfig.whatsapp[key];

    return {
        key,
        title: line.context,
        number: line.number,
        url: line.url,
        message,
        href: `${line.url}?text=${encodeURIComponent(message)}`,
    };
};

/**
 * WhatsApp lines to show for the current page:
 * - Aliağa ders sayfaları: yalnızca Aliağa hattı
 * - Genel sayfalar (ana sayfa, iletişim...): iki hat birlikte, yurt dışı hattı önce
 * - Diğer tüm (yurt dışı) sayfalar: yalnızca yurt dışı hattı, sayfaya uygun mesajla
 */
export const getWhatsappLinesForPath = (url = '/') => {
    const path = normalizePath(url);

    if (ALIAGA_PATHS.some((prefix) => pathStartsWith(path, prefix))) {
        return [buildLine('aliaga', contactConfig.whatsapp.aliaga.message)];
    }

    if (SHARED_PATHS.includes(path)) {
        return [
            buildLine('poland', contactConfig.whatsapp.poland.message),
            buildLine('aliaga', contactConfig.whatsapp.aliaga.message),
        ];
    }

    return [buildLine('poland', messageForPath(path))];
};

/**
 * Single "primary" line for compact CTAs (navbar icon, mobile menu button).
 */
export const getPrimaryWhatsappLineForPath = (url = '/') => getWhatsappLinesForPath(url)[0];

/**
 * Instagram account for the current page: yurt dışı sayfalarında @kuleli.international,
 * genel ve Aliağa sayfalarında @akademi.kuleli.
 */
export const getInstagramForPath = (url = '/') => {
    const path = normalizePath(url);
    const isAliagaOrShared = SHARED_PATHS.includes(path) || ALIAGA_PATHS.some((prefix) => pathStartsWith(path, prefix));

    return isAliagaOrShared ? contactConfig.social.instagram : contactConfig.social.instagramInternational;
};

export default contactConfig;
