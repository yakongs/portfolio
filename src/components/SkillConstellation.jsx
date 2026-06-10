import { useState } from "react";

function SkillConstellation({ skills }) {
  const [activeSkill, setActiveSkill] = useState(skills[0]);

  return (
    <div className="skill-explorer">
      <div
        className="skill-constellation"
        role="group"
        aria-label="Interactive technology constellation"
      >
        <div className="constellation-orbit orbit-one" aria-hidden="true"></div>
        <div className="constellation-orbit orbit-two" aria-hidden="true"></div>
        <div className="constellation-core" aria-hidden="true">
          <span>SOSO</span>
          <small>STACK</small>
        </div>

        {skills.map((skill, index) => (
          <button
            className={`skill-node ${
              activeSkill.name === skill.name ? "is-active" : ""
            }`}
            type="button"
            aria-pressed={activeSkill.name === skill.name}
            style={{
              "--node-x": `${skill.position.x}%`,
              "--node-y": `${skill.position.y}%`,
              "--node-delay": `${index * -0.45}s`,
            }}
            onClick={() => setActiveSkill(skill)}
            key={skill.name}
          >
            {skill.name}
          </button>
        ))}
      </div>

      <div className="skill-detail" aria-live="polite">
        <p>{activeSkill.category}</p>
        <h3>{activeSkill.name}</h3>
        <span>{activeSkill.description}</span>
      </div>
    </div>
  );
}

export default SkillConstellation;
