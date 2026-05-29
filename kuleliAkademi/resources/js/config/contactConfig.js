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

    // WhatsApp Contacts with Context-Specific Numbers
    whatsapp: {
        poland: {
            number: '+48 571 578 693',
            url: 'https://wa.me/48571578693',
            context: 'Polonya Danışmanlık Hattı',
            message: 'Merhaba, Polonya danışmanlığı hakkında bilgi almak istiyorum.',
        },
        aliaga: {
            number: '+90 547 616 35 05',
            url: 'https://wa.me/905476163505',
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