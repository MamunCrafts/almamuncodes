import { ImageResponse } from "next/og"

// App-generated favicon for the portfolio brand.
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
          background: "#100F0D",
          color: "#FFF4E8",
          fontSize: 15,
          fontWeight: 800,
          fontFamily: "sans-serif",
          borderRadius: 7,
          border: "3px solid #FF6A2B",
        }}
      >
        AM
      </div>
    ),
    { ...size },
  )
}
