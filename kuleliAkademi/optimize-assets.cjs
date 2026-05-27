const sharp = require("sharp");
const fs = require("fs");
const path = require("path");

const dir = "resources/js/assets/images";

function walk(folder) {
    fs.readdirSync(folder).forEach(file => {
        const full = path.join(folder, file);
        if (fs.statSync(full).isDirectory()) return walk(full);

        if (!/\.(jpg|jpeg|png)$/i.test(file)) return;

        const out = full.replace(/\.(jpg|jpeg|png)$/i, ".webp");

        sharp(full)
            .resize({ width: 1600, withoutEnlargement: true })
            .webp({ quality: 78 })
            .toFile(out)
            .then(() => console.log("ok:", out));
    });
}

walk(dir);