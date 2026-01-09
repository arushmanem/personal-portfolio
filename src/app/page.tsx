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
    tagline: "I build software teams depend on.",
    subtag:
      "Honors Computer Science & Data Science student at the University of Minnesota with experience building automation, analytics workflows, and full-stack applications used by business and operations teams.",
    about: [
      "I’m interested in roles where I can combine technical problem-solving with real-world impact. I enjoy working on systems that sit between engineering, data, and business — especially when reliability, clarity, and usability matter as much as performance.",
      "Through internships and projects, I’ve learned that most real problems don’t come with clean inputs or perfect requirements. I focus on building systems that can handle ambiguity, explain their outputs, and earn trust from the people who use them.",
    ],
    links: {
      email: "manem008@umn.edu",
      linkedin: "https://www.linkedin.com/in/arush-manem",
      github: "https://github.com/arushmanem",
      resumeHref: "/ArushManemResume.pdf",
    },
  };

  const education = {
    school: "University of Minnesota, Twin Cities",
    location: "Minneapolis, MN",
    majors: "Computer Science & Data Science",
    grad: "May 2027",
    gpa: "3.86",
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
  ];

  const experience: TimelineItem[] = [
    {
      role:
        "Software Engineering Intern — Automation & Data Systems - Robotic Process Automation (RPA)",
      org: "HealthPartners",
      location: "Bloomington, MN",
      date: "June 2022 – Present",
      intro:
        "At HealthPartners, I worked on automating workflows, from sorting large volumes of data across shared drives and Excel files to navigating complex web applications that required repeated manual input. These automations reallocated countless hours of manual effort and contributed to over $1,000,000 in annual operational savings. My work was used directly by business teams and analysts supporting healthcare operations, meaning the systems I built weren’t experiments, they were part of real, day-to-day workflows. Because these workflows depended on complex web applications and inconsistent inputs, reliability was critical: when automation failed, real work stopped.",
      bullets: [
        "Most failures weren’t logic errors — they were caused by fragile UI selectors, missing or inconsistent data fields, and timing issues when scraping dynamic applications.",
        "Debugged selector failures by inspecting underlying HTML rather than relying on visual recorders.",
        "Rewrote selectors to be specific enough to avoid ambiguity, while remaining flexible enough to support many transaction variants.",
        "Added exception handling for missing or malformed data so workflows didn’t crash unpredictably.",
        "Introduced delays where needed to ensure pages and fields fully loaded before scraping, reducing flaky failures.",
        "Implemented structured logging and retries to make failures traceable and recoverable for both developers and stakeholders.",
      ],
      reflection:
        "We live in an age where technology can sift through data faster than people can count to five, yet many industries are still weighed down by tedious and repetitive work. Working on production automation taught me that technology’s real value isn’t speed alone, but leverage — freeing people from repetitive work so they can focus on higher-impact problems. Designing systems with that mindset changed how I approach engineering decisions."
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
    "Tools & Tech": ["Python", "OCaml", "SQL", "PyTorch", "Java", "C/C++", "R", "React", "Node.js", "HTML/CSS", "GitHub", "Jira", "Docker", "Powershell", "NumPy", "Pandas", "Matplotlib", "RStudio"],
    "Collaboration": [
      "Stakeholder communication",
      "Working with business teams and analysts",
      "Writing for non-engineer audiences",
    ],
  };

  function Chip({ label }: { label: string }) {
    return (
      <span className="rounded-full border border-zinc-200 bg-zinc-50 px-2.5 py-1 text-xs text-zinc-700">
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
          {subtitle ? <p className="mt-1 text-sm text-zinc-600">{subtitle}</p> : null}
        </div>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-white text-zinc-900">
      {/* Header */}
      <header className="sticky top-0 z-10 border-b border-zinc-200 bg-white/80 backdrop-blur">
        <div className="mx-auto flex max-w-5xl items-center justify-between px-5 py-3">
          <div className="font-semibold tracking-tight">{profile.name}</div>
          <nav className="flex flex-wrap gap-4 text-sm text-zinc-700">
            <a className="hover:text-zinc-900" href="#projects">
              Projects
            </a>
            <a className="hover:text-zinc-900" href="#experience">
              Experience
            </a>
            <a className="hover:text-zinc-900" href="#skills">
              Skills
            </a>
            <a className="hover:text-zinc-900" href="#about">
              About
            </a>
            <a className="hover:text-zinc-900" href="#contact">
              Contact
            </a>
          </nav>
        </div>
      </header>

      <section className="mx-auto max-w-5xl px-5 pt-14 pb-10">
        <div className="grid items-center gap-8 sm:grid-cols-[1fr_220px]">
          {/* Text */}
          <div>
            <p className="text-sm text-zinc-600">{education.majors} @ UMN</p>
            <h1 className="mt-3 text-4xl font-semibold tracking-tight sm:text-5xl">
              Hi, I’m {profile.name.split(" ")[0]}.{" "}
              <span className="text-zinc-900">{profile.tagline}</span>
            </h1>
            <p className="mt-4 max-w-3xl text-zinc-700">{profile.subtag}</p>

            <div className="mt-6 flex flex-wrap gap-3">
              <a
                className="rounded-2xl bg-zinc-900 px-4 py-2 text-sm font-medium text-white hover:bg-zinc-800"
                href="#contact"
              >
                Contact
              </a>
              <a
                className="rounded-2xl border border-zinc-300 px-4 py-2 text-sm font-medium hover:bg-zinc-50"
                href={profile.links.resumeHref}
                target="_blank"
                rel="noopener noreferrer"
              >
                Resume
              </a>
              <a
                className="rounded-2xl border border-zinc-300 px-4 py-2 text-sm font-medium hover:bg-zinc-50"
                href={profile.links.linkedin}
                target="_blank"
                rel="noreferrer"
              >
                LinkedIn
              </a>
              <a
                className="rounded-2xl border border-zinc-300 px-4 py-2 text-sm font-medium hover:bg-zinc-50"
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
            <Image
              src="/me.jpg"
              alt="Arush Manem portrait"
              width={220}
              height={220}
              priority
              className="rounded-3xl border border-zinc-200 shadow-sm"
            />
          </div>
        </div>
      </section>


      {/* About */}
      <section id="about" className="mx-auto max-w-5xl px-5 py-10">
        <SectionTitle title="About" />
        <div className="mt-6 rounded-3xl border border-zinc-200 p-6 shadow-sm">
          <div className="space-y-3 text-sm text-zinc-700">
            {profile.about.map((p) => (
              <p key={p}>{p}</p>
            ))}
          </div>
        </div>
      </section>

      {/* Education */}
      <section className="mx-auto max-w-5xl px-5 pb-10">
        <div className="rounded-3xl border border-zinc-200 p-6 shadow-sm">
          <SectionTitle title="Education" />
          <div className="mt-4 flex flex-wrap items-baseline justify-between gap-2">
            <div>
              <div className="font-semibold">{education.school}</div>
              <div className="text-sm text-zinc-600">{education.location}</div>
            </div>
            <div className="text-sm text-zinc-600">{education.grad}</div>
          </div>
          <div className="mt-3 text-sm text-zinc-700">
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
              className="rounded-3xl border border-zinc-200 p-6 shadow-sm"
            >
              <div className="flex flex-wrap items-baseline justify-between gap-2">
                <div>
                  <h3 className="text-xl font-semibold tracking-tight">{p.title}</h3>
                  <p className="mt-1 text-sm text-zinc-600">{p.subtitle}</p>
                </div>
                <div className="text-sm text-zinc-600">{p.metaRight}</div>
              </div>

              <div className="mt-4 flex flex-wrap gap-2">
                {p.tech.map((t) => (
                  <Chip key={t} label={t} />
                ))}
              </div>

              <div className="mt-5 grid gap-5">
                {p.sections.map((s) => (
                  <section key={s.title} className="rounded-2xl bg-zinc-50 p-5">
                    <h4 className="font-semibold">{s.title}</h4>
                    <div className="mt-2 space-y-3 text-sm text-zinc-700">
                      {s.body.map((para) => (
                        <p key={para}>{para}</p>
                      ))}
                    </div>
                    {s.bullets?.length ? (
                      <ul className="mt-3 list-disc space-y-1 pl-5 text-sm text-zinc-700">
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
                      className="font-medium text-zinc-900 underline underline-offset-4 hover:text-zinc-700"
                      href={p.links.github}
                      target="_blank"
                      rel="noreferrer"
                    >
                      GitHub
                    </a>
                  ) : null}
                  {p.links.demo ? (
                    <a
                      className="font-medium text-zinc-900 underline underline-offset-4 hover:text-zinc-700"
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
            <div key={e.role} className="rounded-3xl border border-zinc-200 p-6 shadow-sm">
              <div className="flex flex-wrap items-baseline justify-between gap-2">
                <div>
                  <div className="text-lg font-semibold">{e.role}</div>
                  <div className="text-sm text-zinc-600">
                    {e.org}
                    {e.location ? ` · ${e.location}` : ""}
                  </div>
                </div>
                <div className="text-sm text-zinc-600">{e.date}</div>
              </div>

              {e.intro ? (
                <p className="mt-4 max-w-3xl text-sm text-zinc-700">{e.intro}</p>
              ) : null}

              <ul className="mt-4 list-disc space-y-1 pl-5 text-sm text-zinc-700">
                {e.bullets.map((b) => (
                  <li key={b}>{b}</li>
                ))}
              </ul>

              {e.reflection ? (
                <div className="mt-5 rounded-2xl bg-zinc-50 p-5">
                  <div className="text-sm font-semibold">Reflection</div>
                  <p className="mt-2 text-sm text-zinc-700">{e.reflection}</p>
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
            <div key={group} className="rounded-3xl border border-zinc-200 p-6 shadow-sm">
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
        <div className="rounded-3xl border border-zinc-200 p-8 shadow-sm">
          <SectionTitle title="Contact" subtitle="Email is best — I usually respond quickly." />
          <div className="mt-5 flex flex-wrap gap-3">
            <a
              className="rounded-2xl bg-zinc-900 px-4 py-2 text-sm font-medium text-white hover:bg-zinc-800"
              href={`mailto:${profile.links.email}`}
            >
              {profile.links.email}
            </a>
            <a
              className="rounded-2xl border border-zinc-300 px-4 py-2 text-sm font-medium hover:bg-zinc-50"
              href={profile.links.linkedin}
              target="_blank"
              rel="noreferrer"
            >
              LinkedIn
            </a>
            <a
              className="rounded-2xl border border-zinc-300 px-4 py-2 text-sm font-medium hover:bg-zinc-50"
              href={profile.links.github}
              target="_blank"
              rel="noreferrer"
            >
              GitHub
            </a>
            <a
              className="rounded-2xl border border-zinc-300 px-4 py-2 text-sm font-medium hover:bg-zinc-50"
              href={profile.links.resumeHref}
              target="_blank"
              rel="noopener noreferrer"
            >
              Resume (PDF)
            </a>
          </div>
        </div>

        <footer className="mt-8 pb-6 text-sm text-zinc-500">
          © {new Date().getFullYear()} {profile.name} · Built with Next.js
        </footer>
      </section>
    </main>
  );
}
