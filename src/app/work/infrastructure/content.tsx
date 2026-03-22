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

export default function InfrastructureContent() {
  return (
    <>
      <Nav />
      <main className="pt-28 md:pt-32">
        <div className="mx-auto max-w-[960px] px-5 md:px-10">
          <div className="mb-10"><BackButton /></div>

          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.9, ease }}>
            <h1 className="text-[36px] md:text-[52px] font-medium tracking-[-1.5px] leading-[1.05] text-[var(--color-fg)]">
              Infrastructure Systems
            </h1>
            <p className="mt-3 text-[16px] md:text-[18px] leading-[1.5] text-[var(--color-fg-30)] max-w-[600px]">
              Production-grade cloud infrastructure — Kubernetes, AWS, CI/CD, and zero-downtime deployments.
            </p>
          </motion.div>

          <div className="mt-10 md:mt-12">
            <ProjectHero
              bannerBg="linear-gradient(135deg, #0d0a1a 0%, #120e22 40%, #0a0818 100%)"
              bannerLabel="INFRA"
              bannerLabelColor="rgba(8,144,251,0.5)"
            />
          </div>

          <div className="mt-8">
            <ProjectMeta items={[
              { label: "Role", value: "Lead DevOps Engineer" },
              { label: "Timeline", value: "2023 — Present" },
              { label: "Stack", value: "Kubernetes, AWS, Docker, Terraform" },
              { label: "Type", value: "Infrastructure / DevOps" },
            ]} />
          </div>

          <div className="mt-16 md:mt-20 max-w-[720px]">
            <section className="mb-20 md:mb-28">
              <SectionHeading number="01" title="Overview" subtitle="Building and maintaining production infrastructure that services need to run reliably at scale." />
              <SectionBody>
                <p>This is an ongoing body of work spanning multiple projects and clients — designing, deploying, and maintaining cloud infrastructure that handles real production traffic. The focus is always on reliability, automation, and zero-downtime operations.</p>
                <p>From Kubernetes clusters on AWS to self-hosted deployments on dedicated VPS instances, the work covers the full spectrum of modern infrastructure engineering.</p>
              </SectionBody>
              <StatBlock items={[
                { value: "99.9%", label: "Uptime across services" },
                { value: "0", label: "Zero-downtime deployments" },
                { value: "< 5min", label: "Average deploy time" },
              ]} />
            </section>

            <section className="mb-20 md:mb-28">
              <SectionHeading number="02" title="Core Systems" />
              <PrincipleCards items={[
                { number: "01", title: "Container Orchestration", description: "Kubernetes clusters with auto-scaling, health checks, and rolling deployments across multiple environments." },
                { number: "02", title: "CI/CD Pipelines", description: "Automated build, test, and deploy pipelines that catch issues before they reach production." },
                { number: "03", title: "SSL & Security", description: "Automated certificate management, network policies, and security hardening across all services." },
              ]} />
              <VisualFrame
                bg="linear-gradient(135deg, #0a0818 0%, #0d0b1c 50%, #080614 100%)"
                label="Cluster Architecture"
                labelColor="rgba(8,144,251,0.3)"
                caption="1.0 — Kubernetes cluster topology and service mesh."
              />
            </section>

            <section className="mb-20 md:mb-28">
              <SectionHeading number="03" title="Monitoring & Observability" />
              <SectionBody>
                <p>Every service is instrumented with metrics, logs, and traces. Alerting is configured to page on symptoms (elevated error rates, latency spikes) rather than causes — letting the oncall engineer diagnose rather than guess.</p>
                <p>Dashboards provide real-time visibility into system health, deployment status, and resource utilization across all environments.</p>
              </SectionBody>
              <VisualFrame
                bg="linear-gradient(135deg, #0c0a18 0%, #0e0c1e 50%, #0a0816 100%)"
                label="Monitoring Dashboard"
                labelColor="rgba(8,144,251,0.25)"
                caption="2.0 — System health monitoring and alerting overview."
              />
            </section>

            <NextProject
              title="ChefPickle"
              meta="Client — 2024"
              href="/work/chefpickle"
              previewBg="linear-gradient(135deg, #0a1520 0%, #071018 40%, #050c14 100%)"
              previewLabel="CP"
              previewLabelColor="rgba(0,106,195,0.5)"
            />
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
