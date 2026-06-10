import { trackInteraction } from "../utils/analytics.js";

function ProjectCard({ project, onOpenCaseStudy }) {
  const handlePointerMove = (event) => {
    if (
      event.pointerType !== "mouse" ||
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ) {
      return;
    }

    const card = event.currentTarget;
    const bounds = card.getBoundingClientRect();
    const x = (event.clientX - bounds.left) / bounds.width;
    const y = (event.clientY - bounds.top) / bounds.height;

    card.style.setProperty("--tilt-x", `${(0.5 - y) * 7}deg`);
    card.style.setProperty("--tilt-y", `${(x - 0.5) * 7}deg`);
    card.style.setProperty("--glow-x", `${x * 100}%`);
    card.style.setProperty("--glow-y", `${y * 100}%`);
  };

  const resetTilt = (event) => {
    const card = event.currentTarget;
    card.style.setProperty("--tilt-x", "0deg");
    card.style.setProperty("--tilt-y", "0deg");
    card.style.setProperty("--glow-x", "50%");
    card.style.setProperty("--glow-y", "50%");
  };

  return (
    <article
      className="project-card"
      onPointerMove={handlePointerMove}
      onPointerLeave={resetTilt}
    >
      <div className="project-image">
        <img
          src={project.image}
          alt={project.imageAlt}
          loading="lazy"
          style={{ objectPosition: project.imagePosition }}
        />
        <span className="project-number" aria-hidden="true">
          {project.number}
        </span>
      </div>

      <div className="project-content">
        <p className="project-type">{project.type}</p>
        <h3>{project.title}</h3>
        <p>{project.description}</p>

        <div className="project-skills" aria-label={`${project.title} skills`}>
          {project.skills.map((skill) => (
            <span key={skill}>{skill}</span>
          ))}
        </div>

        <button
          className="case-study-button"
          type="button"
          onClick={() => {
            trackInteraction(`case-study:${project.id}`);
            onOpenCaseStudy(project);
          }}
        >
          VIEW CASE STUDY
        </button>

        {(project.liveUrl || project.repositoryUrl) && (
          <div className="project-links">
            {project.liveUrl && (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noreferrer"
                onClick={() => trackInteraction(`live-demo:${project.id}`)}
              >
                LIVE DEMO
              </a>
            )}
            {project.repositoryUrl && (
              <a
                href={project.repositoryUrl}
                target="_blank"
                rel="noreferrer"
                onClick={() => trackInteraction(`repository:${project.id}`)}
              >
                GITHUB
              </a>
            )}
          </div>
        )}
      </div>
    </article>
  );
}

export default ProjectCard;
