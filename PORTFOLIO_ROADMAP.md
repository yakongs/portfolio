# Portfolio Improvement Roadmap

## Progress

**Overall completion: 95%**

`Completed tasks: 19 / 20`

Progress formula:

```text
completion percentage = completed tasks / 20 * 100
```

Update this section whenever a task is completed. Mark finished tasks with
`[x]` and add a short note to the Build Log.

## Phase 1: Portfolio Essentials

- [x] Replace generic project artwork with the existing project screenshots.
- [x] Move project information into a reusable data array.
- [x] Create a reusable `ProjectCard` component.
- [ ] Add a live-demo link to each available project.
- [x] Add a GitHub repository link to each available project.
- [x] Add expandable project details or case-study views.
- [x] Rewrite project descriptions to explain the problem, personal role,
      technical decisions, and result.
- [x] Add a working email link to the contact section.
- [x] Add social profile links.
- [x] Add a download/view resume button using `public/resume.pdf`.

## Phase 2: Quality and Accessibility

- [x] Replace nested anchor/button markup with semantic links or buttons.
- [x] Add visible keyboard focus styles.
- [x] Add `scroll-margin-top` so fixed navigation does not cover headings.
- [x] Add `prefers-reduced-motion` support.
- [x] Optimize large images and use WebP or AVIF where appropriate.
- [x] Lazy-load project screenshots.
- [x] Add proper page title, meta description, canonical URL, and Open Graph
      metadata.
- [x] Replace the default README with project setup, architecture, and
      deployment documentation.

## Phase 3: Interactive Features

- [x] Add project category filters such as Web, Mobile, and Full Stack.
- [x] Add one polished Y2K interaction: command palette, draggable desktop
      windows, theme switcher, skill constellation, or subtle card tilt.

## Future Ideas

These are optional and do not count toward the initial completion percentage.

- [x] Add an animated active-section indicator to the navbar.
- [x] Add lavender, pink chrome, and aqua themes.
- [x] Add a `Ctrl+K` portfolio command palette.
- [x] Present project case studies as draggable Y2K desktop windows.
- [x] Add an interactive technology orbit or skill constellation.
- [x] Add subtle cursor glow and depth effects.
- [x] Make the availability badge configurable from one data file.
- [x] Add analytics for resume downloads and project-link clicks.
- [x] Add automated accessibility and performance checks.

## Recommended Build Order

1. Real project screenshots and reusable project data/components
2. Project links and stronger project descriptions
3. Contact, social, and resume actions
4. Accessibility and semantic HTML
5. Image performance
6. SEO and social metadata
7. Project filters and case studies
8. One signature interactive feature

## Build Log

| Date | Progress | Change |
| --- | ---: | --- |
| 2026-06-10 | 0% | Created the implementation roadmap. |
| 2026-06-10 | 20% | Added real project screenshots, reusable project data, a `ProjectCard` component, and lazy-loaded project images. |
| 2026-06-10 | 75% | Added filters, expandable case studies, richer project copy, resume access, semantic controls, accessibility improvements, WebP optimization, documentation, social metadata, and a three-color theme switcher. |
| 2026-06-10 | 75% + 4 extras | Added active navigation, a keyboard-accessible `Ctrl+K` command palette, completed theme variants, and configurable profile availability. |
| 2026-06-10 | 75% + 6 extras | Added pointer-aware project depth effects, ambient glow, and an automated accessibility/performance release audit. |
| 2026-06-10 | 75% + 7 extras | Replaced the static skill list with a responsive, keyboard-accessible technology constellation and live detail panel. |
| 2026-06-10 | 75% + 9 extras | Completed the optional backlog with draggable case-study windows and privacy-friendly local interaction analytics. |
| 2026-06-10 | 95% + 9 extras | Added verified contact/social profiles, available project repositories, full deployment metadata, and GitHub Pages automation. |

## Blocked Configuration

The remaining core task requires a verified live-demo URL:

- Project live-demo URLs

The portfolio deployment target is `https://yakongs.github.io/portfolio/`.
Repository links are configured for the public projects currently available on
GitHub. No live demo was assigned without a verified deployed application.

All optional Future Ideas are complete.
