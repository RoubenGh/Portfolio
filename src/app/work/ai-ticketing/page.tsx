import type { Metadata } from "next";
import AITicketingContent from "./content";

export const metadata: Metadata = {
  title: "AI Ticketing System — Case Study | Rouben Ghambaryan",
  description: "AI-powered ticketing assistant that transforms unstructured emails into structured, prioritized tickets with auto-generated task breakdowns.",
};

export default function AITicketingPage() {
  return <AITicketingContent />;
}
