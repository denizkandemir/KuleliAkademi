import { getUniversitiesForCards, getUniversityBySlug, universitiesData } from '../../resources/js/data/universitiesData.js';

const collectUniversities = (nodes) => {
    if (!Array.isArray(nodes)) {
        return [];
    }

    return nodes.flatMap((node) => {
        if (Array.isArray(node)) {
            return collectUniversities(node);
        }

        if (node && Array.isArray(node.universities)) {
            return collectUniversities(node.universities);
        }

        if (node && typeof node === 'object' && node.id) {
            return [node];
        }

        return [];
    });
};

const rawUniversities = collectUniversities(universitiesData);
const universityCards = new Map(
    getUniversitiesForCards().map((university) => [
        university.slug ? university.slug : university.id,
        university,
    ])
);

const normalizedUniversities = rawUniversities.map((university) => {
    const slug = university.slug ? university.slug : university.id;
    const cardUniversity = universityCards.get(slug);
    const detailUniversity = getUniversityBySlug(slug) || {};

    const country = university.country ?
        university.country :
        (detailUniversity.country ? detailUniversity.country : 'Poland');
    const cardImage = cardUniversity && cardUniversity.image ? cardUniversity.image : null;
    const bannerImage = detailUniversity.bannerImg ?
        detailUniversity.bannerImg :
        (university.banner_image ? university.banner_image : cardImage);

    return {
        ...university,
        slug,
        country,
        card_image: cardImage,
        banner_image: bannerImage,
        gallery_images: Array.isArray(detailUniversity.galleryImages) ? detailUniversity.galleryImages : [],
    };
});

process.stdout.write(JSON.stringify(normalizedUniversities, null, 2));