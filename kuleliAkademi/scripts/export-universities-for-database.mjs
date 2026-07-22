// One-off, read-only extraction script.
//
// Loads resources/js/data/universitiesData.js through Node's real ES module
// loader (the same syntax the frontend already uses) and calls the module's
// own getUniversitiesForCards()/getUniversityBySlug() helpers to obtain fully
// normalized university records -- no eval, no regex parsing of the JS
// source, no hand-copied JS identifiers.
//
// Output: database/data/universities.import.json
// Consumed by: php artisan universities:import-static-data
//
// This script does not touch the database. It only reads a frontend data
// file and writes a JSON file.

import { fileURLToPath } from 'node:url';
import path from 'node:path';
import fs from 'node:fs';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const projectRoot = path.resolve(__dirname, '..');
const sourcePath = path.join(projectRoot, 'resources/js/data/universitiesData.js');
const outputPath = path.join(projectRoot, 'database/data/universities.import.json');

const sourceUrl = new URL(`file://${sourcePath.replace(/\\/g, '/')}`);
const { getUniversitiesForCards, getUniversityBySlug } = await import(sourceUrl);

if (typeof getUniversitiesForCards !== 'function' || typeof getUniversityBySlug !== 'function') {
    console.error('FAILED: expected exports getUniversitiesForCards()/getUniversityBySlug() not found.');
    process.exit(1);
}

const cards = getUniversitiesForCards();

if (!Array.isArray(cards) || cards.length === 0) {
    console.error('FAILED: getUniversitiesForCards() returned no universities.');
    process.exit(1);
}

const seenSlugs = new Set();
const duplicateSlugs = new Set();
const errors = [];
const records = [];

const normalizeTuition = (undergrad, postgrad) => {
    const u = typeof undergrad === 'string' ? undergrad.trim() : '';
    const p = typeof postgrad === 'string' ? postgrad.trim() : '';

    if (!u && !p) return null;
    if (u && p && u.toLowerCase() === p.toLowerCase()) {
        return u.charAt(0).toUpperCase() + u.slice(1);
    }

    const parts = [];
    if (u) parts.push(`Lisans: ${u}`);
    if (p) parts.push(`Yüksek Lisans: ${p}`);
    return parts.join(' / ');
};

const dedupeImages = (images) => {
    const out = [];
    const seen = new Set();
    for (const image of images) {
        if (typeof image === 'string' && image.trim() && !seen.has(image)) {
            seen.add(image);
            out.push(image);
        }
    }
    return out;
};

cards.forEach((card, index) => {
    const slug = card.slug;
    const name = card.name;

    if (!slug || typeof slug !== 'string' || !slug.trim()) {
        errors.push(`Index ${index}: missing/empty slug.`);
        return;
    }
    if (!name || typeof name !== 'string' || !name.trim()) {
        errors.push(`Index ${index} (slug=${slug}): missing/empty name.`);
        return;
    }
    if (seenSlugs.has(slug)) {
        duplicateSlugs.add(slug);
        return;
    }
    seenSlugs.add(slug);

    const detail = getUniversityBySlug(slug);
    if (!detail) {
        errors.push(`Index ${index} (slug=${slug}): getUniversityBySlug() returned null.`);
        return;
    }

    const longDescriptions = Array.isArray(detail.longDescriptions)
        ? detail.longDescriptions.filter((p) => typeof p === 'string' && p.trim())
        : [];

    const mainImageUrl = card.image || detail.image || (detail.galleryImages && detail.galleryImages[0]) || null;

    const gallery = dedupeImages([
        ...(Array.isArray(detail.galleryImages) ? detail.galleryImages : []),
        ...(mainImageUrl ? [mainImageUrl] : []),
    ]);

    records.push({
        slug,
        name,
        short_name: detail.short_name || detail.acronym || null,
        country: detail.country || 'Poland',
        city: detail.city || null,
        description: longDescriptions.length ? longDescriptions.join('\n\n') : null,
        short_description: card.description || null,
        website_url: detail.website || null,
        application_url: detail.application_url || null,
        main_image_url: mainImageUrl,
        language: detail.language_of_instruction || detail.language || null,
        ranking: detail.qs_ranking != null ? String(detail.qs_ranking) : null,
        tuition_fee: normalizeTuition(detail.tuition_undergrad_eur, detail.tuition_postgrad_eur),
        sort_order: index + 1,
        gallery,
    });
});

const report = {
    generated_at: new Date().toISOString(),
    source_file: 'resources/js/data/universitiesData.js',
    total_seen: cards.length,
    unique_count: records.length,
    duplicate_slugs: Array.from(duplicateSlugs),
    errors,
};

if (duplicateSlugs.size > 0) {
    console.error('FAILED: duplicate slugs found:', Array.from(duplicateSlugs).join(', '));
    process.exit(1);
}

if (errors.length > 0) {
    console.error('FAILED: validation errors found:');
    errors.forEach((e) => console.error(`  - ${e}`));
    process.exit(1);
}

fs.mkdirSync(path.dirname(outputPath), { recursive: true });
fs.writeFileSync(outputPath, JSON.stringify(records, null, 2) + '\n', 'utf8');

console.log(`OK: wrote ${records.length} unique universities to ${path.relative(projectRoot, outputPath)}`);
console.log(JSON.stringify(report, null, 2));
