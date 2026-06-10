import path from "node:path";
import { fileURLToPath } from "node:url";
import sharp from "sharp";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const assets = path.join(root, "src", "assets");

const images = [
  { input: "bg.png", output: "bg.webp", width: 941, quality: 82 },
  {
    input: "profile.jpg",
    output: "profile.webp",
    width: 700,
    height: 700,
    quality: 84,
  },
  {
    input: "sosoFactory.png",
    output: "sosoFactory.webp",
    width: 1200,
    quality: 82,
  },
  {
    input: "cookingApp.png",
    output: "cookingApp.webp",
    width: 1200,
    quality: 82,
  },
  {
    input: "goKpop.png",
    output: "goKpop.webp",
    width: 1000,
    quality: 82,
  },
];

await Promise.all(
  images.map(({ input, output, width, height, quality }) =>
    sharp(path.join(assets, input))
      .resize({ width, height, fit: "cover", withoutEnlargement: true })
      .webp({ quality })
      .toFile(path.join(assets, output)),
  ),
);

const socialCard = Buffer.from(`
  <svg width="1200" height="630" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="card" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0" stop-color="#f7dfff"/>
        <stop offset="0.5" stop-color="#dcd5ff"/>
        <stop offset="1" stop-color="#c7f2ff"/>
      </linearGradient>
      <filter id="glow">
        <feGaussianBlur stdDeviation="18" result="blur"/>
        <feMerge><feMergeNode in="blur"/><feMergeNode in="SourceGraphic"/></feMerge>
      </filter>
    </defs>
    <rect width="1200" height="630" fill="url(#card)"/>
    <circle cx="1040" cy="100" r="150" fill="#fff" opacity=".28"/>
    <circle cx="130" cy="560" r="190" fill="#fff" opacity=".22"/>
    <text x="600" y="270" text-anchor="middle" fill="#7658d6"
      font-family="Arial, sans-serif" font-size="104" font-style="italic"
      font-weight="900" letter-spacing="8" filter="url(#glow)">CODE BLOOM</text>
    <text x="600" y="355" text-anchor="middle" fill="#6d55a5"
      font-family="Arial, sans-serif" font-size="30" font-weight="700"
      letter-spacing="7">SOSO • FULL-STACK DEVELOPER</text>
  </svg>
`);

await sharp(socialCard)
  .webp({ quality: 86 })
  .toFile(path.join(root, "public", "og-image.webp"));

console.log(`Optimized ${images.length} images and generated a social card.`);
