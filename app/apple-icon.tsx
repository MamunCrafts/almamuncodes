import { ImageResponse } from "next/og"

// Home-screen icon for iOS using the same mark as the favicon.
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
          background: "#100F0D",
          color: "#FFF4E8",
          fontSize: 80,
          fontWeight: 800,
          fontFamily: "sans-serif",
          border: "14px solid #FF6A2B",
        }}
      >
        AM
      </div>
    ),
    { ...size },
  )
}
