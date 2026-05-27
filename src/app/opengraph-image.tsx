import { ImageResponse } from "next/og";

export const alt = "Matias Zanan — Ecommerce Solutions";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start",
          justifyContent: "center",
          padding: "80px",
          background:
            "linear-gradient(135deg, #050816 0%, #0b1a3a 45%, #1a0b3a 100%)",
          color: "white",
          fontFamily: "system-ui, sans-serif",
        }}
      >
        <div
          style={{
            fontSize: 28,
            color: "#67e8f9",
            letterSpacing: "0.2em",
            textTransform: "uppercase",
          }}
        >
          landing.itsmatias.com
        </div>
        <div
          style={{
            fontSize: 96,
            fontWeight: 800,
            letterSpacing: "-0.03em",
            lineHeight: 1.05,
            marginTop: 24,
          }}
        >
          Ecommerce
        </div>
        <div
          style={{
            fontSize: 96,
            fontWeight: 800,
            letterSpacing: "-0.03em",
            lineHeight: 1.05,
            color: "#a5f3fc",
          }}
        >
          done right.
        </div>
        <div
          style={{
            fontSize: 30,
            color: "#cbd5e1",
            marginTop: 48,
            maxWidth: 1000,
            lineHeight: 1.35,
          }}
        >
          Custom-built online stores with modern design and secure payments. By Matias Zanan.
        </div>
      </div>
    ),
    { ...size },
  );
}
