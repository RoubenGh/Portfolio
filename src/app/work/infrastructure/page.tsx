import type { Metadata } from "next";
import InfrastructureContent from "./content";

export const metadata: Metadata = {
  title: "Infrastructure Systems — Case Study | Rouben Ghambaryan",
  description: "Production-grade cloud infrastructure at scale.",
};

export default function InfrastructurePage() {
  return <InfrastructureContent />;
}
