import { awards } from "../data/portfolioContent";
import "./styles/Awards.css";

const Awards = () => {
  return (
    <div className="awards-section section-container" id="awards">
      <h2>
        Hackathons <span>&amp; Awards</span>
      </h2>
      <div className="awards-strip">
        {awards.map((award) => (
          <div className="awards-item" key={award.title}>
            <h4>{award.title}</h4>
            <p>{award.detail}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Awards;
