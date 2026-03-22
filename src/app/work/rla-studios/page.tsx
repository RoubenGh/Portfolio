import type { Metadata } from "next";
import RLAStudiosContent from "./content";

export const metadata: Metadata = {
  title: "RLA Studios — Case Study | Rouben Ghambaryan",
  description:
    "End-to-end media operations platform for real estate content production.",
};

export default function RLAStudiosPage() {
  return <RLAStudiosContent />;
}
