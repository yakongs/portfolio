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
    liveUrl: "",
    repositoryUrl: "https://github.com/yakongs/company_website",
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
    liveUrl: "",
    repositoryUrl: "https://github.com/yakongs/go-Kpop",
  },
];

export default projects;
