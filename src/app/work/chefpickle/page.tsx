import type { Metadata } from "next";
import ChefPickleContent from "./content";

export const metadata: Metadata = {
  title: "ChefPickle — Case Study | Rouben Ghambaryan",
  description: "Deep debugging and legacy system stabilization.",
};

export default function ChefPicklePage() {
  return <ChefPickleContent />;
}
