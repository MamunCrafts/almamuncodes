import { ImageResponse } from "next/og"

// App-generated favicon: tangerine mark with a dark "M", matching the site
// brand. Edit the colors/letter here instead of shipping a .ico file.
export const size = { width: 32, height: 32 }
export const contentType = "image/png"

export default function Icon() {
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
          fontSize: 24,
          fontWeight: 700,
          fontFamily: "sans-serif",
          borderRadius: 7,
        }}
      >
        M
      </div>
    ),
    { ...size },
  )
}
