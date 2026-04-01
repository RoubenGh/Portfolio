import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "Rouben Ghambaryan — Systems Engineer & Founder";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OgImage() {
  return new ImageResponse(
    (
      <div
        style={{
          background: "#0a0a0a",
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "80px",
        }}
      >
        <span
          style={{
            fontSize: "15px",
            color: "rgba(242,242,242,0.25)",
            letterSpacing: "0.12em",
            fontFamily: "system-ui, sans-serif",
          }}
        >
          rouben.dev
        </span>

        <div>
          <div
            style={{
              fontSize: "82px",
              fontWeight: 500,
              color: "#f2f2f2",
              lineHeight: 0.9,
              letterSpacing: "-3px",
              marginBottom: "32px",
              fontFamily: "system-ui, sans-serif",
            }}
          >
            Systems Engineer
            <br />& Founder.
          </div>
          <div
            style={{
              fontSize: "22px",
              color: "rgba(242,242,242,0.35)",
              lineHeight: 1.5,
              maxWidth: "680px",
              letterSpacing: "0.1px",
              fontFamily: "system-ui, sans-serif",
            }}
          >
            Building production infrastructure, automation pipelines, and
            systems that run at scale.
          </div>
        </div>

        <div style={{ display: "flex", gap: "28px" }}>
          {["INFRASTRUCTURE", "AUTOMATION", "SYSTEMS"].map((tag) => (
            <span
              key={tag}
              style={{
                fontSize: "11px",
                color: "rgba(242,242,242,0.18)",
                letterSpacing: "0.15em",
                fontFamily: "system-ui, sans-serif",
              }}
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    ),
    { ...size }
  );
}
