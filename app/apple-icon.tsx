import { ImageResponse } from "next/og"

// Home-screen icon for iOS (180×180). iOS rounds the corners itself, so this
// is full-bleed tangerine with a large dark "M".
export const size = { width: 180, height: 180 }
export const contentType = "image/png"

export default function AppleIcon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#FF6A2B",
          color: "#100F0D",
          fontSize: 120,
          fontWeight: 700,
          fontFamily: "sans-serif",
        }}
      >
        M
      </div>
    ),
    { ...size },
  )
}
