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
        facebook: {
            url: 'https://www.facebook.com/people/Kuleli-Akademi/61586618973410/#',
            label: 'Facebook',
            account: 'Akademi Kuleli',
        },
    },

    // WhatsApp Contacts with Context-Specific Numbers
    whatsapp: {
        poland: {
            number: '+48 671 578 693',
            url: 'https://wa.me/48671578693',
            context: 'Polonya Danışmanlık Hattı',
            message: 'Merhaba, Polonya danışmanlığı hakkında bilgi almak istiyorum.',
        },
        aliaga: {
            number: '+90 533 817 44 35',
            url: 'https://wa.me/905338174435',
            context: 'Aliağa Danışmanlık Hattı',
            message: 'Merhaba, Aliağa danışmanlığı hakkında bilgi almak istiyorum.',
        },
    },

    // Link Security Attributes (for external links)
    linkAttrs: {
        external: {
            target: '_blank',
            rel: 'noopener noreferrer',
        },
    },
};

export default contactConfig;