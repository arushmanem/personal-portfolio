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
      "Honors Data Science and Computer Science student at the University of Minnesota with experience building automation, analytics workflows, and full-stack applications used by business and operations teams.",
    about: [
     "I’m interested in roles where I can combine quantitative analysis with technical problem-solving to create real-world impact. I enjoy working at the intersection of data, engineering, and business — building models and systems that turn messy information into clear, actionable decisions.",
      "Through internships and projects, I’ve learned that real problems rarely come with clean inputs or perfect requirements. I focus on developing reliable, explainable solutions that stakeholders can trust and use with confidence."
    ],
    links: {
      email: "manem008@umn.edu",
      linkedin: "https://www.linkedin.com/in/arush-manem",
      github: "https://github.com/arushmanem",
      resumeHref: "/ArushManem_Resume_Updated.docx",
    },
  };

  const education = {
    school: "University of Minnesota, Twin Cities",
    location: "Minneapolis, MN",
    majors: "Computer Science & Data Science",
    grad: "May 2027",
    gpa: "3.78",
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
            "Fantasy football decisions are often driven by gut feeling or raw averages. I wanted to explore whether historical data could be structured into clearer, more defensible recommendations.",
          ],
        },
        {
          title: "System and Engineering Decisions",
          body: [
            "I approached SnapCount as a product, not a one-off notebook. The system is organized so data ingestion, analysis, and presentation are separated cleanly.",
            "The experience I’m most proud of is the UI: it’s designed to be easy to use, with interactive visuals that make trends understandable quickly — not just a wall of numbers.",
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
            "Right now, the dataset is static (it doesn’t refresh). The current prediction approach is intentionally simple: a linear baseline based on averages, rather than a live ML model.",
            "To simulate a “live” setting, I designed the logic to predict a past week using only prior-week data from that season. This avoids hindsight bias and better mirrors real forecasting constraints.",
          ],
          bullets: [
            "Started with a baseline model to understand the data and set a clear reference point for improvements.",
            "Simulated real-world constraints by restricting inputs to information available before the target week.",
          ],
        },
        {
          title: "Limitations and Roadmap",
          body: [
            "The biggest limitation today is that predictions are based on linear averages and aren’t truly live. The model also needs more sophistication to capture nonlinear interactions and richer context.",
            "My next step is migrating to a PyTorch-based model once I expand the dataset and define stronger evaluation metrics.",
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
      links: {},
      sections: [
        {
          title: "Problem",
          body: [
            "Predict insurance costs from a mix of demographic and health factors, with enough explainability that a non-technical stakeholder can see why the model behaved the way it did. Accuracy alone isn't enough if the model is a black box.",
          ],
        },
        {
          title: "Implementation Decisions",
          body: [
            "I built a modular ETL pipeline so preprocessing, outlier detection, and feature generation were clean separate steps — easy to swap or extend later. The model itself is a Random Forest regressor, chosen for a balance of accuracy and interpretability with tools like SHAP.",
          ],
          bullets: [
            "Engineered interaction features (smoker–age, BMI–age) that captured nonlinear effects the base features couldn't.",
            "Tuned the Random Forest to R² = 0.88 and MAE ≈ $2,600 — accurate enough to be meaningful for cost projection.",
            "Packaged the model with Pickle for reproducible, real-time deployment.",
            "Applied SHAP explainability to interpret which features drove individual predictions, so the model could be defended to stakeholders rather than just reported.",
          ],
        },
        {
          title: "What I Learned",
          body: [
            "Explainability isn't optional. Stakeholders rarely trust a number without understanding where it came from, and SHAP turned out to be the single most useful tool for closing that trust gap — far more than raw accuracy metrics.",
          ],
        },
      ],
    },
    {
      id: "tcp-marketplace-server",
      title: "Multi-Threaded TCP Marketplace Server",
      subtitle: "Operating Systems Coursework — Systems Programming in C",
      metaRight: "CSCI 4061 PA4 · April 2026",
      tech: ["C", "POSIX Threads", "BSD Sockets", "Mutexes", "Signals"],
      links: {},
      sections: [
        {
          title: "Problem",
          body: [
            "Build a multi-threaded TCP server simulating a marketplace where many clients connect concurrently to buy and sell from a shared inventory. The challenge is concurrency correctness — multiple threads touching the same shared state without race conditions — plus graceful shutdown and basic message obfuscation between client and server.",
          ],
        },
        {
          title: "Implementation Decisions",
          body: [
            "The server is structured around per-client worker threads, with the main thread accepting connections and dispatching work. Shared inventory state lives behind a mutex, so every read or write is serialized. Client–server messages are obfuscated with a Caesar-cipher layer at both ends.",
          ],
          bullets: [
            "Used pthreads for concurrent client handling, with mutex-protected critical sections around all inventory reads and writes.",
            "Implemented a SIGTERM signal handler for graceful shutdown — draining in-flight requests and cleaning up resources across worker threads before exiting.",
            "Added a Caesar-cipher message layer between client and server as a simple symmetric obfuscation step.",
            "Built socket setup, the accept loop, and per-client request parsing in pure C using BSD sockets.",
          ],
        },
        {
          title: "What I Learned",
          body: [
            "Concurrency is much harder than it looks on paper. The most useful lessons came from debugging subtle race conditions where two clients would simultaneously try to modify the same inventory item — issues that didn't reproduce reliably and only showed up under load. Getting comfortable with mutex granularity, deadlock avoidance, and signal handling in a multi-threaded context was the real takeaway.",
          ],
        },
      ],
    },
  ];

  const experience: TimelineItem[] = [
    {
      role: "Data & Analytics Intern — Analytics Development Program, CRC War Room",
      org: "UnitedHealth Group (UHG)",
      location: "Minnetonka, MN",
      date: "Summer 2026 (Incoming)",
      intro: `
        This summer I'll be joining UHG's Analytics Development Program as part of the CRC War Room — a cross-functional team focused on solving the most complex, systemic member issues across process, policy, and technology, with work that impacts millions of members annually.

        My focus will be building a clear measurement strategy for War Room projects: turning project activity into validated impact metrics like member impact, call obviation, and operational outcomes. The goal is to evolve War Room reporting from "what we worked on" to "what changed because of our work."
        `.trim(),
      bullets: [
        "Partner with War Room leaders, project managers, and triage analysts to define core success metrics aligned to enterprise goals (member impact, call obviation, repeat-call reduction, operational efficiency).",
        "Design dashboards, trackers, and reporting frameworks that ingest project-level data and translate outcomes into validated impact metrics over time.",
        "Translate business questions from project managers and analysts into analytic requirements, and analytic outputs back into clear executive-ready narratives.",
        "Document measurement methodologies and assumptions, and present findings and recommendations to War Room leadership across project types (policy, process, technology).",
      ],
    },
    {
      role:
        "Software Engineering Intern — Automation & Data Systems (Robotic Process Automation)",
      org: "HealthPartners",
      location: "Bloomington, MN",
      date: "June 2022 – Present",
      intro: `
        At HealthPartners, I designed and built production-grade automation systems used daily by business teams and analysts supporting healthcare operations.
        
        These automations replaced large volumes of manual, repetitive work across data entry, reporting, and web-based workflows, saving thousands of hours annually and contributing to over $1,000,000 in operational value.
        
        The systems I built were not proofs of concept — they were relied on in real workflows where failures directly blocked downstream work, making reliability, observability, and correctness essential.
        `.trim(),
      bullets: [
        "Built end-to-end automations that processed Excel files with 4,000+ rows, programmatically mapping and entering data across multiple screens of complex web applications while validating field-level accuracy at each step.",
        "Designed robust error handling and logging pipelines to capture malformed data, missing fields, and unexpected UI states, enabling efficient debugging using large sets of sample and edge-case inputs.",
        "Implemented automated output reports and email notifications to summarize successful runs and surface failed transactions for business stakeholders.",
        "Developed payer-specific automation logic, including prompt-engineered workflows tailored to multiple external systems, working with data from Fortune 500 healthcare organizations.",
        "Solved frequent automation failures caused by fragile UI selectors, inconsistent inputs, and timing issues by inspecting underlying HTML, rewriting selectors for stability, and introducing adaptive waits and retries.",
        "Automated authentication and user access flows for client systems, ensuring secure and repeatable execution across different environments.",
        "Collaborated closely with business teams and analysts to translate operational requirements into reliable, maintainable automation solutions that scaled across transaction types and clients.",
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
      "Communicating insights clearly (summaries + visuals)",
    ],
    "Tools & Tech": ["Python", "OCaml", "SQL", "PyTorch", "Java", "C/C++", "R", "FastAPI", "React", "Node.js", "TypeScript", "HTML/CSS", "NumPy", "Pandas", "PySpark", "Matplotlib", "ETL Pipelines", "Machine Learning", "REST APIs", "Docker", "GitHub", "Jira", "Power BI", "Powershell", "DevOps", "RStudio"],
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
            Majors: {education.majors} · GPA: {education.gpa}
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
          subtitle="Focused on reliability, stakeholder impact, and how the work held up in real conditions."
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
              Resume (PDF)
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
