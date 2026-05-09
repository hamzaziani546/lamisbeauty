const sharp = require("sharp");
const path = require("path");
const fs = require("fs");

const src = path.join(__dirname, "..", "public", "brand", "lamis-mark-light.png");
const outDir = path.join(__dirname, "..", "public", "brand");

fs.mkdirSync(outDir, { recursive: true });

// 120×120 WebP — displays at 40-56px in header, crisp on retina
sharp(src)
  .resize(120, 120, { fit: "contain", background: { r: 255, g: 255, b: 255, alpha: 0 } })
  .webp({ quality: 90 })
  .toFile(path.join(outDir, "lamis-logo-mark.webp"))
  .then((info) => console.log("✅ lamis-logo-mark.webp written:", info))
  .catch((err) => console.error("❌", err));
