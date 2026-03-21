"use client";

import FadeIn from "./FadeIn";

const projects = [
  {
    title: "RLA Studios Platform",
    description:
      "End-to-end media automation system for real estate content production. Custom scraping pipelines, Airtable integration, Dropbox automation, and invoice generation — all managed through a single admin panel.",
    tags: ["Full-Stack", "Automation", "SaaS"],
    year: "2024",
  },
  {
    title: "AI Ticketing System",
    description:
      "Email parsing and automated response system using internal knowledge bases. Incoming tickets are classified, routed, and answered intelligently — reducing manual response time dramatically.",
    tags: ["AI/ML", "Backend", "Automation"],
    year: "2024",
  },
  {
    title: "Infrastructure Systems",
    description:
      "Production-grade cloud infrastructure across Kubernetes, AWS, and dedicated servers. SSL automation, CI/CD pipelines, zero-downtime deployments, and monitoring at scale.",
    tags: ["DevOps", "Kubernetes", "AWS"],
    year: "2023–Present",
  },
  {
    title: "ChefPickle Debugging",
    description:
      "Deep debugging and legacy system stabilization for a production application. Root cause analysis, performance profiling, and systematic resolution of critical issues.",
    tags: ["Debugging", "Backend", "Performance"],
    year: "2024",
  },
];

export default function Work() {
  return (
    <section id="work" className="py-24">
      <div className="mx-auto max-w-[1100px] px-6">
        <FadeIn>
          <h2 className="text-[32px] font-medium text-black">Selected Work</h2>
        </FadeIn>

        <div className="mt-12">
          {projects.map((project, i) => (
            <FadeIn key={project.title} delay={i * 0.08}>
              <div
                className={`py-8 ${
                  i !== projects.length - 1 ? "border-b border-[#eee]" : ""
                } group cursor-default`}
              >
                <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-2 md:gap-8">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-baseline gap-4">
                      <h3 className="text-[20px] font-medium text-black group-hover:text-[#333] transition-colors">
                        {project.title}
                      </h3>
                      <span className="text-[13px] text-[#999] font-normal shrink-0">
                        {project.year}
                      </span>
                    </div>
                    <p className="mt-2 text-[16px] leading-[1.6] text-[#666] max-w-[600px]">
                      {project.description}
                    </p>
                  </div>
                  <div className="flex gap-2 mt-3 md:mt-1.5 shrink-0">
                    {project.tags.map((tag) => (
                      <span
                        key={tag}
                        className="text-[12px] text-[#999] border border-[#eee] px-2.5 py-1 rounded-full"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}
