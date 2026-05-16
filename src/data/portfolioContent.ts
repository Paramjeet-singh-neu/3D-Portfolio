export type CareerEntry = {
  role: string;
  company: string;
  dates: string;
  yearLabel: string;
  location: string;
  employment: string;
  bullets: string[];
};

export type ProjectLink = {
  label: string;
  url: string;
};

export type Project = {
  title: string;
  date: string;
  badge?: string;
  featured?: boolean;
  description: string;
  details: string;
  tech: string[];
  links: ProjectLink[];
  image: string;
};

export type SkillCategory = {
  name: string;
  skills: string[];
  emphasis?: string[];
};

export type Award = {
  title: string;
  date?: string;
  subtitle?: string;
  detail: string;
  link?: string;
};

export type AwardGroup = {
  label: string;
  items: Award[];
};

export const experience: CareerEntry[] = [
  {
    role: "Instructional Assistant",
    company: "Northeastern University",
    dates: "Aug 2025 – Feb 2026",
    yearLabel: "2025–26",
    location: "Boston, MA",
    employment: "Part-time",
    bullets: [
      "Supported instruction for database design and SQL systems courses",
      "Reviewed student work on schema design, normalization, and query optimization",
      "Reinforced production-grade SQL patterns through one-on-one sessions",
    ],
  },
  {
    role: "AI Engineer — ML & AI Solutions",
    company: "Acuvate Software",
    dates: "Mar 2023 – Aug 2024",
    yearLabel: "2023–24",
    location: "Bengaluru, India",
    employment: "Full-time",
    bullets: [
      "Built production RAG system using GPT-4, Azure AI Search, and vector embeddings; improved scoring accuracy across multilingual inputs",
      "Designed automated scoring/evaluation frameworks for LLM classification pipelines, reducing error rates by 60% across diverse input types",
      "Shipped deep learning pipelines on Azure OpenAI with model drift monitoring and REST API integrations for low-latency inference",
      "Built hybrid scoring system (Azure OpenAI + OCR + Azure Functions) with human-in-the-loop validation, cutting manual review by 60%",
    ],
  },
  {
    role: "Software Engineer — Data Engineering",
    company: "Acuvate Software",
    dates: "Jun 2021 – Mar 2023",
    yearLabel: "2021–23",
    location: "Hyderabad, India",
    employment: "Full-time",
    bullets: [
      "Built Python data pipelines across 100+ sources, generating structured training datasets and evaluation benchmarks for production ML",
      "Engineered semantic scoring platform with embeddings and NLP techniques, reducing retrieval time by 35%",
      "Designed ETL pipelines with statistical validation and quality controls, improving processing reliability by 50%",
    ],
  },
];

export const projects: Project[] = [
  {
    title: "CoachMe+",
    date: "Apr 2026",
    badge: "🏆 Grand Prize — Voxel51 × TwelveLabs Hackathon",
    featured: true,
    description:
      "FiftyOne plugin that analyzes athletic technique through video using multimodal AI.",
    details:
      "Ingests training footage through FiftyOne's dataset pipeline. TwelveLabs Marengo 3.0 for video similarity, Pegasus 1.2 for timestamped coaching feedback. Frame-level annotations for form corrections and technique gaps. Presented at TwelveLabs webinar (May 2026); recognized at Northeastern MGEN Awards.",
    tech: ["Python", "FiftyOne", "TwelveLabs API", "OpenAI", "Computer Vision"],
    links: [
      { label: "GitHub", url: "https://github.com/Paramjeet-singh-neu/CoachMe" },
    ],
    image: "/images/projects/coachme.png",
  },
  {
    title: "ConNET",
    date: "Apr 2026",
    badge: "🏆 1st Place — Cursor Hack-a-Sprint 2026 · Solo · 2.5 hrs",
    featured: true,
    description:
      "End-to-end AI networking agent using Inkbox Email, Vault, and Phone.",
    details:
      "Outbound: researches contacts and sends personalized email from the agent's identity. Inbound: qualifies leads and briefs on high-value contacts. Agent-to-agent introductions between two AI agents. Memory stores contacts with warmth scores from sentiment analysis. Daily TTS phone briefing.",
    tech: ["Python", "LangChain", "GPT-4o", "Inkbox SDK", "Flask", "React"],
    links: [
      { label: "GitHub", url: "https://github.com/Paramjeet-singh-neu/ConNET" },
    ],
    image: "/images/projects/connet.png",
  },
  {
    title: "FinSight",
    date: "Apr 2026",
    description:
      "7-actor Akka RAG system over SEC 10-K/10-Q filings with fault-tolerant agentic architecture.",
    details:
      "Ingests, indexes, and reasons over SEC filings using actor-model concurrency. CSYE7374 course project with Prof. Ozbek.",
    tech: ["Akka", "Scala", "RAG", "Vector DBs", "LLMs"],
    links: [
      {
        label: "GitHub",
        url: "https://github.com/Paramjeet-singh-neu",
      },
    ],
    image: "/images/finsight.png",
  },
  {
    title: "LockIn.AI",
    date: "Mar 2026",
    badge: "Frontiers GenAI Hackathon",
    description:
      "AI productivity system that builds personalized deep-work schedules from behavioral signals.",
    details:
      "Analyzes browser activity, calendar events, and interruptions to generate deep-work blocks.",
    tech: ["Python", "LLMs", "Prompt Engineering", "APIs"],
    links: [
      {
        label: "GitHub",
        url: "https://github.com/Paramjeet-singh-neu/GenerationalHackers",
      },
    ],
    image: "/images/projects/lockin.png",
  },
  {
    title: "Text Encoding & Decoding Pipeline",
    date: "Jan 2026",
    description:
      "Java pipeline that tokenizes Project Gutenberg eBooks and performs bidirectional encoding with numeric IDs.",
    details:
      "Modular design: file I/O, preprocessing, dictionary persistence, encoding logic. Disk-persistent vocabulary. Header/footer stripping and unknown-token handling.",
    tech: ["Java"],
    links: [
      {
        label: "GitHub",
        url: "https://github.com/Paramjeet-singh-neu/text-encoder-decoder-JAVA-",
      },
    ],
    image: "/images/projects/text-encoding.png",
  },
  {
    title: "IMDb Analytics & End-to-End BI Platform",
    date: "Nov – Dec 2025",
    description:
      "Medallion Architecture BI platform on 7 large IMDb datasets with dimensional modeling and dashboards.",
    details:
      "Bronze/Silver ETL in Databricks (PySpark/SQL) with row-level traceability. Gold layer in Snowflake with conformed dimensions, SCD2, and referential integrity. Source-to-Target Mapping, ISO-639 language mapping, surrogate keys. Power BI/Tableau dashboards for ratings, cast, regional releases, and episode metrics.",
    tech: [
      "Databricks",
      "PySpark",
      "Snowflake",
      "Power BI",
      "Tableau",
      "Alteryx",
      "ADF",
      "ER/Studio",
    ],
    links: [
      {
        label: "GitHub",
        url: "https://github.com/Paramjeet-singh-neu/IMBD",
      },
    ],
    image: "/images/imdb-analytics.png",
  },
  {
    title: "LA Crime Analysis — End-to-End BI Platform",
    date: "Nov 2025",
    description:
      "Medallion pipeline from raw LA crime ingestion to geospatial dashboards.",
    details:
      "Data profiling in Alteryx/Databricks (nulls, outliers, invalid geo-coords). Bronze/Silver pipelines with date/time and lat/long validation. Gold zone in Snowflake with conformed dimensions. Geospatial dashboards for crime hotspots and demographic patterns.",
    tech: [
      "Databricks",
      "PySpark",
      "Snowflake",
      "Power BI",
      "Tableau",
      "Git",
      "ADF",
    ],
    links: [
      {
        label: "View on GitHub",
        url: "https://github.com/prathushp/End-to-End-LA-Crime-Analytics_Group4",
      },
    ],
    image: "/images/projects/la-crime.png",
  },
  {
    title: "Food Establishment Inspections — Chicago & Dallas",
    date: "Oct 2025",
    description:
      "Unified 2M+ food inspection records from two cities with full Medallion pipeline and validation.",
    details:
      "Source-to-Target Mapping across differing schemas. Silver-layer validation: null checks, ZIP format, unique violation per inspection, Dallas violation cap. Dimensional schema: dim_facility, dim_violation, dim_location, dim_risk_category, fact_inspection. Unified Power BI dashboards.",
    tech: ["Databricks", "PySpark", "Power BI", "Alteryx", "ER/Studio", "ADF"],
    links: [
      {
        label: "GitHub",
        url: "https://github.com/Paramjeet-singh-neu/Food-Inspections-DW-Project/tree/Param",
      },
    ],
    image: "/images/projects/food-inspections.png",
  },
  {
    title: "QuickQuiz",
    date: "Jul – Aug 2025",
    description:
      "Multi-agent system that converts lecture PDFs into interactive quizzes under $0.002 per interaction.",
    details:
      "FAISS vector stores for context-aware retrieval. Agent flow: Document Processor → Content Analyzer → Quiz Generator. LLM calls capped at ≤2 per request via deterministic routing. Real-time LLM call tracking and cost estimation.",
    tech: ["LangChain", "FAISS", "OpenAI API", "Streamlit", "Python"],
    links: [
      {
        label: "GitHub",
        url: "https://github.com/Paramjeet-singh-neu/QuickQuiz",
      },
    ],
    image: "/images/quickquiz.png",
  },
  {
    title: "Food Delivery System",
    date: "Feb – Apr 2025",
    description:
      "Normalized SQL schema with stored procedures, triggers, and UDFs for order workflows.",
    details:
      "Automates order workflows and review tracking in Microsoft SQL Server.",
    tech: ["Microsoft SQL Server", "SQL", "Power BI"],
    links: [
      {
        label: "GitHub",
        url: "https://github.com/Paramjeet-singh-neu/food-delivery-database-system",
      },
    ],
    image: "/images/projects/food-delivery.png",
  },
  {
    title: "SpecHunt",
    date: "Oct – Dec 2024",
    description:
      "Tech product review and comparison platform with curated buying guides.",
    details: "Affiliate integration and REST-backed product comparisons.",
    tech: ["React", "MongoDB", "SCSS", "JavaScript", "REST APIs"],
    links: [
      {
        label: "GitHub",
        url: "https://github.com/Paramjeet-singh-neu",
      },
    ],
    image: "/images/spechunt.png",
  },
  {
    title: "Blood Bank Management Application",
    date: "Nov – Dec 2024",
    description:
      "Java desktop app for donor registration, inventory tracking, and request processing.",
    details:
      "Desktop application built with NetBeans for blood bank operations.",
    tech: ["Java", "NetBeans", "SQL", "DBMS"],
    links: [
      {
        label: "View on GitHub",
        url: "https://github.com/raghavendraprasath/blood-bank-management-system",
      },
    ],
    image: "/images/projects/blood-bank.png",
  },
  {
    title: "AI Chatbot with Web Data Integration",
    date: "Jul – Aug 2024",
    description:
      "Enterprise chatbot combining GPT-4 with live web scraping for real-time, context-aware answers.",
    details:
      "API integrations for live data. Improved response accuracy by 40% over static chatbots at Acuvate.",
    tech: [
      "LangChain",
      "GPT-4",
      "Python",
      "Azure Functions",
      "Azure Blob Storage",
      "Web Scraping",
    ],
    links: [
      {
        label: "GitHub",
        url: "https://github.com/paramjeet5ingh",
      },
    ],
    image: "/images/chatbot.png",
  },
];

export const skillCategories: SkillCategory[] = [
  {
    name: "Languages",
    skills: ["Python", "Java", "SQL", "JavaScript", "Scala", "C#"],
    emphasis: ["Python", "SQL", "Java"],
  },
  {
    name: "LLMs & AI Frameworks",
    skills: [
      "LangChain",
      "OpenAI API",
      "Azure OpenAI",
      "GPT-4 / 4o",
      "TwelveLabs (Marengo, Pegasus)",
      "FAISS",
      "RAG",
      "Prompt Engineering",
      "Agentic AI",
      "Akka Actor Model",
    ],
    emphasis: ["LangChain", "RAG", "Azure OpenAI", "GPT-4 / 4o"],
  },
  {
    name: "ML & Data Science",
    skills: [
      "PyTorch",
      "scikit-learn",
      "Computer Vision",
      "NLP",
      "Embeddings",
      "Vector Databases",
      "Model Evaluation",
      "Drift Monitoring",
    ],
    emphasis: ["PyTorch", "NLP", "Embeddings"],
  },
  {
    name: "Data Engineering",
    skills: [
      "Databricks",
      "PySpark",
      "Snowflake",
      "Azure Data Factory",
      "Delta Live Tables",
      "Medallion Architecture",
      "ETL",
      "SCD2",
      "Alteryx",
    ],
    emphasis: ["Databricks", "PySpark", "Snowflake", "Medallion Architecture"],
  },
  {
    name: "Cloud & Infra",
    skills: [
      "Azure (Functions, Cognitive Services, Blob, AI Search)",
      "REST APIs",
      "Flask",
      "Docker",
    ],
    emphasis: ["Azure (Functions, Cognitive Services, Blob, AI Search)"],
  },
  {
    name: "BI & Visualization",
    skills: ["Power BI", "Tableau", "ER/Studio"],
    emphasis: ["Power BI", "Tableau"],
  },
  {
    name: "Tools",
    skills: ["Git", "GitHub", "FiftyOne", "Streamlit", "React", "MongoDB"],
    emphasis: ["Git", "GitHub"],
  },
];

export const awardGroups: AwardGroup[] = [
  {
    label: "Hackathon Wins",
    items: [
      {
        title:
          "🏆 Grand Prize — Voxel51 × TwelveLabs Video Understanding AI Hackathon",
        date: "Apr 2026",
        detail:
          "Won with CoachMe+. Presented at TwelveLabs webinar.",
      },
    ],
  },
  {
    label: "Recognition",
    items: [
      {
        title: "🏅 MGEN Award — Program Director Award",
        subtitle:
          "Northeastern University College of Engineering · 2026",
        detail:
          "Recognized across the College of Engineering's graduate programs for sustained contribution throughout the MS program.",
      },
      {
        title: "Cursor Boston — Open Source Contributor",
        date: "May 2026",
        detail:
          "Recognized for community participation and open source contributions.",
      },
    ],
  },
];

/** Wraps numbers and % metrics in markup for accent styling */
export function emphasizeMetrics(text: string): string {
  return text.replace(
    /(\d+(?:\.\d+)?%?\+?|\$[\d.]+(?:\s*per\s+\w+)?|≤\d+)/g,
    "<strong class='metric'>$1</strong>"
  );
}
