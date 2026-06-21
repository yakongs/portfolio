import { useEffect, useMemo, useState } from "react";
import "./App.css";
import bgImage from "./assets/bg.webp";
import profileImage from "./assets/profile.webp";
import ProjectCard from "./components/ProjectCard.jsx";
import SkillConstellation from "./components/SkillConstellation.jsx";
import projects from "./data/projects.js";
import site from "./data/site.js";
import skills from "./data/skills.js";
import { trackInteraction } from "./utils/analytics.js";

function App() {
  const resumeUrl = `${import.meta.env.BASE_URL}resume.pdf`;
  const [activeFilter, setActiveFilter] = useState("All");
  const [activeSection, setActiveSection] = useState("");
  const [theme, setTheme] = useState("lavender");
  const filters = [
    "All",
    ...new Set(projects.map((project) => project.category)),
  ];
  const filteredProjects = useMemo(
    () =>
      activeFilter === "All"
        ? projects
        : projects.filter((project) => project.category === activeFilter),
    [activeFilter],
  );
  useEffect(() => {
    const sections = document.querySelectorAll("main section[id]");
    const observer = new IntersectionObserver(
      (entries) => {
        const visibleSection = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];

        if (visibleSection) {
          setActiveSection(visibleSection.target.id);
        }
      },
      {
        rootMargin: "-25% 0px -55%",
        threshold: [0, 0.25, 0.5],
      },
    );

    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  return (
    <div
      className={`page theme-${theme}`}
      style={{
        backgroundImage: `url(${bgImage})`,
      }}
    >
      <div className="ambient-glow" aria-hidden="true"></div>

      <header className="navbar">
        <a className="logo" href="#top" aria-label="Soso portfolio home">
          SOSO
        </a>

        <nav aria-label="Primary navigation">
          {["about", "skills", "projects", "contact"].map((section) => (
            <a
              className={activeSection === section ? "is-active" : ""}
              href={`#${section}`}
              aria-current={activeSection === section ? "location" : undefined}
              key={section}
            >
              {section.toUpperCase()}
            </a>
          ))}
        </nav>
      </header>

      <main id="top">
        <section className="hero" aria-labelledby="hero-title">
          <div className="hero-left">
            <p className="tag">FULLSTACK DEVELOPER PORTFOLIO</p>

            <h1 id="hero-title">CODE BLOOM</h1>

            <p className="hero-desc">
              I turn ideas into responsive digital experiences with clean
              structure, smooth interactions, and thoughtful details.
            </p>

            <a className="button-link" href="#projects">
              VIEW PROJECTS
            </a>
          </div>

          <div className="hero-card profile-card">
            <div className="profile-title">
              <p>✦ WELCOME TO ✦</p>
              <h3>SOSO WORLD</h3>
            </div>

            <div className="profile-content">
              <div className="profile-image-wrap">
                <img src={profileImage} alt="Soso profile" />
              </div>

              <div className="profile-info">
                <div className="info-row">
                  <div
                    className={`status-light ${
                      site.availability.isAvailable ? "" : "is-unavailable"
                    }`}
                  ></div>

                  <div>
                    <p className="info-label">Status:</p>
                    <p className="info-text">{site.availability.label}</p>
                  </div>
                </div>

                <div className="divider"></div>

                <div className="info-row">
                  <div className="info-icon">🌐</div>

                  <div>
                    <p className="info-label">Location:</p>
                    <p className="info-text">{site.location}</p>
                  </div>
                </div>
              </div>
            </div>

            <span className="sparkle sparkle-1">✦</span>
            <span className="sparkle sparkle-2">𖤐</span>
            <span className="sparkle sparkle-3">✧</span>
          </div>
        </section>

        <section id="about" className="section">
          <h2>ABOUT ME</h2>
          <p>
            Hi, I’m Soso, a recent Computer Programming graduate and aspiring
            full stack developer based in Toronto.
          </p>

          <p>
            I enjoy building responsive web applications with React, Node.js,
            Express, and databases such as MongoDB and PostgreSQL. Through
            personal and academic projects, I have worked on frontend
            interfaces, REST APIs, authentication flows, and database-driven
            features.
          </p>

          <p>
            I am currently seeking a junior developer opportunity where I can
            keep learning, contribute to real products, and grow with a
            collaborative team.
          </p>
        </section>

        <section id="skills" className="section">
          <div className="section-heading skills-heading">
            <p className="section-tag">TECHNOLOGY ORBIT</p>
            <h2>SKILLS</h2>
            <p>Select a node to explore how each technology fits my stack.</p>
          </div>

          <SkillConstellation skills={skills} />
        </section>

        <section id="projects" className="section projects-section">
          <div className="section-heading">
            <p className="section-tag">SELECTED WORKS</p>
            <h2>PROJECTS</h2>
          </div>

          <div className="project-filters" aria-label="Filter projects">
            {filters.map((filter) => (
              <button
                className={activeFilter === filter ? "is-active" : ""}
                type="button"
                aria-pressed={activeFilter === filter}
                onClick={() => setActiveFilter(filter)}
                key={filter}
              >
                {filter}
              </button>
            ))}
          </div>

          <div className="project-grid">
            {filteredProjects.map((project) => (
              <ProjectCard key={project.id} project={project} />
            ))}
          </div>
        </section>

        <section id="contact" className="section contact">
          <p className="section-tag">START A CONVERSATION</p>
          <h2>CONTACT</h2>
          <p>
            I’m a junior full stack developer looking for opportunities to
            learn, contribute, and grow with a team
          </p>

          <div className="contact-actions">
            {site.email ? (
              <a className="button-link" href={`mailto:${site.email}`}>
                EMAIL ME
              </a>
            ) : (
              <span className="contact-note">
                Contact address will be added before launch.
              </span>
            )}

            <a
              className="button-link button-secondary"
              href={resumeUrl}
              target="_blank"
              rel="noreferrer"
              onClick={() => trackInteraction("resume:contact")}
            >
              VIEW RESUME
            </a>
          </div>

          {site.socialLinks.length > 0 && (
            <div className="social-links" aria-label="Social profiles">
              {site.socialLinks.map((social) => (
                <a
                  href={social.url}
                  target="_blank"
                  rel="noreferrer"
                  key={social.label}
                >
                  {social.label}
                </a>
              ))}
            </div>
          )}
        </section>
      </main>

      <aside className="theme-switcher" aria-label="Choose color theme">
        <span>THEME</span>
        {["lavender", "pink", "aqua"].map((option) => (
          <button
            className={`theme-dot theme-dot-${option}`}
            type="button"
            aria-label={`Use ${option} theme`}
            aria-pressed={theme === option}
            onClick={() => setTheme(option)}
            key={option}
          />
        ))}
      </aside>
    </div>
  );
}

export default App;
