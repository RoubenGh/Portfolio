"use client";

import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import { motion } from "framer-motion";
import {
  BackButton,
  ProjectHero,
  ProjectMeta,
  SectionHeading,
  SectionBody,
  VisualFrame,
  StatBlock,
  PrincipleCards,
  NextProject,
} from "@/components/CaseStudy";

const ease = [0.165, 0.84, 0.44, 1] as const;

export default function ChefPickleContent() {
  return (
    <>
      <Nav />
      <main className="pt-28 md:pt-32">
        <div className="mx-auto max-w-[960px] px-5 md:px-10">
          <div className="mb-10"><BackButton /></div>

          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.9, ease }}>
            <h1 className="text-[36px] md:text-[52px] font-medium tracking-[-1.5px] leading-[1.05] text-[var(--color-fg)]">
              ChefPickle
            </h1>
            <p className="mt-3 text-[16px] md:text-[18px] leading-[1.5] text-[var(--color-fg-30)] max-w-[600px]">
              Deep debugging and legacy system stabilization for a production application.
            </p>
          </motion.div>

          <div className="mt-10 md:mt-12">
            <ProjectHero
              bannerBg="linear-gradient(135deg, #0a1520 0%, #071018 40%, #050c14 100%)"
              bannerLabel="CP"
              bannerLabelColor="rgba(0,106,195,0.5)"
            />
          </div>

          <div className="mt-8">
            <ProjectMeta items={[
              { label: "Role", value: "Debugging Specialist" },
              { label: "Timeline", value: "2024" },
              { label: "Stack", value: "Node.js, PostgreSQL, Redis" },
              { label: "Type", value: "Client Engagement" },
            ]} />
          </div>

          <div className="mt-16 md:mt-20 max-w-[720px]">
            <section className="mb-20 md:mb-28">
              <SectionHeading number="01" title="Overview" subtitle="Brought in to diagnose and resolve critical production issues in a legacy application." />
              <SectionBody>
                <p>The application had accumulated significant technical debt over several years of rapid feature development. Performance had degraded, intermittent failures were increasing, and the team had lost confidence in their ability to ship changes safely.</p>
                <p>My role was to perform deep root cause analysis, identify the systemic issues causing instability, and implement targeted fixes that restored reliability without requiring a full rewrite.</p>
              </SectionBody>
              <StatBlock items={[
                { value: "12", label: "Critical bugs resolved" },
                { value: "40%", label: "Performance improvement" },
                { value: "0", label: "Production incidents post-fix" },
              ]} />
            </section>

            <section className="mb-20 md:mb-28">
              <SectionHeading number="02" title="Approach" />
              <PrincipleCards items={[
                { number: "01", title: "Root Cause Analysis", description: "Every symptom was traced back to its underlying cause. No band-aids — only fixes that addressed the actual problem." },
                { number: "02", title: "Performance Profiling", description: "Systematic profiling identified the specific queries, endpoints, and code paths responsible for degradation." },
                { number: "03", title: "Incremental Stabilization", description: "Changes were deployed incrementally with monitoring, ensuring each fix improved stability without introducing regressions." },
              ]} />
              <VisualFrame
                bg="linear-gradient(135deg, #081218 0%, #0a1520 50%, #060e16 100%)"
                label="Debug Analysis"
                labelColor="rgba(0,106,195,0.3)"
                caption="1.0 — Root cause analysis and performance profiling methodology."
              />
            </section>

            <section className="mb-20 md:mb-28">
              <SectionHeading number="03" title="Outcomes" />
              <SectionBody>
                <p>After the engagement, the application was running faster and more reliably than it had in over a year. The team had a clear understanding of their system&apos;s weak points and a maintenance strategy to prevent similar issues from recurring.</p>
                <p>The experience reinforced something I believe deeply: most &quot;complex&quot; bugs are actually simple problems hidden behind layers of accumulated complexity. The skill is in knowing where to look.</p>
              </SectionBody>
            </section>

            <NextProject
              title="RLA Studios"
              meta="Founder — 2024"
              href="/work/rla-studios"
              previewBg="linear-gradient(135deg, #0f1a2e 0%, #0a1628 40%, #061020 100%)"
              previewLabel="RLA"
              previewLabelColor="rgba(127,207,255,0.5)"
            />
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
