"use client";

import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import { motion } from "framer-motion";
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

const ease = [0.165, 0.84, 0.44, 1] as const;

const tocSections = [
  { id: "overview", label: "Overview" },
  { id: "problem", label: "The Problem" },
  { id: "pipeline", label: "How It Works" },
  { id: "architecture", label: "Architecture" },
  { id: "features", label: "Key Features" },
  { id: "decisions", label: "Design Decisions" },
  { id: "challenges", label: "Challenges" },
  { id: "outcomes", label: "Outcomes" },
  { id: "retrospective", label: "Retrospective" },
];

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
              An AI-powered assistant that transforms unstructured emails and support requests into structured, prioritized tickets with auto-generated task breakdowns.
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
              { label: "Stack", value: "React, Express, Gemini AI, TypeScript" },
              { label: "Type", value: "Internal Tool" },
            ]} />
          </div>

          <div className="mt-6">
            <a
              href="https://tickets.rouben.dev"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-[13px] font-medium tracking-[0.2px] text-[var(--color-fg-30)] hover:text-[var(--color-fg)] transition-colors duration-300"
            >
              <span>Visit live site</span>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
                <path d="M7 17L17 7M17 7H10M17 7v7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </a>
          </div>

          <div className="mt-16 md:mt-20 grid grid-cols-1 lg:grid-cols-[160px_1fr] gap-12 lg:gap-16">
            <TableOfContents sections={tocSections} />

            <div>
              {/* 01 OVERVIEW */}
              <section id="overview" className="mb-20 md:mb-28 scroll-mt-32">
                <SectionHeading
                  number="01"
                  title="The Big Picture"
                  subtitle="A full-stack AI system that reads support emails, breaks them into granular tasks, and connects every response to an internal knowledge base."
                />
                <SectionBody>
                  <p>
                    IT support teams receive a constant stream of unstructured requests &mdash; emails with vague subjects, screenshots with no context, forwarded threads with multiple asks buried in one message. This system ingests all of it, uses Google Gemini to extract structured tickets with prioritized task lists, and lets operators refine results through real-time AI chat before saving.
                  </p>
                  <p>
                    The platform includes a full wiki system with version control, a knowledge base with document-aware Q&A, streaming AI guidance per task, and a multi-workspace architecture where each tenant&apos;s data is completely isolated.
                  </p>
                </SectionBody>

                <StatBlock items={[
                  { value: "50+", label: "REST API endpoints" },
                  { value: "5", label: "Distinct AI interfaces" },
                  { value: "12.7K", label: "Lines of TypeScript" },
                ]} />
              </section>

              {/* 02 THE PROBLEM */}
              <section id="problem" className="mb-20 md:mb-28 scroll-mt-32">
                <SectionHeading
                  number="02"
                  title="The Problem"
                  subtitle="Manually triaging unstructured support requests is tedious, error-prone, and doesn't scale."
                />
                <SectionBody>
                  <p>
                    MSPs and IT teams receive requests in every format imaginable &mdash; emails with screenshots, PDFs with no context, forwarded threads with five different asks in one message. Manually reading each one, deciding priority, creating tasks, and writing a response is slow and inconsistent. Critical requests get lost, priorities are guessed at, and institutional knowledge lives in people&apos;s heads instead of a searchable system.
                  </p>
                  <p>
                    There was no tool that could intelligently parse an email &mdash; including attached images, PDFs, and Word docs &mdash; break it into granular tasks, and connect it to an internal knowledge base, all in one workflow.
                  </p>
                </SectionBody>

                <ConstraintList items={[
                  { title: "Unstructured Input", description: "Emails with vague subjects, screenshots, PDFs, forwarded threads — no consistent format to parse." },
                  { title: "Manual Triage", description: "Every request required a human to read, classify, prioritize, and create tasks — a bottleneck that didn't scale." },
                  { title: "Knowledge Silos", description: "Institutional knowledge lived in people's heads. New team members had no way to find past solutions." },
                  { title: "No Task Decomposition", description: "A single email might contain 5 distinct issues, but ticketing systems treat it as one item." },
                ]} />
              </section>

              {/* 03 HOW IT WORKS */}
              <section id="pipeline" className="mb-20 md:mb-28 scroll-mt-32">
                <SectionHeading
                  number="03"
                  title="How It Works"
                  subtitle="A five-stage pipeline from raw email to completed ticket."
                />
                <SectionBody>
                  <p>
                    A user pastes an email or support request into the ingestion page, optionally attaching images, PDFs, or Word documents via drag-and-drop. The Express backend processes attachments through a type-aware pipeline &mdash; images are base64-encoded for Gemini&apos;s vision input, PDFs extracted via pdf2json, Word docs via mammoth.
                  </p>
                  <p>
                    Everything is bundled into a multimodal prompt enriched with relevant internal documents and wiki pages. Gemini analyzes the full input, identifies distinct issues, assigns priority, extracts the company name, and generates 5&ndash;20 granular actionable tasks. Before saving, the user can chat with the AI in real-time via SSE streaming to adjust tasks, add context, or ask clarifying questions.
                  </p>
                  <p>
                    On confirmation, the ticket and tasks are persisted to the workspace&apos;s data store. From the dashboard, users check off tasks, request AI-generated technical guidance (also streamed), and query the knowledge base which searches across uploaded documents and wiki pages to answer questions with cited sources.
                  </p>
                </SectionBody>

                <VisualFrame
                  bg="linear-gradient(135deg, #141414 0%, #0e0e0e 50%, #0a0a0a 100%)"
                  label="Processing Pipeline"
                  labelColor="rgba(242,242,242,0.25)"
                  caption="1.0 — Email + attachments → Parse → Enrich with KB context → Gemini classification → Task generation → Chat refinement → Save."
                />
              </section>

              {/* 04 ARCHITECTURE */}
              <section id="architecture" className="mb-20 md:mb-28 scroll-mt-32">
                <SectionHeading
                  number="04"
                  title="Architecture"
                  subtitle="A self-contained full-stack application with hybrid storage and multi-workspace isolation."
                />
                <SectionBody>
                  <p>
                    The frontend is a React 18 SPA built with Vite, using React Router across 13 pages with Framer Motion transitions and Headless UI for accessible components. The backend is an Express 5 API server with JWT-based session auth, workspace-scoping middleware, and 50+ REST endpoints.
                  </p>
                  <p>
                    Each workspace gets its own isolated data directory with completely separate tickets, documents, and wiki databases. The service layer follows a domain-driven pattern &mdash; AuthService, TicketService, WikiService, DocumentService, OpenAIService &mdash; each self-contained with its own persistence, cached per workspace.
                  </p>
                  <p>
                    Storage is hybrid: sql.js (SQLite compiled to WASM) powers the wiki system where relational queries matter &mdash; version history, chunked full-text search, category and tag relationships. Everything else uses JSON files where simplicity wins. Zero external dependencies: no Postgres, no Redis, no cloud storage. The entire app runs in a single Docker container with a volume mount.
                  </p>
                </SectionBody>

                <VisualFrame
                  bg="linear-gradient(135deg, #0a0e14 0%, #0d1218 50%, #080c12 100%)"
                  label="System Architecture"
                  labelColor="rgba(242,242,242,0.2)"
                  caption="2.0 — React SPA → Express API (JWT + workspace middleware) → Service layer → Hybrid storage (sql.js + JSON files) + Gemini API."
                  aspectRatio="16/10"
                />

                <PrincipleCards items={[
                  { number: "01", title: "Multi-Workspace Isolation", description: "Each workspace gets its own data directory with separate tickets, docs, and wiki databases. Middleware resolves the active workspace per-user on every request." },
                  { number: "02", title: "Hybrid Storage", description: "sql.js (WASM SQLite) for the wiki where relational queries matter. JSON files for tickets, docs, users, and config where simplicity wins." },
                  { number: "03", title: "SSE Streaming", description: "AI responses stream token-by-token from Gemini through Express to React via Server-Sent Events — no WebSocket server needed." },
                ]} />
              </section>

              {/* 05 KEY FEATURES */}
              <section id="features" className="mb-20 md:mb-28 scroll-mt-32">
                <SectionHeading
                  number="05"
                  title="Key Features"
                  subtitle="The capabilities that make this more than a simple ticket tracker."
                />
                <PrincipleCards items={[
                  { number: "01", title: "Multimodal Email Parsing", description: "Paste an email with screenshots, PDFs, and Word docs. Gemini processes text and images together with vision understanding to extract structured tickets." },
                  { number: "02", title: "AI Task Decomposition", description: "A single email automatically becomes 5–20 granular, actionable tasks. When the email references lists, the AI cross-references internal docs to generate explicit per-item tasks." },
                  { number: "03", title: "Context-Aware AI", description: "Every AI call is enriched with relevant internal documents and wiki pages. A custom relevance engine scores and ranks docs, injecting up to 16KB of context into each prompt." },
                ]} />

                <SectionBody>
                  <p>
                    The platform includes four distinct streaming AI interfaces: ingestion refinement, per-ticket technical guidance, knowledge base Q&A, and document context chat. The wiki system supports full version control with rollback, categories, tags, and chunked storage for long documents &mdash; all backed by in-process SQLite and queryable via SQL.
                  </p>
                  <p>
                    Other features include multi-workspace multi-tenant isolation, an admin onboarding flow with temporary passwords, and a monthly billing export that generates CSV reports of completed tasks by company for a date range &mdash; ready for invoicing.
                  </p>
                </SectionBody>
              </section>

              {/* 06 DESIGN DECISIONS */}
              <section id="decisions" className="mb-20 md:mb-28 scroll-mt-32">
                <SectionHeading
                  number="06"
                  title="Design Decisions"
                  subtitle="Intentional technical choices and why they were made."
                />
                <PrincipleCards items={[
                  { number: "01", title: "OpenAI SDK → Gemini", description: "The OpenAI SDK is the most battle-tested LLM client. Pointing it at Google's OpenAI-compatible endpoint gets Gemini's cost advantages while retaining the ability to swap providers by changing one URL." },
                  { number: "02", title: "SSE Over WebSockets", description: "Server-Sent Events are unidirectional — exactly what streaming AI responses need. SSE works over standard HTTP, auto-reconnects, and plays nicely with Express middleware. No heartbeats or upgrade handshakes." },
                  { number: "03", title: "File-Based Persistence", description: "The entire app state lives in a data/ directory — back it up by copying a folder. No database migrations, no connection strings, no managed services. For team-scale usage, this is the right trade-off." },
                ]} />
                <SectionBody>
                  <p>
                    The project started as an Electron desktop app and was migrated to a web app with Express serving both the API and the static SPA build. This enabled Docker deployment and multi-user access without rewriting the service layer. The Electron origins are still visible in the codebase structure, but the architecture is now fully web-native.
                  </p>
                </SectionBody>
              </section>

              {/* 07 CHALLENGES */}
              <section id="challenges" className="mb-20 md:mb-28 scroll-mt-32">
                <SectionHeading
                  number="07"
                  title="Challenges"
                  subtitle="The hardest problems encountered during development and how they were solved."
                />
                <SectionBody>
                  <p>
                    <strong className="text-[var(--color-fg-80)]">Multimodal input processing.</strong> Gemini&apos;s vision API needs base64-encoded images with MIME types, but users paste content in unpredictable formats. The solution was a processing pipeline that detects file types by extension, routes each to the appropriate extractor (pdf2json, mammoth, or raw base64), and assembles mixed-content prompts with both text and image content blocks.
                  </p>
                  <p>
                    <strong className="text-[var(--color-fg-80)]">Streaming through Express.</strong> Getting token-by-token streaming from Gemini through an Express endpoint into a React component required careful plumbing &mdash; chunked transfer encoding on the backend, ReadableStream with incremental decoding on the frontend, and graceful error recovery mid-stream for partial JSON responses.
                  </p>
                  <p>
                    <strong className="text-[var(--color-fg-80)]">Wiki search without vectors.</strong> Instead of introducing embeddings and a vector store, the wiki uses sql.js with a chunking strategy &mdash; long pages are split into chunks with token estimates. Search queries are tokenized, stop-words filtered, and chunks scored by keyword density. Pinned pages bypass scoring and are always included.
                  </p>
                  <p>
                    <strong className="text-[var(--color-fg-80)]">Retroactive multi-workspace support.</strong> Adding workspace isolation meant every service needed to become workspace-aware without breaking existing data. Each service instance is cached per workspace ID, and the migration preserved single-workspace data by treating the first workspace as the default.
                  </p>
                </SectionBody>
              </section>

              {/* 08 OUTCOMES */}
              <section id="outcomes" className="mb-20 md:mb-28 scroll-mt-32">
                <SectionHeading
                  number="08"
                  title="Outcomes"
                />
                <StatBlock items={[
                  { value: "13", label: "React pages" },
                  { value: "7", label: "Backend service classes" },
                  { value: "8", label: "Supported file types" },
                ]} />
                <SectionBody>
                  <p>
                    The system handles the complete lifecycle of support ticket management &mdash; from raw, unstructured email input to structured, prioritized tickets with granular task lists. Every AI interaction is enriched with organizational knowledge, making responses more accurate and contextually relevant than generic LLM output.
                  </p>
                  <p>
                    The zero-infrastructure deployment model means the entire application &mdash; frontend, API, wiki database, and all stored data &mdash; runs in a single Docker container on any machine with a volume mount. No external databases, no cloud services beyond the Gemini API.
                  </p>
                </SectionBody>
              </section>

              {/* 09 RETROSPECTIVE */}
              <section id="retrospective" className="mb-20 md:mb-28 scroll-mt-32">
                <SectionHeading
                  number="09"
                  title="Retrospective"
                  subtitle="What worked, what I'd change, and what I learned."
                />
                <PrincipleCards items={[
                  { number: "01", title: "Right-Size the Stack", description: "JSON files and in-process SQLite were the right call for this scale. Not every project needs Postgres — but the next version would benefit from it for concurrent write safety." },
                  { number: "02", title: "Streaming Is Worth It", description: "SSE streaming across all AI interfaces made the system feel responsive and interactive. The implementation complexity paid for itself in user experience." },
                  { number: "03", title: "Build the Knowledge Layer", description: "The custom relevance engine and wiki system turned generic AI responses into context-aware answers. The quality difference between prompted and un-prompted AI is massive." },
                ]} />
                <SectionBody>
                  <p>
                    If rebuilding from scratch: a real database for concurrent write safety, route modules instead of a single 1,200-line server file, vector embeddings for semantic document retrieval, and proper error boundaries with exponential backoff on the AI integration. The rapid development cycle (9 commits) validated the architecture quickly, but the next iteration would invest in automated tests and a more modular backend structure.
                  </p>
                </SectionBody>
              </section>

              <NextProject
                title="RLA Studios"
                meta="Founder — 2024"
                href="/work/rla-studios"
                previewBg="linear-gradient(135deg, #0f1a2e 0%, #0a1628 40%, #061020 100%)"
                previewLabel="RLA"
                previewLabelColor="rgba(127,207,255,0.6)"
              />
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
