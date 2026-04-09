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
          <div className="career-info-box">
            <div className="career-info-in">
              <div className="career-role">
                <h4>AI Engineer – Data & AI Solutions</h4>
                <h5>Acuvate Software, Bengaluru</h5>
              </div>
              <h3>Mar 2023 – Aug 2024</h3>
            </div>
            <p>
              Built production AI solutions including Azure OpenAI deployments, multilingual enterprise chatbots, RAG systems, OCR pipelines with Azure Functions, and KPI dashboards. Optimized retrieval systems and search implementations for enterprise applications.
            </p>
          </div>
          <div className="career-info-box">
            <div className="career-info-in">
              <div className="career-role">
                <h4>Software Engineer – Data Engineering & Automation</h4>
                <h5>Acuvate Software, Hyderabad</h5>
              </div>
              <h3>Jun 2021 – Mar 2023</h3>
            </div>
            <p>
              Developed data engineering pipelines, ETL automation systems, and cloud data solutions. Built data processing workflows and optimization systems for enterprise clients.
            </p>
          </div>
          <div className="career-info-box">
            <div className="career-info-in">
              <div className="career-role">
                <h4>MS in Information Systems</h4>
                <h5>Northeastern University</h5>
              </div>
              <h3>Graduating May 2026</h3>
            </div>
            <p>
              Specialized in AI, data engineering, and cloud systems. Focused on practical AI implementation, machine learning systems, and enterprise data architecture.
            </p>
          </div>
          <div className="career-info-box">
            <div className="career-info-in">
              <div className="career-role">
                <h4>BE in Electronics and Communication</h4>
                <h5>CMR University</h5>
              </div>
              <h3>Graduated Jun 2021</h3>
            </div>
            <p>
              Foundation in electronics, communication systems, and software fundamentals. Built strong technical foundation for AI and data engineering career.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Career;
