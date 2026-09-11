import type { Metadata } from "next";
import TwentyTwentyContent from "./content";

export const metadata: Metadata = {
  title: "TwentyTwenty | Case Study | Rouben Ghambaryan",
  description:
    "A cross-platform desktop app that enforces the 20-20-20 eye strain rule by measuring genuine screen time instead of running a timer. Built for Linux, Windows and macOS.",
};

export default function TwentyTwentyPage() {
  return <TwentyTwentyContent />;
}
