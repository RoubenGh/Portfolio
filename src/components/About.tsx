"use client";

import FadeIn from "./FadeIn";

export default function About() {
  return (
    <section id="about" className="py-24">
      <div className="mx-auto max-w-[1100px] px-6">
        <FadeIn>
          <h2 className="text-[32px] font-medium text-black">About</h2>
        </FadeIn>
        <FadeIn delay={0.1}>
          <p className="mt-6 text-[18px] leading-[1.6] text-[#666] max-w-[600px]">
            I&apos;m a systems engineer who builds production infrastructure at
            scale — from cloud platforms and backend services to data automation
            pipelines and AI-assisted tools. I founded{" "}
            <span className="text-black font-medium">RLA Studios</span> to
            apply systems thinking to creative work, turning manual processes
            into automated pipelines.
          </p>
        </FadeIn>
        <FadeIn delay={0.15}>
          <p className="mt-4 text-[18px] leading-[1.6] text-[#666] max-w-[600px]">
            My background spans DevOps, backend engineering, and full-stack
            development. I care about building things that work reliably, scale
            gracefully, and solve real problems.
          </p>
        </FadeIn>
      </div>
    </section>
  );
}
