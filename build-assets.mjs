/**
 * One-shot build script: rasterise SVG source assets into the
 * binary formats required for full cross-platform / social-share
 * compatibility (PNG icons, ICO favicon, OG image).
 *
 * Usage: node build-assets.mjs
 */
import sharp from 'sharp';
import { writeFile, readFile } from 'node:fs/promises';

async function svgBuffer(path) {
    return await readFile(path);
}

async function makePng(svgPath, outPath, size) {
    const buf = await svgBuffer(svgPath);
    await sharp(buf, { density: 384 })
        .resize(size, size, { fit: 'contain', background: { r: 0, g: 0, b: 0, alpha: 0 } })
        .png({ compressionLevel: 9 })
        .toFile(outPath);
    console.log(`  ${outPath} (${size}x${size})`);
}

async function makeOg(svgPath, outPath) {
    const buf = await svgBuffer(svgPath);
    await sharp(buf, { density: 192 })
        .resize(1200, 630, { fit: 'cover' })
        .png({ compressionLevel: 9 })
        .toFile(outPath);
    console.log(`  ${outPath} (1200x630)`);
}

// ICO encoder (multi-size PNG-in-ICO; modern browsers accept this)
function buildIco(images) {
    const count = images.length;
    const header = Buffer.alloc(6);
    header.writeUInt16LE(0, 0);     // reserved
    header.writeUInt16LE(1, 2);     // type: 1 = icon
    header.writeUInt16LE(count, 4); // image count

    const entries = [];
    const datas = [];
    let offset = 6 + count * 16;

    for (const img of images) {
        const entry = Buffer.alloc(16);
        const size = img.size >= 256 ? 0 : img.size;
        entry.writeUInt8(size, 0); // width
        entry.writeUInt8(size, 1); // height
        entry.writeUInt8(0, 2);    // palette count
        entry.writeUInt8(0, 3);    // reserved
        entry.writeUInt16LE(1, 4); // colour planes
        entry.writeUInt16LE(32, 6);// bits per pixel
        entry.writeUInt32LE(img.data.length, 8); // bytes in image
        entry.writeUInt32LE(offset, 12);         // offset
        entries.push(entry);
        datas.push(img.data);
        offset += img.data.length;
    }

    return Buffer.concat([header, ...entries, ...datas]);
}

async function makeIco(svgPath, outPath) {
    const buf = await svgBuffer(svgPath);
    const sizes = [16, 32, 48];
    const images = [];
    for (const size of sizes) {
        const pngBuf = await sharp(buf, { density: 384 })
            .resize(size, size)
            .png({ compressionLevel: 9 })
            .toBuffer();
        images.push({ size, data: pngBuf });
    }
    const ico = buildIco(images);
    await writeFile(outPath, ico);
    console.log(`  ${outPath} (16+32+48 multi-size)`);
}

console.log('Generating binary assets from SVG sources…');
await makePng('apple-touch-icon.svg', 'apple-touch-icon.png', 180);
await makePng('apple-touch-icon.svg', 'icon-192.png',         192);
await makePng('apple-touch-icon.svg', 'icon-512.png',         512);
await makeIco('favicon.svg', 'favicon.ico');
await makeOg('og-image.svg', 'og-image.png');
console.log('Done.');
