import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const dist = path.join(root, "dist");
const indexHtml = fs.readFileSync(path.join(dist, "index.html"), "utf8");
const appSource = fs.readFileSync(path.join(root, "src", "App.jsx"), "utf8");
const cardSource = fs.readFileSync(
  path.join(root, "src", "components", "ProjectCard.jsx"),
  "utf8",
);
const skillSource = fs.readFileSync(
  path.join(root, "src", "components", "SkillConstellation.jsx"),
  "utf8",
);
const caseWindowSource = fs.readFileSync(
  path.join(root, "src", "components", "CaseStudyWindow.jsx"),
  "utf8",
);
const analyticsSource = fs.readFileSync(
  path.join(root, "src", "utils", "analytics.js"),
  "utf8",
);
const cssSource = fs.readFileSync(path.join(root, "src", "App.css"), "utf8");

const checks = [];

const check = (name, condition, detail) => {
  checks.push({ name, passed: Boolean(condition), detail });
};

check("Document language", /<html lang="en">/.test(indexHtml), "Expected lang=en.");
check(
  "Page title",
  /<title>[^<]{10,}<\/title>/.test(indexHtml),
  "Expected a descriptive title.",
);
check(
  "Meta description",
  /<meta\s+name="description"\s+content="[^"]{50,}"/.test(indexHtml),
  "Expected a meaningful meta description.",
);
check(
  "Social preview metadata",
  /property="og:image"/.test(indexHtml) &&
    /name="twitter:card"/.test(indexHtml),
  "Expected Open Graph and Twitter card metadata.",
);
check(
  "Canonical deployment metadata",
  /rel="canonical"\s+href="https:\/\/yakongs\.github\.io\/portfolio\/"/.test(
    indexHtml,
  ) &&
    /https:\/\/yakongs\.github\.io\/portfolio\/og-image\.webp/.test(indexHtml),
  "Expected absolute GitHub Pages canonical and social image URLs.",
);
check(
  "Single primary heading",
  (appSource.match(/<h1[\s>]/g) ?? []).length === 1,
  "Expected exactly one h1 in App.jsx.",
);
check(
  "Navigation label",
  /<nav aria-label="Primary navigation">/.test(appSource),
  "Expected labelled primary navigation.",
);
check(
  "Image alternatives",
  /alt="Soso profile"/.test(appSource) &&
    /alt=\{project\.imageAlt\}/.test(cardSource),
  "Expected meaningful alternative text for content images.",
);
check(
  "Lazy project images",
  /loading="lazy"/.test(cardSource),
  "Expected project screenshots to lazy-load.",
);
check(
  "Keyboard focus styles",
  /:focus-visible/.test(cssSource),
  "Expected visible keyboard focus styling.",
);
check(
  "Reduced motion support",
  /prefers-reduced-motion:\s*reduce/.test(cssSource),
  "Expected a reduced-motion media query.",
);
check(
  "Dialog labelling",
  /aria-labelledby="command-title"/.test(
    fs.readFileSync(
      path.join(root, "src", "components", "CommandPalette.jsx"),
      "utf8",
    ),
  ),
  "Expected the command dialog to have an accessible name.",
);
check(
  "Interactive skills labelling",
  /aria-label="Interactive technology constellation"/.test(skillSource) &&
    /aria-live="polite"/.test(skillSource) &&
    /aria-pressed=/.test(skillSource),
  "Expected labelled skill controls and an announced detail region.",
);
check(
  "Case study dialog accessibility",
  /aria-labelledby=\{`case-title-\$\{project\.id\}`\}/.test(caseWindowSource) &&
    /ArrowUp/.test(caseWindowSource) &&
    /previousActiveElement\?\.focus/.test(caseWindowSource),
  "Expected labelled case-study dialogs, keyboard movement, and focus return.",
);
check(
  "Privacy-friendly interaction analytics",
  /window\.localStorage/.test(analyticsSource) &&
    !/fetch\(|sendBeacon|XMLHttpRequest/.test(analyticsSource) &&
    /resume:contact/.test(appSource) &&
    /repository:\$\{project\.id\}/.test(cardSource),
  "Expected local-only counters for resume and project interactions.",
);
check(
  "Contact and social configuration",
  /rtgm1215@gmail\.com/.test(appSource) === false &&
    /site\.email/.test(appSource) &&
    /site\.socialLinks/.test(appSource) &&
    /rtgm1215@gmail\.com/.test(
      fs.readFileSync(path.join(root, "src", "data", "site.js"), "utf8"),
    ),
  "Expected configured email and data-driven social links.",
);
check(
  "GitHub Pages base path",
  /\/portfolio\/assets\//.test(indexHtml),
  "Expected production assets under the /portfolio/ base path.",
);

const assetFiles = fs
  .readdirSync(path.join(dist, "assets"))
  .map((name) => {
    const filePath = path.join(dist, "assets", name);
    return { name, bytes: fs.statSync(filePath).size };
  });

const totalAssetBytes = assetFiles.reduce((sum, asset) => sum + asset.bytes, 0);
const mediaAssets = assetFiles.filter(
  (asset) => !asset.name.endsWith(".js") && !asset.name.endsWith(".css"),
);
const largestMediaAsset = [...mediaAssets].sort((a, b) => b.bytes - a.bytes)[0];
const jsBytes = assetFiles
  .filter((asset) => asset.name.endsWith(".js"))
  .reduce((sum, asset) => sum + asset.bytes, 0);
const cssBytes = assetFiles
  .filter((asset) => asset.name.endsWith(".css"))
  .reduce((sum, asset) => sum + asset.bytes, 0);

check(
  "Total asset budget",
  totalAssetBytes <= 600_000,
  `${totalAssetBytes.toLocaleString()} / 600,000 bytes`,
);
check(
  "JavaScript budget",
  jsBytes <= 250_000,
  `${jsBytes.toLocaleString()} / 250,000 bytes`,
);
check(
  "CSS budget",
  cssBytes <= 50_000,
  `${cssBytes.toLocaleString()} / 50,000 bytes`,
);
check(
  "Largest media asset budget",
  largestMediaAsset.bytes <= 150_000,
  `${largestMediaAsset.name}: ${largestMediaAsset.bytes.toLocaleString()} / 150,000 bytes`,
);

for (const result of checks) {
  const marker = result.passed ? "PASS" : "FAIL";
  console.log(`${marker}  ${result.name} - ${result.detail}`);
}

const failures = checks.filter((result) => !result.passed);

console.log(
  `\n${checks.length - failures.length}/${checks.length} checks passed. ` +
    `Built assets: ${totalAssetBytes.toLocaleString()} bytes.`,
);

if (failures.length > 0) {
  process.exitCode = 1;
}
