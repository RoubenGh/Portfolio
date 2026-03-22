"use client";

import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import FadeIn from "@/components/FadeIn";
import {
  BackButton,
  ProjectHero,
  ProjectMeta,
  TableOfContents,
  SectionHeading,
  SectionBody,
  VisualFrame,
  StatBlock,
  PrincipleCards,
  ConstraintList,
  NextProject,
} from "@/components/CaseStudy";
import { motion } from "framer-motion";

const ease = [0.165, 0.84, 0.44, 1] as const;

const tocSections = [
  { id: "overview", label: "Overview" },
  { id: "highlights", label: "Highlights" },
  { id: "problem", label: "The Problem" },
  { id: "architecture", label: "Architecture" },
  { id: "workflow", label: "Workflow Design" },
  { id: "automation", label: "Automation Pipeline" },
  { id: "crm", label: "CRM & Admin" },
  { id: "delivery", label: "Client Delivery" },
  { id: "decisions", label: "Design Decisions" },
  { id: "challenges", label: "Challenges" },
  { id: "outcomes", label: "Outcomes" },
  { id: "retrospective", label: "Retrospective" },
];

export default function RLAStudiosContent() {
  return (
    <>
      <Nav />
      <main className="pt-28 md:pt-32">
        <div className="mx-auto max-w-[960px] px-5 md:px-10">
          {/* Back button */}
          <div className="mb-10">
            <BackButton />
          </div>

          {/* Project title */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease }}
          >
            <h1 className="text-[36px] md:text-[52px] font-medium tracking-[-1.5px] leading-[1.05] text-[var(--color-fg)]">
              RLA Studios
            </h1>
            <p className="mt-3 text-[16px] md:text-[18px] leading-[1.5] text-[var(--color-fg-30)] max-w-[600px]">
              End-to-end media operations platform for real estate content production — from lead intake to final delivery.
            </p>
          </motion.div>

          {/* Hero banner */}
          <div className="mt-10 md:mt-12">
            <ProjectHero
              bannerBg="linear-gradient(135deg, #0f1a2e 0%, #0a1628 40%, #061020 100%)"
              bannerLabel="RLA"
              bannerLabelColor="rgba(127,207,255,0.6)"
            />
          </div>

          {/* Metadata */}
          <div className="mt-8">
            <ProjectMeta
              items={[
                { label: "Role", value: "Founder & Lead Engineer" },
                { label: "Timeline", value: "2024 — Present" },
                { label: "Stack", value: "Full-Stack, Cloud, AI, Automation" },
                { label: "Type", value: "Platform / SaaS" },
              ]}
            />
          </div>

          {/* Main content with sidebar TOC */}
          <div className="mt-16 md:mt-20 grid grid-cols-1 lg:grid-cols-[160px_1fr] gap-12 lg:gap-16">
            <TableOfContents sections={tocSections} />

            <div>
              {/* ─── 01 OVERVIEW ─── */}
              <section id="overview" className="mb-20 md:mb-28 scroll-mt-32">
                <SectionHeading
                  number="01"
                  title="The Big Picture"
                  subtitle="RLA Studios is a full-stack platform built from the ground up to automate and streamline creative content production."
                />
                <SectionBody>
                  <p>
                    What started as a way to solve my own operational pain points evolved into a complete production system — one that handles the entire lifecycle of content creation for real estate media, eliminating manual touchpoints and letting the work flow naturally from intake to output.
                  </p>
                  <p>
                    The platform connects lead intake, CRM management, listing workflows, automation, file collection, client communication, editor handoff, delivery, invoicing, and operations structure — all through a single admin interface.
                  </p>
                </SectionBody>

                <StatBlock
                  items={[
                    { value: "100%", label: "Automated workflow" },
                    { value: "End-to-End", label: "Data to delivery pipeline" },
                    { value: "SaaS", label: "Subscription-ready architecture" },
                  ]}
                />
              </section>

              {/* ─── 02 HIGHLIGHTS ─── */}
              <section id="highlights" className="mb-20 md:mb-28 scroll-mt-32">
                <SectionHeading
                  number="02"
                  title="Highlights"
                />
                <PrincipleCards
                  items={[
                    {
                      number: "01",
                      title: "Automated Data Pipeline",
                      description:
                        "Custom scraping engine that collects, cleans, and structures data from multiple sources — no human intervention required.",
                    },
                    {
                      number: "02",
                      title: "Unified Admin Panel",
                      description:
                        "Full-featured dashboard for managing projects, clients, content status, and system configuration from one place.",
                    },
                    {
                      number: "03",
                      title: "Zero-Touch Invoicing",
                      description:
                        "Automatic invoice generation based on project data — rates, deliverables, and client details pulled from the system.",
                    },
                  ]}
                />

                <VisualFrame
                  bg="linear-gradient(135deg, #0c1520 0%, #0a1628 50%, #081224 100%)"
                  label="Admin Dashboard"
                  labelColor="rgba(127,207,255,0.4)"
                  caption="1.0 — Admin panel overview showing project pipeline and system status."
                />
              </section>

              {/* ─── 03 THE PROBLEM ─── */}
              <section id="problem" className="mb-20 md:mb-28 scroll-mt-32">
                <SectionHeading
                  number="03"
                  title="The Problem"
                  subtitle="Content production at scale is messy. Every step in the process was disconnected from the next."
                />
                <SectionBody>
                  <p>
                    Data lived in spreadsheets. Files got lost in folders. Communication happened across five different tools. Invoicing was an afterthought. Every step was disconnected, creating gaps where things fell through, got duplicated, or simply took too long.
                  </p>
                  <p>
                    Growth was limited by human bandwidth — every new client meant more manual work instead of leveraging systems. The industry needed a platform that could handle the full production lifecycle without the friction.
                  </p>
                </SectionBody>

                <ConstraintList
                  items={[
                    {
                      title: "Fragmented Data",
                      description:
                        "Information scattered across spreadsheets, emails, and messaging tools with no single source of truth.",
                    },
                    {
                      title: "Manual Processes",
                      description:
                        "Hours spent on repetitive tasks — file organization, data entry, invoice generation — that should be automated.",
                    },
                    {
                      title: "No Unified Platform",
                      description:
                        "No existing tool combined data scraping, content management, file storage, and invoicing into one system.",
                    },
                    {
                      title: "Scaling Bottleneck",
                      description:
                        "Growth was limited by human bandwidth — every new client meant more manual work instead of leveraging systems.",
                    },
                  ]}
                />
              </section>

              {/* ─── 04 ARCHITECTURE ─── */}
              <section id="architecture" className="mb-20 md:mb-28 scroll-mt-32">
                <SectionHeading
                  number="04"
                  title="System Architecture"
                  subtitle="A modular architecture where each component handles a specific part of the pipeline."
                />
                <SectionBody>
                  <p>
                    The platform is built with a modular architecture where each component handles a specific part of the pipeline and communicates through well-defined interfaces. This separation of concerns means individual modules can be updated, scaled, or replaced independently.
                  </p>
                </SectionBody>

                <VisualFrame
                  bg="linear-gradient(135deg, #0a0e14 0%, #0d1218 50%, #080c12 100%)"
                  label="System Architecture"
                  labelColor="rgba(127,207,255,0.3)"
                  caption="2.0 — High-level system architecture showing module interconnections."
                  aspectRatio="16/10"
                />

                <PrincipleCards
                  items={[
                    {
                      number: "01",
                      title: "Data Pipeline",
                      description:
                        "Custom scraping engine that collects, cleans, and structures data from multiple sources into Airtable.",
                    },
                    {
                      number: "02",
                      title: "File Management",
                      description:
                        "Automated Dropbox integration for organized file storage, delivery, and client access.",
                    },
                    {
                      number: "03",
                      title: "Invoicing Engine",
                      description:
                        "Automatic invoice generation based on project data — no manual billing work required.",
                    },
                  ]}
                />
              </section>

              {/* ─── 05 WORKFLOW DESIGN ─── */}
              <section id="workflow" className="mb-20 md:mb-28 scroll-mt-32">
                <SectionHeading
                  number="05"
                  title="Workflow Design"
                  subtitle="The entire production lifecycle, from lead intake to final delivery, designed as one continuous pipeline."
                />
                <SectionBody>
                  <p>
                    The workflow is designed as a linear pipeline with parallel processing capabilities. A new listing enters the system through automated data scraping, gets enriched with metadata, flows through content assignment and production, and exits as a delivered package with an invoice — all without manual handoffs.
                  </p>
                  <p>
                    Each stage has clear entry and exit criteria, automated quality gates, and error handling that routes exceptions to the right person instead of dropping them silently.
                  </p>
                </SectionBody>

                <VisualFrame
                  bg="linear-gradient(135deg, #0c1520 0%, #081018 50%, #060c14 100%)"
                  label="Production Pipeline"
                  labelColor="rgba(127,207,255,0.25)"
                  caption="3.0 — Listing workflow from intake to delivery."
                />
              </section>

              {/* ─── 06 AUTOMATION PIPELINE ─── */}
              <section id="automation" className="mb-20 md:mb-28 scroll-mt-32">
                <SectionHeading
                  number="06"
                  title="Automation Pipeline"
                  subtitle="If a human doesn't need to make a judgment call, a system handles it."
                />
                <SectionBody>
                  <p>
                    The automation layer is the backbone of RLA Studios. Custom scraping pipelines collect listing data from MLS feeds, property databases, and public records. The data is cleaned, normalized, and structured automatically before flowing into the production pipeline.
                  </p>
                  <p>
                    Airtable serves as the central data layer — bidirectional sync ensures project tracking, content metadata, client information, and delivery status all stay consistent. Dropbox integration handles file organization and delivery automatically, sorting and naming content according to project structure.
                  </p>
                </SectionBody>

                <VisualFrame
                  bg="linear-gradient(135deg, #0d1220 0%, #0a0e18 50%, #070a14 100%)"
                  label="Automation Engine"
                  labelColor="rgba(127,207,255,0.25)"
                  caption="4.0 — Data scraping and automation pipeline overview."
                />

                <VisualFrame
                  bg="linear-gradient(135deg, #0c1018 0%, #080c14 50%, #050810 100%)"
                  label="Airtable Integration"
                  labelColor="rgba(127,207,255,0.2)"
                  caption="4.1 — Bidirectional sync architecture with Airtable as central data layer."
                />
              </section>

              {/* ─── 07 CRM & ADMIN ─── */}
              <section id="crm" className="mb-20 md:mb-28 scroll-mt-32">
                <SectionHeading
                  number="07"
                  title="CRM & Admin Experience"
                  subtitle="A single interface to manage the entire operation."
                />
                <SectionBody>
                  <p>
                    The admin panel provides real-time visibility into every aspect of the production pipeline. Project status, client management, content pipeline health, editor assignments, and system configuration — all accessible from a single dashboard.
                  </p>
                  <p>
                    The CRM module tracks client relationships, communication history, project preferences, and billing information. Automated notifications keep clients informed about their content status without requiring manual updates.
                  </p>
                </SectionBody>

                <VisualFrame
                  bg="linear-gradient(135deg, #0c1520 0%, #0a1220 50%, #081020 100%)"
                  label="CRM Dashboard"
                  labelColor="rgba(127,207,255,0.3)"
                  caption="5.0 — Client management interface with real-time project tracking."
                  aspectRatio="16/10"
                />

                <VisualFrame
                  bg="linear-gradient(135deg, #0a1018 0%, #0c1420 50%, #080e18 100%)"
                  label="Project Manager"
                  labelColor="rgba(127,207,255,0.25)"
                  caption="5.1 — Individual project view with status timeline and deliverables."
                />
              </section>

              {/* ─── 08 CLIENT DELIVERY ─── */}
              <section id="delivery" className="mb-20 md:mb-28 scroll-mt-32">
                <SectionHeading
                  number="08"
                  title="Client Delivery Flow"
                  subtitle="Content gets to clients automatically, organized and on time."
                />
                <SectionBody>
                  <p>
                    The delivery pipeline connects directly to Dropbox for organized file storage and client access. Content is automatically sorted, named according to project conventions, and placed in client-specific folders with the right permissions.
                  </p>
                  <p>
                    Invoice generation happens automatically once content is marked as delivered — pulling rates, deliverable counts, and client billing details from the system to produce professional invoices without any manual data entry.
                  </p>
                </SectionBody>

                <VisualFrame
                  bg="linear-gradient(135deg, #0c1218 0%, #0a1020 50%, #080c16 100%)"
                  label="Delivery Pipeline"
                  labelColor="rgba(127,207,255,0.25)"
                  caption="6.0 — Automated delivery and invoicing flow."
                />
              </section>

              {/* ─── 09 DESIGN DECISIONS ─── */}
              <section id="decisions" className="mb-20 md:mb-28 scroll-mt-32">
                <SectionHeading
                  number="09"
                  title="Design Decisions"
                  subtitle="The principles that shaped how the system was built."
                />
                <PrincipleCards
                  items={[
                    {
                      number: "01",
                      title: "Automate Everything Possible",
                      description:
                        "If a human doesn't need to make a judgment call, a system should handle it. This freed up time for the work that actually matters.",
                    },
                    {
                      number: "02",
                      title: "Single Source of Truth",
                      description:
                        "All data flows through one pipeline — no more spreadsheet chaos, no more conflicting versions, no more manual reconciliation.",
                    },
                    {
                      number: "03",
                      title: "Built to Scale",
                      description:
                        "Architecture designed so that adding clients doesn't add complexity. The system should get more efficient as it grows.",
                    },
                  ]}
                />
                <SectionBody>
                  <p>
                    Every technical decision was evaluated against these principles. When choosing between Airtable and a custom database, Airtable won because it provided a visual interface for non-technical team members while still exposing a rich API for automation. When designing the invoicing system, automatic generation won over manual templates because it removed a human touchpoint without sacrificing accuracy.
                  </p>
                </SectionBody>
              </section>

              {/* ─── 10 CHALLENGES ─── */}
              <section id="challenges" className="mb-20 md:mb-28 scroll-mt-32">
                <SectionHeading
                  number="10"
                  title="Challenges & Constraints"
                  subtitle="Building a platform like this meant solving problems that don't have off-the-shelf answers."
                />
                <SectionBody>
                  <p>
                    Integrating with third-party APIs (MLS feeds, Dropbox, Airtable, payment processors) meant building resilient error handling for services I couldn&apos;t control. Rate limiting, API changes, and service outages all had to be handled gracefully.
                  </p>
                  <p>
                    Data quality from scraped sources was inconsistent — addresses formatted differently, missing fields, duplicate entries. The data pipeline needed robust cleaning and deduplication logic that improved over time.
                  </p>
                  <p>
                    Balancing automation with flexibility was an ongoing tension. Too much automation and edge cases break silently. Too little and you&apos;re back to manual work. The system needed escape hatches — ways for humans to intervene when the automation couldn&apos;t handle something.
                  </p>
                </SectionBody>
              </section>

              {/* ─── 11 OUTCOMES ─── */}
              <section id="outcomes" className="mb-20 md:mb-28 scroll-mt-32">
                <SectionHeading
                  number="11"
                  title="Outcomes & Impact"
                />
                <StatBlock
                  items={[
                    { value: "90%", label: "Reduction in manual work" },
                    { value: "3x", label: "Client capacity without new hires" },
                    { value: "< 24h", label: "Lead intake to content delivery" },
                  ]}
                />
                <SectionBody>
                  <p>
                    The platform transformed what was a series of disconnected manual processes into a coherent, automated system. Content production that used to require constant manual oversight now runs largely on its own, with humans focusing on creative decisions and client relationships rather than data entry and file management.
                  </p>
                  <p>
                    The SaaS-ready architecture means the platform can serve multiple production companies — each getting their own instance of the admin panel, automation pipelines, and client management tools.
                  </p>
                </SectionBody>
              </section>

              {/* ─── 12 RETROSPECTIVE ─── */}
              <section id="retrospective" className="mb-20 md:mb-28 scroll-mt-32">
                <SectionHeading
                  number="12"
                  title="Retrospective"
                  subtitle="The best systems are the ones that make themselves invisible. When the automation works, you forget it's there — and that's the point."
                />
                <PrincipleCards
                  items={[
                    {
                      number: "01",
                      title: "Systems Thinking Scales",
                      description:
                        "Approaching the problem as an interconnected system rather than individual tools meant each component made the others stronger.",
                    },
                    {
                      number: "02",
                      title: "Automate the Boring Parts",
                      description:
                        "Every hour spent building automation saved dozens of hours of repetitive work — the ROI compounds over time.",
                    },
                    {
                      number: "03",
                      title: "Build for the Next Version",
                      description:
                        "Designing with SaaS potential from the start meant the architecture was ready to serve multiple clients, not just one.",
                    },
                  ]}
                />
                <SectionBody>
                  <p>
                    Building RLA Studios reinforced a core belief: the highest-leverage engineering work isn&apos;t writing code — it&apos;s designing systems that eliminate the need for code. Every automation pipeline, every integration, every workflow decision was made with the goal of making the system do more so that people could do less of the work that doesn&apos;t require human judgment.
                  </p>
                </SectionBody>
              </section>

              {/* Next project */}
              <NextProject
                title="AI Ticketing System"
                meta="Internal Tool — 2024"
                href="/work/ai-ticketing"
                previewBg="linear-gradient(135deg, #1a1a1a 0%, #111 40%, #0a0a0a 100%)"
                previewLabel="AI"
                previewLabelColor="rgba(242,242,242,0.4)"
              />
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
