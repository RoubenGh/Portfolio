"use client";

import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import { motion } from "framer-motion";
import {
  BackButton,
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
  { id: "tickets", label: "Ticket Management" },
  { id: "guidance", label: "Technical Guidance AI" },
  { id: "wiki", label: "Wiki & Knowledge Base" },
  { id: "companies", label: "Companies" },
  { id: "billing", label: "Billing & Reports" },
  { id: "decisions", label: "Design Decisions" },
  { id: "challenges", label: "Challenges" },
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

          {/* Hero: Dashboard screenshot */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.2, ease }}
            className="mt-10 md:mt-12 relative rounded-[16px] overflow-hidden"
            style={{
              boxShadow: "0 40px 80px rgba(0,0,0,0.5), inset 0 1px 0 rgba(242,242,242,0.04)",
              border: "1px solid rgba(242,242,242,0.05)",
            }}
          >
            <img
              src="/images/ai-ticketing/dashboard.png"
              alt="AI Ticketing System Dashboard"
              className="w-full h-auto block"
            />
            <div
              className="absolute inset-0 pointer-events-none rounded-[16px]"
              style={{ boxShadow: "inset 0 0 60px rgba(0,0,0,0.5)" }}
            />
          </motion.div>

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
                    IT support teams receive a constant stream of unstructured requests: emails with vague subjects, screenshots with no context, forwarded threads with multiple asks buried in one message. This system ingests all of it, uses Google Gemini to extract structured tickets with prioritized task lists, and lets operators refine results through real-time AI chat before saving.
                  </p>
                  <p>
                    The platform includes a full wiki system with version control, a knowledge base with document-aware Q&A, streaming AI guidance per task, auto-organized company tracking, and a multi-workspace architecture where each tenant&apos;s data is completely isolated.
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
                    MSPs and IT teams receive requests in every format imaginable: emails with screenshots, PDFs with no context, forwarded threads with five different asks in one message. Manually reading each one, deciding priority, creating tasks, and writing a response is slow and inconsistent. Critical requests get lost, priorities are guessed at, and institutional knowledge lives in people&apos;s heads instead of a searchable system.
                  </p>
                  <p>
                    There was no tool that could intelligently parse an email (including attached images, PDFs, and Word docs), break it into granular tasks, and connect it to an internal knowledge base, all in one workflow.
                  </p>
                </SectionBody>

                <ConstraintList items={[
                  { title: "Unstructured Input", description: "Emails with vague subjects, screenshots, PDFs, forwarded threads. No consistent format to parse." },
                  { title: "Manual Triage", description: "Every request required a human to read, classify, prioritize, and create tasks. A bottleneck that didn't scale." },
                  { title: "Knowledge Silos", description: "Institutional knowledge lived in people's heads. New team members had no way to find past solutions." },
                  { title: "No Task Decomposition", description: "A single email might contain 5 distinct issues, but ticketing systems treat it as one item." },
                ]} />
              </section>

              {/* 03 HOW IT WORKS */}
              <section id="pipeline" className="mb-20 md:mb-28 scroll-mt-32">
                <SectionHeading
                  number="03"
                  title="How It Works"
                  subtitle="A multi-stage pipeline from raw email to completed ticket."
                />
                <SectionBody>
                  <p>
                    A user pastes an email or support request into the ingestion page, optionally attaching images, PDFs, or Word documents via drag-and-drop. The Express backend processes attachments through a type-aware pipeline: images are base64-encoded for Gemini&apos;s vision input, PDFs extracted via pdf2json, Word docs via mammoth.
                  </p>
                </SectionBody>

                <VisualFrame
                  bg="linear-gradient(135deg, #141414 0%, #0e0e0e 50%, #0a0a0a 100%)"
                  label="Email Ingestion"
                  labelColor="rgba(242,242,242,0.25)"
                  imageSrc="/images/ai-ticketing/ingestion.png"
                  caption="3.0 - The ingestion page where raw emails and attachments are pasted for AI processing."
                />

                <SectionBody>
                  <p>
                    Everything is bundled into a multimodal prompt enriched with relevant internal documents and wiki pages. Gemini analyzes the full input, identifies distinct issues, assigns priority, extracts the company name from context clues and email signatures, and generates 5-20 granular actionable tasks. Before saving, the user can chat with the AI in real-time via SSE streaming to adjust tasks, add context, or ask clarifying questions.
                  </p>
                </SectionBody>

                <VisualFrame
                  bg="linear-gradient(135deg, #141414 0%, #0e0e0e 50%, #0a0a0a 100%)"
                  label="Task Generation & Refinement"
                  labelColor="rgba(242,242,242,0.25)"
                  imageSrc="/images/ai-ticketing/ticket-creation.png"
                  caption="3.1 - AI-generated tasks and the streaming chat refinement interface. Users can modify tasks, adjust priorities, and ask follow-up questions before saving."
                />

                <SectionBody>
                  <p>
                    On confirmation, the ticket and tasks are persisted to the workspace&apos;s data store. The AI acts as a &quot;Project Manager&quot; during ingestion, parsing work and proposing structure. It can add or remove tasks, change the subject, adjust priority, and update the company name through the chat interface, all before the ticket is committed.
                  </p>
                </SectionBody>
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
                    The frontend is a React 18 SPA built with Vite, using React Router across 13 pages with Framer Motion transitions, Headless UI for accessible components, and full light/dark mode theming. The backend is an Express 5 API server with JWT-based session auth, workspace-scoping middleware, and 50+ REST endpoints.
                  </p>
                  <p>
                    Each workspace gets its own isolated data directory with completely separate tickets, documents, and wiki databases. The service layer follows a domain-driven pattern (AuthService, TicketService, WikiService, DocumentService, OpenAIService), each self-contained with its own persistence, cached per workspace.
                  </p>
                  <p>
                    Storage is hybrid: sql.js (SQLite compiled to WASM) powers the wiki system where relational queries matter (version history, chunked full-text search, category and tag relationships). Everything else uses JSON files where simplicity wins. Zero external dependencies: no Postgres, no Redis, no cloud storage. The entire app runs in a single Docker container with a volume mount.
                  </p>
                </SectionBody>

                <PrincipleCards items={[
                  { number: "01", title: "Multi-Workspace Isolation", description: "Each workspace gets its own data directory with separate tickets, docs, and wiki databases. Middleware resolves the active workspace per-user on every request." },
                  { number: "02", title: "Hybrid Storage", description: "sql.js (WASM SQLite) for the wiki where relational queries matter. JSON files for tickets, docs, users, and config where simplicity wins." },
                  { number: "03", title: "SSE Streaming", description: "AI responses stream token-by-token from Gemini through Express to React via Server-Sent Events. No WebSocket server needed." },
                ]} />
              </section>

              {/* 05 TICKET MANAGEMENT */}
              <section id="tickets" className="mb-20 md:mb-28 scroll-mt-32">
                <SectionHeading
                  number="05"
                  title="Ticket Management"
                  subtitle="A full ticket lifecycle with nested tasks, cascading status updates, and inline editing."
                />
                <SectionBody>
                  <p>
                    Each ticket is a tabbed interface with views for Tasks, Original Email, Technical Guidance, Resolution Summary, and Job Description. The task list renders as a checklist with drag-and-drop reordering, nested subtasks, bulk selection, and search filtering.
                  </p>
                  <p>
                    Task completion triggers cascading logic: checking a parent task auto-completes all children, completing all siblings auto-completes the parent, and when every top-level task is done, the ticket status transitions to &quot;Done&quot; automatically. Unchecking a task on a completed ticket reverts it to &quot;In Progress.&quot; Each completion records a timestamp used for billing reports.
                  </p>
                  <p>
                    When a task is marked complete, the system checks if any wiki pages might be outdated by the completed work. If matches are found, a suggestion banner offers to preview and apply AI-generated updates to those pages, linked back to the ticket.
                  </p>
                </SectionBody>

                <VisualFrame
                  bg="linear-gradient(135deg, #141414 0%, #0e0e0e 50%, #0a0a0a 100%)"
                  label="Ticket Detail"
                  labelColor="rgba(242,242,242,0.25)"
                  imageSrc="/images/ai-ticketing/ticketdetail.png"
                  caption="5.0 - Ticket detail view with task checklist, priority badge, company name, and inline editing."
                />
              </section>

              {/* 06 TECHNICAL GUIDANCE AI */}
              <section id="guidance" className="mb-20 md:mb-28 scroll-mt-32">
                <SectionHeading
                  number="06"
                  title="Technical Guidance AI"
                  subtitle="A streaming AI advisor that generates implementation guides and answers follow-up questions per ticket."
                />
                <SectionBody>
                  <p>
                    After a ticket is created, the system auto-generates a step-by-step technical implementation guide. The AI acts as a &quot;Senior Technical Lead,&quot; breaking down tasks, suggesting commands and tools, highlighting risks, and providing code snippets. If relevant internal docs or wiki pages exist, they&apos;re injected into the prompt so the AI prefers citing internal procedures over generic advice.
                  </p>
                  <p>
                    Users can then ask follow-up questions in a streaming chat interface. Each message includes the full context: ticket subject, all task descriptions, the previously generated guidance, relevant internal docs, and the complete chat history. Responses stream token-by-token via SSE, making the interface feel responsive even on complex queries.
                  </p>
                </SectionBody>

                <VisualFrame
                  bg="linear-gradient(135deg, #141414 0%, #0e0e0e 50%, #0a0a0a 100%)"
                  label="Technical Guidance"
                  labelColor="rgba(242,242,242,0.25)"
                  imageSrc="/images/ai-ticketing/technicalguidance.png"
                  caption="6.0 - AI-generated technical guidance with streaming follow-up chat. Context includes the ticket, tasks, and relevant wiki pages."
                />
              </section>

              {/* 07 WIKI & KNOWLEDGE BASE */}
              <section id="wiki" className="mb-20 md:mb-28 scroll-mt-32">
                <SectionHeading
                  number="07"
                  title="Wiki & Knowledge Base"
                  subtitle="A full internal knowledge base with version control, chunked search, and automatic AI context injection."
                />
                <SectionBody>
                  <p>
                    The wiki is backed by sql.js, an in-process SQLite database compiled to WASM. The schema includes six tables: pages, tags, page versions, chunks, categories, and files. Every content edit creates a versioned snapshot with editor name, change summary, and an optional link back to the source ticket that triggered the update.
                  </p>
                  <p>
                    Search works without vector embeddings. Long pages are split into chunks targeting ~800 tokens each. Queries are tokenized, stop-words filtered, and chunks scored by keyword density with bonuses for title matches, category matches, tag matches, and phrase proximity. Pinned pages bypass scoring and are always included in AI context.
                  </p>
                  <p>
                    Every AI call in the system (ingestion, guidance, chat) first queries the wiki and document store for relevant content. Up to 5 wiki pages and 5 documents are scored, and the top excerpts (capped at 4KB each) are injected into the system prompt as &quot;Internal Documentation Reference.&quot;
                  </p>
                </SectionBody>

                <VisualFrame
                  bg="linear-gradient(135deg, #141414 0%, #0e0e0e 50%, #0a0a0a 100%)"
                  label="Wiki"
                  labelColor="rgba(242,242,242,0.25)"
                  imageSrc="/images/ai-ticketing/wiki.png"
                  caption="7.0 - Wiki page list with categories, tags, and search."
                />

                <VisualFrame
                  bg="linear-gradient(135deg, #141414 0%, #0e0e0e 50%, #0a0a0a 100%)"
                  label="Wiki Document"
                  labelColor="rgba(242,242,242,0.25)"
                  imageSrc="/images/ai-ticketing/wiki2.png"
                  caption="7.1 - A wiki document with version history and content editing."
                />
              </section>

              {/* 08 COMPANIES */}
              <section id="companies" className="mb-20 md:mb-28 scroll-mt-32">
                <SectionHeading
                  number="08"
                  title="Companies & Auto-Organization"
                  subtitle="Zero-config client tracking. The AI extracts company names from emails and the system auto-organizes tickets by client."
                />
                <SectionBody>
                  <p>
                    During email parsing, Gemini extracts the company name from signatures, domain names, and context clues in the email body. This is stored as a plain string on each ticket. There is no separate companies table or CRM-style setup.
                  </p>
                  <p>
                    The Companies page aggregates all tickets client-side, building a map of every company with stats: total tickets, active tickets, completed tickets, and last active date. Clicking a company filters to that client&apos;s tickets with full search, sort, and status filtering. Company names can also be manually edited on any ticket via inline editing.
                  </p>
                  <p>
                    For MSPs managing dozens of clients, this eliminates the overhead of maintaining a separate CRM. Every email automatically organizes itself by client with zero configuration.
                  </p>
                </SectionBody>

                <VisualFrame
                  bg="linear-gradient(135deg, #141414 0%, #0e0e0e 50%, #0a0a0a 100%)"
                  label="Companies"
                  labelColor="rgba(242,242,242,0.25)"
                  imageSrc="/images/ai-ticketing/companies.png"
                  caption="8.0 - Auto-organized company list with ticket counts, active/completed stats, and last activity."
                />
              </section>

              {/* 09 BILLING & REPORTS */}
              <section id="billing" className="mb-20 md:mb-28 scroll-mt-32">
                <SectionHeading
                  number="09"
                  title="Billing & Reports"
                  subtitle="AI-generated job summaries and monthly CSV exports for invoicing."
                />
                <SectionBody>
                  <p>
                    When tasks are completed, the system can generate a chronological, past-tense billing description of all work performed on a ticket. The AI takes completed tasks with their timestamps, sorts them by date, and produces a cohesive summary formatted for copy-paste into time-tracking or billing software. Descriptions start with the user&apos;s sign-off name, avoid first person, and organize work chronologically.
                  </p>
                  <p>
                    The Monthly Report page filters all &quot;Done&quot; tickets for a selected month, groups them by date, and displays each with its company name, subject, and billing description. A CSV export generates a downloadable file with columns for date, company, subject, and description. There&apos;s also a Markdown export and a &quot;Copy All&quot; button for clipboard paste. If a ticket is missing its description, a &quot;Generate&quot; button triggers on-demand AI generation.
                  </p>
                </SectionBody>

                <VisualFrame
                  bg="linear-gradient(135deg, #141414 0%, #0e0e0e 50%, #0a0a0a 100%)"
                  label="Job Description"
                  labelColor="rgba(242,242,242,0.25)"
                  imageSrc="/images/ai-ticketing/description.png"
                  caption="9.0 - AI-generated billing description summarizing completed work in past tense for invoicing."
                />
              </section>

              {/* 10 DESIGN DECISIONS */}
              <section id="decisions" className="mb-20 md:mb-28 scroll-mt-32">
                <SectionHeading
                  number="10"
                  title="Design Decisions"
                  subtitle="Intentional technical choices and why they were made."
                />
                <PrincipleCards items={[
                  { number: "01", title: "OpenAI SDK to Gemini", description: "The OpenAI SDK is the most battle-tested LLM client. Pointing it at Google's OpenAI-compatible endpoint gets Gemini's cost advantages while retaining the ability to swap providers by changing one URL." },
                  { number: "02", title: "SSE Over WebSockets", description: "Server-Sent Events are unidirectional, exactly what streaming AI responses need. SSE works over standard HTTP, auto-reconnects, and plays nicely with Express middleware. No heartbeats or upgrade handshakes." },
                  { number: "03", title: "File-Based Persistence", description: "The entire app state lives in a data/ directory. Back it up by copying a folder. No database migrations, no connection strings, no managed services. For team-scale usage, this is the right trade-off." },
                ]} />
                <SectionBody>
                  <p>
                    The project started as an Electron desktop app and was migrated to a web app with Express serving both the API and the static SPA build. This enabled Docker deployment and multi-user access without rewriting the service layer.
                  </p>
                </SectionBody>
              </section>

              {/* 11 CHALLENGES */}
              <section id="challenges" className="mb-20 md:mb-28 scroll-mt-32">
                <SectionHeading
                  number="11"
                  title="Challenges"
                  subtitle="The hardest problems encountered during development and how they were solved."
                />
                <SectionBody>
                  <p>
                    <strong className="text-[var(--color-fg-80)]">Multimodal input processing.</strong> Gemini&apos;s vision API needs base64-encoded images with MIME types, but users paste content in unpredictable formats. The solution was a processing pipeline that detects file types by extension, routes each to the appropriate extractor (pdf2json, mammoth, or raw base64), and assembles mixed-content prompts with both text and image content blocks.
                  </p>
                  <p>
                    <strong className="text-[var(--color-fg-80)]">Streaming through Express.</strong> Getting token-by-token streaming from Gemini through an Express endpoint into a React component required careful plumbing: chunked transfer encoding on the backend, ReadableStream with incremental decoding on the frontend, and graceful error recovery mid-stream for partial JSON responses.
                  </p>
                  <p>
                    <strong className="text-[var(--color-fg-80)]">Wiki search without vectors.</strong> Instead of introducing embeddings and a vector store, the wiki uses sql.js with a chunking strategy. Long pages are split into chunks with token estimates. Search queries are tokenized, stop-words filtered, and chunks scored by keyword density. Pinned pages bypass scoring and are always included.
                  </p>
                  <p>
                    <strong className="text-[var(--color-fg-80)]">Retroactive multi-workspace support.</strong> Adding workspace isolation meant every service needed to become workspace-aware without breaking existing data. Each service instance is cached per workspace ID, and the migration preserved single-workspace data by treating the first workspace as the default.
                  </p>
                </SectionBody>
              </section>

              {/* 12 RETROSPECTIVE */}
              <section id="retrospective" className="mb-20 md:mb-28 scroll-mt-32">
                <SectionHeading
                  number="12"
                  title="Retrospective"
                  subtitle="What worked, what I'd change, and what I learned."
                />
                <PrincipleCards items={[
                  { number: "01", title: "Right-Size the Stack", description: "JSON files and in-process SQLite were the right call for this scale. Not every project needs Postgres, but the next version would benefit from it for concurrent write safety." },
                  { number: "02", title: "Streaming Is Worth It", description: "SSE streaming across all AI interfaces made the system feel responsive and interactive. The implementation complexity paid for itself in user experience." },
                  { number: "03", title: "Build the Knowledge Layer", description: "The custom relevance engine and wiki system turned generic AI responses into context-aware answers. The quality difference between prompted and un-prompted AI is massive." },
                ]} />
                <SectionBody>
                  <p>
                    If rebuilding from scratch: a real database for concurrent write safety, route modules instead of a single 1,200-line server file, vector embeddings for semantic document retrieval, and proper error boundaries with exponential backoff on the AI integration. The rapid development cycle validated the architecture quickly, but the next iteration would invest in automated tests and a more modular backend structure.
                  </p>
                </SectionBody>
              </section>

              <NextProject
                title="RLA Studios"
                meta="Founder - 2024"
                href="/work/rla-studios"
                previewBg="linear-gradient(135deg, #0f1a2e 0%, #0a1628 40%, #061020 100%)"
                previewLabel="RLA"
                previewLabelColor="rgba(127,207,255,0.6)"
                previewImageSrc="/images/rla-studios/dashboard.png"
              />
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
