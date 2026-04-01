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
                <h4>AI Engineer</h4>
                <h5>Acuvate Software</h5>
              </div>
              <h3>Mar 2023 – Aug 2024</h3>
            </div>
            <p>
              Designed and deployed LLM-powered conversational systems using Python, Azure OpenAI, and Azure AI services. Built production AI system integrating Azure OpenAI, OCR, and Azure Functions to automate complaint classification for NYC Police, reducing manual processing by 60%. Developed GPT-4 prompt engineering pipelines and evaluation loops, improving model reliability and reducing misclassification rates by 60%. Built RAG conversational agent using GPT-4, Azure AI Search, vector embeddings for multilingual document search.
            </p>
          </div>
          <div className="career-info-box">
            <div className="career-info-in">
              <div className="career-role">
                <h4>Software Engineer</h4>
                <h5>Acuvate Software</h5>
              </div>
              <h3>Jun 2021 – Mar 2023</h3>
            </div>
            <p>
              Built scalable Python-based data ingestion pipelines using Scrapy and BeautifulSoup across 100+ external sources for NLP models. Engineered AI-powered semantic search platform using embeddings within Salesforce, reducing information retrieval time by 35%. Designed and optimized SQL Server ETL pipelines with indexing strategies and query tuning, improving processing speed by 50%. Automated reporting workflows integrating REST APIs with Power BI dashboards, reducing manual reporting effort by 70%.
            </p>
          </div>
          <div className="career-info-box">
            <div className="career-info-in">
              <div className="career-role">
                <h4>Instructional Assistant</h4>
                <h5>Northeastern University</h5>
              </div>
              <h3>Aug 2025 – Feb 2026</h3>
            </div>
            <p>
              Supported instruction for database design and SQL systems, guiding students through data modeling, normalization, and query optimization. Reviewed and debugged SQL assignments and data workflows, reinforcing best practices in data validation, schema design, and query performance optimization.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Career;
