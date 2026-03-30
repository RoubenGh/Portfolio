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
  { id: "problem", label: "The Problem" },
  { id: "architecture", label: "Architecture" },
  { id: "scraper", label: "Scraper Pipeline" },
  { id: "invoicing", label: "Invoicing Engine" },
  { id: "crm", label: "CRM & Admin" },
  { id: "automation", label: "Automation" },
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
          <div className="mb-10">
            <BackButton />
          </div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease }}
          >
            <h1 className="text-[36px] md:text-[52px] font-medium tracking-[-1.5px] leading-[1.05] text-[var(--color-fg)]">
              RLA Studios
            </h1>
            <p className="mt-3 text-[16px] md:text-[18px] leading-[1.5] text-[var(--color-fg-30)] max-w-[600px]">
              Full-stack business operations platform for a real estate videography company &mdash; from lead scraping to invoice delivery.
            </p>
          </motion.div>

          <div className="mt-10 md:mt-12">
            <ProjectHero
              bannerBg="linear-gradient(135deg, #0f1a2e 0%, #0a1628 40%, #061020 100%)"
              bannerLabel="RLA"
              bannerLabelColor="rgba(127,207,255,0.6)"
            />
          </div>

          <div className="mt-8">
            <ProjectMeta
              items={[
                { label: "Role", value: "Founder & Lead Engineer" },
                { label: "Timeline", value: "2024 — Present" },
                { label: "Stack", value: "Node, FastAPI, React, PostgreSQL" },
                { label: "Type", value: "Business Platform" },
              ]}
            />
          </div>

          <div className="mt-6">
            <a
              href="https://rlastudios.com"
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
                  subtitle="A dual-runtime platform that automates lead scraping, client management, invoice generation, file delivery, and commission tracking — replacing spreadsheets, manual Airtable entry, and disconnected tools."
                />
                <SectionBody>
                  <p>
                    RLA Studios is a full-stack business operations platform built for a real estate videography company. It&apos;s a dual-runtime monolith &mdash; a Node/Express frontend server and a Python/FastAPI backend sidecar &mdash; deployed as three Docker containers (Express, FastAPI, PostgreSQL) behind Traefik on a VPS via Dokploy.
                  </p>
                  <p>
                    The platform connects lead intake, CRM management, invoice generation, file delivery, commission tracking, and admin operations through a single interface &mdash; replacing what was previously a tangle of 4&ndash;5 disconnected tools.
                  </p>
                </SectionBody>

                <StatBlock
                  items={[
                    { value: "1,963", label: "Leads managed" },
                    { value: "54", label: "API endpoints" },
                    { value: "17.5K", label: "Lines of source code" },
                  ]}
                />

                <VisualFrame
                  bg="#ffffff"
                  label="RLA Studios Website"
                  labelColor="rgba(0,0,0,0.3)"
                  caption="1.0 — rlastudios.com — the public-facing marketing site with lead capture, built alongside the platform."
                  imageSrc="/images/rla-studios/website.png"
                />
              </section>

              {/* 02 THE PROBLEM */}
              <section id="problem" className="mb-20 md:mb-28 scroll-mt-32">
                <SectionHeading
                  number="02"
                  title="The Problem"
                  subtitle="Every step in the business workflow was a context-switch between disconnected tools."
                />
                <SectionBody>
                  <p>
                    Before this platform, the workflow was entirely manual: browse Redfin and Compass listings one-by-one, copy-paste agent contact info into Airtable, generate invoices in Canva or Google Docs, manually upload PDFs to Dropbox, then remember who sold which client and who&apos;s owed commission.
                  </p>
                  <p>
                    Scaling past a handful of clients meant drowning in admin work instead of shooting videos. Every new client added more manual steps, not less.
                  </p>
                </SectionBody>

                <ConstraintList
                  items={[
                    { title: "Manual Lead Research", description: "Browsing listing sites one-by-one, copy-pasting agent contact info into spreadsheets and Airtable by hand." },
                    { title: "Disconnected Invoicing", description: "Creating invoices in Canva/Google Docs, manually uploading to Dropbox, then tracking payment status separately." },
                    { title: "No Commission Tracking", description: "Remembering who sold which client and who's owed what — tracked in someone's head, not a system." },
                    { title: "Tool Sprawl", description: "Every step required context-switching between Redfin, Airtable, Canva, Dropbox, and spreadsheets." },
                  ]}
                />
              </section>

              {/* 03 ARCHITECTURE */}
              <section id="architecture" className="mb-20 md:mb-28 scroll-mt-32">
                <SectionHeading
                  number="03"
                  title="System Architecture"
                  subtitle="A dual-runtime monolith — Node gateway + Python sidecar — deployed as three Docker containers behind Traefik."
                />
                <SectionBody>
                  <p>
                    Express acts as the gateway and proxy &mdash; it handles auth, sessions, audit logging, and commission interception, then forwards business-logic requests to FastAPI via internal HTTP. The Python sidecar is never publicly exposed; an internal API key guard enforces this. WebSocket connections for the scraper are upgraded and piped through raw TCP.
                  </p>
                  <p>
                    PostgreSQL handles platform state (users, leads, settings, services, audit logs, commissions) across 8 tables with Drizzle ORM for type-safe queries. Airtable serves as the external CRM for client records, and Dropbox handles file storage for generated invoices.
                  </p>
                </SectionBody>

                <VisualFrame
                  bg="#f5f5f5"
                  label="Admin Dashboard"
                  labelColor="rgba(0,0,0,0.3)"
                  caption="2.0 — Admin dashboard showing integration status, quick actions, and lead management."
                  imageSrc="/images/rla-studios/dashboard.png"
                />

                <PrincipleCards
                  items={[
                    { number: "01", title: "Express Gateway", description: "Handles auth, sessions, audit logging, WebSocket proxy, and commission interception. Forwards business logic to FastAPI via internal HTTP." },
                    { number: "02", title: "FastAPI Sidecar", description: "Scraping engine, invoice generator, Airtable CRUD, Dropbox uploads, and address geocoding. Never publicly exposed — guarded by internal API key." },
                    { number: "03", title: "Dual Database", description: "PostgreSQL for platform state (8 tables via Drizzle ORM). Airtable as external CRM — preserved the existing workflow while adding automation on top." },
                  ]}
                />
              </section>

              {/* 04 SCRAPER PIPELINE */}
              <section id="scraper" className="mb-20 md:mb-28 scroll-mt-32">
                <SectionHeading
                  number="04"
                  title="Scraper Pipeline"
                  subtitle="Paste listing URLs, get structured agent data in Airtable — with real-time WebSocket progress."
                />
                <SectionBody>
                  <p>
                    Paste one or more Redfin or Compass listing URLs into the scraper UI. The Python backend auto-detects the platform and scrapes each page using BeautifulSoup with a multi-strategy extraction pipeline: first tries regex on the &ldquo;Listed by&rdquo; section, then falls back to JSON-LD structured data extraction, then uses DuckDuckGo HTML search as a last resort to find listings by address.
                  </p>
                  <p>
                    Results stream back via WebSocket in real-time with structured message types (log, result, complete, error), so each URL&apos;s progress is visible as it happens. Deduplication checks against existing Airtable records prevent duplicate entries. New leads are written directly to Airtable with agent name, phone, email, listing address, listed date, and days on market.
                  </p>
                  <p>
                    Partial street addresses extracted from listing URLs are auto-geocoded via Nominatim (OpenStreetMap) to full street, city, state, ZIP format. An in-memory cache prevents redundant lookups.
                  </p>
                </SectionBody>

                <VisualFrame
                  bg="#f5f5f5"
                  label="Lead Scraper"
                  labelColor="rgba(0,0,0,0.3)"
                  caption="3.0 — Paste Redfin/Compass URLs, watch real-time WebSocket progress as each listing is scraped and written to Airtable."
                  imageSrc="/images/rla-studios/scraper.png"
                />
              </section>

              {/* 05 INVOICING ENGINE */}
              <section id="invoicing" className="mb-20 md:mb-28 scroll-mt-32">
                <SectionHeading
                  number="05"
                  title="Invoicing Engine"
                  subtitle="Generate branded PDF invoices, auto-upload to Dropbox, sync to Airtable, and track commissions — all in one click."
                />
                <SectionBody>
                  <p>
                    Select a client, pick services from a configurable catalog, and generate a branded PDF invoice using ReportLab with custom Montserrat typography and background template overlays. The output is a two-page PDF: page one is the invoice with pixel-precise coordinate-based layout, page two is an auto-populated Video Ownership Agreement with the client&apos;s name injected into legal text.
                  </p>
                  <p>
                    The PDF is auto-uploaded to Dropbox and the share link is synced back to the client&apos;s Airtable record. Marking an invoice as paid overlays a PAID stamp via PyMuPDF without regenerating the original, re-uploads the stamped version, and creates a commission ledger entry. The Express proxy layer transparently captures payment events and writes audit + commission entries without the Python backend needing to know.
                  </p>
                </SectionBody>

                <VisualFrame
                  bg="#f5f5f5"
                  label="Invoice Generator"
                  labelColor="rgba(0,0,0,0.3)"
                  caption="4.0 — Select services from the catalog, preview the branded PDF in real-time, then generate and auto-upload to Dropbox."
                  imageSrc="/images/rla-studios/invoice.png"
                />
              </section>

              {/* 06 CRM & ADMIN */}
              <section id="crm" className="mb-20 md:mb-28 scroll-mt-32">
                <SectionHeading
                  number="06"
                  title="CRM & Admin Panel"
                  subtitle="Role-based admin panel with lead management, client CRM, commission tracking, and a sandboxed demo mode."
                />
                <SectionBody>
                  <p>
                    The CRM manages nearly 2,000 real estate agent leads with full outreach pipeline tracking. Each record stores contact info, listing details (address, URL), and tracks the entire outreach lifecycle &mdash; when they were texted, days since last contact, follow-up dates, and response status.
                  </p>
                  <p>
                    Quick-action buttons let the team send templated messages with one tap: opener texts, follow-ups, pricing info, questions, and emails. Each button generates a pre-filled SMS deep link with the agent&apos;s first name, listing address, and a customizable message template pulled directly from the CRM &mdash; no copy-pasting, no app switching.
                  </p>
                  <p>
                    Lead status flows through a defined pipeline: New Lead, Interested, Need to Follow Up, Followed Up, Not Interested, Ghosted, or Hired. Video production status is tracked per lead (Not Started, In Progress, Completed), and invoices attach directly to completed work. Team attribution tracks who scraped each lead for commission purposes.
                  </p>
                  <p>
                    The admin panel layers on top with role-based access control (superadmin, admin, viewer, demo), rate-limited login (5 attempts per 15 minutes), bcrypt hashing, session-based auth, and audit logging. A sandboxed demo mode lets prospects explore the full panel &mdash; all mutations are intercepted and short-circuited so demo users can click every button without touching real data.
                  </p>
                </SectionBody>

                <VisualFrame
                  bg="#1a1a1a"
                  label="Client CRM"
                  labelColor="rgba(255,255,255,0.3)"
                  caption="5.0 — Nearly 2,000 agent leads with outreach status, follow-up tracking, and one-tap templated messaging."
                  imageSrc="/images/rla-studios/crm.png"
                />

                {/* Click-to-text demo video */}
                <FadeIn>
                  <div className="my-10 md:my-14">
                    <div
                      className="relative rounded-[12px] overflow-hidden"
                      style={{
                        boxShadow: "0 24px 48px rgba(0,0,0,0.35), inset 0 1px 0 rgba(242,242,242,0.03)",
                        border: "1px solid rgba(242,242,242,0.04)",
                      }}
                    >
                      <video
                        className="w-full"
                        autoPlay
                        loop
                        muted
                        playsInline
                        style={{ aspectRatio: "16/9", objectFit: "cover", background: "#0a0a0a" }}
                      >
                        <source src="/images/rla-studios/clicktotext.MP4" type="video/mp4" />
                      </video>
                    </div>
                    <p className="mt-3 text-[12px] tracking-[0.1px] text-[var(--color-fg-15)]">
                      5.1 &mdash; One-tap outreach: click a button, get a pre-filled SMS with the agent&apos;s name and listing address pulled from the CRM.
                    </p>
                  </div>
                </FadeIn>

                <VisualFrame
                  bg="#f5f5f5"
                  label="Commission Tracking"
                  labelColor="rgba(0,0,0,0.3)"
                  caption="5.2 — Commission ledger with invoice links, sold-by attribution, and payment status toggling."
                  imageSrc="/images/rla-studios/commissions.png"
                />
              </section>

              {/* 07 AUTOMATION */}
              <section id="automation" className="mb-20 md:mb-28 scroll-mt-32">
                <SectionHeading
                  number="07"
                  title="Automation"
                  subtitle="If a human doesn't need to make a judgment call, a system handles it."
                />
                <PrincipleCards
                  items={[
                    { number: "01", title: "Scraper → Airtable", description: "Paste URLs → auto-detect platform → scrape agent info → deduplicate → write to Airtable. Real-time WebSocket streaming shows each URL's progress." },
                    { number: "02", title: "Invoice Lifecycle", description: "Generate PDF → upload to Dropbox → sync link to Airtable → mark paid → overlay PAID stamp → re-upload → create commission entry. One click." },
                    { number: "03", title: "Address Completion", description: "Partial addresses from listing URLs are auto-geocoded via Nominatim to full street, city, state, ZIP format. In-memory cache prevents redundant lookups." },
                  ]}
                />
                <SectionBody>
                  <p>
                    On first startup, the system auto-creates a default superadmin user and seeds a 7-item service catalog &mdash; zero manual setup needed post-deploy. The configurable service catalog lets admins add, edit, and reorder line items that populate invoice generation, so pricing changes don&apos;t require code changes.
                  </p>
                </SectionBody>
              </section>

              {/* 08 DESIGN DECISIONS */}
              <section id="decisions" className="mb-20 md:mb-28 scroll-mt-32">
                <SectionHeading
                  number="08"
                  title="Design Decisions"
                  subtitle="Intentional architectural choices and the reasoning behind them."
                />
                <PrincipleCards
                  items={[
                    { number: "01", title: "Dual Runtime", description: "Python has better scraping and PDF libraries (BeautifulSoup, ReportLab, PyMuPDF). Node has better session middleware and Drizzle ORM. Each runtime handles what it's best at." },
                    { number: "02", title: "Airtable as CRM", description: "The business was already running on Airtable. Rather than forcing a migration, the platform wraps Airtable's API with retry/backoff and uses it as the source of truth for client data." },
                    { number: "03", title: "Commission Interceptor", description: "Rather than modifying the Python backend, the Express proxy intercepts successful mark-paid responses and writes commission entries as a side effect. Zero cross-service coupling." },
                  ]}
                />
                <SectionBody>
                  <p>
                    WebSockets were chosen over polling for scraper progress because scraping multiple URLs takes 5&ndash;30 seconds each. Polling would add latency and complexity. WebSockets give instant per-URL feedback with structured message types, making the scraper feel interactive rather than batch-oriented.
                  </p>
                  <p>
                    Multi-stage Docker builds with Alpine cut the final image size significantly &mdash; the builder stage installs all dev dependencies and runs Vite + esbuild, then the runtime stage copies only build output and production deps.
                  </p>
                </SectionBody>
              </section>

              {/* 09 CHALLENGES */}
              <section id="challenges" className="mb-20 md:mb-28 scroll-mt-32">
                <SectionHeading
                  number="09"
                  title="Challenges"
                  subtitle="The hardest problems encountered and how they were solved."
                />
                <SectionBody>
                  <p>
                    <strong className="text-[var(--color-fg-80)]">Scraping reliability across platforms.</strong> Redfin and Compass have completely different HTML structures and no consistent API. The scraper uses a multi-strategy pipeline: regex on the &ldquo;Listed by&rdquo; section first, then JSON-LD structured data, then DuckDuckGo HTML search as a fallback. Property type detection filters out land/lots to avoid irrelevant leads.
                  </p>
                  <p>
                    <strong className="text-[var(--color-fg-80)]">Invoice PDF pixel alignment.</strong> Overlaying dynamic text on branded background templates (Canva-exported PNGs) required a manual coordinate system with per-field (x, y) tuning. A debug grid mode draws 10/50/100-point gridlines to help align text visually. Text wrapping for long service descriptions uses ReportLab&apos;s simpleSplit with column-width constraints to prevent overlap.
                  </p>
                  <p>
                    <strong className="text-[var(--color-fg-80)]">Airtable rate limits.</strong> Airtable enforces 5 requests/second. The service layer implements exponential backoff with 3 retries on 429 responses and connection errors. Pagination handles bases with 100+ records via offset tokens.
                  </p>
                  <p>
                    <strong className="text-[var(--color-fg-80)]">WebSocket proxy through Express.</strong> The scraper&apos;s WebSocket connection originates from the browser, hits Express, and needs to reach FastAPI. The httpServer upgrade handler manually pipes the TCP connection through, forwarding the internal API key.
                  </p>
                </SectionBody>
              </section>

              {/* 10 OUTCOMES */}
              <section id="outcomes" className="mb-20 md:mb-28 scroll-mt-32">
                <SectionHeading
                  number="10"
                  title="Outcomes"
                />
                <StatBlock
                  items={[
                    { value: "129", label: "Source files" },
                    { value: "8", label: "PostgreSQL tables" },
                    { value: "3", label: "Docker services" },
                  ]}
                />
                <SectionBody>
                  <p>
                    The platform replaced a workflow that required constant context-switching between 4&ndash;5 disconnected tools with a single interface that handles the entire business lifecycle. Lead research that used to take hours of manual browsing now happens in seconds with the scraper. Invoicing that required Canva, manual uploads, and spreadsheet tracking is now a one-click pipeline.
                  </p>
                  <p>
                    The dual-database architecture means the business can continue using Airtable as a familiar CRM interface while the platform adds automation, commission tracking, and audit logging on top &mdash; a pragmatic bridge between existing workflow and full automation.
                  </p>
                </SectionBody>
              </section>

              {/* 11 RETROSPECTIVE */}
              <section id="retrospective" className="mb-20 md:mb-28 scroll-mt-32">
                <SectionHeading
                  number="11"
                  title="Retrospective"
                  subtitle="What worked, what I'd change, and what I learned."
                />
                <PrincipleCards
                  items={[
                    { number: "01", title: "Use the Right Runtime", description: "The dual-runtime approach was the fastest path to production. Python for scraping/PDFs, Node for auth/sessions/ORM. Pragmatism over purity." },
                    { number: "02", title: "Wrap, Don't Replace", description: "Wrapping Airtable instead of migrating away from it preserved the existing workflow and reduced adoption friction. Meet the business where it is." },
                    { number: "03", title: "Automate the Full Loop", description: "Half-automating a workflow just moves the bottleneck. The invoice lifecycle works because it's automated end-to-end — generation through commission tracking." },
                  ]}
                />
                <SectionBody>
                  <p>
                    If rebuilding from scratch: replace Airtable with PostgreSQL entirely to eliminate the dual-database complexity, add a task queue like BullMQ for durable scraping jobs, unify to a single Node runtime with Puppeteer and pdf-lib, and invest in E2E tests. The platform works, but refactoring is riskier than it needs to be without automated test coverage.
                  </p>
                </SectionBody>
              </section>

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
