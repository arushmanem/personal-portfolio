// src/app/page.tsx
import Image from "next/image";

type LinkSet = {
  github?: string;
  demo?: string;
};

type CaseStudySection = {
  title: string;
  body: string[];
  bullets?: string[];
};

type CaseStudy = {
  id: string;
  title: string;
  subtitle: string;
  metaRight: string;
  tech: string[];
  links?: LinkSet;
  sections: CaseStudySection[];
};

type TimelineItem = {
  role: string;
  org: string;
  location?: string;
  date: string;
  intro?: string;
  bullets: string[];
  reflection?: string;
};

export default function Home() {
  const profile = {
    name: "Arush Manem",
    tagline: "Welcome to my portfolio.",
    subtag:
      "Honors Data Science and Computer Science student at the University of Minnesota. I spent three and a half years building automation at HealthPartners, and this past summer building agentic triage pipelines at UnitedHealth Group. Both were systems real teams used every day.",
    about: [
      "I like problems that sit between data and engineering. Most of my work has been for business and operations teams, which means the output has to be something a non-engineer can act on. That constraint shapes how I build.",
      "Real problems rarely arrive with clean inputs. A lot of my time goes into the cases that break the happy path, and into making the result explainable enough that someone will trust it.",
    ],
    links: {
      email: "manemarush@gmail.com",
      linkedin: "https://www.linkedin.com/in/arushmanem",
      github: "https://github.com/arushmanem",
      resumeHref: "/ArushManem_Resume.docx",
    },
  };

  const education = {
    school: "University of Minnesota, Twin Cities",
    location: "Minneapolis, MN",
    degree: "Bachelor of Science, Honors Program",
    majors: "Data Science & Computer Science",
    grad: "May 2027",
    gpa: "3.8",
    coursework: [
      "Data Structures & Algorithms (CSCI 4041)",
      "Operating Systems (CSCI 4061)",
      "Probability & Statistics",
      "Optimization",
    ],
  };

  const caseStudies: CaseStudy[] = [
    {
      id: "snapcount",
      title: "SnapCount",
      subtitle: "Fantasy Football Analytics Platform",
      metaRight: "Flagship project",
      tech: ["FastAPI", "React", "Python", "Pandas", "Gemini", "Data Visualization"],
      links: {
        github: "https://github.com/arushmanem/snapcount-fantasy-ai",
        demo: "",
      },
      sections: [
        {
          title: "Problem",
          body: [
            "Most start/sit advice comes down to gut feeling or a season average. I wanted to see how much better you could do using historical data that is already public.",
          ],
        },
        {
          title: "System and Engineering Decisions",
          body: [
            "I built this as a product rather than a notebook. Ingestion, analysis, and presentation stay separate, which has made it easier to change one without breaking the others.",
            "The interface got more attention than anything else in the project. A chart you can interact with communicates a trend faster than a table of numbers does.",
          ],
          bullets: [
            "Built a clear pipeline structure (ingest → analyze → present) so the app stays maintainable as features grow.",
            "Designed a usability-first interface so recommendations and comparisons are easy to understand at a glance.",
            "Integrated Gemini to generate natural-language summaries that explain what the charts and comparisons are saying.",
          ],
        },
        {
          title: "Data and Modeling Decisions",
          body: [
            "I started with a linear baseline built on averages. It was not meant to be good, only to give me a number worth beating. A PyTorch network replaced it later and picks up interactions the linear version could not, using historical matchups and home-field advantage.",
            "To approximate a live setting, the model predicts a past week using only data available before that week. Without that restriction the results look considerably better than they actually are.",
          ],
          bullets: [
            "Built an automated ETL pipeline to scrape, clean, and cache 5,000+ weekly records using nfl_data_py and Pandas.",
            "Designed a custom statistical algorithm to quantify defensive metrics and forecast player performance from historical variance.",
            "Replaced the rule-based baseline with a PyTorch deep learning inference pipeline, keeping the baseline as a benchmark to measure against.",
            "Simulated real-world constraints by restricting inputs to information available before the target week.",
          ],
        },
        {
          title: "Limitations and Roadmap",
          body: [
            "The dataset does not refresh, so this is not a live forecasting system yet. Evaluation is thin too. I want better held-out metrics before I trust the network over the baseline everywhere.",
            "Next is live ingestion, and an evaluation harness so I can judge model changes on evidence instead of intuition.",
          ],
        },
      ],
    },
    {
      id: "readmission-risk-predictor",
      title: "Readmission Risk Predictor",
      subtitle: "30-Day Hospital Readmission ML Platform (team of 2)",
      metaRight: "August 2026",
      tech: ["Python", "Snowflake", "XGBoost", "SHAP", "Streamlit"],
      links: {
        github: "https://github.com/boyasuj27/readmission-risk-predictor",
        demo: "",
      },
      sections: [
        {
          title: "Problem",
          body: [
            "Hospitals are penalized when patients return within 30 days of discharge. The readmissions worth predicting are the preventable ones. We wanted a model that flags those patients early enough for a care team to act, and that shows its reasoning clearly enough for a clinician to believe it.",
          ],
        },
        {
          title: "Data and Feature Engineering",
          body: [
            "Everything runs on Snowflake. We did the exploratory work and cleaning in SQL across 101K+ patient encounters, then built 17 clinical features instead of handing raw columns to the model.",
          ],
          bullets: [
            "Ran SQL-based exploratory analysis and cleaning over 101K+ encounters directly in Snowflake.",
            "Engineered 17 clinical features including prior utilization, medication changes, discharge disposition, and A1C/glucose flags.",
          ],
        },
        {
          title: "Modeling Decisions",
          body: [
            "Only 11% of encounters were positive, so accuracy was not a usable metric. A model that always predicted \"not readmitted\" would score 89%. We weighted for the imbalance and optimized recall, because missing a high-risk patient costs more than an unnecessary follow-up call.",
          ],
          bullets: [
            "Trained and compared logistic regression, random forest, and XGBoost with class-imbalance weighting on an 11% positive class.",
            "Selected XGBoost with early stopping (AUC-ROC 0.68, recall 0.59), accepting lower precision as a deliberate tradeoff.",
          ],
        },
        {
          title: "Deployment and Explainability",
          body: [
            "We deployed a Streamlit app on Snowflake so the output was usable by a care team rather than sitting in a notebook. Each prediction arrives with the factors that drove it and a suggested next step.",
          ],
          bullets: [
            "Served per-patient SHAP waterfall explanations so a clinician can see exactly which factors drove an individual score.",
            "Surfaced global feature importance to show which signals mattered across the whole population.",
            "Generated automated, risk-tiered clinical intervention summaries that turn a probability into a recommended next step.",
          ],
        },
        {
          title: "What I Learned",
          body: [
            "An AUC of 0.68 is not a strong number. Readmission is hard to predict from administrative data alone, and I would rather report that plainly than tune until the metric looks better. What made the project useful was pairing a modest model with explanations a clinician could check.",
          ],
        },
      ],
    },
    {
      id: "ai-operations-assistant",
      title: "AI Operations Assistant",
      subtitle: "Retrieval-Augmented Generation (RAG) System",
      metaRight: "Summer 2026",
      tech: ["Python", "OpenAI API", "ChromaDB", "BM25", "pytest", "RAG"],
      links: {
        github: "https://github.com/arushmanem/OpAssistant",
        demo: "",
      },
      sections: [
        {
          title: "Problem",
          body: [
            "RAG demos usually work fine until you ask something the documents do not cover. I wanted to build the pipeline myself rather than lean on a framework, then test whether it held up against questions written specifically to make it hallucinate.",
          ],
        },
        {
          title: "System and Engineering Decisions",
          body: [
            "The pipeline splits into layers: ingestion, chunking, embedding, retrieval, synthesis. Keeping them separate is what made it possible to measure each stage on its own later.",
          ],
          bullets: [
            "Built PDF ingestion with chunking and overlap, embedding generation via text-embedding-3-small, ChromaDB vector storage, and gpt-4o-mini answer synthesis.",
            "Organized the system across a multi-layer architecture so retrieval strategy could change without touching ingestion or synthesis.",
            "Implemented hybrid retrieval, fusing BM25 keyword search with dense embeddings via Reciprocal Rank Fusion to recover rare technical tokens that pure semantic search diluted.",
            "Scoped vector collections per document to keep results relevant as the corpus grew.",
            "Shipped a chat interface with a strict/advisor mode toggle, so the assistant's willingness to extrapolate is an explicit choice rather than a hidden default.",
          ],
        },
        {
          title: "Evaluation",
          body: [
            "I wrote an evaluation harness over 20 factual and adversarial test cases, then used it to judge every retrieval change I made. If a change did not move the numbers, it did not stay in.",
          ],
          bullets: [
            "Measured Recall@k, MRR (0.873), LLM-as-judge scores, and adversarial refusal rate (100%).",
            "Raised LLM-as-judge scores from 4.35 → 4.65/5 through iterative prompt engineering.",
            "Diagnosed and fixed targeted failure cases in multi-entity synthesis queries, where the system had been retrieving correctly but merging entities in its answer.",
          ],
        },
        {
          title: "What I Learned",
          body: [
            "The adversarial refusal rate ended up being the number I cared about most. Early versions would answer questions the documents did not cover, and those answers read as perfectly reasonable, which is the problem. The harness is what caught it.",
          ],
        },
      ],
    },
    {
      id: "insurance-risk-assessor",
      title: "Insurance Risk Assessor",
      subtitle: "Machine Learning System for Cost Projection",
      metaRight: "July 2025",
      tech: ["Python", "scikit-learn", "Pandas", "SHAP", "Jupyter"],
      links: {
        github: "https://github.com/arushmanem/insurance-risk-assessor",
        demo: "",
      },
      sections: [
        {
          title: "Problem",
          body: [
            "Predict insurance costs from demographic and health inputs, with enough explainability that a non-technical stakeholder can see why a given number came out. A black box would not have been useful here.",
          ],
        },
        {
          title: "Implementation Decisions",
          body: [
            "The ETL pipeline is modular, so preprocessing, outlier detection, and feature generation are separate steps I can swap or extend later. I chose a Random Forest regressor because it stays interpretable under SHAP without giving up much accuracy.",
          ],
          bullets: [
            "Engineered interaction features (smoker-age, BMI-age) that captured nonlinear effects the base features could not.",
            "Tuned the Random Forest to R² = 0.88 and MAE of roughly $2,600, accurate enough to be meaningful for cost projection.",
            "Packaged the model with Pickle for reproducible, real-time deployment.",
            "Applied SHAP explainability to interpret which features drove individual predictions, so the model could be defended to stakeholders rather than just reported.",
          ],
        },
        {
          title: "What I Learned",
          body: [
            "Stakeholders did not trust a cost estimate until they could see what drove it. SHAP closed that gap faster than any accuracy improvement did.",
          ],
        },
      ],
    },
    {
      id: "tcp-marketplace-server",
      title: "Multi-Threaded TCP Marketplace Server",
      subtitle: "Operating Systems Coursework, Systems Programming in C",
      metaRight: "CSCI 4061 PA4 · April 2026",
      tech: ["C", "POSIX Threads", "BSD Sockets", "Mutexes", "Signals"],
      links: {},
      sections: [
        {
          title: "Problem",
          body: [
            "Build a TCP server for a marketplace where many clients connect at once and trade against shared inventory. The hard part is concurrency correctness, meaning several threads touching the same state without racing each other. It also needed graceful shutdown and a basic obfuscation layer on the wire.",
          ],
        },
        {
          title: "Implementation Decisions",
          body: [
            "Each client gets a worker thread. The main thread accepts connections and hands them off. Shared inventory sits behind a mutex so every read and write is serialized, and messages are Caesar-shifted at both ends.",
          ],
          bullets: [
            "Used pthreads for concurrent client handling, with mutex-protected critical sections around all inventory reads and writes.",
            "Implemented a SIGTERM handler for graceful shutdown, draining in-flight requests and cleaning up resources across worker threads before exiting.",
            "Added a Caesar-cipher message layer between client and server as a simple symmetric obfuscation step.",
            "Built socket setup, the accept loop, and per-client request parsing in pure C using BSD sockets.",
          ],
        },
        {
          title: "What I Learned",
          body: [
            "The race conditions were the real lesson. Two clients modifying the same inventory item would corrupt state, but only under load, and never the same way twice. Getting the mutex granularity right took longer than writing the server did.",
          ],
        },
      ],
    },
  ];

  const experience: TimelineItem[] = [
    {
      role: "Consumer Resolution Center War Room Intern",
      org: "UnitedHealth Group (UHG)",
      location: "Eden Prairie, MN",
      date: "June 2026 - August 2026",
      intro: `
        I spent the summer on UHG's CRC War Room, a cross-functional team that works on the most complex and systemic member issues. The team has been featured in Harvard Business Review.

        My piece was agentic automation. I built Python and SQL pipelines on Databricks that scaled the team's triage capability, along with the dashboards that made resolution outcomes visible to leadership. The automation gave analysts back roughly 1,820 hours a year.
        `.trim(),
      bullets: [
        "Engineered agentic automation pipelines in Python and SQL on Databricks to scale intelligent triage capabilities for the CRC War Room, saving 1,820 analyst hours per year and increasing efficiency by 70%.",
        "Contributed automation and data infrastructure whose outputs directly enabled the War Room's 2026 outcomes: 6.2M members impacted and 1.4M calls obviated enterprise-wide, with agentic triage expansion a driving force of that operational scale.",
        "Built real-time dashboards and operational data widgets in Power BI and ServiceNow to surface resolution outcomes and member impact signals across high-volume healthcare workflows.",
        "Partnered with project managers and triage analysts to translate operational bottlenecks into technical requirements, delivering end-to-end automation and data solutions across enterprise problem-solving workflows.",
      ],
      reflection:
        "The hardest part was not the code. Analysts would describe a bottleneck in operational terms, and turning that into something I could build usually took a few rounds of questions. That translation step is where most of my time went.",
    },
    {
      role: "Software Engineering Intern, Robotic Process Automation",
      org: "HealthPartners",
      location: "Bloomington, MN",
      date: "June 2022 - January 2026",
      intro: `
        I was at HealthPartners for three and a half years. I started as a high school technology intern and moved onto the RPA team in 2024, building automation systems that business teams and analysts used daily.

        The work replaced manual effort across claims processing, QA, and web-based workflows. Collectively those automations saved more than 37,000 hours a year.

        None of it was a prototype. If an automation broke, someone downstream was blocked that morning, which made reliability and logging the priority over anything clever.
        `.trim(),
      bullets: [
        "Engineered scalable automation systems in UiPath/VB.NET to streamline claims processing, QA, and multi-system testing, reducing execution cycles and saving 37,000+ hours per year collectively.",
        "Collaborated with developers, business analysts, and stakeholders as part of a team collectively saving $2M+ and producing $3.5M+ in additional revenue, contributing to a 3-year projected ROI of $3.86M.",
        "Built and maintained ETL pipelines to extract, transform, and analyze healthcare claims data (4,000+ records per run), and contributed to automating 1.3M+ tasks previously handled by humans.",
        "Automated web testing workflows for UI regression coverage, shortening release cycles and improving deployment efficiency by 90%.",
        "Designed robust error handling and logging pipelines to capture malformed data, missing fields, and unexpected UI states, enabling efficient debugging using large sets of sample and edge-case inputs.",
        "Solved frequent automation failures caused by fragile UI selectors, inconsistent inputs, and timing issues by inspecting underlying HTML, rewriting selectors for stability, and introducing adaptive waits and retries.",
        "Explored AI-assisted orchestration with UiPath Maestro, integrating intelligent decisioning into multi-system processes.",
      ],
    },
  ];
  

  const leadership: TimelineItem[] = [
    {
      role: "Active Member",
      org: "Data Science Club",
      location: "Minneapolis, MN",
      date: "September 2024 - Present",
      bullets: [
        "Present insights on cutting-edge data analytics methodologies in industry forums.",
        "Network with insurance leaders and industry professionals through career fairs, workshops, and club meetings.",
      ],
    },
  ];

  const skills = {
    "Software Engineering": [
      "Debugging in messy systems",
      "Reliability (retries, logging, exception handling)",
      "API + full-stack foundations",
      "Testing mindset and maintainable structure",
    ],
    "Data & Analytics": [
      "ETL thinking and data quality awareness",
      "Avoiding hindsight bias / realistic evaluation setups",
      "Building eval harnesses to measure model and retrieval quality",
      "Communicating insights clearly (summaries + visuals)",
    ],
    "AI & Machine Learning": [
      "RAG pipelines (retrieval, chunking, embeddings)",
      "Hybrid retrieval (BM25 + dense, RRF)",
      "LangChain",
      "ChromaDB",
      "OpenAI API",
      "PyTorch",
      "XGBoost",
      "SHAP explainability",
      "Agentic automation",
      "LLM-as-judge evaluation",
      "Prompt engineering",
    ],
    "Tools & Tech": ["Python", "OCaml", "SQL", "PyTorch", "Java", "C/C++", "R", "FastAPI", "React", "Node.js", "TypeScript", "HTML/CSS", "NumPy", "Pandas", "PySpark", "Matplotlib", "ETL Pipelines", "Machine Learning", "REST APIs", "Snowflake", "Databricks", "Streamlit", "Docker", "GitHub", "Jira", "Power BI", "ServiceNow", "Powershell", "DevOps", "RStudio"],
    "Collaboration": [
      "Stakeholder communication",
      "Working with business teams and analysts",
      "Writing for non-engineer audiences",
    ],
  };

  function Chip({ label }: { label: string }) {
    return (
      <span className="chip rounded-full px-2.5 py-1 text-xs">
        {label}
      </span>
    );
  }

  function SectionTitle({
    title,
    subtitle,
  }: {
    title: string;
    subtitle?: string;
  }) {
    return (
      <div className="flex items-end justify-between gap-4">
        <div>
          <h2 className="text-2xl font-semibold tracking-tight">{title}</h2>
          {subtitle ? <p className="mt-1 text-sm text-muted">{subtitle}</p> : null}
        </div>
      </div>
    );
  }

  return (
    <main className="min-h-screen text-[var(--foreground)]">
      {/* Header */}
      <header className="sticky top-0 z-10 border-b bg-[rgba(255,255,255,0.70)] backdrop-blur dark:bg-[rgba(11,11,11,0.65)] border-[color:var(--border)]">
        <div className="mx-auto flex max-w-5xl items-center justify-between px-5 py-3">
          <div className="font-semibold tracking-tight">{profile.name}</div>
          <nav className="flex flex-wrap gap-4 text-sm text-muted">
            <a className="hover:text-[var(--foreground)] transition" href="#projects">
              Projects
            </a>
            <a className="hover:text-[var(--foreground)] transition" href="#experience">
              Experience
            </a>
            <a className="hover:text-[var(--foreground)] transition" href="#leadership">
              Leadership
            </a>
            <a className="hover:text-[var(--foreground)] transition" href="#skills">
              Skills
            </a>
            <a className="hover:text-[var(--foreground)] transition" href="#about">
              About
            </a>
            <a className="hover:text-[var(--foreground)] transition" href="#contact">
              Contact
            </a>
          </nav>
        </div>
      </header>

      <section className="mx-auto max-w-5xl px-5 pt-14 pb-10">
        <div className="grid items-center gap-8 sm:grid-cols-[1fr_220px]">
          {/* Text */}
          <div>
            <p className="text-sm text-muted">{education.majors} @ UMN</p>
            <h1 className="mt-3 text-4xl font-semibold tracking-tight sm:text-5xl">
              Hi, I’m {profile.name.split(" ")[0]}.{" "}
              <span className="text-gradient">{profile.tagline}</span>
            </h1>
            <p className="mt-4 max-w-3xl text-[color:var(--foreground)]/80">
              {profile.subtag}
            </p>

            <div className="mt-6 flex flex-wrap gap-3">
              <a
                className="btn-primary focus-ring rounded-2xl px-4 py-2 text-sm font-medium"
                href="#contact"
              >
                Contact
              </a>
              <a
                className="btn-secondary focus-ring rounded-2xl px-4 py-2 text-sm font-medium"
                href={profile.links.resumeHref}
                target="_blank"
                rel="noopener noreferrer"
              >
                Resume
              </a>
              <a
                className="btn-secondary focus-ring rounded-2xl px-4 py-2 text-sm font-medium"
                href={profile.links.linkedin}
                target="_blank"
                rel="noreferrer"
              >
                LinkedIn
              </a>
              <a
                className="btn-secondary focus-ring rounded-2xl px-4 py-2 text-sm font-medium"
                href={profile.links.github}
                target="_blank"
                rel="noreferrer"
              >
                GitHub
              </a>
            </div>
          </div>

          {/* Photo */}
          <div className="mx-auto sm:mx-0">
            <div className="relative h-[220px] w-[220px] overflow-hidden rounded-3xl surface-strong">
              <div className="pointer-events-none absolute inset-0 rounded-3xl ring-1 ring-[rgba(180,83,9,0.25)]" />
              <Image
                src="/ArushManem.JPG"
                alt="Arush Manem portrait"
                fill
                priority
                sizes="220px"
                className="object-cover"
              />
            </div>
          </div>

        </div>
      </section>


      {/* About */}
      <section id="about" className="mx-auto max-w-5xl px-5 py-10">
        <SectionTitle title="About" />
        <div className="mt-6 rounded-3xl surface surface-hover p-6">
          <div className="space-y-3 text-sm text-[color:var(--foreground)]/80">
            {profile.about.map((p) => (
              <p key={p}>{p}</p>
            ))}
          </div>
        </div>
      </section>

      {/* Education */}
      <section className="mx-auto max-w-5xl px-5 pb-10">
        <div className="rounded-3xl surface surface-hover p-6">
          <SectionTitle title="Education" />
          <div className="mt-4 flex flex-wrap items-baseline justify-between gap-2">
            <div>
              <div className="font-semibold">{education.school}</div>
              <div className="text-sm text-muted">{education.location}</div>
            </div>
            <div className="text-sm text-muted">{education.grad}</div>
          </div>
          <div className="mt-3 text-sm text-[color:var(--foreground)]/80">
            {education.degree}
          </div>
          <div className="mt-1 text-sm text-[color:var(--foreground)]/80">
            Majors: {education.majors} · GPA: {education.gpa}
          </div>
          <div className="mt-4">
            <div className="text-sm font-semibold">Relevant Coursework</div>
            <div className="mt-2 flex flex-wrap gap-2">
              {education.coursework.map((c) => (
                <Chip key={c} label={c} />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Projects */}
      <section id="projects" className="mx-auto max-w-5xl px-5 py-10">
        <SectionTitle
          title="Projects"
          subtitle="Case studies written to be readable for both engineers and non-engineers."
        />
        <div className="mt-6 space-y-6">
          {caseStudies.map((p) => (
            <article
              key={p.id}
              className="rounded-3xl surface surface-hover p-6"
            >
              <div className="flex flex-wrap items-baseline justify-between gap-2">
                <div>
                  <h3 className="text-xl font-semibold tracking-tight">{p.title}</h3>
                  <p className="mt-1 text-sm text-muted">{p.subtitle}</p>
                </div>
                <div className="text-sm text-muted">{p.metaRight}</div>
              </div>

              <div className="mt-4 flex flex-wrap gap-2">
                {p.tech.map((t) => (
                  <Chip key={t} label={t} />
                ))}
              </div>

              <div className="mt-5 grid gap-5">
                {p.sections.map((s) => (
                  <section key={s.title} className="rounded-2xl bg-[rgba(180,83,9,0.06)] p-5 border border-[color:var(--border)]">
                    <h4 className="font-semibold">{s.title}</h4>
                    <div className="mt-2 space-y-3 text-sm text-[color:var(--foreground)]/80">
                      {s.body.map((para) => (
                        <p key={para}>{para}</p>
                      ))}
                    </div>
                    {s.bullets?.length ? (
                      <ul className="mt-3 list-disc space-y-1 pl-5 text-sm text-[color:var(--foreground)]/80">
                        {s.bullets.map((b) => (
                          <li key={b}>{b}</li>
                        ))}
                      </ul>
                    ) : null}
                  </section>
                ))}
              </div>

              {p.links?.github || p.links?.demo ? (
                <div className="mt-5 flex flex-wrap gap-4 text-sm">
                  {p.links.github ? (
                    <a
                      className="font-medium underline underline-offset-4 hover:opacity-80 transition"
                      style={{ color: "var(--accent)" }}
                      href={p.links.github}
                      target="_blank"
                      rel="noreferrer"
                    >
                      GitHub
                    </a>
                  ) : null}
                  {p.links.demo ? (
                    <a
                      className="font-medium underline underline-offset-4 hover:opacity-80 transition"
                      style={{ color: "var(--accent)" }}
                      href={p.links.demo}
                      target="_blank"
                      rel="noreferrer"
                    >
                      Live Demo
                    </a>
                  ) : null}
                </div>
              ) : null}
            </article>
          ))}
        </div>
      </section>

      {/* Experience */}
      <section id="experience" className="mx-auto max-w-5xl px-5 py-10">
        <SectionTitle
          title="Experience"
          subtitle="What I built, and how it held up once people depended on it."
        />
        <div className="mt-6 space-y-4">
          {experience.map((e) => (
            <div key={e.role} className="rounded-3xl surface surface-hover p-6">
              <div className="flex flex-wrap items-baseline justify-between gap-2">
                <div>
                  <div className="text-lg font-semibold">{e.role}</div>
                  <div className="text-sm text-muted">
                    {e.org}
                    {e.location ? ` · ${e.location}` : ""}
                  </div>
                </div>
                <div className="text-sm text-muted">{e.date}</div>
              </div>

              {e.intro ? (
                <p className="mt-4 max-w-3xl text-sm text-[color:var(--foreground)]/80 whitespace-pre-line">
                  {e.intro}
                </p>
              ) : null}

              <ul className="mt-4 list-disc space-y-1 pl-5 text-sm text-[color:var(--foreground)]/80">
                {e.bullets.map((b) => (
                  <li key={b}>{b}</li>
                ))}
              </ul>

              {e.reflection ? (
                <div className="mt-5 rounded-2xl bg-[rgba(180,83,9,0.06)] p-5 border border-[color:var(--border)]">
                  <div className="text-sm font-semibold">Reflection</div>
                  <p className="mt-2 text-sm text-[color:var(--foreground)]/80">{e.reflection}</p>
                </div>
              ) : null}
            </div>
          ))}
        </div>
      </section>

      {/* Leadership */}
      <section id="leadership" className="mx-auto max-w-5xl px-5 py-10">
        <SectionTitle title="Leadership & Professional Development" />
        <div className="mt-6 space-y-4">
          {leadership.map((e) => (
            <div key={e.role} className="rounded-3xl surface surface-hover p-6">
              <div className="flex flex-wrap items-baseline justify-between gap-2">
                <div>
                  <div className="text-lg font-semibold">{e.org}</div>
                  <div className="text-sm text-muted">
                    {e.role}
                    {e.location ? ` · ${e.location}` : ""}
                  </div>
                </div>
                <div className="text-sm text-muted">{e.date}</div>
              </div>
              <ul className="mt-4 list-disc space-y-1 pl-5 text-sm text-[color:var(--foreground)]/80">
                {e.bullets.map((b) => (
                  <li key={b}>{b}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      {/* Skills */}
      <section id="skills" className="mx-auto max-w-5xl px-5 py-10">
        <SectionTitle
          title="Skills"
        />
        <div className="mt-6 grid gap-4 sm:grid-cols-2">
          {Object.entries(skills).map(([group, items]) => (
            <div key={group} className="rounded-3xl surface surface-hover p-6">
              <div className="font-semibold">{group}</div>
              <div className="mt-3 flex flex-wrap gap-2">
                {items.map((s) => (
                  <Chip key={s} label={s} />
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Contact */}
      <section id="contact" className="mx-auto max-w-5xl px-5 py-14">
        <div className="rounded-3xl surface surface-hover p-8">
          <SectionTitle title="Contact"/>
          <div className="mt-5 flex flex-wrap gap-3">
            <a
              className="btn-primary focus-ring rounded-2xl px-4 py-2 text-sm font-medium"
              href={`mailto:${profile.links.email}`}
            >
              {profile.links.email}
            </a>
            <a
              className="btn-secondary focus-ring rounded-2xl px-4 py-2 text-sm font-medium"
              href={profile.links.linkedin}
              target="_blank"
              rel="noreferrer"
            >
              LinkedIn
            </a>
            <a
              className="btn-secondary focus-ring rounded-2xl px-4 py-2 text-sm font-medium"
              href={profile.links.github}
              target="_blank"
              rel="noreferrer"
            >
              GitHub
            </a>
            <a
              className="btn-secondary focus-ring rounded-2xl px-4 py-2 text-sm font-medium"
              href={profile.links.resumeHref}
              target="_blank"
              rel="noopener noreferrer"
            >
              Resume
            </a>
          </div>
        </div>

        <footer className="mt-8 pb-6 text-sm text-muted">
          © {new Date().getFullYear()} {profile.name} · Built with Next.js
        </footer>
      </section>
    </main>
  );
}
