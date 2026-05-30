import path from 'path';
import { fileURLToPath, pathToFileURL } from 'url';

const __filename = fileURLToPath(
    import.meta.url);
const __dirname = path.dirname(__filename);

(async() => {
    try {
        const seo = await
        import (pathToFileURL(path.join(__dirname, '../resources/js/utils/seoHelpers.js')).href);
        const unis = await
        import (pathToFileURL(path.join(__dirname, '../resources/js/data/universitiesData.js')).href);

        const universities = unis.universitiesData || (unis.universities && unis.universities.length ? unis.universities : []);
        const sample = universities.find(u => u.id === 'university-of-warsaw') || universities[0];

        const metadata = seo.getUniversityPageMetadata(sample);

        console.log(JSON.stringify(metadata.schema, null, 2));
    } catch (err) {
        console.error('Error while loading modules:', err);
        process.exit(1);
    }
})();