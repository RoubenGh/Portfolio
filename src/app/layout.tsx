import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Rouben Ghambaryan | Systems Engineer & Founder",
  description:
    "Building production infrastructure, automation pipelines, and systems that run at scale.",
  openGraph: {
    title: "Rouben Ghambaryan | Systems Engineer & Founder",
    description:
      "Building production infrastructure, automation pipelines, and systems that run at scale.",
    url: "https://rouben.dev",
    siteName: "Rouben Ghambaryan",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Rouben Ghambaryan | Systems Engineer & Founder",
    description:
      "Building production infrastructure, automation pipelines, and systems that run at scale.",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600&family=Playfair+Display:ital,wght@0,400;0,500;1,400;1,500&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="noise-overlay">{children}</body>
    </html>
  );
}
