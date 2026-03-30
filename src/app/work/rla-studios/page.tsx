import type { Metadata } from "next";
import RLAStudiosContent from "./content";

export const metadata: Metadata = {
  title: "RLA Studios — Case Study | Rouben Ghambaryan",
  description:
    "Full-stack business operations platform for a real estate videography company — lead scraping, invoicing, CRM, and commission tracking.",
};

export default function RLAStudiosPage() {
  return <RLAStudiosContent />;
}
