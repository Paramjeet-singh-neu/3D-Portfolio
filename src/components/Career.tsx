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
                <h4>Instructional Assistant</h4>
                <h5>Northeastern University</h5>
              </div>
              <h3>Aug 2025 - Feb 2026</h3>
            </div>
            <p>
              Supporting instruction and academic initiatives at Northeastern University while pursuing Master&apos;s degree in Information Systems.
            </p>
          </div>
          <div className="career-info-box">
            <div className="career-info-in">
              <div className="career-role">
                <h4>Software Engineer</h4>
                <h5>Acuvate</h5>
              </div>
              <h3>Jul 2021 - Aug 2024</h3>
            </div>
            <p>
              AI & NLP Solutions: Designed and deployed AI-powered chatbots (Azure OpenAI, Microsoft Copilot Studio, Power Virtual Agents), cutting customer complaints by 30% and boosting engagement. Data Automation & Search: Engineered web scraping pipeline in Python, improving chatbot response accuracy by 40%. Developed AI-driven complaint registration system for NYC Police with Azure Cognitive Services. Optimized SQL queries reducing execution time by 60%.
            </p>
          </div>
          <div className="career-info-box">
            <div className="career-info-in">
              <div className="career-role">
                <h4>Operations Manager</h4>
                <h5>Beatit Entertainment</h5>
              </div>
              <h3>Mar 2024 - May 2024</h3>
            </div>
            <p>
              Oversaw day-to-day operations and implemented strategies to enhance workflow efficiency. Managed team of 10, coordinating logistics and budget management for multiple events. Introduced process improvements that reduced turnaround times by 15%.
            </p>
          </div>
          <div className="career-info-box">
            <div className="career-info-in">
              <div className="career-role">
                <h4>Intern</h4>
                <h5>AIRobotica Services Pvt. Ltd.</h5>
              </div>
              <h3>Jul 2020 - Aug 2020</h3>
            </div>
            <p>
              Gained hands-on experience in electronics and automation. Designed and tested printed circuit boards (PCBs) for various automation solutions, collaborating with senior engineers to refine specifications and ensure functionality.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Career;
