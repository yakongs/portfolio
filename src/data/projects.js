import cookingAppImage from "../assets/cookingApp.webp";
import goKpopImage from "../assets/goKpop.webp";
import sosoFactoryImage from "../assets/sosoFactory.webp";

const projects = [
  {
    id: "soso-factory",
    number: "01",
    category: "Web",
    type: "WEB EXPERIENCE",
    title: "Soso Factory",
    description:
      "A responsive entertainment landing page designed to introduce a game quickly and guide visitors toward downloading or learning more.",
    skills: ["React", "Responsive UI", "Web Design"],
    image: sosoFactoryImage,
    imageAlt: "Soso Factory game website landing page",
    imagePosition: "center",
    caseStudy: {
      role: "Frontend development and interface design",
      challenge:
        "Present a playful game identity without letting the illustrated artwork overwhelm navigation and calls to action.",
      solution:
        "Built a structured hero layout with strong visual hierarchy, focused actions, responsive navigation, and room for localization.",
      outcome:
        "Produced a clear promotional experience that balances character artwork with product information across screen sizes.",
    },
    liveUrl: "",
    repositoryUrl: "",
  },
  {
    id: "cooking-app",
    number: "02",
    category: "Mobile",
    type: "MOBILE APPLICATION",
    title: "Korean Cooking App",
    description:
      "A mobile cooking companion that keeps recipe discovery, guided instructions, timing, and feedback in one focused workflow.",
    skills: ["Mobile UI", "Navigation", "UX Design"],
    image: cookingAppImage,
    imageAlt: "Korean cooking app screens showing recipes, timer, and feedback",
    imagePosition: "center",
    caseStudy: {
      role: "Mobile interface design and application flow",
      challenge:
        "Make multiple cooking tools easy to reach while keeping the interface readable during hands-on kitchen use.",
      solution:
        "Organized the experience around persistent navigation, visual recipe selection, step-by-step content, and a dedicated timer.",
      outcome:
        "Created a complete mobile flow from choosing a dish through cooking and sharing feedback.",
    },
    liveUrl: "",
    repositoryUrl: "https://github.com/yakongs/cooking-class-app",
  },
  {
    id: "go-kpop",
    number: "03",
    category: "Web",
    type: "INTERACTIVE WEBSITE",
    title: "Go K-Pop",
    description:
      "An artist discovery website that turns group, song, release, and external-link data into a browsable music reference.",
    skills: ["JavaScript", "HTML", "CSS"],
    image: goKpopImage,
    imageAlt: "Go K-Pop artist and song discovery website",
    imagePosition: "top",
    caseStudy: {
      role: "Frontend development and content organization",
      challenge:
        "Display several artists and track details without making the page feel like a dense table of data.",
      solution:
        "Used artist tabs, reusable song cards, artwork, and concise metadata to create a more visual browsing experience.",
      outcome:
        "Delivered a straightforward discovery interface where visitors can compare releases and continue to external artist resources.",
    },
    liveUrl: "",
    repositoryUrl: "https://github.com/yakongs/go-Kpop",
  },
];

export default projects;
