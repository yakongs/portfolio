# Soso Portfolio

A single-page React portfolio with a Y2K-inspired glass interface, responsive
project cards, expandable case studies, project filtering, and selectable color
themes. It also includes active-section navigation and a keyboard-accessible
command palette opened with `Ctrl+K` or `Command+K`. The skills section uses an
interactive technology constellation with keyboard-selectable nodes. Project
case studies open as draggable desktop-style windows.

## Stack

- React 19
- Vite 8
- CSS
- Sharp for reproducible image optimization

## Development

```bash
npm install
npm run dev
```

Quality checks:

```bash
npm run lint
npm run build
npm run audit
```

`npm run audit` creates a production build, checks core accessibility and SEO
signals, and enforces bundle-size budgets. It exits with an error when a check
fails, so it can be used in CI.

Regenerate the optimized WebP assets and social preview card:

```bash
npm run optimize:images
```

## Structure

```text
src/
  components/CaseStudyWindow.jsx
  components/SkillConstellation.jsx
  components/ProjectCard.jsx
  data/projects.js
  data/site.js
  data/skills.js
  utils/analytics.js
  assets/
  App.jsx
  App.css
scripts/
  optimize-images.mjs
public/
  resume.pdf
  og-image.webp
```

Project content lives in `src/data/projects.js`. Each project supports:

- Category filtering
- Technology tags
- Screenshot and alternative text
- Role, challenge, solution, and outcome details
- Optional live-demo and repository URLs

## Personal Configuration

Before deployment, update `src/data/site.js` with the portfolio owner's real
contact email and social profiles:

```js
const site = {
  email: "name@example.com",
  availability: {
    isAvailable: true,
    label: "Open to work",
  },
  location: "Toronto, Canada",
  socialLinks: [
    { label: "GitHub", url: "https://github.com/username" },
    { label: "LinkedIn", url: "https://linkedin.com/in/username" },
  ],
};
```

Add real `liveUrl` and `repositoryUrl` values to each project in
`src/data/projects.js`. Empty values are intentionally not rendered.

## GitHub Pages Deployment

The application is configured for:

```text
https://yakongs.github.io/portfolio/
```

The Vite base path is `/portfolio/`. The workflow in
`.github/workflows/deploy.yml` builds and deploys the `dist` directory whenever
the `main` branch is pushed.

Repository setup:

1. Create a public GitHub repository named `portfolio` under `yakongs`.
2. Push this project to its `main` branch.
3. In the repository's **Settings > Pages**, set the source to **GitHub
   Actions**.
4. Run or re-run the **Deploy portfolio to GitHub Pages** workflow.

## Local Analytics

Resume, case-study, live-demo, and repository interactions are counted in the
visitor's own browser under the `localStorage` key
`soso-portfolio-analytics-v1`. No analytics data is transmitted over the
network and no personal information is collected.

Inspect the counters in a browser console:

```js
JSON.parse(localStorage.getItem("soso-portfolio-analytics-v1"))
```

Clear the counters:

```js
localStorage.removeItem("soso-portfolio-analytics-v1")
```

## Roadmap

Implementation progress is tracked in
[`PORTFOLIO_ROADMAP.md`](./PORTFOLIO_ROADMAP.md).
