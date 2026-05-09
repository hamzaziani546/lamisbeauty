const fs = require("fs");
const path = require("path");
const sharp = require("sharp");
const pngToIco = require("png-to-ico").default;

const root = path.resolve(__dirname, "..");
const publicDir = path.join(root, "public");
const source = path.join(publicDir, "brand", "lamis-mark-light.png");

const navy = "#1A2332";
const navyDeep = "#111827";

async function makeIcon(baseMark, size, filename, scale) {
  const mark = await baseMark
    .clone()
    .resize({
      width: Math.round(size * scale),
      height: Math.round(size * scale),
      fit: "contain",
    })
    .png()
    .toBuffer();

  const background = Buffer.from(`
    <svg width="${size}" height="${size}" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="g" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="${navy}" />
          <stop offset="100%" stop-color="${navyDeep}" />
        </linearGradient>
      </defs>
      <rect width="${size}" height="${size}" rx="${Math.round(size * 0.22)}" fill="url(#g)" />
    </svg>
  `);

  const icon = await sharp(background)
    .composite([{ input: mark, gravity: "center" }])
    .png({ compressionLevel: 9, adaptiveFiltering: true })
    .toBuffer();

  fs.writeFileSync(path.join(publicDir, filename), icon);
}

async function main() {
  const baseMark = sharp(source).trim({ threshold: 10 });

  await makeIcon(baseMark, 16, "favicon-16x16.png", 0.78);
  await makeIcon(baseMark, 32, "favicon-32x32.png", 0.78);
  await makeIcon(baseMark, 48, "favicon-48x48.png", 0.78);
  await makeIcon(baseMark, 180, "apple-touch-icon.png", 0.75);
  await makeIcon(baseMark, 192, "android-chrome-192x192.png", 0.75);
  await makeIcon(baseMark, 512, "android-chrome-512x512.png", 0.75);

  const ico = await pngToIco([
    path.join(publicDir, "favicon-16x16.png"),
    path.join(publicDir, "favicon-32x32.png"),
    path.join(publicDir, "favicon-48x48.png"),
  ]);

  fs.writeFileSync(path.join(publicDir, "favicon.ico"), ico);
  console.log("Professional favicon assets regenerated.");
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
