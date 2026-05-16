import { skillCategories } from "../data/portfolioContent";
import "./styles/Skills.css";

const Skills = () => {
  return (
    <div className="skills-section section-container" id="skills">
      <h2>
        Skills <span>&amp; Tech Stack</span>
      </h2>
      <div className="skills-grid">
        {skillCategories.map((category) => (
          <div className="skills-category" key={category.name}>
            <h4>{category.name}</h4>
            <div className="skills-tags">
              {category.skills.map((skill) => (
                <span
                  key={skill}
                  className={
                    category.emphasis?.includes(skill)
                      ? "skills-tag skills-tag-emphasis"
                      : "skills-tag"
                  }
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Skills;
