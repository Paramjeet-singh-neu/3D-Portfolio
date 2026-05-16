import { awardGroups } from "../data/portfolioContent";
import "./styles/Awards.css";

const Awards = () => {
  return (
    <div className="awards-section section-container" id="awards">
      <h2>
        Hackathons <span>&amp; Awards</span>
      </h2>
      <div className="awards-strip">
        {awardGroups.map((group) => (
          <div className="awards-group" key={group.label}>
            <h3 className="awards-subgroup-title">{group.label}</h3>
            <div className="awards-group-list">
              {group.items.map((award) => (
                <div className="awards-item" key={award.title}>
                  {award.link ? (
                    <a
                      href={award.link}
                      target="_blank"
                      rel="noreferrer"
                      data-cursor="disable"
                      className="awards-item-link"
                    >
                      <h4>{award.title}</h4>
                    </a>
                  ) : (
                    <h4>{award.title}</h4>
                  )}
                  {award.subtitle && (
                    <p className="awards-subtitle">{award.subtitle}</p>
                  )}
                  {award.date && (
                    <p className="awards-date">{award.date}</p>
                  )}
                  <p className="awards-detail">{award.detail}</p>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Awards;
