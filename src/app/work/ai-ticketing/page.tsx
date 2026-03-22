import type { Metadata } from "next";
import AITicketingContent from "./content";

export const metadata: Metadata = {
  title: "AI Ticketing System — Case Study | Rouben Ghambaryan",
  description: "Email parsing and automated response system using internal knowledge bases.",
};

export default function AITicketingPage() {
  return <AITicketingContent />;
}
