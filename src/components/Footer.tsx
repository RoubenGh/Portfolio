"use client";

import FadeIn from "./FadeIn";

const footerLinks = [
  { label: "GitHub", href: "https://github.com/RoubenGh" },
  { label: "LinkedIn", href: "https://www.linkedin.com/" },
  { label: "Resume", href: "#" },
];

export default function Footer() {
  return (
    <footer className="border-t border-[#eee]">
      <div className="mx-auto max-w-[1100px] px-6 py-16">
        <FadeIn>
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
            <div>
              <p className="text-[15px] font-medium text-black">
                Rouben Ghambaryan
              </p>
              <p className="text-[14px] text-[#666] mt-1">
                Systems Engineer &middot; DevOps &middot; Founder
              </p>
            </div>
            <div className="flex items-center gap-6">
              {footerLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[14px] text-[#666] hover:text-black transition-colors duration-200"
                >
                  {link.label}
                </a>
              ))}
            </div>
          </div>
          <p className="mt-10 text-[13px] text-[#999]">
            &copy; {new Date().getFullYear()} Rouben Ghambaryan. All rights
            reserved.
          </p>
        </FadeIn>
      </div>
    </footer>
  );
}
