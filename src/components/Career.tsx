import { experience, emphasizeMetrics } from "../data/portfolioContent";
import "./styles/Career.css";

const Career = () => {
  return (
    <div className="career-section section-container">
      <div className="career-container">
        <h2>
          My career <span>&</span>
          <br /> experience
        </h2>
        <div className="career-info">
          <div className="career-timeline">
            <div className="career-dot"></div>
          </div>
          {experience.map((entry) => (
            <div className="career-info-box" key={`${entry.role}-${entry.dates}`}>
              <div className="career-info-in">
                <div className="career-role">
                  <h4>{entry.role}</h4>
                  <h5>
                    {entry.company} · {entry.dates} · {entry.location} ·{" "}
                    {entry.employment}
                  </h5>
                </div>
                <h3>{entry.yearLabel}</h3>
              </div>
              <ul className="career-bullets">
                {entry.bullets.map((bullet) => (
                  <li
                    key={bullet}
                    dangerouslySetInnerHTML={{
                      __html: emphasizeMetrics(bullet),
                    }}
                  />
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Career;
