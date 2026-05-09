const fs = require("fs");
const path = require("path");
const sharp = require("sharp");
const pngToIco = require("png-to-ico").default;

const root = path.resolve(__dirname, "..");
const publicDir = path.join(root, "public");
const source = path.join(publicDir, "brand", "lamis-mark-light.png");

async function makeIcon(size, filename) {
  const icon = await sharp(source)
    .resize(size, size, { fit: "contain", background: { r: 255, g: 255, b: 255, alpha: 1 } })
    .png({ compressionLevel: 9 })
    .toBuffer();

  fs.writeFileSync(path.join(publicDir, filename), icon);
  console.log(`✅ ${filename} (${size}x${size})`);
}

async function main() {
  await makeIcon(16, "favicon-16x16.png");
  await makeIcon(32, "favicon-32x32.png");
  await makeIcon(48, "favicon-48x48.png");
  await makeIcon(180, "apple-touch-icon.png");
  await makeIcon(192, "android-chrome-192x192.png");
  await makeIcon(512, "android-chrome-512x512.png");

  const ico = await pngToIco([
    path.join(publicDir, "favicon-16x16.png"),
    path.join(publicDir, "favicon-32x32.png"),
    path.join(publicDir, "favicon-48x48.png"),
  ]);

  fs.writeFileSync(path.join(publicDir, "favicon.ico"), ico);
  console.log("✅ favicon.ico");
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
