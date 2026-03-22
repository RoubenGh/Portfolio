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

export default function AITicketingContent() {
  return (
    <>
      <Nav />
      <main className="pt-28 md:pt-32">
        <div className="mx-auto max-w-[960px] px-5 md:px-10">
          <div className="mb-10"><BackButton /></div>

          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.9, ease }}>
            <h1 className="text-[36px] md:text-[52px] font-medium tracking-[-1.5px] leading-[1.05] text-[var(--color-fg)]">
              AI Ticketing System
            </h1>
            <p className="mt-3 text-[16px] md:text-[18px] leading-[1.5] text-[var(--color-fg-30)] max-w-[600px]">
              Email parsing and automated response system using internal knowledge bases.
            </p>
          </motion.div>

          <div className="mt-10 md:mt-12">
            <ProjectHero
              bannerBg="linear-gradient(135deg, #1a1a1a 0%, #111 40%, #0a0a0a 100%)"
              bannerLabel="AI"
              bannerLabelColor="rgba(242,242,242,0.4)"
            />
          </div>

          <div className="mt-8">
            <ProjectMeta items={[
              { label: "Role", value: "Lead Engineer" },
              { label: "Timeline", value: "2024" },
              { label: "Stack", value: "Python, NLP, REST APIs" },
              { label: "Type", value: "Internal Tool" },
            ]} />
          </div>

          <div className="mt-16 md:mt-20 max-w-[720px]">
            <section className="mb-20 md:mb-28">
              <SectionHeading number="01" title="Overview" subtitle="An intelligent system that reads, classifies, and responds to support tickets using internal documentation." />
              <SectionBody>
                <p>Incoming emails are parsed for intent and context, matched against an internal knowledge base, and either answered automatically or routed to the right team member with a suggested response. The system learns from corrections to improve over time.</p>
              </SectionBody>
              <StatBlock items={[
                { value: "85%", label: "Auto-response accuracy" },
                { value: "60%", label: "Reduction in response time" },
                { value: "24/7", label: "Automated triage" },
              ]} />
            </section>

            <section className="mb-20 md:mb-28">
              <SectionHeading number="02" title="How It Works" />
              <SectionBody>
                <p>The system uses a multi-stage pipeline: email parsing extracts structured data from unstructured messages, NLP classification identifies the ticket category and urgency, and a retrieval-augmented generation layer produces responses grounded in internal documentation.</p>
                <p>Edge cases — ambiguous tickets, multi-topic emails, escalation triggers — are handled by a routing layer that knows when to involve a human instead of guessing.</p>
              </SectionBody>
              <VisualFrame
                bg="linear-gradient(135deg, #141414 0%, #0e0e0e 50%, #0a0a0a 100%)"
                label="Processing Pipeline"
                labelColor="rgba(242,242,242,0.25)"
                caption="1.0 — Email → Parse → Classify → Respond pipeline."
              />
            </section>

            <section className="mb-20 md:mb-28">
              <SectionHeading number="03" title="Design Decisions" />
              <PrincipleCards items={[
                { number: "01", title: "Accuracy Over Speed", description: "The system prioritizes correct responses over fast ones. A confident wrong answer is worse than a slight delay." },
                { number: "02", title: "Human-in-the-Loop", description: "When confidence is low, the system routes to humans with context attached — never guesses silently." },
                { number: "03", title: "Continuous Learning", description: "Every correction feeds back into the knowledge base, making the system smarter over time." },
              ]} />
            </section>

            <NextProject
              title="Infrastructure Systems"
              meta="Ongoing — 2023"
              href="/work/infrastructure"
              previewBg="linear-gradient(135deg, #0d0a1a 0%, #120e22 40%, #0a0818 100%)"
              previewLabel="INFRA"
              previewLabelColor="rgba(8,144,251,0.5)"
            />
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
